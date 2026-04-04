// core/server.js
// Express application glue that mounts module routes and provides shared middleware.

const express = require('express');
const cors = require('cors');
const { registerTable } = require('./db');

// Import module routes dynamically so modules can be added later.
const personelRoutes = require('../modules/personel/routes');
const posRoutes = require('../modules/pos/routes');

const app = express();
app.use(cors());
app.use(express.json());

// Register core tables used by modules
registerTable('personel');
registerTable('pos');

// Mount module routes
app.use('/api/personel', personelRoutes);
app.use('/api/pos', posRoutes);

app.get('/health', (req, res) => res.json({ ok: true, uptime: process.uptime() }));

// Basic error handler
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error('Unhandled error', err);
  res.status(500).json({ ok: false, error: 'Internal Server Error' });
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`OS-COMBAT core running on http://localhost:${port}`));
}

module.exports = app;
