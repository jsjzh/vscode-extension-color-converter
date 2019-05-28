/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-05-27 15:48:38
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-05-28 17:10:07
 * @Description: Color 类
 * hex -> rgb -> hsl -> hex
 */

const {
  testColor,
  removeSpace,
  transHexColor,
  transBracketColor,
  hex2rgb,
  rgb2rgb,
  hsl2rgb,
  rgb2hex,
  rgb2hsl
} = require('./utils')

const color2rgb = { hex2rgb, rgb2rgb, hsl2rgb }
const rgb2color = { rgb2hex, rgb2rgb, rgb2hsl }

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
    this._r = r
    this._g = g
    this._b = b
    this._a = a
  }

  getColor() {
    let result = rgb2color[`rgb2${this.initColor}`](this._r, this._g, this._b, this._a)
    switch (this.initType) {
      case 'hex':
        result = result
        break
      case 'rgb':
        result = result
        break
      case 'hsl':
        result = result
        break
    }
    return result
  }
}

module.exports = Color
