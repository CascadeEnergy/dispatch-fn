import isUndefined from 'lodash/lang/isUndefined';

/**
 * Dispatch returns a function which iterates a series of commands
 * looking for one to return something other than undefined.
 *
 * @param commands
 * @returns {Function}
 */
function dispatch(...commands) {
  return function fn(...args) {
    let result;

    for (let command of commands) {
      result = command(...args);

      if (!isUndefined(result)) {
        break;
      }
    }

    return result;
  };
}

export default dispatch;
