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

function findDecoratables(target, decoratorsMap) {
  const decoratables = new Map()
  const proto = Object.getPrototypeOf(target)
  for (const [ fnName, decorators ] of decoratorsMap) {
    const descriptor = Object.getOwnPropertyDescriptor(proto, fnName)
    decoratables.set(fnName, { target, decorators, descriptor })
  }

  return decoratables
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
    const decoratables = findDecoratables(target, this._decorators)
    for (const [ fnName, x ] of decoratables) {
      const originalFn = x.descriptor.value
      const descriptor = Object.assign(
        {}, x.descriptor, { value: originalFn.bind(target) }
      )
      Object.defineProperty(target, fnName, descriptor)
    }
  }
}

function createDeko({ clazz }) {
  return new Deko({ clazz })
}

module.exports = createDeko
