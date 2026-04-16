// ===================================
// ГРАЖДАНИН МИРА — MAIN.JS
// ВАУ-ЭФФЕКТЫ + ИНТЕРАКТИВ
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initMobileMenu();
  initSmoothScroll();
  initScrollReveal();
  initCounters();
  initParticles();
  initTyping();
  initFloats();
  initTilt();
  initRipple();
  initFAQ();
  initForm();
  initCursor();
  initReviewsSlider();
});

// ===================================
// 1. ПРОГРЕСС СКРОЛЛА — полоска вверху
// ===================================
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrolled = document.documentElement.scrollTop;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
  }, { passive: true });
}

// ===================================
// 2. МОБИЛЬНОЕ МЕНЮ
// ===================================
function initMobileMenu() {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  if (!burger || !nav) return;

  // Создаём overlay
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  function openMenu() {
    nav.classList.add('open');
    burger.classList.add('active');
    overlay.classList.add('active');
  }
  function closeMenu() {
    nav.classList.remove('open');
    burger.classList.remove('active');
    overlay.classList.remove('active');
  }

  burger.addEventListener('click', () => {
    nav.classList.contains('open') ? closeMenu() : openMenu();
  });
  overlay.addEventListener('click', closeMenu);

  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// ===================================
// 3. ПЛАВНЫЙ СКРОЛЛ с easing
// ===================================
function initSmoothScroll() {
  const easeOutExpo = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

  function smoothScrollTo(targetY, duration = 800) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + distance * easeOutExpo(progress));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      smoothScrollTo(top);
    });
  });
}

// ===================================
// 4. SCROLL REVEAL — появление элементов
// ===================================
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px 0px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ===================================
// 5. СЧЁТЧИКИ ЦИФР
// ===================================
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

  function animateCounter(el, target, duration = 2000) {
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const val = Math.floor(easeOutQuart(progress) * target);
      el.textContent = val.toLocaleString('ru-RU');
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target.toLocaleString('ru-RU');
    }
    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        animateCounter(el, parseInt(el.dataset.count, 10));
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

