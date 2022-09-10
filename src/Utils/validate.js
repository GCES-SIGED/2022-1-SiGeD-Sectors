const { newError, throwAggregateError } = require('./error');

function validateNameDescription(name, description) {
  const errors = [];
  if (!name) {
    errors.push(newError('invalid name'));
  }

  if (!description) {
    errors.push(newError('invalid description'));
  }

  if (errors.length) {
    throwAggregateError(errors, 'ValidationError');
  }

};

module.exports = { validateNameDescription };
