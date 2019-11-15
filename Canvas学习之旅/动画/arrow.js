function Arrow (x, y, color, angle) {
  this.x = x || 0 // 箭头中心 x 坐标，默认值为 0
  this.y = y || 0 // 箭头中心 y 坐标，默认值为 0
  this.color = color || '#FF0099' // 颜色
  this.angle = angle || 0
}

Arrow.prototype = {
  stroke: function (cxt) {
    cxt.save()
    cxt.translate(this.x, this.y)
    cxt.rotate(this.angle)
    cxt.strokeStyle = this.color
    cxt.beginPath()
    cxt.moveTo(-20, -10)
    cxt.lineTo(0, -10)
    cxt.lineTo(0, -20)
    cxt.lineTo(20, 0)
    cxt.lineTo(0, 20)
    cxt.lineTo(0, 10)
    cxt.lineTo(-20, 10)
    cxt.closePath()
    cxt.stroke()
    cxt.restore()
  },
  fill: function (cxt) {
    cxt.save()
    cxt.translate(this.x, this.y)
    cxt.rotate(this.angle)
    cxt.fillStyle = this.color
    cxt.beginPath()
    cxt.moveTo(-20, -10)
    cxt.lineTo(0, -10)
    cxt.lineTo(0, -20)
    cxt.lineTo(20, 0)
    cxt.lineTo(0, 20)
    cxt.lineTo(0, 10)
    cxt.lineTo(-20, 10)
    cxt.closePath()
    cxt.fill()
    cxt.restore()
  }
}