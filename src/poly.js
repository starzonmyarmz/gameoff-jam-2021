class Poly{constructor(t,i){this.x=t.x,this.y=t.y,this.w=t.w,this.h=t.h,this.shape=t.shape||"rect",this.color=t.color||0,this.alpha=t.alpha||255,this.velocity_x=0,this.velocity_y=0,this.acceleration_x=random(-1,1),this.acceleration_y=random(-1,1),this.q=i||null,this.current=null}draw(){let t=color(this.color);switch(t.setAlpha(this.alpha),fill(t),noStroke(),this.shape){case"rect":rectMode(CORNER),rect(this.x,this.y,this.w,this.h);break;case"ellipse":push(),ellipseMode(CORNER),ellipse(this.x,this.y,this.w,this.h),pop();break;case"triangle":triangle(this.x,this.y+this.h,this.x+this.w/2,this.y,this.x+this.w,this.y+this.h);break;case"triangle_left":triangle(this.x,this.y,this.x,this.y+this.h,this.x+this.w,this.y+this.h);break;case"triangle_right":triangle(this.x+this.w,this.y,this.x+this.w,this.y+this.h,this.x,this.y+this.h)}}update(){if(null==this.current&&this.q.length){this.current=this.q.shift(),this.current.start=millis(),this.current.initial={},this.current.diffs={};for(const t of Object.keys(this.current.props))this.current.initial[t]=this[t],this.current.diffs[t]=this.current.props[t]-this[t]}if(null==this.current)return;let t=millis()-this.current.start;if(t<this.current.delay)return;let i=Math.min(1,(t-this.current.delay)/this.current.duration);for(const[t,s]of Object.entries(this.current.diffs))this[t]=i*s+this.current.initial[t];1===i&&(this.current=null)}}
