/* ── Starfield (Hero) ──────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let stars = [];
  let W, H, raf;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function initStars(n = 280) {
    stars = Array.from({ length: n }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random(),
      da: (Math.random() - 0.5) * 0.004,
      speed: Math.random() * 0.015 + 0.005,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.a += s.da;
      if (s.a < 0 || s.a > 1) s.da *= -1;
      s.y -= s.speed;
      if (s.y < 0) { s.y = H; s.x = Math.random() * W; }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,220,255,${s.a})`;
      ctx.fill();
    });
    raf = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); initStars(); });
  resize(); initStars(); draw();
})();

/* ── Astrophotography canvas ──────────────────────────────── */
(function () {
  const canvas = document.getElementById('astroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, stars = [], nebula = [], raf;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    W = canvas.width  = rect.width  * devicePixelRatio;
    H = canvas.height = rect.height * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    initScene();
  }

  function initScene() {
    const rw = W / devicePixelRatio;
    const rh = H / devicePixelRatio;

    // Stars
    stars = Array.from({ length: 320 }, () => ({
      x: Math.random() * rw,
      y: Math.random() * rh,
      r: Math.random() * 1.4 + 0.1,
      a: Math.random() * 0.8 + 0.2,
      da: (Math.random() - 0.5) * 0.003,
      color: ['200,220,255','255,220,180','180,200,255'][Math.floor(Math.random()*3)],
    }));

    // Nebula blobs
    nebula = Array.from({ length: 8 }, () => ({
      x: Math.random() * rw,
      y: Math.random() * rh,
      r: Math.random() * 80 + 40,
      hue: Math.random() * 60 + 200,
      a: Math.random() * 0.04 + 0.01,
    }));
  }

  function draw() {
    const rw = W / devicePixelRatio;
    const rh = H / devicePixelRatio;
    ctx.clearRect(0, 0, rw, rh);

    // Deep space bg
    const bg = ctx.createRadialGradient(rw/2, rh/2, 0, rw/2, rh/2, Math.max(rw,rh)/1.5);
    bg.addColorStop(0, '#060c1a');
    bg.addColorStop(1, '#020408');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, rw, rh);

    // Nebula
    nebula.forEach(n => {
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
      g.addColorStop(0, `hsla(${n.hue},80%,60%,${n.a})`);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, rw, rh);
    });

    // Stars
    stars.forEach(s => {
      s.a += s.da;
      if (s.a < 0.1 || s.a > 1) s.da *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${s.color},${s.a})`;
      ctx.fill();

      // Glint on bright stars
      if (s.r > 1.1) {
        ctx.beginPath();
        ctx.moveTo(s.x - s.r * 3, s.y);
        ctx.lineTo(s.x + s.r * 3, s.y);
        ctx.moveTo(s.x, s.y - s.r * 3);
        ctx.lineTo(s.x, s.y + s.r * 3);
        ctx.strokeStyle = `rgba(${s.color},${s.a * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });

    raf = requestAnimationFrame(draw);
  }

  // Only animate when visible
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { if (!raf) draw(); }
      else { cancelAnimationFrame(raf); raf = null; }
    });
  });
  observer.observe(canvas);

  window.addEventListener('resize', () => {
    cancelAnimationFrame(raf); raf = null;
    resize();
    draw();
  });
  resize();
})();

/* ── Nav scroll behavior ──────────────────────────────────── */
(function () {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Mobile toggle (stub — could expand to a full menu)
  const toggle = document.getElementById('navToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const links = document.querySelector('.nav-links');
      if (!links) return;
      const open = links.style.display === 'flex';
      links.style.display = open ? '' : 'flex';
      links.style.flexDirection = open ? '' : 'column';
      links.style.position = open ? '' : 'absolute';
      links.style.top = open ? '' : '60px';
      links.style.left = open ? '' : '0';
      links.style.right = open ? '' : '0';
      links.style.background = open ? '' : 'rgba(8,11,18,0.97)';
      links.style.padding = open ? '' : '1.5rem 2rem';
      links.style.borderBottom = open ? '' : '1px solid rgba(255,255,255,0.07)';
    });
  }
})();

/* ── Scroll reveal ────────────────────────────────────────── */
(function () {
  const targets = document.querySelectorAll(
    '.about-grid, .skills-grid, .projects-list, .astro-grid, .contact-inner, ' +
    '.skill-card, .project-card, .detail-card, .fact'
  );

  targets.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        // Stagger children if it's a grid wrapper
        const children = e.target.querySelectorAll('.reveal');
        if (children.length) {
          children.forEach((child, idx) => {
            setTimeout(() => child.classList.add('visible'), idx * 80);
          });
          e.target.classList.add('visible');
        } else {
          e.target.classList.add('visible');
        }
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => io.observe(el));
})();

/* ── Active nav link highlight ────────────────────────────── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => io.observe(s));
})();
