/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-05-27 15:48:38
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-05-28 11:39:05
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
const rgbReg = /^(rgb|rgba){1}\([\d,. ]+\)$/
/**
 * hsla(180,68%,41%,0.5)
 * hsl(180,68%,41%)
 */
const hslReg = /^(hsl|hsla){1}\([\d,%. ]+\)$/

const testColor = [{ type: 'hex', reg: HexReg }, { type: 'rgb', reg: rgbReg }, { type: 'hsl', reg: hslReg }]

/**
 * 去除字符串中的空格
 * @param {String} str
 */
function removeSpace(str) {
  return str.split(' ').join('')
}

/**
 * 用于 xxx(xxx,xxx,xxx) 的格式化
 * @param {String} str
 */
function joinSpace(str) {
  return str.split(',').join(', ')
}

/**
 * 获取 #xxx or #xxxxxx or #xxxxxxxx 的 16 进制转 10 进制的值
 * @param {String} str
 */
function transHexColor(str) {
  str = str.slice(1)
  if (str.length === 3) str = str[0] + str[0] + str[1] + str[1] + str[2] + str[2]
  if (str.length === 6) str = str + 'ff'
  return str
    .replace(/.{2}/g, g => `${g},`)
    .split(',')
    .filter(c => c)
    .map((c, i) => (i === 3 ? convertHexToDecimal(c) : hex2dec(c)))
}

/**
 * 获取 xxx(a,b,c,d,e,...) 中 abcde... 的值
 * @param {String} str
 */
function transBracketColor(str) {
  return str.replace(/([rgbahsl()])+?/g, '').split(',')
}

function hsl2Rgb(h, s, l) {
  let r, g, b

  h = bound01(h, 360)
  s = bound01(s, 100)
  l = bound01(l, 100)

  function hue2rgb(p, q, t) {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }

  if (s === 0) r = g = b = l
  else {
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s
    let p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return [r * 255, g * 255, b * 255]
}

function isOnePointZero(n) {
  return typeof n == 'string' && n.indexOf('.') != -1 && parseFloat(n) === 1
}

function rgb2hsl(r, g, b) {
  r = bound01(r, 255)
  g = bound01(g, 255)
  b = bound01(b, 255)

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  let h,
    s,
    l = (max + min) / 2

  if (max == min) {
    h = s = 0 // achromatic
  } else {
    let d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
  }

  return [h * 360, s * 100 + '%', l * 100 + '%']
}

function pad2(c) {
  return c.length == 1 ? '0' + c : '' + c
}

function rgb2hex(r, g, b, a) {
  let hex = [pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16))]

  // Return a 3 character hex if possible
  if (
    a &&
    hex[0].charAt(0) == hex[0].charAt(1) &&
    hex[1].charAt(0) == hex[1].charAt(1) &&
    hex[2].charAt(0) == hex[2].charAt(1)
  ) {
    return '#' + hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0)
  }

  return '#' + hex.join('')
}

function isPercentage(n) {
  return typeof n === 'string' && n.indexOf('%') != -1
}

function bound01(n, max) {
  if (isOnePointZero(n)) n = '100%'

  let processPercent = isPercentage(n)
  n = Math.min(max, Math.max(0, parseFloat(n)))

  // Automatically convert percentage into number
  if (processPercent) {
    n = parseInt(n * max, 10) / 100
  }

  // Handle floating point rounding errors
  if (Math.abs(n - max) < 0.000001) {
    return 1
  }

  // Convert into [0, 1] range if it isn't already
  return (n % max) / parseFloat(max)
}

function convertHexToDecimal(h) {
  return (hex2dec(h) / 255).toFixed(2)
}

function hex2dec(val) {
  return parseInt(val, 16)
}

module.exports = {
  testColor,
  removeSpace,
  joinSpace,
  bound01,
  transHexColor,
  transBracketColor,
  rgb2hsl,
  rgb2hex,
  hsl2Rgb
}
