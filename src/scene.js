class Scene{constructor(){}startBuffer(){return{delay:2e3,duration:0,props:{}}}endBuffer(){return{delay:4e3,duration:0,props:{}}}createCollision(e,s,a="rect"){switch(a){case"rect":Game.hits[s]=collideRectCircle(e.x,e.y,e.w,e.h,Game.bug.pos.x,Game.bug.pos.y,Game.bug.radius);break;case"circle":Game.hits[s]=collideCircleCircle(e.x+e.d/2,e.y+e.d/2,e.d,Game.bug.pos.x,Game.bug.pos.y,2*Game.bug.radius)}}startSong(e){Game.song=e,Game.song.playMode("restart"),Game.sound&&(Game.song.loop(),Game.song.setVolume(1))}endSong(){Game.sound&&Game.song.setVolume(0,3)}endScene(e){Game.hits=[],Game.shapes=[],Game.timestamp=millis(),Game.scenes.scene.oScene.reset(),e?Game.scenes.showScene(levels[e]):Game.scenes.showNextScene()}saveProgress(e){localStorage.setItem("trapped_game_progress",e)}}
