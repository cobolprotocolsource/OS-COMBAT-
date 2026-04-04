// modules/personel/tests/controller.test.js
// Basic integration tests for personel endpoints using supertest + jest.

const request = require('supertest');
const app = require('../../../core/server');

describe('Personel API', () => {
  let createdId = null;

  test('POST /api/personel -> create', async () => {
    const payload = { nama: 'Budi', pangkat: 'Sersan', nrp: '12345' };
    const res = await request(app).post('/api/personel').send(payload);
    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.data).toHaveProperty('id');
    createdId = res.body.data.id;
  });

  test('GET /api/personel -> list', async () => {
    const res = await request(app).get('/api/personel');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('GET /api/personel/:id -> get by id', async () => {
    const res = await request(app).get(`/api/personel/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.id).toBe(createdId);
  });

  test('PUT /api/personel/:id -> update', async () => {
    const res = await request(app).put(`/api/personel/${createdId}`).send({ pangkat: 'Kopl/ Sgt' });
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty('updatedAt');
  });

  test('DELETE /api/personel/:id -> delete', async () => {
    const res = await request(app).delete(`/api/personel/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.id).toBe(createdId);
  });
});
