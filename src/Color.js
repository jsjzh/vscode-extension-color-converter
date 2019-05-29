/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-05-27 15:48:38
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-05-29 10:26:29
 * @Description: Color 类
 * hex -> rgb -> hsl -> hex
 */

const {
  testColor,
  removeSpace,
  transBracketColor,
  hex2rgb,
  rgb2rgb,
  hsl2rgb,
  rgb2hex,
  rgb2hsl,
  formatRgb,
  formatHsl,
  formatHex
} = require('./utils')

const vscode = require('vscode')

const color2rgb = { hex2rgb, rgb2rgb, hsl2rgb }

class Color {
  constructor(color) {
    color = removeSpace(color)

    const { type } = testColor.find(regObj => regObj.reg.test(color)) || {}

    this.initColor = color
    this.initType = type

    this._r = 255
    this._g = 255
    this._b = 255
    this._a = 1
    this.invalid = true

    if (this.initType) {
      this.invalid = false
      this.init()
    }
  }

  init() {
    let color = this.initColor
    switch (this.initType) {
      case 'hex':
        color = [color]
        break
      case 'rgb':
        color = transBracketColor(color)
        break
      case 'hsl':
        color = transBracketColor(color)
        break
    }
    const { r, g, b, a = 1 } = color2rgb[`${this.initType}2rgb`].apply(null, color)
    // 在此处控制 rgba 四个值都为 number
    this._r = +r
    this._g = +g
    this._b = +b
    this._a = +a
  }

  getColor() {
    let { _r: r, _g: g, _b: b, _a: a } = this
    let result
    switch (this.initType) {
      case 'hex':
        result = formatRgb(rgb2rgb(r, g, b, a))
        break
      case 'rgb':
        result = formatHsl(rgb2hsl(r, g, b, a))
        break
      case 'hsl':
        result = formatHex(rgb2hex(r, g, b, a))
        break
    }
    return result
  }
}

module.exports = Color
