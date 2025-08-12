/* Intro particle background (gentle, green-tinted) */
const canvas = document.getElementById('intro-bg');
const ctx = canvas.getContext('2d');
let particles = [];
let rafId;
const PARTICLE_COUNT = Math.max(30, Math.floor(window.innerWidth / 40)); // scalable

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
function initParticles(){
  particles = [];
  for (let i=0;i<PARTICLE_COUNT;i++){
    particles.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      r: 0.6 + Math.random()*2.2,
      vx: (Math.random()-0.5) * 0.35,
      vy: (Math.random()-0.5) * 0.35,
      alpha: 0.15 + Math.random()*0.45
    });
  }
}
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // subtle radial glow
  const gradient = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
  gradient.addColorStop(0,'rgba(6,12,6,0.03)');
  gradient.addColorStop(1,'rgba(0,0,0,0.04)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{
    ctx.beginPath();
    ctx.fillStyle = `rgba(11,102,35,${p.alpha})`; // forest green tint
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fill();

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < -10) p.x = canvas.width + 10;
    if (p.x > canvas.width + 10) p.x = -10;
    if (p.y < -10) p.y = canvas.height + 10;
    if (p.y > canvas.height + 10) p.y = -10;
  });

  rafId = requestAnimationFrame(draw);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});
resizeCanvas();
initParticles();
draw();

/* Intro fade-out -> show portfolio */
window.addEventListener('load', () => {
  // respect reduced-motion
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const introContent = document.querySelector('.intro-content');
  const intro = document.getElementById('intro');
  const portfolio = document.getElementById('portfolio');

  // after short delay fade out
  const delay = reduced ? 250 : 1700;
  setTimeout(() => {
    introContent.style.opacity = 0;
    introContent.style.transform = 'translateY(-14px)';
    setTimeout(() => {
      // stop animation loop to save CPU
      cancelAnimationFrame(rafId);
      intro.style.display = 'none';
      intro.setAttribute('aria-hidden','true');
      portfolio.classList.remove('hidden');
      portfolio.setAttribute('aria-hidden','false');
    }, reduced ? 120 : 420);
  }, delay);
});

/* Menu switching with smooth fades + keyboard support */
const menuButtons = document.querySelectorAll('.menu button');
let activePanel = document.querySelector('.content-panel[data-content="works"]');

menuButtons.forEach(btn => {
  btn.addEventListener('click', () => switchPanel(btn));
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); switchPanel(btn); }
  });
});

function switchPanel(btn) {
  const section = btn.dataset.section;
  if (!section) return;

  const newPanel = document.querySelector(`.content-panel[data-content="${section}"]`);
  if (!newPanel || newPanel === activePanel) {
    menuButtons.forEach(b => b.classList.toggle('active', b === btn));
    return;
  }

  // update active button
  menuButtons.forEach(b => b.classList.toggle('active', b === btn));

  // animate panels
  activePanel.classList.add('fade-out');
  setTimeout(() => {
    activePanel.classList.add('hidden');
    activePanel.classList.remove('fade-out');

    newPanel.classList.remove('hidden');
    newPanel.classList.add('fade-in');
    setTimeout(() => newPanel.classList.remove('fade-in'), 380);

    activePanel = newPanel;
  }, 320);
}

/* small niceties */
document.getElementById('year').textContent = new Date().getFullYear();

/* ensure keyboard focus outlines for accessibility */
document.addEventListener('keydown', function(e){
  if (e.key === 'Tab') document.body.classList.add('show-focus');
});
document.addEventListener('mousedown', function(){ document.body.classList.remove('show-focus'); });
