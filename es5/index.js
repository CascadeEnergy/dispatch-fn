'use strict';

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodashLangIsUndefined = require('lodash/lang/isUndefined');

var _lodashLangIsUndefined2 = _interopRequireDefault(_lodashLangIsUndefined);

/**
 * Dispatch returns a function which iterates a series of commands
 * looking for one to return something other than undefined.
 *
 * @param commands
 * @returns {Function}
 */
function dispatch() {
  for (var _len = arguments.length, commands = Array(_len), _key = 0; _key < _len; _key++) {
    commands[_key] = arguments[_key];
  }

  return function fn() {
    var result = undefined;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(commands), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var command = _step.value;

        result = command.apply(undefined, arguments);

        if (!(0, _lodashLangIsUndefined2['default'])(result)) {
          break;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return result;
  };
}

exports['default'] = dispatch;
module.exports = exports['default'];