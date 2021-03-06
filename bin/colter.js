#!/usr/bin/env node

const argv = require('argv')
const opt = require("./options")
const ch = require("chalk")
const chalk_convert = require("./utility/convert")
const mkdot = require("./utility/mkdotfile")
const get_dircolors_settings = require("./utility/get_dircolors_settings")
const convert_JSON = require("./utility/convert_JSON")
const save_settings = require('./utility/save_settings')
const convert_dircolors = require("./utility/convert_dircolors")
const print_dircolors = require("./utility/print_dircolors")

let data = opt.run()

if (data.options.init) {
  mkdot()
  get_dircolors_settings()
  print_dircolors()
  return
}

if (data.targets.length == 0) {
  argv.help()
  return
}

let pattern = data.targets[0]
let color = data.targets[1]

if (data.targets.length == 1) {
  console.log('please color')
  return
} else if (color[0] != '#') {
 color = "#" + color
}

console.log("pattern: " + pattern)
console.log("color: " + color)
// console.log(chalk_convert(ch.hex(pattern).bgHex("#000")))

if (pattern) {
  let set_colors = get_dircolors_settings()
  set_colors = convert_dircolors(set_colors)
  set_colors[pattern] = chalk_convert(ch.hex(color))
  set_colors = convert_JSON(set_colors)
  save_settings(set_colors)
}
