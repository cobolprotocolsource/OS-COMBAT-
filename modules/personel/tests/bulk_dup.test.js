// modules/personel/tests/bulk_dup.test.js
// Tests for duplicate detection in bulk upload

const request = require('supertest')
const app = require('../../../core/server')

describe('Personel Bulk Duplicate & Format Validation', () => {
  test('detect duplicates in payload and existing system', async () => {
    // create an existing record
    const existing = await request(app).post('/api/personel').send({ nrp: '9100', nama: 'Existing', pangkat: 'Sersan' })
    expect(existing.statusCode).toBe(200)

    const items = [
      { nrp: '9100', nama: 'DupExisting', pangkat: 'Sersan' }, // exists in system
      { nrp: '9200', nama: 'First', pangkat: 'Peltu' },
      { nrp: '9200', nama: 'Second', pangkat: 'Peltu' } // duplicate in payload
    ]

    const res = await request(app).post('/api/personel/bulk').send(items)
    expect(res.statusCode).toBe(400)
    expect(res.body.ok).toBe(false)
    const errs = res.body.error.errors
    expect(Array.isArray(errs)).toBe(true)
    // Expect at least two errors reported
    expect(errs.length).toBeGreaterThanOrEqual(2)
  })

  test('detect invalid nrp format', async () => {
    const items = [
      { nrp: 'A12', nama: 'BadFormat' },
    ]
    const res = await request(app).post('/api/personel/bulk').send(items)
    expect(res.statusCode).toBe(400)
    expect(res.body.ok).toBe(false)
    const errs = res.body.error.errors
    expect(errs[0].message).toMatch(/nrp format invalid/)
  })
})
