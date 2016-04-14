# dispatch-fn [![Build Status](https://travis-ci.org/CascadeEnergy/dispatch-fn.svg?branch=master)](https://travis-ci.org/CascadeEnergy/dispatch-fn)

> Functional Programming Dispatch

## Install

```
$ npm install --save dispatch-fn
```

## What is Dispatch?

This module provides a way to construct a function which loops through a list of "command" functions, and calls
each with the arguments until one of the commands returns a value other than `undefined`.
The command functions are polymorphic and adhere to the same interface. The point of dispatch
is to simplify delegating to concrete command implementations.

There is also a similar module for performing dispatch operations recursively over structures, like nested objects
or arrays, called [dispatch-recursive](https://github.com/CascadeEnergy/dispatch-recursive).

In addition, we can exploit the contract of dispatch commands to compose a terminating 
function that provides some default behavior by always returning a value or one that always
throws an exception.

This pattern is sometimes also referred to as *Chain of Command*

Implementation of this module was heavily inspired by Chapter 5 of
*Functional Javascript: Introducing Functional Programming with Underscore.js* by Michael Fogus.  
Published by O'reilly Media (2013-06-01)  
[Book Source - Chapter 5](https://github.com/funjs/book-source/blob/master/chapter05.js)

## Usage

This example available in this repo at `example/example.js` shows how you could use dispatch to construct a `rev`
function which works on strings or arrays. Given some arguments, `rev` picks the correct function to call for the type
of argument given.

Much of the support code in this example is also borrowed from
*Functional Javascript: Introducing Functional Programming with Underscore.js* by Michael Fogus.

```javascript
var _ = require('lodash');
var dispatch = require('../es5');

function fail(thing) { throw new Error(thing); }

function existy(x) { return x != null; }

function truthy(x) { return (x !== false) && existy(x); }

function doWhen(cond, action) {
  if(truthy(cond))
    return action();
  else
    return undefined;
}

function invoker (NAME, METHOD) {
  return function(target /* args ... */) {
    if (!existy(target)) fail('Must provide a target');

    var targetMethod = target[NAME];
    var args = _.rest(arguments);

    return doWhen(
      (existy(targetMethod) && METHOD === targetMethod),
      function() {
        return targetMethod.apply(target, args);
      }
    );
  };
}

function stringReverse(s) {
  if (!_.isString(s)) return undefined;
  return s.split('').reverse().join('');
}

console.log(stringReverse('abc'));
//=> "cba"

console.log(stringReverse(1));
//=> undefined

var rev = dispatch(
  invoker('reverse', Array.prototype.reverse),
  stringReverse
);

console.log(rev([1,2,3]));
//=> [3, 2, 1]

console.log(rev('abc'));
//=> "cba"
```
