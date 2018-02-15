'use strict'

const debounce = require('debounce')

function debounceDecorate(
    target
  , fnName
  , { wait = 100, immediate = false } = {}
) {
  const fn = target[fnName]
  target[fnName] = debounce(fn, wait, immediate)
}

const debounceDecorator = {
    needsDescriptor: false
  , decorate: debounceDecorate
}

function configureDebounce(config = {}) {
  return Object.assign(
      {}
    , debounceDecorator
    , { config }
  )
}
module.exports = configureDebounce
