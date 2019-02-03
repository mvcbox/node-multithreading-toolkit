'use strict';

const compareVersions = require('compare-versions');

if (compareVersions(process.version.replace('v', ''), '10.5.0') >= 0) {
    exports.workerThreadsFunction = require('./worker-threads-function/index');
}