// ===================================
// 6. ЧАСТИЦЫ на canvas в hero
// ===================================
function initParticles() {
  if (window.innerWidth < 768) return; // отключаем на мобилке
  const canvas = document.getElementById('particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  const COUNT = 60;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.r = Math.random() * 2 + 0.5;
      this.a = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(209,143,89,${this.a})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(209,143,89,${0.12 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animate);
  }
  animate();
}

// ===================================
// 7. TYPING EFFECT в hero
// ===================================
function initTyping() {
  const el = document.querySelector('.hero__typed');
  const cursor = document.querySelector('.hero__cursor');
  if (!el) return;

  const texts = ['Шенген, Азия, Америка — под ключ', 'Работаем после отказа консульства', 'Ручная запись в 45+ стран', 'Дистанционно из любой точки России', 'ВНЖ и гражданство за рубежом'];
  let textIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = texts[textIdx];
    if (deleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = deleting ? 40 : 80;
    if (!deleting && charIdx === current.length) { delay = 2500; deleting = true; }
    else if (deleting && charIdx === 0) { deleting = false; textIdx = (textIdx + 1) % texts.length; delay = 400; }

    setTimeout(type, delay);
  }
  type();
}

// ===================================
// 8. ПЛАВАЮЩИЕ ФЛАГИ в hero
// ===================================
function initFloats() {
  // CSS анимация уже в style.css, здесь ничего не нужно
}

// ===================================
// 9. 3D TILT на карточках услуг
// ===================================
function initTilt() {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.review-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transition = 'box-shadow 0.3s ease';
      card.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale3d(1.02,1.02,1.02)`;
      card.style.setProperty('--mx', (x + 0.5) * 100 + '%');
      card.style.setProperty('--my', (y + 0.5) * 100 + '%');
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s ease, box-shadow 0.3s ease';
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    });
  });
}

// ===================================
// 10. RIPPLE на кнопках
// ===================================
function initRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px`;
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
}

// ===================================
// 11. FAQ АККОРДЕОН
// ===================================
function initFAQ() {
  document.querySelectorAll('.faq__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq__item');
      const answer = item.querySelector('.faq__answer');
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq__item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq__answer').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

// ===================================
// 12. ФОРМА + TOAST
// ===================================
function initForm() {
  const form = document.getElementById('form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Отправляем...';
    btn.disabled = true;

    // Имитация отправки (здесь подключить реальный бэкенд)
    setTimeout(() => {
      showToast('Заявка принята! Перезвоним в течение 15 минут 📞', 'success');
      form.reset();
      btn.textContent = 'Отправить заявку ✈️';
      btn.disabled = false;
      // Показываем подтверждение прямо в форме
      const confirm = document.createElement('p');
      confirm.style.cssText = 'color:#4ade80;text-align:center;font-weight:600;margin-top:12px;font-size:15px';
      confirm.textContent = '✅ Заявка отправлена — ждите звонка!';
      form.appendChild(confirm);
      setTimeout(() => confirm.remove(), 5000);
    }, 1000);
  });
}

// ===================================
// 13. TOAST УВЕДОМЛЕНИЯ
// ===================================
function showToast(message, type = 'info', duration = 4500) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <span class="toast__icon">${icons[type] || 'ℹ️'}</span>
    <span class="toast__text">${message}</span>
    <button class="toast__close" aria-label="Закрыть">✕</button>
  `;
  container.appendChild(toast);

  toast.querySelector('.toast__close').addEventListener('click', () => closeToast(toast));
  setTimeout(() => closeToast(toast), duration);
}

function closeToast(toast) {
  toast.classList.add('hide');
  toast.addEventListener('animationend', () => toast.remove(), { once: true });
}

// ===================================
// 14. КАСТОМНЫЙ КУРСОР
// ===================================
function initCursor() {
  if (window.matchMedia('(hover: none)').matches) return;

  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  (function animateRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  const hoverTargets = 'a, button, .service-card, .why-card, .country-card, input, textarea, select';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverTargets)) {
      ring.classList.add('hover');
      dot.classList.add('hidden');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverTargets)) {
      ring.classList.remove('hover');
      dot.classList.remove('hidden');
    }
  });

  document.addEventListener('mousedown', () => ring.classList.add('press'));
  document.addEventListener('mouseup', () => ring.classList.remove('press'));
}

// ===================================
// FLIP CARDS (тач-устройства)
// ===================================
document.querySelectorAll('.why-card, .svc-card').forEach(card => {
  let touchStartY = 0;
  card.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  card.addEventListener('touchend', e => {
    // Если клик по кнопке "Записаться" — не флипаем, даём перейти
    if (e.target.closest('.svc-card__back-btn')) return;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY);
    if (dy < 10) card.classList.toggle('flipped'); // только тап, не скролл
  });
});

// ===================================
// AI ЧАТ
// ===================================
(function initAIChat() {
  const btn      = document.getElementById('aiBtn');
  const chat     = document.getElementById('aiChat');
  const closeBtn = document.getElementById('aiClose');
  const input    = document.getElementById('aiInput');
  const sendBtn  = document.getElementById('aiSend');
  const messages = document.getElementById('aiMessages');
  if (!btn || !chat) return;

  const answers = {
    'сколько стоит виза':      'Базовая стоимость оформления визы — от 10 000 ₽ + консульский сбор. Финляндия — от 4 000 ₽, Шенген — от 5 000 ₽. Точную цену рассчитаем бесплатно — позвоните или оставьте заявку! 😊',
    'какие документы нужны':   'Стандартный пакет: загранпаспорт, фото, справка с работы/учёбы, выписка из банка, страховка. Полный список зависит от страны — уточним под ваш запрос бесплатно.',
    'как быстро оформляете':   'Стандартно — 5–15 рабочих дней. Срочное оформление — от 3 рабочих дней. Финская виза — 3–10 дней. Позвоните, расскажем точнее! 📞',
    'адрес':                   'Мы находимся в Петрозаводске, ул. Кирова 5, этаж 2, офис 210. Работаем пн–пт с 10:00 до 19:00, сб с 10:00 до 17:00. 📍',
    'телефон':                 'Наш номер: +7 (902) 770-71-11 или +7 (902) 770-72-22. Также пишите в Max или Telegram — @VizaTatiana. Ответим быстро! 😊',
    'гарантия':                'Да! Если виза не одобрена — возвращаем деньги за наши услуги. 98% клиентов получают визу с первого раза. 🔒',
  };

  function getBotAnswer(text) {
    const t = text.toLowerCase();
    for (const [key, val] of Object.entries(answers)) {
      if (t.includes(key.split(' ')[0]) || key.split(' ').some(w => t.includes(w))) return val;
    }
    return 'Хороший вопрос! 😊 Для точного ответа лучше проконсультируйтесь с нашим менеджером:<br><br>📞 <a href="tel:+79027707111" style="color:#6366f1">+7 (902) 770-71-11</a><br>💬 <a href="https://vk.me/+79027707111" style="color:#25D366" target="_blank">Max</a>';
  }

  function addMessage(text, isUser) {
    // Убираем подсказки при первом вопросе
    const suggestions = messages.querySelector('.ai-chat__suggestions');
    if (suggestions) suggestions.remove();

    const msg = document.createElement('div');
    msg.className = `ai-chat__msg ai-chat__msg--${isUser ? 'user' : 'bot'}`;
    msg.innerHTML = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function sendMessage(text) {
    if (!text.trim()) return;
    addMessage(text, true);
    input.value = '';
    setTimeout(() => addMessage(getBotAnswer(text), false), 600);
  }

  const floatSocial = document.querySelector('.float-social');

  function openChat() {
    chat.classList.add('open');
    if (floatSocial) floatSocial.classList.add('float-social--hidden');
  }
  function closeChat() {
    chat.classList.remove('open');
    if (floatSocial) floatSocial.classList.remove('float-social--hidden');
  }

  btn.addEventListener('click', () => chat.classList.contains('open') ? closeChat() : openChat());
  closeBtn.addEventListener('click', closeChat);
  sendBtn.addEventListener('click', () => sendMessage(input.value));
  input.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(input.value); });

  messages.querySelectorAll('.ai-chat__suggest').forEach(s => {
    s.addEventListener('click', () => sendMessage(s.dataset.q));
  });
})();

// ===================================
// STICKY HEADER тень
// ===================================
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ===================================
// СЛАЙДЕР ОТЗЫВОВ
// ===================================
function initReviewsSlider() {
  const track = document.getElementById('reviewsTrack');
  const dotsWrap = document.getElementById('reviewsDots');
  const btnPrev = document.getElementById('reviewsPrev');
  const btnNext = document.getElementById('reviewsNext');
  if (!track) return;

  const cards = track.querySelectorAll('.review-card');
  const total = cards.length;
  let current = 0;

  function getVisible() {
    if (window.innerWidth < 480) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function maxIndex() {
    return total - getVisible();
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    const count = maxIndex() + 1;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('button');
      dot.className = 'reviews__dot' + (i === current ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, maxIndex()));
    const cardWidth = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${current * cardWidth}px)`;
    btnPrev.disabled = current === 0;
    btnNext.disabled = current >= maxIndex();
    dotsWrap.querySelectorAll('.reviews__dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  btnPrev.addEventListener('click', () => goTo(current - 1));
  btnNext.addEventListener('click', () => goTo(current + 1));

  // Свайп на мобилке
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
  });

  window.addEventListener('resize', () => { buildDots(); goTo(Math.min(current, maxIndex())); });

  buildDots();
  goTo(0);
}

// AI-кнопка в sticky CTA (мобилка)
const aiBtnMobile = document.getElementById('aiBtnMobile');
if (aiBtnMobile) {
  aiBtnMobile.addEventListener('click', () => {
    const chat = document.getElementById('aiChat');
    if (chat) chat.classList.toggle('open');
  });
}

