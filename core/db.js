// core/db.js
// Simple in-memory DB adapter for early development and integration.
// Replace with real DB (Postgres/Mongo) later.

const { v4: uuidv4 } = require('uuid');

class InMemoryTable {
  constructor() {
    this.rows = new Map();
  }

  create(data) {
    const id = uuidv4();
    const record = { id, ...data, createdAt: new Date().toISOString() };
    this.rows.set(id, record);
    return record;
  }

  findAll() {
    return Array.from(this.rows.values());
  }

  findById(id) {
    return this.rows.get(id) || null;
  }

  update(id, partial) {
    const existing = this.rows.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...partial, updatedAt: new Date().toISOString() };
    this.rows.set(id, updated);
    return updated;
  }

  delete(id) {
    return this.rows.delete(id);
  }
}

// Simple registry so modules can register their own tables
const tables = {};

function registerTable(name) {
  if (!tables[name]) tables[name] = new InMemoryTable();
  return tables[name];
}

function getTable(name) {
  return tables[name];
}

module.exports = { registerTable, getTable };
