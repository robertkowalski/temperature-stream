'use strict'

var Transform = require('stream').Transform

module.exports = tsr

function tsr (s) {
  var buf = Buffer.allocUnsafe(5)
  var capture = false
  var j = 0
  var stream = new Transform()

  if (s)
    s = new Buffer.from(s, "utf8")

  stream._transform = function (chunk, enc, cb) {
    var res = null
    var i = 0, seenT

    // search for 't=', slice out temp
    for (; i < chunk.length; i++) {
      if (capture) {
        buf[j] = chunk[i]
        j++
      }
      if (j === 5)
        stream.push(buf)
      if (chunk[i] === 116) // t
        seenT = true
      else if (seenT && chunk[i] === 61) // =
        capture = true
      else
        seenT = false
    }

    cb()
  }

  // if we have something to append, add it
  stream._flush = function (cb) {
    if (s)
      stream.push(s)

    cb()
  }

  return stream
}
