// modules/personel/tests/audit_export.test.js
// Test CSV export endpoint

const request = require('supertest')
const app = require('../../../core/server')

describe('Audit Export', () => {
  test('GET /api/personel/audit/export returns CSV', async () => {
    // create an action so audit has content
    await request(app).post('/api/personel').send({ nrp: '7001', nama: 'Export1' })
    const res = await request(app).get('/api/personel/audit/export')
    expect(res.statusCode).toBe(200)
    expect(res.headers['content-type']).toMatch(/text\/csv/)
    expect(res.text).toMatch(/id,when,action,details/)
  })
})
