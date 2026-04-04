// modules/personel/controller.js
// Business logic for Personel module.

const model = require('./model');
const events = require('./events');
const { sendSuccess, sendError } = require('../../core/util');
const audit = require('../../core/audit');

async function create(req, res) {
  try {
    const payload = req.body;
    const created = model.createPersonel(payload);
    // Emit event for Core listeners
    events.emit('personel.created', created);
    // Audit
    audit.log('personel.create', { by: req.user || null, id: created.id, payload });
    return sendSuccess(res, created);
  } catch (err) {
    return sendError(res, err.message);
  }
}

function list(req, res) {
  try {
    const rows = model.listPersonel();
    return sendSuccess(res, rows);
  } catch (err) {
    return sendError(res, err.message);
  }
}

function getById(req, res) {
  try {
    const { id } = req.params;
    const rec = model.getPersonelById(id);
    if (!rec) return sendError(res, 'Not found', 404);
    return sendSuccess(res, rec);
  } catch (err) {
    return sendError(res, err.message);
  }
}

function update(req, res) {
  try {
    const { id } = req.params;
    const updated = model.updatePersonel(id, req.body);
    if (!updated) return sendError(res, 'Not found', 404);
    events.emit('personel.updated', updated);
    audit.log('personel.update', { by: req.user || null, id, payload: req.body });
    return sendSuccess(res, updated);
  } catch (err) {
    return sendError(res, err.message);
  }
}

function remove(req, res) {
  try {
    const { id } = req.params;
    const ok = model.deletePersonel(id);
    if (!ok) return sendError(res, 'Not found', 404);
    events.emit('personel.deleted', { id });
    audit.log('personel.delete', { by: req.user || null, id });
    return sendSuccess(res, { id });
  } catch (err) {
    return sendError(res, err.message);
  }
}

// Bulk create personel. Accepts array of personel objects in req.body
async function bulkCreate(req, res) {
  try {
    const items = req.body
    if (!Array.isArray(items)) return sendError(res, 'Expect array of personel', 400)

    // validate and sanitize each item
      const errors = []
      const existingNrps = new Set((model.listPersonel() || []).map((p) => String(p.nrp).trim()))
      const seen = new Set()
      const nrpRegex = /^\d{3,10}$/ // NRP: 3-10 digits (adjust as needed)

      const sanitized = items.map((it, idx) => {
        const nrp = it.nrp ? String(it.nrp).trim() : ''
        const nama = it.nama ? String(it.nama).trim() : ''
        const pangkat = it.pangkat ? String(it.pangkat).trim() : ''

        if (!nrp || !nama) {
          errors.push({ index: idx, message: 'nrp and nama are required' })
        } else {
          if (!nrpRegex.test(nrp)) {
            errors.push({ index: idx, message: 'nrp format invalid (expect 3-10 digits)' })
          }
          if (seen.has(nrp)) {
            errors.push({ index: idx, message: 'duplicate nrp in payload' })
          }
          if (existingNrps.has(nrp)) {
            errors.push({ index: idx, message: 'nrp already exists in system' })
          }
        }
        seen.add(nrp)
        return { nrp, nama, pangkat }
      })

      if (errors.length) return sendError(res, { errors }, 400)

      const created = sanitized.map((it) => model.createPersonel(it))
    // emit events per created item
    created.forEach((c) => events.emit('personel.created', c))
      // audit bulk summary
      audit.log('personel.bulk_create', { by: req.user || null, count: created.length, ids: created.map((c) => c.id) })
      return sendSuccess(res, created)
  } catch (err) {
    return sendError(res, err.message)
  }
}

  function getAudit(req, res) {
    try {
      const rows = audit.list();
      return sendSuccess(res, rows);
    } catch (err) {
      return sendError(res, err.message);
    }
  }

  function exportAudit(req, res) {
    try {
      const rows = audit.list();
      // Build CSV with headers: id,when,action,details(json)
      const header = 'id,when,action,details\n'
      const lines = rows.map((r) => {
        const safeDetails = JSON.stringify(r.details).replace(/"/g, '""')
        return `${r.id},"${r.when}","${r.action}","${safeDetails}"`
      })
      const csv = header + lines.join('\n')
      res.setHeader('Content-Type', 'text/csv')
      res.setHeader('Content-Disposition', 'attachment; filename="audit_personel.csv"')
      return res.send(csv)
    } catch (err) {
      return sendError(res, err.message)
    }
  }

module.exports = { create, list, getById, update, remove, bulkCreate, getAudit, exportAudit };
