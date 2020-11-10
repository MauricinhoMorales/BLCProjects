const boom = require('boom');
const { errorHandler } = require('./errorHandlers');

function validate(data, schema) {
  const { error } = schema.validate(data);
  return error;
}

function validationHandler(schema, check = 'body', req, res, fn) {
  const error =
    req[check].id || req[check]._id
      ? validate(req[check].id || req[check]._id, schema)
      : validate(req[check], schema);
  error ? errorHandler(boom.badRequest(error), req, res) : fn(req, res);
}

module.exports = {
  validationHandler,
};
