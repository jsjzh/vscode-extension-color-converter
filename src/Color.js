/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-05-27 15:48:38
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-05-27 17:34:35
 * @Description: Color 类
 */

const { testColor, removeSpace, joinSpace, hex2hsv, rgb2hsv, hsl2hsv, hsv2hex, hsv2rgb, hsv2hsl } = require('./utils')

class Color {
  constructor(color) {
    color = removeSpace(color)
    const { type } = testColor.find(regObj => regObj.reg.test(color)) || {}
    this.initColor = color
    this.initType = type

    this._hue = 0
    this._saturation = 100
    this._value = 100
    this._trans = 1

    this.init()
  }

  init() {}

  transColor(tyoe = 'hex') {
    return this.color
  }
  getColor(tyoe = 'hex') {
    return joinSpace(this.transColor(tyoe))
  }
}

module.exports = Color
