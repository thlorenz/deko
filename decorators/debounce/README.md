# deko-debounce [![build status](https://secure.travis-ci.org/thlorenz/deko.svg?branch=master)](http://travis-ci.org/thlorenz/deko)

debounce decorator for [deko](https://github.com/thlorenz/deko).

```js
const deko = require('deko')
const debounce = require('deko-debounce')

class WorldClass {
  constructor() {
    deko(this)
  }

  static $$ontypedDebounced() {
     return [ debounce({ wait: 50 }) ]
  } ontypedDebounced(e) {
    // do stuff here
  }
}

const worldClass = new WorldClass()

for (var i = 0; i < 5; i++) {
  worldClass.ontypedDebounced()
}
// ontypedDebounced only executes one time after 50ms elapsed
```

## Installation

    npm install deko-debounce

## License

MIT
