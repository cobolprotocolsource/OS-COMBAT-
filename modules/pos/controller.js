// modules/pos/controller.js
// Business logic for Pos module (CRUD + events).

const model = require('./model');
const events = require('./events');
const { sendSuccess, sendError } = require('../../core/util');
const audit = require('../../core/audit');

function create(req, res) {
  try {
    const payload = req.body;
    const created = model.createPos(payload);
    events.emit('pos.created', created);
    audit.log('pos.create', { by: req.user || null, id: created.id, payload });
    return sendSuccess(res, created);
  } catch (err) {
    return sendError(res, err.message);
  }
}

function list(req, res) {
  try {
    const rows = model.listPos();
    return sendSuccess(res, rows);
  } catch (err) {
    return sendError(res, err.message);
  }
}

function getById(req, res) {
  try {
    const { id } = req.params;
    const rec = model.getPosById(id);
    if (!rec) return sendError(res, 'Not found', 404);
    return sendSuccess(res, rec);
  } catch (err) {
    return sendError(res, err.message);
  }
}

function update(req, res) {
  try {
    const { id } = req.params;
    const updated = model.updatePos(id, req.body);
    if (!updated) return sendError(res, 'Not found', 404);
    events.emit('pos.updated', updated);
    audit.log('pos.update', { by: req.user || null, id, payload: req.body });
    return sendSuccess(res, updated);
  } catch (err) {
    return sendError(res, err.message);
  }
}

function remove(req, res) {
  try {
    const { id } = req.params;
    const ok = model.deletePos(id);
    if (!ok) return sendError(res, 'Not found', 404);
    events.emit('pos.deleted', { id });
    audit.log('pos.delete', { by: req.user || null, id });
    return sendSuccess(res, { id });
  } catch (err) {
    return sendError(res, err.message);
  }

}

module.exports = { create, list, getById, update, remove };
