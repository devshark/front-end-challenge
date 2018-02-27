const EventEmitter = require('events').EventEmitter
const inherits = require('util').inherits

function Promise (executor) {
  var resolve = (value) => { this.emit('resolve', value) }
  var reject = (reason) => { this.emit('reject', reason) }

  if (typeof executor === 'function') {
    executor(resolve, reject)
  } else {
    throw new TypeError('Missing executor argument.')
  }
}

inherits(Promise, EventEmitter)

Promise.prototype.then = function (resolveHandler, rejectHandler) {
  var promise = new Promise()

  if (resolveHandler) {
    var resolve = (data) => {
      var result = resolveHandler(data)
      promise.emit('resolve', result)
    }
    this.on('resolve', resolve)
  }

  if (rejectHandler) {
    var reject = (data) => {
      var result = rejectHandler(data)
      promise.emit('reject', result)
    }
    this.on('reject', reject)
  } else {
    this.on('reject', (data) => { promise.emit('reject', data) })
  }

  return promise
}

Promise.prototype.catch = function (callback) {
  this.on('reject', callback)
}

module.exports = Promise
