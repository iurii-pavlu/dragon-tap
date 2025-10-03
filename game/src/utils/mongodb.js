// MongoDB Direct Connection for Dragon Tap
// This replaces the Data API approach with direct driver connection
import { MongoClient } from 'mongodb';

// Use process.env for Node.js environment, import.meta.env for Vite/browser
const MONGODB_URI = process.env.MONGODB_URI ||
  (typeof import.meta !== 'undefined' && import.meta.env?.MONGODB_URI) ||
  'mongodb+srv://Claude:moxrFgbipaWZNFtn@dragon-tap-cluster.gryphe3.mongodb.net/?retryWrites=true&w=majority&appName=dragon-tap-cluster';

const DB_NAME = process.env.VITE_MONGODB_DATABASE ||
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_MONGODB_DATABASE) ||
  'dragon_tap';

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(DB_NAME);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

// Collection names as per technical spec
export const COLLECTIONS = {
  USERS: 'users',
  PROGRESS: 'progress',
  INVENTORY: 'inventory',
  LOOT_TABLES: 'loot_tables',
  PAYMENTS: 'payments',
  ADS: 'ads',
  TASKS: 'tasks',
  LEADERBOARDS: 'leaderboards',
  EVENTS_ANALYTICS: 'events_analytics',
  ROLES: 'roles',
  AUDIT_LOGS: 'audit_logs',
  REPORTS_CACHE: 'reports_cache'
};

// Initialize collections with indexes
export async function initializeCollections() {
  const { db } = await connectToDatabase();

  try {
    // Users collection
    await db.collection(COLLECTIONS.USERS).createIndex({ tg_id: 1 }, { unique: true });
    await db.collection(COLLECTIONS.USERS).createIndex({ referral_code: 1 });
    await db.collection(COLLECTIONS.USERS).createIndex({ referrer_id: 1 });

    // Progress collection
    await db.collection(COLLECTIONS.PROGRESS).createIndex({ user_id: 1 }, { unique: true });

    // Inventory collection
    await db.collection(COLLECTIONS.INVENTORY).createIndex({ user_id: 1 }, { unique: true });

    // Loot tables collection
    await db.collection(COLLECTIONS.LOOT_TABLES).createIndex({ box_id: 1 }, { unique: true });

    // Payments collection
    await db.collection(COLLECTIONS.PAYMENTS).createIndex({ user_id: 1 });
    await db.collection(COLLECTIONS.PAYMENTS).createIndex({ provider: 1, status: 1 });
    await db.collection(COLLECTIONS.PAYMENTS).createIndex({ 'payload': 1 }, { unique: true, sparse: true });

    // Ads collection
    await db.collection(COLLECTIONS.ADS).createIndex({ user_id: 1 });
    await db.collection(COLLECTIONS.ADS).createIndex({ completed_at: 1 });

    // Tasks collection
    await db.collection(COLLECTIONS.TASKS).createIndex({ task_id: 1 }, { unique: true });
    await db.collection(COLLECTIONS.TASKS).createIndex({ type: 1 });

    // Leaderboards collection
    await db.collection(COLLECTIONS.LEADERBOARDS).createIndex({ board_id: 1 });
    await db.collection(COLLECTIONS.LEADERBOARDS).createIndex({ 'scores.score': -1 });

    // Events analytics collection
    await db.collection(COLLECTIONS.EVENTS_ANALYTICS).createIndex({ event_name: 1 });
    await db.collection(COLLECTIONS.EVENTS_ANALYTICS).createIndex({ user_id: 1 });
    await db.collection(COLLECTIONS.EVENTS_ANALYTICS).createIndex({ ts: -1 });

    // Roles collection
    await db.collection(COLLECTIONS.ROLES).createIndex({ user_id: 1, role: 1 }, { unique: true });

    // Audit logs collection
    await db.collection(COLLECTIONS.AUDIT_LOGS).createIndex({ actor_id: 1 });
    await db.collection(COLLECTIONS.AUDIT_LOGS).createIndex({ action: 1 });
    await db.collection(COLLECTIONS.AUDIT_LOGS).createIndex({ ts: -1 });

    // Reports cache collection
    await db.collection(COLLECTIONS.REPORTS_CACHE).createIndex({ key: 1 }, { unique: true });
    await db.collection(COLLECTIONS.REPORTS_CACHE).createIndex({ ts: 1 }, { expireAfterSeconds: 3600 }); // 1 hour TTL

    console.log('✅ All collections initialized with indexes');
    return { success: true };
  } catch (error) {
    console.error('❌ Error initializing collections:', error);
    return { success: false, error: error.message };
  }
}

