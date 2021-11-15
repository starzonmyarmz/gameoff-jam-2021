class Title extends Scene {
  constructor() {
    super()
    this.reset()
  }

  draw() {
    background(255)

    if (!this.song_started) {
      this.startSong(theme)
      this.song_started = true
    }

    fill(0)
    textSize(48)
    textAlign(CENTER, TOP)
    textFont(roboto_black)
    text('Trapped', Game.width / 2, Game.height / 4 - 16)

    textSize(12)
    textAlign(LEFT, TOP)
    textFont(roboto_regular)
    text('Settings', 12, 12)

    textAlign(CENTER, BOTTOM)
    text('Swipe to play', Game.width / 2, Game.height - 16)

    rectMode(CENTER)
    rect(Game.width / 2, Game.height - 64, 200, 48)

    fill(255)
    rect(this.slider_current_x, Game.height - 64, 36, 36)

    if (this.slider_rewinding) {
      this.slider_current_x -= 4
      if (this.slider_current_x <= this.slider_start_x) {
        this.slider_current_x = this.slider_start_x
        this.slider_rewinding = false
      }
    }

    Game.bug.hidden = false

    this.transition_in.update()
    this.transition_in.draw()

    if (this.lets_play) {
      this.transition_out.update()
      this.transition_out.draw()
    }

    if (!this.transition_out.q.length && !this.song_stopped) {
      this.endSong()
      this.song_stopped = true
    }

    if (this.transition_out.current == null && !this.transition_out.q.length) {
      this.endScene()
    }
  }

  mouseClicked() {
    if (mouseX < 134 && mouseY < 72) {
      document.getElementById('settings').hidden = false
    }
  }

  touchStarted() {
    if (mouseY > Game.height - 84) {
      this.touching = true
    }
  }

  touchMoved() {
    if (!this.touching) return

    this.slider_current_x = constrain(mouseX, this.slider_start_x, this.slider_start_x + 152)
    if (this.slider_current_x >= this.slider_start_x + 152) {
      this.lets_play = true
    }
  }

  touchEnded() {
    this.touching = false
    if (this.slider_current_x < this.slider_start_x + 152) {
      this.slider_rewinding = true
    }
  }

  reset() {
    this.song_started = false
    this.song_stopped = false
    this.slider_start_x = Game.width / 2 - 76
    this.slider_current_x = Game.width / 2 - 76
    this.slider_rewinding = false
    this.lets_play = false
    this.touching = false

    this.transition_in = new Poly(
      { x: 0, y: 0, w: Game.width, h: Game.height, color: 255 },
      [
        this.startBuffer(),
        { delay:0,  duration: 2000, props: { alpha: 0 }}
      ]
    )

    this.transition_out = new Poly(
      { x: 0, y: 0, w: Game.width, h: Game.height, color: 255, alpha: 0.01 },
      [
        { delay: 0, duration: 2000, props: { alpha: 255 }},
        this.endBuffer()
      ]
    )
  }
}
