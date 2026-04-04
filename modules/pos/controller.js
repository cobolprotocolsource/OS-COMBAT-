// modules/pos/controller.js
// Business logic for Pos module (CRUD + events).

const model = require('./model');
const events = require('./events');
const { sendSuccess, sendError } = require('../../core/util');
const audit = require('../../core/audit');
const { validatePos, sanitizePos } = require('./validators');

async function create(req, res) {
  try {
    const sanitized = sanitizePos(req.body);
    const validation = validatePos(sanitized);

    if (!validation.isValid) {
      return sendError(res, { errors: validation.errors }, 400);
    }

    const created = await model.createPos(sanitized);
    events.emit('pos.created', created);
    await audit.log('pos.create', { by: req.user || null, id: created.id, payload: sanitized });
    return sendSuccess(res, created);
  } catch (err) {
    return sendError(res, err.message);
  }
}

async function list(req, res) {
  try {
    const rows = await model.listPos();
    return sendSuccess(res, rows);
  } catch (err) {
    return sendError(res, err.message);
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const rec = await model.getPosById(id);
    if (!rec) return sendError(res, 'Not found', 404);
    return sendSuccess(res, rec);
  } catch (err) {
    return sendError(res, err.message);
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const updated = await model.updatePos(id, req.body);
    if (!updated) return sendError(res, 'Not found', 404);
    events.emit('pos.updated', updated);
    await audit.log('pos.update', { by: req.user || null, id, payload: req.body });
    return sendSuccess(res, updated);
  } catch (err) {
    return sendError(res, err.message);
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const ok = await model.deletePos(id);
    if (!ok) return sendError(res, 'Not found', 404);
    events.emit('pos.deleted', { id });
    await audit.log('pos.delete', { by: req.user || null, id });
    return sendSuccess(res, { id });
  } catch (err) {
    return sendError(res, err.message);
  }
}

module.exports = { create, list, getById, update, remove };
