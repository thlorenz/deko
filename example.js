'use strict'

const deko = require('./deko')
const bind = require('./decorators/bind')

class WorldClass {
  constructor() {
    deko(this)
  }

  hello() {
    return 'hello world'
  }

  static $$onclicked() {
     return [ bind ]
  } onclicked(e) {
    console.log(this.hello())
  }
}

const worldClass = new WorldClass()
const onclicked = worldClass.onclicked
onclicked()
