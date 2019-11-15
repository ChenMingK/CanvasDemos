function Ball (x, y, radius, color) {
  this.x = x || 0
  this.y = y || 0
  this.radius = radius || 12
  this.color = color || '#6699FF'

  this.scaleX = 1
  this.scaleY = 1
}

Ball.prototype = {
  // 绘制 "描边" 小球
  stroke: function (cxt) {
    cxt.save()
    cxt.scale(this.scaleX, this.scaleY)
    cxt.strokeStyle = this.color
    cxt.beginPath()
    cxt.arc(this.x, this.y, this.radius, 0, 360 * Math.PI / 180, false)
    cxt.closePath()
    cxt.stroke()
    cxt.restore()
  },
  // 绘制 "填充" 小球
  fill: function (cxt) {
    cxt.save()
    cxt.translate(this.x, this.y)
    cxt.rotate(this.rotation)
    cxt.scale(this.scaleX, this.scaleY)
    cxt.fillStyle = this.color
    cxt.beginPath()
    cxt.arc(0, 0, this.radius, 0, 360 * Math.PI / 180, false)
    cxt.closePath()
    cxt.fill()
    cxt.restore()
  }
}