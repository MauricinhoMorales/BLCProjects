const { config } = require('../../config/index');
const boom = require('boom');

function withStack(error, stack) {
  if (config.dev) {
    return { ...error, stack };
  }
  return error;
}

function wrapError(err, req, res, next) {
  if (!err.boom) {
    next(boom.badImplementation(err));
  }
  next(err);
}

function logErrors(error, req, res, next) {
  console.log(error);
  next(error);
}

function errorHandler(err, req, res) {
  const {
    output: { statusCode, payload },
  } = err;
  res.status(statusCode);
  res.json(withStack(payload, err.stack));
}

module.exports = {
  logErrors,
  errorHandler,
  wrapError,
};
