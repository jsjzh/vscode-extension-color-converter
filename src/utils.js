/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-05-27 15:48:38
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-05-27 16:04:56
 * @Description: 工具函数集
 */

/**
 * #22b1b180
 * #22b1b1
 * #fff
 */
const HexReg = /^\#[A-Fa-f0-9]{3,8}$/
/**
 * rgba(34,177,177,0.5)
 * rgb(34,177,177)
 */
const rgbReg = /^(rgb|rgba){1}\([\d,.]+\)$/
/**
 * hsla(180,68%,41%,0.5)
 * hsl(180,68%,41%)
 */
const hslReg = /^(hsl|hsla){1}\([\d,%.]+\)$/

const testColor = [{ type: 'Hex', reg: HexReg }, { type: 'rgb', reg: rgbReg }, { type: 'hsl', reg: hslReg }]

/**
 * 去除字符串中的空格
 * @param {String} str
 */
function removeSpace(str) {
  return str.split(' ').join('')
}

/**
 * 用于 rgb(xxx,xxx,xxx) 的格式化
 * @param {String} str
 */
function joinSpace(str) {
  return str.split(',') / join(', ')
}

module.exports = {
  testColor,
  removeSpace,
  joinSpace
}
