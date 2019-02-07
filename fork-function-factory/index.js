'use strict';

const os = require('os');
const merge = require('merge');
const poolFactory = require('./pool-factory');
const fakePoolFactory = require('./fake-pool-factory');
const objectValues = require('../utils/index').objectValues;

/**
 * @param {string|Function} source
 * @param {Object} options
 * @param {boolean} options.eval
 * @param {number} options.returnTimeout
 * @param {boolean} options.pool
 * @param {Object} options.poolOptions
 * @param {Object} options.forkOptions
 * @returns {Function}
 */
module.exports = function (source, options) {
    options = merge.recursive({
        eval: false,
        returnTimeout: 60000,
        pool: false,
        poolOptions: {
            min: 1,
            max: os.cpus().length,
            testOnBorrow: true
        },
        forkOptions: {}
    }, options || {});

    source = {
        type: 'init',
        eval: options.eval,
        source: String(source)
    };

    const pool = _function.pool = options.pool ? poolFactory(source, options.poolOptions, options.forkOptions) : fakePoolFactory(source, options.forkOptions);

    function _function() {
        const _arguments = arguments;

        return pool.acquire().then(function (thread) {
            return new Promise(function (resolve, reject) {
                const timeoutId = setTimeout(function () {
                    thread.removeAllListeners();
                    pool.destroy(thread);
                    reject(new Error('Return timeout'));
                }, options.returnTimeout);

                thread.on('error', function (err) {
                    clearTimeout(timeoutId);
                    thread.removeAllListeners();
                    pool.destroy(thread);
                    reject(err);
                });

                thread.on('exit', function () {
                    clearTimeout(timeoutId);
                    thread.removeAllListeners();
                    pool.destroy(thread);
                    reject(new Error('Thread terminated'));
                });

                thread.send({
                    type: 'execute',
                    args: objectValues(_arguments)
                });

                thread.on('message', function (data) {
                    clearTimeout(timeoutId);
                    thread.removeAllListeners();
                    pool.release(thread);
                    data.success ? resolve(data.payload) : reject(data.payload);
                });
            });
        });
    }

    return _function;
};
