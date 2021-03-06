[![Build Status](https://travis-ci.org/robertkowalski/temperature-stream.png?branch=master)](https://travis-ci.org/robertkowalski/temperature-stream)

# temperature-stream

Temperature from a Raspberry Pi GPIO as a stream.

Supports `DS18B20` sensors.

## Usage

```js
const path = require("path")
const fs = require("fs")

const tsr = require("temperature-stream")

const rootDir = "/sys/bus/w1/devices/"

const files = fs.readdirSync(rootDir)
const dir = files.filter((el) => {
  return /^28/.test(el)
})[0]

fs.createReadStream(`/sys/bus/w1/devices/${dir}/w1_slave`)
  .pipe(tsr())
  .pipe(process.stdout)
```

Adding a semicolon to the end of the resulting data:

```js
var fs = require("fs")
var tsr = require("temperature-stream")

var target = fs.createWriteStream(tempdir + "/temp.txt")
fs.createReadStream("/sys/bus/w1/devices/10-000802824e58/w1-slave")
    .pipe(tsr(";"))
    .pipe(target) // 22750;
```

## Input / Output

Input:
```
6c 01 4b 46 7f ff 04 10 5d : crc=5d YES
6c 01 4b 46 7f ff 04 10 5d t=22750
```

Output:
```
22750
```
