'use strict';

const compareVersions = require('compare-versions');

if (compareVersions(process.version.match(/[\d\.]+/)[0], '10.5.0') >= 0) {
    exports.workerThreadsFunction = require('./worker-threads-function-factory/index');
} else {
    exports.workerThreadsFunction = require('./stubs/worker-threads-function-factory');
}

exports.forkFunction = require('./fork-function-factory/index');
