class Twitter extends Scene{constructor(){super(),this.reset()}draw(){background(255),this.song_started||(this.startSong(twitter),this.song_started=!0),Game.shapes=this.shapes,Game.shapes.forEach(((s,t)=>{s.update(),s.draw(),this.transition.alpha<5&&this.createCollision(s,t,s.shape)})),this.transition.update(),this.transition.draw(),this.transition.q.length||this.song_stopped||(this.endSong(),this.song_stopped=!0),null!=this.transition.current||this.transition.q.length||(this.saveProgress("HomeMusic"),this.endScene())}reset(){this.song_started=!1,this.song_stopped=!1,this.shapes=[];const s="#1d9bf0";let t=24,e=6e4,o=4e3,a=a=>{this.shapes.push(new Poly({x:-4,y:a-o,d:48,shape:"circle",color:s},[{delay:0,duration:e,props:{y:a}}]),new Poly({x:56,y:a+12-o,w:random(48,144),h:8,color:s},[{delay:0,duration:e,props:{y:a+12}}]),new Poly({x:56,y:a+28-o,w:random(48,144),h:8,color:s},[{delay:0,duration:e,props:{y:a+28}}]),new Poly({x:300,y:a+14-o,w:16,h:4,color:s},[{delay:0,duration:e,props:{y:a+14}}]));let r=round(random(1,5));for(let t=0;t<=r;t++)this.shapes.push(new Poly({x:56,y:a+60+12*t-o,w:t===r?random(48,176):random(248,240),h:4,color:s},[{delay:0,duration:e,props:{y:a+60+12*t}}]));if(t=t+96+12*r,random()>.5){let a=random(125,250);this.shapes.push(new Poly({x:56,y:t-o,w:240,h:a,color:s},[{delay:0,duration:e,props:{y:t}}])),t=t+a+24}};for(let s=0;s<35;s++)a(t);this.shapes.push(new Poly({x:Game.width-56,y:Game.height-56,d:48,shape:"circle",color:s},[{delay:0,duration:0,props:{}}])),this.transition=new Poly({x:0,y:0,w:Game.width,h:Game.height,color:255},[this.startBuffer(),{delay:0,duration:2e3,props:{alpha:0}},{delay:e,duration:2e3,props:{alpha:255}},this.endBuffer()])}}
