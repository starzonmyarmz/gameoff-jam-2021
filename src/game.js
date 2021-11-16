const params = new URLSearchParams(window.location.search)

if (localStorage.getItem('trapped_game_intro') == null) {
  localStorage.setItem('trapped_game_intro', false)
}

if (localStorage.getItem('trapped_game_sound') == null) {
  localStorage.setItem('trapped_game_sound', true)
}

let Game = {
  width: 320,
  height: 480,
  scenes: null,
  permission: false,
  input: params.get('input') === 'mouse' ? 'mouse' : 'touch',
  timestamp: 0,
  hits: [],
  shapes: [],
  skip_intro: localStorage.getItem('trapped_game_intro') === 'true' ? true : false,
  sound: localStorage.getItem('trapped_game_sound') === 'true' ? true : false,
  song: null,
  bug: null,
  over: false,
  godmode: params.get('godmode') ? true : false,
  debug: params.get('debug') ? true : false
}

// Fonts
let roboto_black, roboto_regular

// Sound
let intro, theme, dead, home, messages, latin

const requestAccess = () => {
  DeviceMotionEvent.requestPermission()
    .then(response => {
      if (response == 'granted') {
        Game.permission = true
        document.getElementById('permission').hidden = Game.permission
      } else {
        Game.permission = false
      }
    })
    .catch(console.error)
}

function preload() {
  angleMode(DEGREES)
  soundFormats('mp3')

  // Load fonts
  roboto_black = loadFont('./assets/Roboto-Black.ttf')
  roboto_regular = loadFont('./assets/Roboto-Regular.ttf')

  // Load music
  intro = loadSound('./assets/intro')
  theme = loadSound('./assets/theme')
  dead = loadSound('./assets/dead')
  home = loadSound('./assets/home')
  messages = loadSound('./assets/messages')
  latin = loadSound('./assets/latin')

  // Load image
  fly = loadImage('./assets/fly.gif')

  if (!Game.skip_intro) {
    // intro_vid = createVideo('assets/intro.mp4', 'assets/intro.webm')
    // document.querySelector('video').playsInline = true
    // intro_vid.hide()
  }
}

function setup() {
  if (Game.debug) {
    document.querySelector('html').classList.add('debug')
    document.body.insertAdjacentHTML('afterBegin', '<div id="debug"></div>')
    document.getElementById('debug')
  }

  // Check for DeviceMotionEvent and Permissions
  if (typeof(DeviceMotionEvent) !== 'undefined' && typeof(DeviceMotionEvent.requestPermission) === 'function' ) {
    DeviceMotionEvent.requestPermission()
      .catch((error) => {
        document.getElementById('permission').hidden = false
        let button = document.getElementById('request')
        button.addEventListener('click', requestAccess)
        throw error
      })
      .then(() => {
        Game.permission = true
        document.getElementById('permission').hidden = Game.permission
      })
  } else {
    Game.permission = true
  }

  // Add scenes to p5.sceneManager
  Game.scenes = new SceneManager()
  Game.scenes.addScene(Intro)
  Game.scenes.addScene(Title)
  Game.scenes.addScene(Maps)
  Game.scenes.addScene(Home)
  Game.scenes.addScene(Messages)
  Game.scenes.addScene(Insta)


  // Start this party
  createCanvas(Game.width, Game.height)
  Game.bug = new Bug(Game.width / 2, Game.height / 2)
  Game.scenes.showScene(Intro)
}

function draw() {
  if (!Game.permission) return

  // Handle Device rotation inputs
  if (Game.input === 'touch') {
    rX = (rotationY * 7.5 * -1) + (width / 2)
    rY = (rotationX * 15 * -1) + (height / 2)
    Game.bug.update(
      constrain(rX, 0, Game.width),
      constrain(rY, 0, Game.height)
    )
  }

  // Handle mouse inputs
  if (Game.input === 'mouse') {
    Game.bug.update(
      constrain(mouseX, 0, Game.width),
      constrain(mouseY, 0, Game.height)
    )
  }

  // If there's collision…
  if (!Game.godmode) {
    Game.hits.forEach((hit) => {
      if (Game.over) return

      if (hit) {
        Game.timestamp = millis()
        Game.over = true

        if (Game.sound) {
          Game.song.stop()
          Game.song = dead
          Game.song.setVolume(1)
          Game.song.play()
        }
      }
    })
  }

  // …then the game is over
  if (Game.over) {
    Game.shapes.forEach((shape) => {
      shape.q = []
      shape.velocity_x += shape.acceleration_x
      shape.velocity_y += shape.acceleration_y
      shape.x += shape.velocity_x
      shape.y += shape.velocity_y
    })

    // Back to home screen after a short delay
    if (millis() - Game.timestamp > 2000) {
      Game.hits = []
      Game.shapes = []
      Game.over = false
      Game.timestamp = millis()
      Game.scenes.scene.oScene.reset()
      Game.scenes.showScene(Title)
    }
  }

  // Draw all the things
  Game.scenes.draw()
  Game.bug.draw()

  if (Game.debug) {
    document.getElementById('debug').innerHTML = `
      Frames: ${int(frameRate())} <br>
      ${Game.input === 'touch' ? 'Rotation: ' + int(rX) + ', ' + int(rY) : ''}
      ${Game.input === 'mouse' ? 'Mouse: ' + int(mouseX) + ', ' + int(mouseY) : ''} <br>
      Shapes: ${Game.shapes.length}
    `
  }
}

function touchStarted() {
  Game.scenes.handleEvent('touchStarted')
}

function touchMoved() {
  Game.scenes.handleEvent('touchMoved')
}

function touchEnded() {
  Game.scenes.handleEvent('touchEnded')
}
