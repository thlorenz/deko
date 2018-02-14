# deko [![build status](https://secure.travis-ci.org/thlorenz/deko.svg?branch=master)](http://travis-ci.org/thlorenz/deko)

Decorators for ES6 classes without transpilation.

```js
const deko = require('deko')
const bind = require('deko-bind')

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

// Yay it's bound!!!
onclicked()
```

## Installation

    npm install deko

## Benchmarks

Comparing manually binding vs. binding with deko vs. binding with
[auto-bind](https://github.com/sindresorhus/auto-bind).

```
# manual binding (this.foo = this.foo.bind(this) 1000000 times
ok ~24 ms (0 s + 23595643 ns)

# deko binding 1000000 times
ok ~145 ms (0 s + 145026498 ns)

# auto-bind all 1000000 times
ok ~719 ms (0 s + 718651445 ns)

# auto-bind with [ 'onclickedBound' ] opts 1000000 times
ok ~1.68 s (1 s + 684526786 ns)

all benchmarks completed
ok ~2.57 s (2 s + 571800372 ns)
```

## [API](https://thlorenz.github.io/deko)


## License

MIT
