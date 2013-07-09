var Transform = require('stream').Transform || require('readable-stream').Transform

module.exports = tsr

var buf = new Buffer(5)
var capture = false
var j = 0
function tsr () {
  var stream = new Transform()

  stream._transform = function (chunk, enc, cb) {
    var res = null
    var i = 0, seenT

    // search for 't=', slice out temp
    for (i; i < chunk.length; i++) {
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
        //res = chunk.slice(i + 1, i + 6)
      else
        seenT = false
    }

    cb()
  }

  return stream
}