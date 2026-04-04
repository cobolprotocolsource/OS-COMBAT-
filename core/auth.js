// core/auth.js
// Placeholder auth middleware. Integrate with real auth (OIDC, SSO) later.

function requireAuth(req, res, next) {
  // For now allow all — add real checks later.
  // Inline note: set req.user after verifying token/session.
  req.user = { id: 'system', role: 'admin' };
  next();
}

module.exports = { requireAuth };
