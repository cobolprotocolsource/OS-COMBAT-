// modules/pos/model.js
// Data access for Pos module using core DB registry.

const { registerTable } = require('../../core/db');

const table = registerTable('pos');

function createPos(payload) {
  return table.create(payload);
}

function listPos() {
  return table.findAll();
}

function getPosById(id) {
  return table.findById(id);
}

function updatePos(id, partial) {
  return table.update(id, partial);
}

function deletePos(id) {
  return table.delete(id);
}

module.exports = { createPos, listPos, getPosById, updatePos, deletePos };
