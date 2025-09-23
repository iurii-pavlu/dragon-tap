import mongoose, { Schema, Document, model, models } from 'mongoose';

// User Model
export interface IUser extends Document {
  _id: string;
  tgId?: string;
  name: string;
  avatarUrl?: string;
  level: number;
  coins: number;
  energy: number;
  maxEnergy: number;
  lastEnergyRegen: Date;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
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

export const User = models.User || model<IUser>('User', UserSchema);

// Abilities Model  
export interface IAbilities extends Document {
  userId: mongoose.Types.ObjectId;
  multitap: number;
  energyCap: number;
  rechargeSpeed: number;
  turbo: number;
}

const AbilitiesSchema = new Schema<IAbilities>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  multitap: { type: Number, default: 1 },
  energyCap: { type: Number, default: 1 },
  rechargeSpeed: { type: Number, default: 1 },
  turbo: { type: Number, default: 0 }
});

export const Abilities = models.Abilities || model<IAbilities>('Abilities', AbilitiesSchema);

// Task Model
export interface ITask extends Document {
  _id: string;
  type: 'subscribe' | 'watch' | 'custom';
  title: string;
  description?: string;
  reward: number;
  partner?: string;
  active: boolean;
  createdAt: Date;
}

const TaskSchema = new Schema<ITask>({
  type: { type: String, enum: ['subscribe', 'watch', 'custom'], required: true },
  title: { type: String, required: true },
  description: { type: String },
  reward: { type: Number, required: true },
  partner: { type: String },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export const Task = models.Task || model<ITask>('Task', TaskSchema);

// Task Completion Model
export interface ITaskCompletion extends Document {
  userId: mongoose.Types.ObjectId;
  taskId: mongoose.Types.ObjectId;
  status: 'pending' | 'verified' | 'done';
  createdAt: Date;
}

const TaskCompletionSchema = new Schema<ITaskCompletion>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
  status: { type: String, enum: ['pending', 'verified', 'done'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

TaskCompletionSchema.index({ userId: 1, taskId: 1 }, { unique: true });

export const TaskCompletion = models.TaskCompletion || model<ITaskCompletion>('TaskCompletion', TaskCompletionSchema);

// Daily Rewards Model
export interface IDailyReward extends Document {
  userId: mongoose.Types.ObjectId;
  day: number;
  claimedAt: Date;
}

const DailyRewardSchema = new Schema<IDailyReward>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  day: { type: Number, required: true },
  claimedAt: { type: Date, default: Date.now }
});

DailyRewardSchema.index({ userId: 1, day: 1 }, { unique: true });

export const DailyReward = models.DailyReward || model<IDailyReward>('DailyReward', DailyRewardSchema);

// Leaderboard Snapshot Model
export interface ILeaderboardSnapshot extends Document {
  asOf: Date;
  top: {
    userId: mongoose.Types.ObjectId;
    coins: number;
  }[];
}

const LeaderboardSnapshotSchema = new Schema<ILeaderboardSnapshot>({
  asOf: { type: Date, required: true },
  top: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    coins: { type: Number, required: true }
  }]
});

export const LeaderboardSnapshot = models.LeaderboardSnapshot || model<ILeaderboardSnapshot>('LeaderboardSnapshot', LeaderboardSnapshotSchema);

// Battle Pass Season Model
export interface IBattlePassSeason extends Document {
  _id: string;
  season: number;
  endsAt: Date;
  tiers: {
    tier: number;
    reward: {
      type: 'coins' | 'gems' | 'tickets' | 'vip' | 'cosmetic';
      amount: number;
    };
    track: 'free' | 'advanced' | 'luxury';
  }[];
}

const BattlePassSeasonSchema = new Schema<IBattlePassSeason>({
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

export const BattlePassSeason = models.BattlePassSeason || model<IBattlePassSeason>('BattlePassSeason', BattlePassSeasonSchema);

// Battle Pass Progress Model
export interface IBattlePassProgress extends Document {
  userId: mongoose.Types.ObjectId;
  season: number;
  xp: number;
  ownedTrack: 'free' | 'advanced' | 'luxury';
  claimedTiers: number[];
}

const BattlePassProgressSchema = new Schema<IBattlePassProgress>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  season: { type: Number, required: true },
  xp: { type: Number, default: 0 },
  ownedTrack: { type: String, enum: ['free', 'advanced', 'luxury'], default: 'free' },
  claimedTiers: [{ type: Number }]
});

BattlePassProgressSchema.index({ userId: 1, season: 1 }, { unique: true });

export const BattlePassProgress = models.BattlePassProgress || model<IBattlePassProgress>('BattlePassProgress', BattlePassProgressSchema);

// Referral Model
export interface IReferral extends Document {
  referrerId: mongoose.Types.ObjectId;
  inviteeId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const ReferralSchema = new Schema<IReferral>({
  referrerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  inviteeId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

ReferralSchema.index({ referrerId: 1, inviteeId: 1 }, { unique: true });

export const Referral = models.Referral || model<IReferral>('Referral', ReferralSchema);