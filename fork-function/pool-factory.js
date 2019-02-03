'use strict';

const path = require('path');
const child_process = require('child_process');
const createPool = require('generic-pool').createPool;
const WORKER_PATH = path.normalize(__dirname + '/worker.js');

/**
 * @param {Object} source
 * @param {Object} options
 * @param {Object} threadOptions
 * @returns {*}
 */
module.exports = function (source ,options, threadOptions) {
    return createPool({
        create() {
            const thread = child_process.fork(WORKER_PATH, threadOptions);
            thread.send(source);
            return thread;
        },

        destroy(thread) {
            thread.kill();
        },

        validate(thread) {
            return thread.connected;
        }
    }, options);
};
