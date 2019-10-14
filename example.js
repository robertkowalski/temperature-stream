'use strict'

const path = require("path")
const fs = require("fs")

const tsr = require(".")

const rootDir = "/sys/bus/w1/devices/"

const files = fs.readdirSync(rootDir)
const dir = files.filter((el) => {
  return /^28/.test(el)
})[0]

fs.createReadStream(`/sys/bus/w1/devices/${dir}/w1_slave`)
  .pipe(tsr())
  .pipe(process.stdout)
