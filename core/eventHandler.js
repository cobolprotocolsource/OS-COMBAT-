// core/eventHandler.js
// Lightweight event emitter wrapper for module integration.

const EventEmitter = require('events');

class CoreEventHandler extends EventEmitter {}

const coreEvents = new CoreEventHandler();

module.exports = coreEvents;
