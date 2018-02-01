'use strict'

function bindDecorate(target, fnName) {
  const fn = target[fnName]
  target[fnName] = fn.bind(target)
}

const bindDecorator = {
    needsDescriptor: false
  , decorate: bindDecorate
}

const knownDecorators = new Map([
  [ 'bind', bindDecorator ]
])

function getDecoratorDescriptors(descriptors) {
  const keys = Object.keys(descriptors)
  const decs = new Map()
  for (const k of keys) {
    if (!k.startsWith('$$')) continue
    decs.set(k, descriptors[k])
  }
  return decs
}

function getDecorators(decoratorDescriptors) {
  const map = new Map()
  for (const [ k, d ] of decoratorDescriptors) {
    if (typeof d.value !== 'function') continue
    const name = k.slice(2)
    map.set(name, d.value())
  }
  return map
}

function getDescriptor(proto, fnName) {
  return Object.getOwnPropertyDescriptor(proto, fnName)
}

function applyDecorators(decorators, target, fnName) {
  var proto = null
  for (const x of decorators) {
    const decorator = knownDecorators.get(x)
    const fn = decorator.decorate

    if (decorator.needsDescriptor) {
      proto = proto == null ? Object.getPrototypeOf(target) : proto
      fn(target, fnName, getDescriptor(proto, fnName))
    } else {
      fn(target, fnName)
    }
  }
}

class Deko {
  constructor({ clazz }) {
    this._init(clazz)
  }

  _init(clazz) {
    const descriptors = Object.getOwnPropertyDescriptors(clazz)
    const decoratorDescriptors = getDecoratorDescriptors(descriptors)
    this._decorators = getDecorators(decoratorDescriptors)
  }

  decorate(target) {
    for (const [ fnName, decorator ] of this._decorators) {
      applyDecorators(decorator, target, fnName)
    }
  }
}

function createDeko({ clazz }) {
  return new Deko({ clazz })
}

module.exports = createDeko
