/* ============================================
   Powershift Energy Co — Form & FAQ Logic
   Vanilla JS · No frameworks
   ============================================ */

(function () {
  'use strict';

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var answer = item.querySelector('.faq-answer');
      var isOpen = item.classList.contains('open');

      // Close all others in same list
      item.closest('.faq-list').querySelectorAll('.faq-item.open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-answer').style.maxHeight = '0';
        }
      });

      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = '0';
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // --- Mobile Nav Toggle ---
  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
  }

  // --- Form Validation & Submission ---
  document.querySelectorAll('form[data-formspree]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm(form)) return;

      var btn = form.querySelector('.form-submit');
      var originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.classList.add('loading');

      var formData = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            showSuccess(form);
          } else {
            throw new Error('Submission failed');
          }
        })
        .catch(function () {
          btn.textContent = originalText;
          btn.classList.remove('loading');
          showError(form);
        });
    });
  });

  function validateForm(form) {
    var valid = true;

    // Clear previous errors
    form.querySelectorAll('.form-group').forEach(function (g) {
      g.classList.remove('has-error');
    });

    // Required fields
    form.querySelectorAll('[required]').forEach(function (field) {
      var group = field.closest('.form-group');
      if (!field.value.trim()) {
        group.classList.add('has-error');
        group.querySelector('.form-error-msg').textContent = 'This field is required';
        valid = false;
      }
    });

    // Phone: must start with 04 and be 10 digits
    var phone = form.querySelector('[name="phone"]');
    if (phone && phone.value.trim()) {
      var cleaned = phone.value.replace(/\s/g, '');
      if (!/^04\d{8}$/.test(cleaned)) {
        var pg = phone.closest('.form-group');
        pg.classList.add('has-error');
        pg.querySelector('.form-error-msg').textContent = 'Enter a valid Australian mobile (04XX XXX XXX)';
        valid = false;
      }
    }

    // Email
    var email = form.querySelector('[name="email"]');
    if (email && email.value.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        var eg = email.closest('.form-group');
        eg.classList.add('has-error');
        eg.querySelector('.form-error-msg').textContent = 'Enter a valid email address';
        valid = false;
      }
    }

    // Postcode: exactly 4 digits
    var postcode = form.querySelector('[name="postcode"]');
    if (postcode && postcode.value.trim()) {
      if (!/^\d{4}$/.test(postcode.value.trim())) {
        var pcg = postcode.closest('.form-group');
        pcg.classList.add('has-error');
        pcg.querySelector('.form-error-msg').textContent = 'Enter a 4-digit postcode';
        valid = false;
      }
    }

    return valid;
  }

  function showSuccess(form) {
    var card = form.closest('.form-card') || form.parentElement;
    card.innerHTML =
      '<div class="form-success">' +
      '<div class="icon">✅</div>' +
      '<h3>Thanks! We\'ve got your details.</h3>' +
      '<p>A local installer will call you within 2 hours during business hours. No spam, no pressure — just a quick chat about your options.</p>' +
      '</div>';
  }

  function showError(form) {
    var existing = form.querySelector('.form-error-banner');
    if (existing) existing.remove();

    var banner = document.createElement('div');
    banner.className = 'form-error-banner';
    banner.style.cssText = 'background:#fef2f2;color:#dc2626;padding:12px;border-radius:8px;font-size:0.875rem;margin-bottom:14px;text-align:center;';
    banner.textContent = 'Something went wrong. Please try again or call us on 0427 430 088.';
    form.insertBefore(banner, form.firstChild);
  }

})();
