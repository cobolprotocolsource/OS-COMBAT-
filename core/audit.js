// core/audit.js
// File-backed audit logger for development. Writes to `data/audit.json` and keeps an in-memory copy.

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const FILE_PATH = path.join(DATA_DIR, 'audit.json');

// ensure data directory exists
try {
  fs.mkdirSync(DATA_DIR, { recursive: true });
} catch (e) {
  // ignore
}

let logs = [];

// load existing logs if any
try {
  if (fs.existsSync(FILE_PATH)) {
    const raw = fs.readFileSync(FILE_PATH, 'utf8');
    logs = JSON.parse(raw || '[]');
  }
} catch (e) {
  // if parse fails, start fresh but keep running
  logs = [];
}

function persist() {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(logs, null, 2), 'utf8');
  } catch (e) {
    // best-effort: do not crash application on audit write failure
    // eslint-disable-next-line no-console
    console.error('Failed to persist audit log', e);
  }
}

function log(action, details = {}) {
  const entry = { id: Date.now() + Math.random().toString(36).slice(2), action, details, when: new Date().toISOString() };
  logs.push(entry);
  persist();
  return entry;
}

function list() {
  return logs.slice().reverse();
}

function clear() {
  logs.length = 0;
  persist();
}

module.exports = { log, list, clear };
