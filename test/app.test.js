import { describe, it } from 'node:test';
import assert from 'assert';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

describe('Database Connection', () => {
  it('should connect to MongoDB', async () => {
    try {
      await mongoose.connect(process.env.DATABASE_URI);
      assert.ok(mongoose.connection.readyState === 1);
    } catch (error) {
      assert.fail('Failed to connect to MongoDB');
    } finally {
      await mongoose.connection.close();
    }
  });
});

describe('Environment Variables', () => {
  it('should have all required environment variables', () => {
    const requiredEnvVars = [
      'BOT_API',
      'DATABASE_URI',
      'JWT_SECRET',
      'IMAGEKIT_PUBLIC_KEY',
      'IMAGEKIT_PRIVATE_KEY',
      'IMAGEKIT_URL_ENDPOINT',
      'ADMIN_ID',
      'ADMIN_GROUP_ID'
    ];

    requiredEnvVars.forEach(envVar => {
      assert.ok(process.env[envVar], `Missing environment variable: ${envVar}`);
    });
  });
});
