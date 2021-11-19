class Bug {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.vel = createVector(0, 0)
    this.acc = createVector(0, 0)
    this.radius = 6
    this.hidden = true
  }

  draw() {
    if (this.hidden) return

    fill(7)
    noStroke()
    ellipseMode(CENTER)
    ellipse(this.pos.x, this.pos.y, this.radius)
  }

  update(x, y) {
    if (!this.hidden) {
      const mouse = createVector(x, y)

      mouse.sub(this.pos)
      mouse.setMag(2)

      this.acc = mouse
    }

    this.vel.add(this.acc)
    this.pos.add(this.vel)

    this.vel.limit(3)
  }
}
