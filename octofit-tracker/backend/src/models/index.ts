import { model, Schema } from 'mongoose';

export const User = model(
  'User',
  new Schema(
    {
      username: { type: String, required: true, trim: true, unique: true },
      displayName: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    },
    { timestamps: true },
  ),
);


export const Team = model(
  'Team',
  new Schema(
    {
      name: { type: String, required: true, trim: true },
      members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    { timestamps: true },
  ),
);

export const Activity = model(
  'Activity',
  new Schema(
    {
      user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      activityType: { type: String, required: true, trim: true },
      durationMinutes: { type: Number, required: true, min: 1 },
      points: { type: Number, default: 0, min: 0 },
      completedAt: { type: Date, default: Date.now },
    },
    { timestamps: true },
  ),
);

export const LeaderboardEntry = model(
  'LeaderboardEntry',
  new Schema(
    {
      user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
      team: { type: Schema.Types.ObjectId, ref: 'Team' },
      points: { type: Number, default: 0, min: 0 },
    },
    { timestamps: true },
  ),
);

export const Workout = model(
  'Workout',
  new Schema(
    {
      title: { type: String, required: true, trim: true },
      description: { type: String, default: '' },
      activityType: { type: String, required: true, trim: true },
      difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
      durationMinutes: { type: Number, required: true, min: 1 },
    },
    { timestamps: true },
  ),
);