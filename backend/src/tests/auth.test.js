// Add these to backend/src/tests/auth.test.js
// ... inside the main 'Auth Routes' describe block

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