'use strict'

function bindDecorate(target, fnName) {
  const fn = target[fnName]
  target[fnName] = fn.bind(target)
}

const bindDecorator = {
    needsDescriptor: false
  , decorate: bindDecorate
}

module.exports = bindDecorator
