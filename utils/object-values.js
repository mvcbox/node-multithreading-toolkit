'use strict';

/**
 * @param {Object|Array} object
 * @returns {Array}
 */
module.exports = function (object) {
    const result = [];

    for (let value of object) {
        result.push(value);
    }

    return result;
};
