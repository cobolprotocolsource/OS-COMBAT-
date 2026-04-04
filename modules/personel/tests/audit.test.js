// modules/personel/tests/audit.test.js
// Verify audit log entries are recorded for create/update/delete/bulk.

const request = require('supertest')
const app = require('../../../core/server')

describe('Personel Audit Logs', () => {
  test('audit entries created for actions', async () => {
    // clear and run actions
    // create
    const c1 = await request(app).post('/api/personel').send({ nrp: '5001', nama: 'Audit1' })
    expect(c1.statusCode).toBe(200)
    const id = c1.body.data.id

    // update
    const u = await request(app).put(`/api/personel/${id}`).send({ pangkat: 'Sersan' })
    expect(u.statusCode).toBe(200)

    // bulk
    const bulk = await request(app).post('/api/personel/bulk').send([{ nrp: '6001', nama: 'Bulk1' }])
    expect(bulk.statusCode).toBe(200)

    // delete
    const d = await request(app).delete(`/api/personel/${id}`)
    expect(d.statusCode).toBe(200)

    // fetch audit logs
    const logs = await request(app).get('/api/personel/audit')
    expect(logs.statusCode).toBe(200)
    expect(Array.isArray(logs.body.data)).toBe(true)
    // expect at least 4 audit entries
    expect(logs.body.data.length).toBeGreaterThanOrEqual(4)
  })
})
