(() => {
  'use strict';

  /* ---------- Hero video ---------- */
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    heroVideo.muted = true;
    const playPromise = heroVideo.play();
    if (playPromise) playPromise.catch(() => {});
  }

  /* ---------- Gate: 3s intro splash, once per session ---------- */
  const gate = document.getElementById('gate');
  const INTRO_SHOWN_KEY = 'mk-intro-shown';

  function closeGate() {
    gate.classList.add('is-hidden');
    document.body.style.overflow = '';
  }

  let alreadyShown = false;
  try {
    alreadyShown = !!sessionStorage.getItem(INTRO_SHOWN_KEY);
  } catch (e) {
    // sessionStorage unavailable — show the intro every time
  }

  if (alreadyShown) {
    closeGate();
  } else {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      closeGate();
      try { sessionStorage.setItem(INTRO_SHOWN_KEY, '1'); } catch (e) {}
    }, 3000);
  }

  /* ---------- Mobile drawer ---------- */
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');

  function toggleDrawer(open) {
    drawer.classList.toggle('is-open', open);
    drawerBackdrop.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  burger.addEventListener('click', () => toggleDrawer(!drawer.classList.contains('is-open')));
  drawerBackdrop.addEventListener('click', () => toggleDrawer(false));
  drawer.querySelectorAll('.drawer-link[href]').forEach(link => {
    link.addEventListener('click', () => toggleDrawer(false));
  });

  /* ---------- Parallax on scroll ---------- */
  const parallaxEls = document.querySelectorAll('[data-parallax] .parallax-bg');
  let ticking = false;

  function updateParallax() {
    const vh = window.innerHeight;
    parallaxEls.forEach(el => {
      const rect = el.parentElement.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return;
      const progress = (rect.top) / vh;
      el.style.transform = `translateY(${progress * 60}px)`;
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
  updateParallax();

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll('.stats, .cut-card, .quote-inner, .review-cta, .visit-inner');
  revealTargets.forEach(el => el.setAttribute('data-reveal', ''));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- Animated stat counters ---------- */
  const statNumbers = document.querySelectorAll('.stat-number');

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const isYear = el.dataset.format === 'year';
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = (isYear ? value : value) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  statNumbers.forEach(el => statObserver.observe(el));

  /* ---------- Cuts carousel: filter tabs + arrows ---------- */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const cutCards = document.querySelectorAll('.cut-card');
  const carousel = document.getElementById('carousel');
  const prevArrow = document.getElementById('prevArrow');
  const nextArrow = document.getElementById('nextArrow');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      const filter = tab.dataset.filter;

      cutCards.forEach(card => {
        const match = filter === 'all' || card.dataset.cat === filter;
        card.classList.toggle('is-hidden', !match);
      });
      carousel.scrollTo({ left: 0, behavior: 'smooth' });
    });
  });

  function scrollCarousel(dir) {
    const cardWidth = 260; // card + gap
    carousel.scrollBy({ left: dir * cardWidth * 2, behavior: 'smooth' });
  }

  prevArrow.addEventListener('click', () => scrollCarousel(-1));
  nextArrow.addEventListener('click', () => scrollCarousel(1));

  /* ---------- Live opening hours status ---------- */
  const hours = {
    1: [['08:00', '19:00']],
    2: [['08:00', '20:00']],
    3: [['08:00', '20:00']],
    4: [['08:00', '20:00']],
    5: [['08:00', '20:00']],
    6: [['08:00', '20:00']],
    0: [['09:00', '14:00']],
  };

  function toMinutes(str) {
    const [h, m] = str.split(':').map(Number);
    return h * 60 + m;
  }

  function updateHoursStatus() {
    const now = new Date();
    const day = now.getDay();
    const minutesNow = now.getHours() * 60 + now.getMinutes();
    const todayRanges = hours[day] || [];

    const isOpen = todayRanges.some(([open, close]) => {
      return minutesNow >= toMinutes(open) && minutesNow < toMinutes(close);
    });

    const dot = document.getElementById('statusDot');
    const text = document.getElementById('statusText');

    dot.classList.toggle('is-open', isOpen);
    dot.classList.toggle('is-closed', !isOpen);
    text.textContent = isOpen ? 'Ανοιχτά τώρα' : 'Κλειστά τώρα';

    document.querySelectorAll('#hoursList li').forEach(li => {
      li.classList.toggle('is-today', Number(li.dataset.day) === day);
    });
  }

  updateHoursStatus();
  setInterval(updateHoursStatus, 60000);

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('is-visible', window.scrollY > 600);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

})();
