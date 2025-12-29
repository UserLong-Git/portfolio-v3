/* ============================================================
   SCROLL REVEAL
============================================================ */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

reveals.forEach(el => revealObserver.observe(el));


/* ============================================================
   CONTACT API
============================================================ */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value
    };

    try {
      const res = await fetch("https://contact-api-304633597083.europe-west1.run.app/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      alert(result.status || "Message sent!");
    } catch (err) {
      alert("Something went wrong: " + err.message);
    }
  });
}


/* ============================================================
   SCROLL PROGRESS BAR
============================================================ */
const progressBar = document.getElementById("scroll-progress");
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + "%";
});


/* ============================================================
   BACK TO TOP BUTTON
============================================================ */
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


/* ============================================================
   TYPING ANIMATION (Hero Title)
============================================================ */
(function() {
  const el = document.querySelector('.hero-title-typing');
  if (!el) return;

  const text = el.getAttribute('data-text') || '';
  let i = 0;

  function type() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(type, 80);
    } else {
      setInterval(() => {
        el.style.borderRightColor =
          el.style.borderRightColor ? '' : 'var(--accent-strong)';
      }, 500);
    }
  }

  setTimeout(type, 400);
})();


/* ============================================================
   ARCHITECTURE POSTER MODAL
============================================================ */
(function() {
  const modal = document.getElementById('archModal');
  if (!modal) return;

  const openers = document.querySelectorAll('.open-arch-modal');
  const closeBtn = modal.querySelector('.modal-close');
  const backdrop = modal.querySelector('.modal-backdrop');

  function openModal() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openers.forEach(el => el.addEventListener('click', openModal));
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
})();


/* ============================================================
   FLOATING SECTION INDEX
============================================================ */
(function() {
  const links = document.querySelectorAll('.section-index a');
  if (!links.length) return;

  const sections = Array.from(links).map(link => {
    const id = link.getAttribute('data-section');
    const el = document.getElementById(id);
    return el ? { id, el, link } : null;
  }).filter(Boolean);

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const match = sections.find(s => s.el === entry.target);
      if (!match) return;
      if (entry.isIntersecting) {
        sections.forEach(s => s.link.classList.remove('active'));
        match.link.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s.el));

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').replace('#', '');
      const target = document.getElementById(targetId);
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
