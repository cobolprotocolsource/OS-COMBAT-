// core/util.js
// Small helper utilities used across modules.

function sendSuccess(res, data = {}, meta = {}) {
  return res.json({ ok: true, data, meta });
}

function sendError(res, message = 'error', code = 500) {
  return res.status(code).json({ ok: false, error: message });
}

module.exports = { sendSuccess, sendError };
