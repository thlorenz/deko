'use strict'

const deko = require('../deko')
const bench = require('nanobench')
const autoBind = require('auto-bind')

class WorldClass {
  bind() {
    this.onclickedBound = this.onclickedBound.bind(this)
  }

  hello() {
    return 'hello world'
  }

  static $$onclickedBound() {
     return [ 'bind' ]
  } onclickedBound(e) {
    this.hello()
  }
}

WorldClass.deko = deko({ clazz: WorldClass })

const ITER = 1E6

function testBind(worldClass) {
  const onclickedBound = worldClass.onclickedBound
  onclickedBound()
}

function manualBinding(b) {
  b.start()
  var worldClass
  for (var i = 0; i < ITER; i++) {
    worldClass = new WorldClass()
    worldClass.bind()
  }
  b.end()
  testBind(worldClass)
}

function decoratedBinding(b) {
  b.start()
  var worldClass
  for (var i = 0; i < ITER; i++) {
    worldClass = new WorldClass()
    WorldClass.deko.decorate(worldClass)
  }
  b.end()
  testBind(worldClass)
}

function autobindingAll(b) {
  b.start()
  var worldClass
  for (var i = 0; i < ITER; i++) {
    worldClass = new WorldClass()
    autoBind(worldClass)
  }
  b.end()
  testBind(worldClass)
}

function autobindingSpecific(b) {
  b.start()
  const opts = [ 'onclickedBound' ]
  var worldClass
  for (var i = 0; i < ITER; i++) {
    worldClass = new WorldClass()
    autoBind(worldClass, opts)
  }
  b.end()
  testBind(worldClass)
}

bench(`manual binding ${ITER} times`, manualBinding)
bench(`deko binding ${ITER} times`, decoratedBinding)
bench(`auto-bind all ${ITER} times`, autobindingAll)
bench(`auto-bind with [ 'onclickedBound' ] opts ${ITER} times`, autobindingSpecific)
