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

/**
 * Creates a debounce decorator to be used with deko
 *
 * @name debounce
 *
 * @param {Object} $0 config
 * @param {Number} $0.wait number of milliseconds for which to postpone executions
 * @param {Boolean} $0.immediate if `true` causes debounce to trigger the function on the
 * leading edge instead of the trailing edge of the wait interval
 * @returns {Object} debounceDecorator to be used with deko
 */
function configureDebounce(config = {}) {
  return Object.assign(
      {}
    , debounceDecorator
    , { config }
  )
}
module.exports = configureDebounce
