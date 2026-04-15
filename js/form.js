/* ============================================================
   POWERSHIFT ENERGY CO — Form Handler + FAQ Accordion
   ============================================================
   Form submissions use Formspree (https://formspree.io).
   Sign up free → create a form → replace FORMSPREE_FORM_ID
   in each HTML page's <form action="..."> attribute.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Lead Form Submission ── */
  const leadForms = document.querySelectorAll('.lead-form');

  leadForms.forEach(function (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const btn = form.querySelector('.submit-btn');
      const originalHTML = btn.innerHTML;
      const data = Object.fromEntries(new FormData(form));

      // Loading state
      btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Sending...';
      btn.disabled = true;
      btn.style.opacity = '0.75';

      try {
        const action = form.getAttribute('action');

        // If Formspree ID has been set, submit for real
        if (action && !action.includes('FORMSPREE_FORM_ID')) {
          const response = await fetch(action, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(form)
          });

          if (!response.ok) throw new Error('Submission failed');
        } else {
          // Demo mode — simulate network delay
          await new Promise(r => setTimeout(r, 1200));
        }

        showSuccess(form, data);

      } catch (err) {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
        btn.style.opacity = '1';

        const errMsg = form.querySelector('.form-error') || createErrorMsg(form);
        errMsg.textContent = 'Something went wrong. Please call us directly or try again.';
        errMsg.style.display = 'block';
      }
    });
  });

  function showSuccess(form, data) {
    const name = data.name ? data.name.split(' ')[0] : 'there';
    form.innerHTML = `
      <div class="success-state">
        <div class="success-icon">✓</div>
        <h3>You're all set, ${name}!</h3>
        <p>A local specialist will call you within <strong>2 hours</strong> during business hours.</p>
        <p class="success-sub">Check your inbox — we've sent a confirmation to <strong>${data.email || 'your email'}</strong>.</p>
      </div>
    `;
  }

  function createErrorMsg(form) {
    const div = document.createElement('div');
    div.className = 'form-error';
    div.style.cssText = 'color:#EF4444;font-size:0.85rem;margin-top:10px;display:none;';
    form.appendChild(div);
    return div;
  }


  /* ── FAQ Accordion ── */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;

    btn.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');
      // Close all
      faqItems.forEach(f => f.classList.remove('open'));
      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });


  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ── Nav scroll shadow ── */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.style.boxShadow = window.scrollY > 10
        ? '0 4px 24px rgba(0,0,0,0.3)'
        : 'none';
    }, { passive: true });
  }

});

(function() {
  var btn = document.getElementById('navHamburger');
  var menu = document.getElementById('navDropdown');
  if (btn && menu) {
    btn.addEventListener('click', function() {
      var isOpen = menu.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen);
    });
    document.addEventListener('click', function(e) {
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();
