import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    const userData = [
      { username: 'maya-chen', displayName: 'Maya Chen', email: 'maya.chen@example.test' },
      { username: 'jordan-lee', displayName: 'Jordan Lee', email: 'jordan.lee@example.test' },
      { username: 'samira-patel', displayName: 'Samira Patel', email: 'samira.patel@example.test' },
    ];
    const users = await Promise.all(
      userData.map((user) =>
        User.findOneAndUpdate(
          { username: user.username },
          { $set: user },
          { upsert: true, returnDocument: 'after' },
        ),
      ),
    );
    const [maya, jordan, samira] = users;

    if (!maya || !jordan || !samira) {
      throw new Error('Could not create the sample users');
    }

    const [trailblazers, coreCrew] = await Promise.all([
      Team.findOneAndUpdate(
        { name: 'Trailblazers' },
        { $set: { name: 'Trailblazers', members: [maya._id, jordan._id] } },
        { upsert: true, returnDocument: 'after' },
      ),
      Team.findOneAndUpdate(
        { name: 'Core Crew' },
        { $set: { name: 'Core Crew', members: [samira._id] } },
        { upsert: true, returnDocument: 'after' },
      ),
    ]);

    if (!trailblazers || !coreCrew) {
      throw new Error('Could not create the sample teams');
    }

    const activityData = [
      { user: maya._id, activityType: 'running', durationMinutes: 32, points: 64, completedAt: new Date('2026-09-25T16:30:00Z') },
      { user: jordan._id, activityType: 'cycling', durationMinutes: 45, points: 90, completedAt: new Date('2026-09-26T15:00:00Z') },
      { user: samira._id, activityType: 'strength training', durationMinutes: 30, points: 60, completedAt: new Date('2026-09-24T17:15:00Z') },
      { user: maya._id, activityType: 'walking', durationMinutes: 25, points: 35, completedAt: new Date('2026-09-27T10:00:00Z') },
      { user: jordan._id, activityType: 'running', durationMinutes: 22, points: 44, completedAt: new Date('2026-09-23T16:00:00Z') },
    ];
    await Promise.all(
      activityData.map(({ user, completedAt, ...activity }) =>
        Activity.findOneAndUpdate(
          { user, completedAt },
          { $set: { user, completedAt, ...activity } },
          { upsert: true, returnDocument: 'after' },
        ),
      ),
    );

    const leaderboardData = [
      { user: maya._id, team: trailblazers._id, points: 186 },
      { user: jordan._id, team: trailblazers._id, points: 164 },
      { user: samira._id, team: coreCrew._id, points: 132 },
    ];
    await Promise.all(
      leaderboardData.map((entry) =>
        LeaderboardEntry.findOneAndUpdate(
          { user: entry.user },
          { $set: entry },
          { upsert: true, returnDocument: 'after' },
        ),
      ),
    );

    const workoutData = [
      {
        title: 'Easy Interval Run',
        description: 'Alternate a comfortable jog with short, brisk intervals.',
        activityType: 'running',
        difficulty: 'beginner',
        durationMinutes: 25,
      },
      {
        title: 'Campus Cycling Loop',
        description: 'Ride at a steady pace and finish with a few faster laps.',
        activityType: 'cycling',
        difficulty: 'intermediate',
        durationMinutes: 35,
      },
      {
        title: 'Bodyweight Strength',
        description: 'Complete three rounds of squats, push-ups, lunges, and planks.',
        activityType: 'strength training',
        difficulty: 'beginner',
        durationMinutes: 20,
      },
      {
        title: 'Recovery Walk',
        description: 'Take a relaxed walk and keep a pace that allows easy conversation.',
        activityType: 'walking',
        difficulty: 'beginner',
        durationMinutes: 30,
      },
    ];
    await Promise.all(
      workoutData.map((workout) =>
        Workout.findOneAndUpdate(
          { title: workout.title },
          { $set: workout },
          { upsert: true, returnDocument: 'after' },
        ),
      ),
    );

    const counts = await Promise.all([
      User.countDocuments(),
      Team.countDocuments(),
      Activity.countDocuments(),
      LeaderboardEntry.countDocuments(),
      Workout.countDocuments(),
    ]);
    console.log(
      `Seeded records: users=${counts[0]}, teams=${counts[1]}, activities=${counts[2]}, leaderboard=${counts[3]}, workouts=${counts[4]}`,
    );

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();
