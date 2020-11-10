const boom = require('boom');
const { errorHandler } = require('./errorHandlers');
const jwt = require('jsonwebtoken');

function scopeValidationHandler(allowedScopes, req, res, fn) {
  const decodedToken = jwt.decode(req.headers.authorization);
  if (!decodedToken.user || !decodedToken.scopes) {
    errorHandler(boom.unauthorized('Scopes perdidos'), req, res);
  }

  const hasAccess = allowedScopes
    .map((allowedScope) => decodedToken.scopes.includes(allowedScope))
    .find((allowed) => Boolean(allowed));

  if (hasAccess) {
    fn(req, res);
  } else {
    errorHandler(boom.unauthorized('Permisos insuficientes'), req, res);
  }
}

module.exports = scopeValidationHandler;
