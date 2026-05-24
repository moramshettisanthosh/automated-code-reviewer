const request = require('supertest');
const app = require('../app');

describe('Auth API', () => {
  it('should return health status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });

  it('should reject unknown login gracefully', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'missing@example.com', password: 'password123' });
    expect([400, 401, 404]).toContain(res.statusCode);
  });
});
