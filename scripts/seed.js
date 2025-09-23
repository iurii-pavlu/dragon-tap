const mongoose = require('mongoose');

// Import models (we'll need to compile them for Node.js)
const userSchema = new mongoose.Schema({
  tgId: { type: String, unique: true, sparse: true },
  name: { type: String, required: true },
  avatarUrl: { type: String },
  level: { type: Number, default: 1 },
  coins: { type: Number, default: 0 },
  energy: { type: Number, default: 500 },
  maxEnergy: { type: Number, default: 500 },
  lastEnergyRegen: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

const taskSchema = new mongoose.Schema({
  type: { type: String, enum: ['subscribe', 'watch', 'custom'], required: true },
  title: { type: String, required: true },
  description: { type: String },
  reward: { type: Number, required: true },
  partner: { type: String },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const battlePassSeasonSchema = new mongoose.Schema({
  season: { type: Number, required: true, unique: true },
  endsAt: { type: Date, required: true },
  tiers: [{
    tier: { type: Number, required: true },
    reward: {
      type: { type: String, enum: ['coins', 'gems', 'tickets', 'vip', 'cosmetic'], required: true },
      amount: { type: Number, required: true }
    },
    track: { type: String, enum: ['free', 'advanced', 'luxury'], required: true }
  }]
});

const User = mongoose.model('User', userSchema);
const Task = mongoose.model('Task', taskSchema);
const BattlePassSeason = mongoose.model('BattlePassSeason', battlePassSeasonSchema);

async function seedDatabase() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing data (optional)
    // await User.deleteMany({});
    // await Task.deleteMany({});
    // await BattlePassSeason.deleteMany({});

    // Create sample tasks
    const tasks = [
      {
        type: 'subscribe',
        title: 'Follow @ShrimpHunters on Twitter',
        description: 'Follow our official Twitter account',
        reward: 5000,
        partner: 'Twitter',
        active: true
      },
      {
        type: 'subscribe', 
        title: 'Join Telegram Channel',
        description: 'Join our official Telegram channel',
        reward: 3000,
        partner: 'Telegram',
        active: true
      },
      {
        type: 'watch',
        title: 'Watch Dragon Tutorial',
        description: 'Complete the dragon training tutorial',
        reward: 2500,
        active: true
      },
      {
        type: 'custom',
        title: 'Invite 5 Friends',
        description: 'Invite 5 friends to join Dragon Tap',
        reward: 10000,
        active: true
      }
    ];

    await Task.insertMany(tasks);
    console.log('✅ Sample tasks created');

    // Create battle pass season
    const seasonEndDate = new Date();
    seasonEndDate.setDate(seasonEndDate.getDate() + 30); // 30 days from now

    const battlePassTiers = [];
    for (let tier = 1; tier <= 10; tier++) {
      // Free tier rewards
      battlePassTiers.push({
        tier,
        reward: { type: 'coins', amount: tier * 1000 },
        track: 'free'
      });

      // Advanced tier rewards  
      battlePassTiers.push({
        tier,
        reward: { type: 'coins', amount: tier * 2000 },
        track: 'advanced'
      });

      // Luxury tier rewards
      battlePassTiers.push({
        tier, 
        reward: { type: 'gems', amount: tier * 10 },
        track: 'luxury'
      });
    }

    const battlePassSeason = new BattlePassSeason({
      season: 1,
      endsAt: seasonEndDate,
      tiers: battlePassTiers
    });

    await battlePassSeason.save();
    console.log('✅ Battle pass season created');

    console.log('🎉 Database seeded successfully!');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

// Run the seed script
seedDatabase();