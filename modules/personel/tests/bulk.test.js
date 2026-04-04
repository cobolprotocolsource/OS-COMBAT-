// modules/personel/tests/bulk.test.js
// Tests for bulk upload endpoint

const request = require('supertest')
const app = require('../../../core/server')

describe('Personel Bulk API', () => {
  test('POST /api/personel/bulk -> success', async () => {
    const items = [
      { nrp: '9001', nama: 'Slamet', pangkat: 'Sersan' },
      { nrp: '9002', nama: 'Joko', pangkat: 'Peltu' }
    ]
    const res = await request(app).post('/api/personel/bulk').send(items)
    expect(res.statusCode).toBe(200)
    expect(res.body.ok).toBe(true)
    expect(Array.isArray(res.body.data)).toBe(true)
    expect(res.body.data.length).toBe(2)
    expect(res.body.data[0]).toHaveProperty('id')
  })

  test('POST /api/personel/bulk -> validation error', async () => {
    const items = [
      { nrp: '', nama: 'NoNrp' },
      { nrp: '9003' }
    ]
    const res = await request(app).post('/api/personel/bulk').send(items)
    expect(res.statusCode).toBe(400)
    expect(res.body.ok).toBe(false)
    expect(res.body.error).toHaveProperty('errors')
    expect(Array.isArray(res.body.error.errors)).toBe(true)
  })
})
