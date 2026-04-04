// modules/personel/model.js
// Data access for Personel module using core DB registry.

const { getTable, registerTable } = require('../../core/db');

// Ensure personel table exists and expose CRUD operations
const table = registerTable('personel');

function createPersonel(payload) {
  // Basic validation should be here (added later)
  return table.create(payload);
}

function listPersonel() {
  return table.findAll();
}

function getPersonelById(id) {
  return table.findById(id);
}

function updatePersonel(id, partial) {
  return table.update(id, partial);
}

function deletePersonel(id) {
  return table.delete(id);
}

module.exports = {
  createPersonel,
  listPersonel,
  getPersonelById,
  updatePersonel,
  deletePersonel
};
