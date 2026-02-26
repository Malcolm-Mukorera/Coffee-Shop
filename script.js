/* ===================== LOADER ===================== */
const loaderBar = document.getElementById('loader-bar');
const loaderNum = document.getElementById('loader-num');
const loader = document.getElementById('loader');
let progress = 0;
const loaderInterval = setInterval(() => {
  progress += Math.random() * 15 + 5;
  if (progress >= 100) { progress = 100; clearInterval(loaderInterval); }
  loaderBar.style.width = progress + '%';
  loaderNum.textContent = Math.round(progress) + '%';
  if (progress === 100) {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = 'auto';
      startAnimations();
    }, 400);
  }
}, 120);
document.body.style.overflow = 'hidden';

/* ===================== CURSOR ===================== */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
});
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
  requestAnimationFrame(animateRing);
}
animateRing();

/* ===================== NAV SCROLL ===================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  // progress bar
  const scrolled = window.scrollY;
  const total = document.body.scrollHeight - window.innerHeight;
  document.getElementById('progress-bar').style.width = (scrolled / total * 100) + '%';
});

/* ===================== HAMBURGER ===================== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('active');
});
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('active');
  });
});

/* ===================== STEAM CANVAS ===================== */
const canvas = document.getElementById('steam-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class SteamParticle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width * 0.6 + canvas.width * 0.2;
    this.y = canvas.height * 0.7 + Math.random() * 100;
    this.size = Math.random() * 6 + 2;
    this.speedX = (Math.random() - 0.5) * 0.8;
    this.speedY = -(Math.random() * 1.5 + 0.5);
    this.opacity = Math.random() * 0.15 + 0.02;
    this.life = 0;
    this.maxLife = Math.random() * 200 + 100;
  }
  update() {
    this.x += this.speedX + Math.sin(this.life * 0.02) * 0.5;
    this.y += this.speedY;
    this.life++;
    this.size += 0.05;
    if (this.life > this.maxLife * 0.7) {
      this.opacity -= 0.001;
    }
    if (this.life >= this.maxLife || this.opacity <= 0) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(242, 234, 216, ${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < 60; i++) {
  const p = new SteamParticle();
  p.life = Math.random() * p.maxLife;
  particles.push(p);
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ===================== SCROLL REVEAL ===================== */
function setupReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => observer.observe(el));
}

/* ===================== COUNTING ANIMATION ===================== */
function animateCounters() {
  const counters = document.querySelectorAll('.counter-num[data-target], .stat-num[data-target]');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.target;
        const duration = 1800;
        const start = performance.now();
        function tick(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target).toLocaleString();
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
}

/* ===================== ORIGIN BAR ANIMATION ===================== */
function animateOriginBars() {
  const bars = document.querySelectorAll('.region-bar');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        bars.forEach((bar, i) => {
          setTimeout(() => {
            bar.style.width = bar.dataset.width;
          }, i * 200);
        });
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });
  const section = document.getElementById('origin-regions');
  if (section) obs.observe(section);
}

/* ===================== HERO PARALLAX ===================== */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroContent = document.querySelector('.hero-content');
  const heroBottom = document.querySelector('.hero-bottom');
  if (heroContent) heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
  if (heroBottom) heroBottom.style.transform = `translateY(${scrollY * 0.2}px)`;
});

/* ===================== MAGNETIC BUTTONS ===================== */
document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.2}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0,0)';
  });
});

/* ===================== TEXT SCRAMBLE ===================== */
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise(resolve => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 20);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) { complete++; output += to; }
      else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += `<span style="color:var(--gold);opacity:0.4">${char}</span>`;
      } else { output += from; }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) { this.resolve(); }
    else { this.frameRequest = requestAnimationFrame(this.update); this.frame++; }
  }
}

/* ===================== INIT ===================== */
function startAnimations() {
  setupReveal();
  animateCounters();
  animateOriginBars();

  // Scramble eyebrow text on interval
  const eyebrow = document.querySelector('.hero-eyebrow');
  if (eyebrow) {
    const phrases = [
      'Est. 2019 — Kloof, Durban',
      'Specialty Coffee Roasters',
      'Small Batch · Ethically Sourced',
      'Direct Trade · Artisan Roasted',
    ];
    const scrambler = new TextScramble(eyebrow);
    let idx = 0;
    const cycle = () => {
      scrambler.setText(phrases[idx]).then(() => {
        setTimeout(cycle, 4000);
        idx = (idx + 1) % phrases.length;
      });
    };
    setTimeout(cycle, 3000);
  }
}
