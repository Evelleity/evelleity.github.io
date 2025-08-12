// Intro Particle Background
const canvas = document.getElementById("intro-bg");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
    
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  requestAnimationFrame(drawParticles);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  initParticles();
});

resizeCanvas();
initParticles();
drawParticles();

// Intro fade-out
window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".intro-content").style.opacity = "0";
    document.querySelector(".intro-content").style.transform = "translateY(-20px)";

    setTimeout(() => {
      document.getElementById("intro").style.display = "none";
      document.getElementById("portfolio").classList.remove("hidden");
    }, 1000);
  }, 2500);
});

// Menu switching
const menuItems = document.querySelectorAll(".middle li");
let activePanel = document.querySelector('.content-panel[data-content="works"]');

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    const sectionName = item.getAttribute("data-section");
    const newPanel = document.querySelector(`.content-panel[data-content="${sectionName}"]`);

    if (newPanel === activePanel) return;

    menuItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    activePanel.classList.add("fade-out");
    setTimeout(() => {
      activePanel.classList.add("hidden");
      activePanel.classList.remove("fade-out");

      newPanel.classList.remove("hidden");
      newPanel.classList.add("fade-in");
      setTimeout(() => newPanel.classList.remove("fade-in"), 500);

      activePanel = newPanel;
    }, 500);
  });
});
