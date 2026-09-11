'use client';
import { useEffect, useRef, useState } from 'react';

type Run = { y:number; velocity:number; obstacles:{x:number;w:number;h:number}[]; elapsed:number; spawn:number; score:number; state:'ready'|'running'|'over'|'paused' };
const fresh=():Run=>({y:0,velocity:0,obstacles:[],elapsed:0,spawn:1.3,score:0,state:'ready'});

export default function LostRunner(){
 const canvas=useRef<HTMLCanvasElement>(null);
 const run=useRef<Run>(fresh());
 const [status,setStatus]=useState<Run['state']>('ready');
 const [score,setScore]=useState(0);
 function jump(){
  const game=run.current;
  if(game.state==='paused')return;
  if(game.state!=='running'){run.current={...fresh(),state:'running',velocity:620};setStatus('running');setScore(0);}
  else if(game.y===0)game.velocity=620;
 }
 function pause(){const game=run.current;if(game.state==='running'){game.state='paused';setStatus('paused');}else if(game.state==='paused'){game.state='running';setStatus('running');}}
 useEffect(()=>{
  const surface=canvas.current!;const ctx=surface.getContext('2d');if(!ctx)return;
  let frame=0,last=0;
  const draw=(time:number)=>{
   const dt=Math.min((time-last)/1000||0,0.035);last=time;
   const width=surface.clientWidth,height=surface.clientHeight,dpr=Math.min(window.devicePixelRatio||1,2);
   if(surface.width!==Math.round(width*dpr)||surface.height!==Math.round(height*dpr)){surface.width=Math.round(width*dpr);surface.height=Math.round(height*dpr);}
   ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,width,height);
   const game=run.current;const scale=width/1000;const floor=height-32;
   if(game.state==='running'){
    game.elapsed+=dt;game.velocity-=1650*dt;game.y=Math.max(0,game.y+game.velocity*dt);if(game.y===0)game.velocity=0;
    const speed=Math.min(440,240+game.elapsed*3);game.spawn-=dt;
    if(game.spawn<=0){game.obstacles.push({x:1050,w:28+Math.random()*16,h:34+Math.random()*14});game.spawn=1.25+Math.random()*.6;}
    for(const obstacle of game.obstacles)obstacle.x-=speed*dt;
    game.obstacles=game.obstacles.filter(obstacle=>obstacle.x>-60);
    if(game.obstacles.some(o=>o.x<114&&o.x+o.w>88&&game.y<o.h-4)){game.state='over';setStatus('over');}
    const next=Math.floor(game.elapsed*10);if(next!==game.score){game.score=next;setScore(next);}
   }
   ctx.save();ctx.translate(0,floor);ctx.scale(scale,1);
   ctx.strokeStyle='#343c47';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(1000,0);ctx.stroke();
   ctx.strokeStyle='#8993a0';ctx.lineWidth=4;
   for(const o of game.obstacles){ctx.strokeRect(o.x,-o.h,o.w,o.h);ctx.beginPath();ctx.moveTo(o.x-5,-o.h+7);ctx.lineTo(o.x+o.w+5,-o.h+7);ctx.stroke();}
   const step=game.state==='running'&&game.y===0?Math.sin(game.elapsed*22)*8:0;
   ctx.translate(100,-game.y);ctx.strokeStyle=game.state==='over'?'#e29797':'#eef2f7';ctx.fillStyle=ctx.strokeStyle;ctx.lineWidth=4;ctx.lineCap='round';
   ctx.beginPath();ctx.arc(0,-44,6,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.moveTo(0,-36);ctx.lineTo(-3,-19);ctx.lineTo(-12-step,-3);ctx.moveTo(-3,-19);ctx.lineTo(9+step,-2);ctx.moveTo(0,-32);ctx.lineTo(12,-24);ctx.moveTo(0,-32);ctx.lineTo(-15,-28);ctx.stroke();ctx.restore();
   frame=requestAnimationFrame(draw);
  };frame=requestAnimationFrame(draw);return()=>cancelAnimationFrame(frame);
 },[]);
 return <section className="lost-game" aria-label="Jump over obstacles game">
  <div className="lost-game-top"><span>THE DETOUR / ENDLESS RUNNER</span><strong>SCORE {String(score).padStart(4,'0')}</strong></div>
  <canvas ref={canvas} aria-label="Runner game. Use the jump button or Space to jump over obstacles."/>
  <div className="lost-game-controls"><button type="button" onClick={jump}>{status==='ready'?'Start game':status==='over'?'Try again':'Jump'} <span>↑</span></button><button type="button" onClick={pause} disabled={status==='ready'||status==='over'}>{status==='paused'?'Resume':'Pause'}</button><span role="status">{status==='over'?'Game over. Give it another jump.':status==='paused'?'Paused':status==='ready'?'A little game for your wrong turn.':'Clear the obstacles. Keep going.'}</span></div>
 </section>;
}
