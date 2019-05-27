/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-05-27 15:48:38
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-05-27 16:08:37
 * @Description: Color 类
 */

const { testColor, removeSpace, joinSpace } = require('./utils')

class Color {
  constructor(color) {
    color = removeSpace(color)
    const { type } = testColor.find(regObj => regObj.reg.test(color)) || {}
    this.color = color
    this.initType = type
  }
  transColor(tyoe = 'hex') {
    return this.color
  }
  getColor(tyoe = 'hex') {
    return joinSpace(this.transColor(tyoe))
  }
}

module.exports = Color
