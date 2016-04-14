/**
 * Dispatch returns a function which iterates a series of commands
 * looking for one to return something other than undefined.
 *
 * @param commands
 * @returns {Function}
 */
function dispatch() {
  var commands = [].slice.call(arguments);

  return function fn() {
    var args = [].slice.call(arguments);
    var result;

    for (var i = 0; i < commands.length; i++) {
      result = commands[i].apply(undefined, args);

      if (result !== undefined) {
        break;
      }
    }

    return result;
  };
}

module.exports = dispatch;
