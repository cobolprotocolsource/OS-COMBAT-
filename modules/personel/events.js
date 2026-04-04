// modules/personel/events.js
// Module-level event emitter proxy to core event system.

const coreEvents = require('../../core/eventHandler');

// Re-export core event emitter so module can emit/listen under scoped names
module.exports = coreEvents;
