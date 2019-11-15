// 结合 PageX 和 PageY 这两个属性以及 Canvas 画布相对于文档的偏移可以确定鼠标在画布
// 上的相对坐标，但是并不是所有的浏览器都支持这两个属性，所以还需要用到 ClientX 与 ClientY 属性
// tool.js 将获取鼠标位置的代码进行封装以确保浏览器兼容

// 将 tools 定义为 windows 对象的属性，该属性的值是一个对象
window.tools = {}
// 获取鼠标位置
window.tools.getMouse = function (element) {
  // 定义一个 mouse 的对象
  var mouse = { x: 0, y: 0 }
  // 为传入的元素添加 mousemove 事件
  element.addEventListener('mousemove', function (e) {
    var x, y
    // 在 IE 中，event 对象是作为 window 对象的一个属性存在
    var e = e || window.event
    // 获取鼠标当前位置，并做兼容处理
    // 兼容 Firefox、Chrome、IE9 及以上
    if (e.pageX || e.pageY) {
      x = e.pageX
      y = e.pageY
    } else {
      // 兼容 IE8 及以下，以及混杂模式下的 Chrome 和 Safari
      x = e.clientX + document.body.scrollLeft || document.documentElement.scrollLeft
      y = e.clientY + document.body.scrollTop || document.documentElement.scrollTop
    }
    // 将当前的坐标值减去 canvas 元素的偏移位置，则 x、y 为鼠标在 canvas 中的相对坐标
    x -= element.offsetLeft
    y -= element.offsetTop

    mouse.x = x
    mouse.y = y
  })
  return mouse
}


// 获取键盘控制方向
window.tools.getKey = function () {
  var key = {}
  window.addEventListener('keydown', function (e) {
    if (e.keyCode === 38 || e.keyCode === 87) {
      key.direction = 'up'
    } else if (e.keyCode === 39 || e.keyCode === 68) {
      key.direction = 'right'
    } else if (e.keyCode === 40 || e.keyCode === 83) {
      key.direction = 'down'
    } else if (e.keyCode === 37 || e.keyCode === 65) {
      key.direction = 'left'
    } else {
      key.direction = ''
    }
  }, false)
  return key
}

// 随机生成一种颜色
window.tools.getRandomColor = function () {
  return '#' + 

  (function (color) {
    return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
    && (color.length === 6) ? color : arguments.callee(color)
  })('')
}

window.tools.checkRect = function (rectA, rectB) {
  return !(rectA.x + rectA.width < rectB.x ||
           rectB.x + rectB.width < rectA.x ||
           rectA.y + rectA.height < rectB.y ||
           rectB.y + rectB.height < rectA.y)
}


  

let targetX = 任意位置
let targetY = 任意位置
// 动画循环
let vx = (targetX - object.x) * easing
let vy = (targetY - object.y) * easing