/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-05-27 15:48:38
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-05-27 22:49:07
 * @Description: Color 类
 */

// ['hex','rgb','hsl']

const { testColor, removeSpace, joinSpace } = require('./utils')

class Color {
  constructor(color) {
    color = removeSpace(color)
    const { type } = testColor.find(regObj => regObj.reg.test(color)) || {}

    this.initColor = color
    this.initType = type

    this._r = 255
    this._g = 255
    this._b = 255
    this._a = 100

    this.init()
  }

  hex2rgb() {}

  hsl2rgb() {}

  rgb2rgb() {}

  rgb2hex() {}

  rgb2hsl() {}

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
    }
  }

  getColor() {
    switch (this.initType) {
      case 'hex':
        this.hex2rgb()
        break
      case 'rgb':
        this.rgb2hsl()
        break
      case 'hsl':
        this.hsl2rgb().rgb2hex()
        break
    }
  }
}

module.exports = Color
