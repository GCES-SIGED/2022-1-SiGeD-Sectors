function newError(name) {
    return new Error(name);
}

function throwAggregateError(errors, message) {
    throw new AggregateError(errors, message);
}

module.exports = { newError, throwAggregateError };
