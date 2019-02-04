'use strict';

const path = require('path');
const child_process = require('child_process');
const WORKER_PATH = path.normalize(__dirname + '/worker.js');

/**
 * @param {Object} source
 * @param {Object} threadOptions
 * @returns {Object}
 */
module.exports = function (source, threadOptions) {
    return {
        acquire() {
            const thread = child_process.fork(WORKER_PATH, threadOptions);
            thread.send(source);
            return Promise.resolve(thread);
        },

        release(thread) {
            this.destroy(thread);
        },

        destroy(thread) {
            thread.kill();
        }
    };
};
