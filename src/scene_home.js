class Home extends Scene{constructor(){super(),this.reset()}setup(){Game.sound&&(Game.song=home,Game.song.setVolume(1),Game.song.loop())}draw(){background(255),Game.shapes=this.shapes,Game.shapes.forEach(((e,t)=>{e.update(),e.draw(),this.transition.x>1&&this.createCollision(e,t)})),this.transition.update(),this.transition.draw(),null!=this.transition.current||this.transition.q.length||this.endScene()}reset(){this.shapes=[];const e=Game.width/4,t=Game.height/6,a=[[[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,0,0],[0,0,0,0]],[[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1]],[[1,1,1,1],[1,1,1,1],[1,1,1,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]];for(let s=0;s<a.length;s++)for(let h=0;h<a[s].length;h++)for(let i=0;i<a[s][h].length;i++)1===a[s][h][i]&&this.shapes.push(new Poly({x:Game.width*s+16+e*i,y:t*h+16,w:48,h:48},[{delay:6e3,duration:250,props:{x:16+e*i+Game.width*(s-1)}},{delay:4e3,duration:250,props:{x:16+e*i+Game.width*(s-2)}}]));this.transition=new Poly({x:0,y:0,w:Game.width,h:Game.height,color:255},[{delay:0,duration:2e3,props:{alpha:.01}},{delay:0,duration:0,props:{x:96,y:96,w:48,h:48}},{delay:12e3,duration:1e3,props:{x:0,y:0,w:Game.width,h:Game.height,alpha:255}},{delay:3e3,duration:0,props:{}}])}}
