document.addEventListener("DOMContentLoaded",(()=>{document.querySelector("[data-sound]").classList.toggle("active",Game.sound),document.querySelector("[data-back]").addEventListener("click",(()=>{document.getElementById("settings").hidden=!0})),document.querySelector("[data-sound]").addEventListener("click",(()=>{Game.sound?Game.song.pause():Game.song.loop(),Game.sound=!Game.sound,localStorage.setItem("trapped_game_sound",Game.sound),document.querySelector("[data-sound]").classList.toggle("active",Game.sound)})),document.querySelector("[data-intro]").addEventListener("click",(()=>{Game.skip_intro=!1,localStorage.setItem("trapped_game_intro",Game.skip_intro),location.reload()})),document.querySelector("[data-progress]").addEventListener("click",(({target:e})=>{localStorage.removeItem("trapped_game_progress"),e.innerText="Progress reset!"})),navigator.canShare&&(document.querySelector("[data-share]").hidden=!1,document.querySelector("[data-share]").addEventListener("click",(async()=>{await navigator.share({title:document.querySelector("title"),text:"play our game",url:"https://iamdanielmarino.com"})})))}));
