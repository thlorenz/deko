'use strict'

const deko = require('deko')
const test = require('tape')
const debounce = require('../')

// Fixtures
class WorldClass {
  constructor() {
    deko(this)
    this.debouncedDefaultCount = 0
    this.debounced50Count = 0
    this.undebouncedCount = 0
  }

  static $$ontypedDebouncedDefault() {
     return [ debounce() ]
  } ontypedDebouncedDefault(e) {
    this.debouncedDefaultCount++
  }

  static $$ontypedDebounced50() {
     return [ debounce({ wait: 50 }) ]
  } ontypedDebounced50(e) {
    this.debounced50Count++
  }

  ontyped() {
    this.undebouncedCount++
  }
}

test('\ndebounce: calling functions 10 times', function(t) {
  const worldClass = new WorldClass()

  var loopRuns = 0

  function runLoop() {
    for (var i = 0; i < 5; i++) {
      worldClass.ontypedDebouncedDefault()
      worldClass.ontypedDebounced50()
      worldClass.ontyped()
    }
    if (++loopRuns < 2) {
      return setTimeout(runLoop, 50)
    }
    setTimeout(checkResult, 100)
  }

  runLoop()

  function checkResult() {
    t.equal(worldClass.debouncedDefaultCount, 1, 'default debounced executes 1 time within 100 ms')
    t.equal(worldClass.debounced50Count, 2, '50 ms debounced executes 2 time within 100 ms')
    t.equal(worldClass.undebouncedCount, 10, 'undebounced executes 10 times within 100 ms')
    t.end()
  }
})
