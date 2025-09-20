// In backend/src/tests/auth.test.js

import { describe, it, expect, beforeAll, afterAll } from 'vitest'; // 👈 Crucial import
import request from 'supertest';
import { app } from '../server.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Auth Routes', () => {
  // Clean up any test users created during the tests
  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: {
          contains: '@example.com',
        },
      },
    });
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'registertest@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'User created successfully');
    });
  });

  describe('POST /api/auth/login', () => {
    // We need a user to exist first, so we register one before this test
    beforeAll(async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'logintest@example.com',
          password: 'password123',
        });
    });

    it('should log in an existing user and return a JWT', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'logintest@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should fail with incorrect password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'logintest@example.com',
          password: 'wrongpassword',
        });

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('error', 'Invalid credentials');
    });
  });
});