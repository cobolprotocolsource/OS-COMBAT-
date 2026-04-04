// modules/pos/routes.js
// Express router exposing CRUD endpoints for pos.

const express = require('express');
const router = express.Router();
const ctrl = require('./controller');
const { requireAuth } = require('../../core/auth');

router.use(requireAuth);

router.post('/', ctrl.create);
router.get('/', ctrl.list);
router.get('/:id', ctrl.getById);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
