'use strict'

const deko = require('./deko')

class WorldClass {
  constructor() {
    WorldClass.deko.decorate(this)
  }

  hello() {
    return 'hello world'
  }

  static $$onclicked() {
     return [ 'bind' ]
  } onclicked(e) {
    console.log(this.hello())
  }
}

WorldClass.deko = deko({ clazz: WorldClass })

const worldClass = new WorldClass()
const onclicked = worldClass.onclicked
onclicked()
