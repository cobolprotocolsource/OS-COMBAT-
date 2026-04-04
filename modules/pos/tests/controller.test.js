// modules/pos/tests/controller.test.js
// Basic integration tests for pos endpoints using supertest + jest.

const request = require('supertest');
const app = require('../../../core/server');

describe('Pos API', () => {
  let createdId = null;

  test('POST /api/pos -> create', async () => {
    const payload = { nama: 'Pos A', lokasi: 'Sector 1', kode: 'P001' };
    const res = await request(app).post('/api/pos').send(payload);
    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.data).toHaveProperty('id');
    createdId = res.body.data.id;
  });

  test('GET /api/pos -> list', async () => {
    const res = await request(app).get('/api/pos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('GET /api/pos/:id -> get by id', async () => {
    const res = await request(app).get(`/api/pos/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.id).toBe(createdId);
  });

  test('PUT /api/pos/:id -> update', async () => {
    const res = await request(app).put(`/api/pos/${createdId}`).send({ lokasi: 'Sector 2' });
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty('updatedAt');
  });

  test('DELETE /api/pos/:id -> delete', async () => {
    const res = await request(app).delete(`/api/pos/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.id).toBe(createdId);
  });
});
