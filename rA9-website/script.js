// Sci-fi animated background (starfield) + simple device-ish canvas animation
const bg = document.getElementById('bg');
const canvas = document.getElementById('deviceCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas(){
  canvas.width = canvas.clientWidth * devicePixelRatio;
  canvas.height = canvas.clientHeight * devicePixelRatio;
}

// starfield on #bg using many small divs via canvas
const starCtxCanvas = document.createElement('canvas');
starCtxCanvas.style.width = '100%';
starCtxCanvas.style.height = '100%';
starCtxCanvas.width = innerWidth * devicePixelRatio;
starCtxCanvas.height = innerHeight * devicePixelRatio;
starCtxCanvas.style.position = 'fixed';
starCtxCanvas.style.left = '0';
starCtxCanvas.style.top = '0';
starCtxCanvas.style.zIndex = '-11';
starCtxCanvas.id = 'starsCanvas';
document.body.appendChild(starCtxCanvas);
const sctx = starCtxCanvas.getContext('2d');

let stars = [];
function initStars(){
  stars = [];
  const count = Math.floor((innerWidth * innerHeight) / 9000);
  for(let i=0;i<count;i++){
    stars.push({
      x: Math.random()*starCtxCanvas.width,
      y: Math.random()*starCtxCanvas.height,
      r: Math.random()*1.2 + 0.2,
      vx: (Math.random()-0.5)*0.02,
      vy: (Math.random()-0.5)*0.02
    })
  }
}

function drawStars(){
  sctx.clearRect(0,0,starCtxCanvas.width, starCtxCanvas.height);
  sctx.fillStyle = 'rgba(255,255,255,0.8)';
  for(const s of stars){
    sctx.beginPath();
    sctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    sctx.fillStyle = 'rgba(255,255,255,' + (0.1 + Math.random()*0.8) + ')';
    sctx.fill();
  }
}

function animStars(){
  for(const s of stars){
    s.x += s.vx * (Math.random()*1.2);
    s.y += s.vy * (Math.random()*1.2);
    if(s.x < 0) s.x = starCtxCanvas.width;
    if(s.x > starCtxCanvas.width) s.x = 0;
    if(s.y < 0) s.y = starCtxCanvas.height;
    if(s.y > starCtxCanvas.height) s.y = 0;
  }
  drawStars();
}

// simple device panel animation inside deviceCanvas
let t = 0;
function drawDevice(){
  ctx.clearRect(0,0,canvas.width, canvas.height);
  const w = canvas.width, h = canvas.height;
  // background grid
  ctx.save();
  ctx.fillStyle = '#071026';
  ctx.fillRect(0,0,w,h);

  ctx.strokeStyle = 'rgba(96,165,250,0.06)';
  ctx.lineWidth = 1*devicePixelRatio;
  for(let x=0;x<w;x+=40*devicePixelRatio){
    ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();
  }
  for(let y=0;y<h;y+=40*devicePixelRatio){
    ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();
  }

  // pulsating orb
  const cx = w*0.6, cy = h*0.42;
  const radius = Math.min(w,h)*0.12*(1+Math.sin(t*0.02)*0.08);
  const grd = ctx.createRadialGradient(cx,cy,1,cx,cy,radius*2);
  grd.addColorStop(0,'rgba(99,102,241,0.9)');
  grd.addColorStop(0.4,'rgba(59,130,246,0.35)');
  grd.addColorStop(1,'rgba(2,6,23,0)');
  ctx.fillStyle = grd;
  ctx.beginPath();ctx.arc(cx,cy,radius,0,Math.PI*2);ctx.fill();

  // moving lines
  ctx.strokeStyle = 'rgba(96,165,250,0.12)';ctx.lineWidth = 2*devicePixelRatio;
  for(let i=0;i<6;i++){
    const yoff = (Math.sin(t*0.01 + i)*20*devicePixelRatio);
    ctx.beginPath();ctx.moveTo(10*devicePixelRatio, h*(0.2+i*0.12) + yoff);ctx.lineTo(w-10*devicePixelRatio, h*(0.2+i*0.12) - yoff);ctx.stroke();
  }

  ctx.restore();
}

function loop(){
  t++;
  animStars();
  drawDevice();
  requestAnimationFrame(loop);
}

function onResize(){
  starCtxCanvas.width = innerWidth * devicePixelRatio;
  starCtxCanvas.height = innerHeight * devicePixelRatio;
  initStars();
  resizeCanvas();
}

window.addEventListener('resize', onResize);

// menu toggle (mobile)
document.getElementById('menuBtn').addEventListener('click', ()=>{
  alert('Open menu — customize mobile nav as needed');
});

// contact form - simple client-side handler
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  const form = new FormData(this);
  // replace with your API/mail endpoint. For demo we just show an animated success.
  this.querySelector('button').innerText = 'Sending...';
  setTimeout(()=>{
    alert('Thanks! Message simulated as sent. Implement a backend or Formspree endpoint to make this real.');
    this.reset();
    this.querySelector('button').innerText = 'Send Message';
  }, 900);
});

// init
onResize();
initStars();
loop();


// end script.js
