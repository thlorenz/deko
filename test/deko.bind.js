'use strict'

const deko = require('../deko')
const test = require('tape')

// Fixtures
class WorldClass {
  constructor() {
    WorldClass.deko.decorate(this)
  }

  hello() {
    return 'hello world'
  }

  static $$onclickedBound() {
     return [ 'bind' ]
  } onclickedBound(e) {
    console.log(this.hello())
  }

  onclicked() {
    console.log(this.hello())
  }
}

WorldClass.deko = deko({ clazz: WorldClass })

// tests
test('\ngiven a class with bind decorated function', function(t) {
  const worldClass = new WorldClass()
  const onclicked = worldClass.onclicked
  const onclickedBound = worldClass.onclickedBound

  t.doesNotThrow(onclickedBound, 'method decorated with bind is bound')
  t.throws(onclicked, 'method not decorated with bind is not bound')

  t.end()
})
