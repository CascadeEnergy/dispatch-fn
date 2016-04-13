var assert = require('assert');
var sinon = require('sinon');
var dispatch = require('./index');

function noop() {}

describe('dispatch-fn', function() {
  it('should return a function which loops commands until one returns', function() {
    var myCmd = sinon.stub().returnsArg(0);
    var uncalledCmd = sinon.spy();
    var fn = dispatch(noop, noop, myCmd, uncalledCmd);
    var result = fn('foo', 'bar');

    assert.equal(result, 'foo');

    assert(myCmd.calledOnce);
    assert.equal(myCmd.args[0].length, 2);
    assert.equal(myCmd.args[0][0], 'foo');
    assert.equal(myCmd.args[0][1], 'bar');

    assert(!uncalledCmd.called);
  });
});