// User operations
export async function createUser(userData) {
  const { db } = await connectToDatabase();
  const result = await db.collection(COLLECTIONS.USERS).insertOne({
    ...userData,
    created_at: new Date().toISOString(),
    flags: userData.flags || {}
  });
  return result;
}

export async function getUser(tg_id) {
  const { db } = await connectToDatabase();
  return await db.collection(COLLECTIONS.USERS).findOne({ tg_id });
}

export async function updateUser(tg_id, updates) {
  const { db } = await connectToDatabase();
  return await db.collection(COLLECTIONS.USERS).updateOne(
    { tg_id },
    { $set: { ...updates, updated_at: new Date().toISOString() } },
    { upsert: true }
  );
}

// Progress operations
export async function saveProgress(user_id, progressData) {
  const { db } = await connectToDatabase();
  return await db.collection(COLLECTIONS.PROGRESS).updateOne(
    { user_id },
    {
      $set: {
        ...progressData,
        last_saved: new Date().toISOString()
      }
    },
    { upsert: true }
  );
}

export async function getProgress(user_id) {
  const { db } = await connectToDatabase();
  return await db.collection(COLLECTIONS.PROGRESS).findOne({ user_id });
}

// Leaderboard operations
export async function getLeaderboard(board_id = 'global', limit = 100) {
  const { db } = await connectToDatabase();
  const leaderboard = await db.collection(COLLECTIONS.LEADERBOARDS).findOne({ board_id });
  if (!leaderboard) return { board_id, scores: [] };
  return {
    board_id: leaderboard.board_id,
    scores: leaderboard.scores.slice(0, limit)
  };
}

export async function updateLeaderboard(board_id, user_id, score, username) {
  const { db } = await connectToDatabase();
  return await db.collection(COLLECTIONS.LEADERBOARDS).updateOne(
    { board_id },
    {
      $push: {
        scores: {
          $each: [{ user_id, score, username, ts: new Date().toISOString() }],
          $sort: { score: -1 },
          $slice: 1000 // Keep top 1000
        }
      }
    },
    { upsert: true }
  );
}

// Analytics event tracking
export async function trackEvent(event_name, user_id, props = {}) {
  const { db } = await connectToDatabase();
  return await db.collection(COLLECTIONS.EVENTS_ANALYTICS).insertOne({
    event_name,
    user_id,
    props,
    ts: new Date().toISOString()
  });
}

// Loot table operations
export async function getLootTable(box_id) {
  const { db } = await connectToDatabase();
  return await db.collection(COLLECTIONS.LOOT_TABLES).findOne({ box_id });
}

export async function createLootTable(box_id, entries) {
  const { db } = await connectToDatabase();
  return await db.collection(COLLECTIONS.LOOT_TABLES).insertOne({
    box_id,
    entries,
    created_at: new Date().toISOString()
  });
}

// Payment operations
export async function createPayment(paymentData) {
  const { db } = await connectToDatabase();
  return await db.collection(COLLECTIONS.PAYMENTS).insertOne({
    ...paymentData,
    created_at: new Date().toISOString(),
    status: 'pending'
  });
}

export async function updatePaymentStatus(payment_id, status, receipt = null) {
  const { db } = await connectToDatabase();
  const update = { status, updated_at: new Date().toISOString() };
  if (receipt) update['$push'] = { receipts: receipt };
  return await db.collection(COLLECTIONS.PAYMENTS).updateOne(
    { _id: payment_id },
    { $set: update }
  );
}

// Sync local data with MongoDB
export async function syncWithMongoDB(tg_id, localData) {
  try {
    await saveProgress(tg_id, {
      level: localData.level,
      coins: localData.coins,
      gems: localData.gems || 0,
      energy_cap: localData.maxEnergy || 500,
      energy_now: localData.energy,
      stats: {
        taps: localData.totalTaps || 0,
        crit_pct: 0,
        crit_mult: 1,
        afk_tps: 0,
        pity_counters: {}
      }
    });

    await updateUser(tg_id, {
      last_login: new Date().toISOString(),
      locale: localData.language || 'vi'
    });

    return { success: true };
  } catch (error) {
    console.error('Sync error:', error);
    return { success: false, error: error.message };
  }
}

export default {
  connectToDatabase,
  initializeCollections,
  COLLECTIONS,
  // User ops
  createUser,
  getUser,
  updateUser,
  // Progress ops
  saveProgress,
  getProgress,
  // Leaderboard ops
  getLeaderboard,
  updateLeaderboard,
  // Analytics ops
  trackEvent,
  // Loot ops
  getLootTable,
  createLootTable,
  // Payment ops
  createPayment,
  updatePaymentStatus,
  // Sync
  syncWithMongoDB
};
