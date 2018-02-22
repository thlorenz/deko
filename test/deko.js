'use strict'

const test = require('tape')
const deko = require('../')

function noop() {}

function wrapperDecorate(
    target
  , fnName
  , { before = noop, after = noop } = {}) {
  const fn = target[fnName]

  function wrapperFunction() {
    before()
    fn.apply(this, arguments)
    after()
  }

  target[fnName] = wrapperFunction
}

const wrapperDecorator = {
    needsDescriptor: false
  , decorate: wrapperDecorate
}

function configureWrapperDecorator(config = {}) {
  return Object.assign(
      {}
    , wrapperDecorator
    , { config }
  )
}

var beforeCount = 0
function before() {
  beforeCount++
}

var afterCount = 0
function after() {
  afterCount++
}

class WorldClass {
  constructor() {
    deko(this)
  }

  static $$onclicked() {
    return [
      configureWrapperDecorator({ before })
    , configureWrapperDecorator({ after })
    ]
  } onclicked() { }
}

test('\ngiven a function with two wrapper decorators', function(t) {
  const worldClass = new WorldClass()
  worldClass.onclicked()

  t.equal(beforeCount, 1, 'calls before decorator')
  t.equal(afterCount, 1, 'calls after decorator')
  t.end()
})
