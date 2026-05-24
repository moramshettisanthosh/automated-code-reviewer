const request = require('supertest');
const app = require('../app');

describe('Review API', () => {
  it('should require authentication for history', async () => {
    const res = await request(app).get('/api/reviews/history');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });
});
