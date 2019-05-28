/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-05-27 15:48:38
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-05-28 10:44:19
 * @Description: Color 类
 * hex -> rgb -> hsl -> hex
 */

const { testColor, removeSpace, transHexColor, transBracketColor, hsl2Rgb, rgb2hsl, rgb2hex } = require('./utils')

class Color {
  constructor(color) {
    color = removeSpace(color)

    const { type } = testColor.find(regObj => regObj.reg.test(color)) || {}

    this.initColor = color
    this.initType = type

    this._r = 0
    this._g = 0
    this._b = 0
    this._a = 1

    this.init()
  }

  hex2rgb() {
    const [r, g, b, a = 1] = transHexColor(this.initColor)
    this._r = r
    this._g = g
    this._b = b
    this._a = a
    return +a === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`
  }

  rgb2rgb() {
    const [r, g, b, a = 1] = transBracketColor(this.initColor)
    this._r = r
    this._g = g
    this._b = b
    this._a = a
  }

  hsl2rgb() {
    const [h, s, l, a = 1] = transBracketColor(this.initColor)
    const [r, g, b] = hsl2Rgb(h, s, l)
    this._r = r
    this._g = g
    this._b = b
    this._a = a
  }

  rgb2hsl() {
    const { _r: r, _g: g, _b: b, _a: a } = this
    const [h, s, l] = rgb2hsl(r, g, b)
    return +a === 1 ? `hsl(${h}, ${s}, ${l})` : `hsla(${h}, ${s}, ${l}, ${a})`
  }

  rgb2hex() {
    const { _r: r, _g: g, _b: b, _a: a } = this
    return rgb2hex(r, g, b, a)
  }

  init() {
    switch (this.initType) {
      case 'hex':
        this.hex2rgb()
        break
      case 'rgb':
        this.rgb2rgb()
        break
      case 'hsl':
        this.hsl2rgb()
        break
      default:
        console.log('invalid color')
    }
  }

  getColor() {
    switch (this.initType) {
      case 'hex':
        const { _r: r, _g: g, _b: b, _a: a } = this
        return +a === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`
      case 'rgb':
        return this.rgb2hsl()
      case 'hsl':
        return this.rgb2hex()
      default:
        console.log('invalid color')
    }
  }
}

module.exports = Color
