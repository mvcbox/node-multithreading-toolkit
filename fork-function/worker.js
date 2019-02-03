'use strict';

var ___threadFunction;

process.on('message', function (data) {
    if ('init' === data.type) {
        return ___threadFunction = data.eval ? srcToFunction(data.source) : require(data.source);
    }

    if ('execute' === data.type) {
        try {
            var result = ___threadFunction.apply(undefined, data.args);

            if (result && typeof result.then === 'function' && typeof result.catch === 'function') {
                return result.then(sendResult).catch(sendError);
            }

            sendResult(result);
        } catch (e) {
            sendError(e);
        }
    }
});

function srcToFunction(source) {
    var _function;
    eval('_function = ' + source);
    return _function;
}

function sendError(err) {
    process.send({
        success: false,
        payload: {
            message: err && err.message,
            name: err && err.name || undefined,
            stack: err && err.stack || undefined
        }
    });
}

function sendResult(payload) {
    process.send({
        success: true,
        payload
    });
}
