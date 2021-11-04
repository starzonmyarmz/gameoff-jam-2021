let WIDTH = 360
let HEIGHT = 620

let bug
let title, home, twitter
let hits = []

function preload() {

}

function setup() {
  createCanvas(WIDTH, HEIGHT)

  bug = new Bug(WIDTH / 2, HEIGHT / 2)
  title = new Title()
  home = new Home()
  twitter = new Twitter()
}

function draw() {
  background(0)

  if (!title.complete) {
    title.draw()
  }

  if (title.complete && !home.complete) {
    home.setTimeStart(millis())
    home.draw()
    home.update(millis())

    // home.shapes.forEach((s, i) => {
    //   hits[i] = collideRectCircle(s.pos.x, s.pos.y, s.w, s.h, bug.pos.x, bug.pos.y, bug.radius)
    // })
  }

  if (home.complete && !twitter.complete) {
    twitter.setTimeStart(millis())
    twitter.draw()
    twitter.update(millis())

    // twitter.shapes.forEach((s) => {
    //   hit = collideRectCircle(s.pos.x, s.pos.y, s.w, s.h, bug.pos.x, bug.pos.y, bug.radius)
    // })
  }

  bug.draw()
  bug.update(mouseX, mouseY)
}

function doubleClicked() {
  if (!title.complete) {
    title.complete = true
    bug.reacting = true
  }
}
