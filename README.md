# deko [![build status](https://secure.travis-ci.org/thlorenz/deko.svg?branch=master)](http://travis-ci.org/thlorenz/deko)

Decorators for ES6 classes without transpilation.

```js
const deko = require('deko')

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

// Yay it's bound!!!
onclicked()
```

## Status

Nix, Nada, Nichevo, Nothing --> go away!

## Installation

    npm install deko

## [API](https://thlorenz.github.io/deko)


## License

MIT
