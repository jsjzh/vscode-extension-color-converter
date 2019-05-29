/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-05-27 15:48:38
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-05-29 10:21:40
 * @Description: 工具函数集
 */
const RGB_MAX = 255
const HUE_MAX = 360
const SV_MAX = 100
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
 * 去除空格
 * @param {String} str
 */
function removeSpace(str) {
  return str.replace(' ', '')
}

/**
 * 获取 xxx(a,b,c,d,e,...) 中 abcde... 的值
 * @param {String} str
 */
function transBracketColor(str) {
  return str
    .replace(/([rgbahsl()%])+?/g, '')
    .split(',')
    .map(num => +num)
}

/**
 * 输入 hex 转换为 rgb，将所有的输入都统一成 #xxxxxxxx
 * @param {String} str #xxx #xxxxxx #xxxxxxxx
 */
function hex2rgb(str) {
  let reg = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
  str = str.charAt(0) === '#' ? str.slice(1) : str
  if (str.length === 3) {
    let _r = str.charAt(0)
    let _g = str.charAt(1)
    let _b = str.charAt(2)
    str = _r + _r + _g + _g + _b + _b
  }
  if (str.length === 6) {
    str = str + 'ff'
  }
  let result = reg.exec(str)

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: parseInt(result[4], 16) / 255
  }
}

/**
 * hsl 转 rgb，同样的，所有的输出都有 a（透明度），在输出的时候处理 a
 * @param {Number} h [0,360]
 * @param {Number} s [0,100]
 * @param {Number} l [0,100]
 * @param {Number} a [0,1]
 */
function hsl2rgb(h, s, l, a = 1) {
  let r, g, b

  h = h === HUE_MAX ? 1 : (h % HUE_MAX) / parseFloat(HUE_MAX)
  s = s === SV_MAX ? 1 : (s % SV_MAX) / parseFloat(SV_MAX)
  l = l === SV_MAX ? 1 : (l % SV_MAX) / parseFloat(SV_MAX)

  if (s === 0) {
    r = g = b = l
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s
    let p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return { r: r * RGB_MAX, g: g * RGB_MAX, b: b * RGB_MAX, a }
}

/**
 * rgb 转 hex，还是老样子，全部转为完整的格式，即使透明度是 1
 * @param {Number} r [0,255]
 * @param {Number} g [0,255]
 * @param {Number} b [0,255]
 * @param {Number} a [0,1]
 */
function rgb2hex(r, g, b, a = 1) {
  r = Math.round(r).toString(16)
  g = Math.round(g).toString(16)
  b = Math.round(b).toString(16)
  a = Math.round(a * 255).toString(16)

  r = r.length === 1 ? '0' + r : r
  g = g.length === 1 ? '0' + g : g
  b = b.length === 1 ? '0' + b : b
  a = a.length === 1 ? '0' + a : a

  return '#' + r + g + b + a
}

/**
 * rgb 转 hsl，全部转为完整的格式，即使透明度为 1
 * @param {Number} r [0,255]
 * @param {Number} g [0,255]
 * @param {Number} b [0,255]
 * @param {Number} a [0,1]
 */
function rgb2hsl(r, g, b, a = 1) {
  r = r === RGB_MAX ? 1 : (r % RGB_MAX) / parseFloat(RGB_MAX)
  g = g === RGB_MAX ? 1 : (g % RGB_MAX) / parseFloat(RGB_MAX)
  b = b === RGB_MAX ? 1 : (b % RGB_MAX) / parseFloat(RGB_MAX)

  let max = Math.max(r, g, b)
  let min = Math.min(r, g, b)
  let h,
    s,
    l = (max + min) / 2

  if (max === min) {
    h = s = 0
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

  return { h: h * HUE_MAX, s: s * SV_MAX, l: l * SV_MAX, a }
}

function rgb2rgb(r, g, b, a = 1) {
  return { r, g, b, a }
}

/**
 * 格式化 rgb，若 a === 1，返回 rgb，否则都返回 rgba
 * @param {Number} r [0,255]
 * @param {Number} g [0,255]
 * @param {Number} b [0,255]
 * @param {Number} a [0,1]
 */
function formatRgb({ r, g, b, a = 1 }) {
  a = +a
  return a === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`
}

/**
 * 格式化 hsl，若 a === 1，返回 hsl，否则都返回 hsla
 * @param {Number} h [0,360]
 * @param {Number} s [0,100]
 * @param {Number} l [0,100]
 * @param {Number} a [0,1]
 */
function formatHsl({ h, s, l, a = 1 }) {
  a = +a
  return a === 1 ? `hsl(${h}, ${s}%, ${l}%)` : `hsl(${h}, ${s}%, ${l}%, ${a})`
}

/**
 * 输入完整的（八位）hex 色值，若透明度为 1，返回六位 hex，若还可精简则返回三位 hex
 * @param {String} hex #xxxxxxxx
 */
function formatHex(hex) {
  hex = hex.toLocaleLowerCase()
  hex = hex.endsWith('ff') ? hex.slice(0, -2) : hex
  if (hex.charAt(1) === hex.charAt(2) && hex.charAt(3) === hex.charAt(4) && hex.charAt(5) === hex.charAt(6)) {
    hex = '#' + hex.charAt(1) + hex.charAt(3) + hex.charAt(5)
  }
  return hex
}

module.exports = {
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
}
