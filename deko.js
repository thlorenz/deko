'use strict'

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
    const decorator = x
    const fn = decorator.decorate

    if (decorator.needsDescriptor) {
      proto = proto == null ? Object.getPrototypeOf(target) : proto
      fn(target, fnName, getDescriptor(proto, fnName))
    } else {
      fn(target, fnName)
    }
  }
}

const cache = new Map()

class Deko {
  constructor(self) {
    const clazz = self.constructor
    this._init(clazz)
    this._decorate(self)
  }

  _init(clazz) {
    if (cache.has(clazz)) {
      this._decorators = cache.get(clazz)
      return
    }

    const descriptors = Object.getOwnPropertyDescriptors(clazz)
    const decoratorDescriptors = getDecoratorDescriptors(descriptors)
    this._decorators = getDecorators(decoratorDescriptors)

    cache.set(clazz, this._decorators)
  }

  _decorate(target) {
    for (const [ fnName, decorator ] of this._decorators) {
      applyDecorators(decorator, target, fnName)
    }
  }
}

function createDeko(self) {
  return new Deko(self)
}

module.exports = createDeko
