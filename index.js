var Transform = require('stream').Transform || require('readable-stream').Transform

module.exports = tsr

function tsr (s) {
  var buf = new Buffer(5)
  var capture = false
  var j = 0
  var stream = new Transform()

  if (s)
    s = new Buffer(s, "utf8")

  stream._transform = function (chunk, enc, cb) {
    var res = null
    var i = 0, seenT

    // search for 't=', slice out temp
    for (; i < chunk.length; i++) {
      if (j === 5)
        stream.push(buf)
      if (capture) {
        buf[j] = chunk[i]
        j++
      }
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