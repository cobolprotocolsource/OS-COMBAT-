// modules/personel/routes.js
// Express router exposing CRUD endpoints for personel.

const express = require('express');
const router = express.Router();
const ctrl = require('./controller');
const { requireAuth } = require('../../core/auth');

// All endpoints protected by placeholder auth middleware for now
router.use(requireAuth);

// Audit logs
router.get('/audit', ctrl.getAudit);
router.get('/audit/export', ctrl.exportAudit);

// CRUD
router.post('/', ctrl.create);
router.post('/bulk', ctrl.bulkCreate);
router.get('/', ctrl.list);
router.get('/:id', ctrl.getById);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
