// MongoDB Data API Integration for Dragon Tap
const MONGODB_CONFIG = {
  baseUrl: 'https://data.mongodb-api.com/app',
  appId: import.meta.env.VITE_MONGODB_APP_ID || 'data-xxxxx',
  dataSource: import.meta.env.VITE_MONGODB_CLUSTER || 'Cluster0',
  database: 'dragon_tap',
  apiKey: import.meta.env.VITE_MONGODB_PUBLIC_KEY
};

const API_ENDPOINT = `${MONGODB_CONFIG.baseUrl}/${MONGODB_CONFIG.appId}/endpoint/data/v1/action`;

const mongoRequest = async (action, data) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': MONGODB_CONFIG.apiKey,
      },
      body: JSON.stringify({
        dataSource: MONGODB_CONFIG.dataSource,
        database: MONGODB_CONFIG.database,
        ...data
      })
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('MongoDB API Error:', error);
    throw error;
  }
};

export const createUser = async (userData) => {
  return mongoRequest('insertOne', {
    collection: 'users',
    document: { ...userData, createdAt: new Date().toISOString() }
  });
};

export const getUser = async (userId) => {
  return mongoRequest('findOne', { collection: 'users', filter: { userId } });
};

export const updateUser = async (userId, updates) => {
  return mongoRequest('updateOne', {
    collection: 'users',
    filter: { userId },
    update: { $set: { ...updates, lastUpdated: new Date().toISOString() } },
    upsert: true
  });
};

export const saveProgress = async (userId, progressData) => {
  return mongoRequest('updateOne', {
    collection: 'progress',
    filter: { userId },
    update: { $set: { ...progressData, lastSaved: new Date().toISOString() } },
    upsert: true
  });
};

export const getProgress = async (userId) => {
  return mongoRequest('findOne', { collection: 'progress', filter: { userId } });
};

export const getLeaderboard = async (type = 'global', limit = 100) => {
  return mongoRequest('find', {
    collection: 'leaderboards',
    filter: {},
    sort: { coins: -1 },
    limit
  });
};

export const syncWithMongoDB = async (userId, localData) => {
  try {
    await saveProgress(userId, {
      coins: localData.coins,
      energy: localData.energy,
      level: localData.level,
      tapPower: localData.tapPower
    });
    await updateUser(userId, {
      lastLogin: new Date().toISOString(),
      totalCoins: localData.coins
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default {
  createUser,
  getUser,
  updateUser,
  saveProgress,
  getProgress,
  getLeaderboard,
  syncWithMongoDB
};
