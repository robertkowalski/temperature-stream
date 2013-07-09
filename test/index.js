// builtins
var assert = require("assert")
var fs = require("fs")

// misc test helper
var mkdir = require("mkdirp")
var rimraf = require("rimraf")

// main module
var tsr = require("../index.js")

// settings
var tempdir = __dirname + "/out"

beforeEach(function (done) {
  rimraf(tempdir, done)
})
afterEach(function (done) {
  rimraf(tempdir, done)
})

describe("module", function () {
  it("returns the temperature", function (done) {
    mkdir(tempdir, function (err) {
      var target = fs.createWriteStream(tempdir + "/temp.txt")
      target.on("close", function () {
        var res = fs.readFileSync(tempdir + "/temp.txt")
        assert.equal(res.toString(), "22750")
        done()
      })

      fs.createReadStream(__dirname + "/fixtures/temp.txt")
        .pipe(tsr())
        .pipe(target)
    })
  })
  it("returns null for other files", function (done) {
    mkdir(tempdir, function (err) {
      var target = fs.createWriteStream(tempdir + "/notemp.txt")
      target.on("close", function () {
        var res = fs.readFileSync(tempdir + "/notemp.txt")
        assert.equal(res.toString(), "")
        done()
      })

      fs.createReadStream(__dirname + "/fixtures/notemp.txt")
        .pipe(tsr())
        .pipe(target)
    })
  })
  it("works strictly just with t=[temperature]", function (done) {
    mkdir(tempdir, function (err) {
      var target = fs.createWriteStream(tempdir + "/weird.txt")
      target.on("close", function () {
        var res = fs.readFileSync(tempdir + "/weird.txt")
        assert.equal(res.toString(), "")
        done()
      })

      fs.createReadStream(__dirname + "/fixtures/weird.txt")
        .pipe(tsr())
        .pipe(target)
    })
  })
})