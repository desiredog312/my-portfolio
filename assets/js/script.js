document.addEventListener('DOMContentLoaded', function () {

  // i18n.js loads first and exposes window.PortfolioI18n. Fall back gracefully if it didn't.
  var i18n = window.PortfolioI18n || {
    t: function (key) { return key; },
    getLang: function () { return 'id'; }
  };

  // Footer year (was <?= date('Y') ?> in the PHP version)
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Scroll-triggered reveal animations
  if (window.AOS) {
    AOS.init({
      duration: 650,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }

  // Text length differs between languages, so re-measure layout after a switch
  document.addEventListener('portfolio:langchange', function () {
    if (window.AOS && typeof AOS.refresh === 'function') AOS.refresh();
    if (window.bootstrap && bootstrap.ScrollSpy) {
      var spy = bootstrap.ScrollSpy.getInstance(document.body);
      if (spy) spy.refresh();
    }
  });

  // Nav background state on scroll
  var nav = document.getElementById('mainNav');
  var onScroll = function () {
    if (!nav) return;
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Close mobile nav after clicking a link
  document.querySelectorAll('#navContent .nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      var collapseEl = document.getElementById('navContent');
      if (collapseEl && collapseEl.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
      }
    });
  });

  // ------------------------------------------------------------------
  // Contact form — sends through EmailJS (no server needed)
  // Credentials live in assets/js/config.js
  // ------------------------------------------------------------------
  var form = document.getElementById('contactForm');
  if (!form) return;

  var statusEl = document.getElementById('formStatus');
  var submitBtn = document.getElementById('submitBtn');

  var cfg = (window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.emailjs) || {};
  function isSet(value) {
    return typeof value === 'string' && value.trim() !== '' && value.indexOf('YOUR_') !== 0;
  }
  var configured = isSet(cfg.publicKey) && isSet(cfg.serviceId) && isSet(cfg.templateId);

  if (!window.emailjs) {
    console.warn('[Portfolio] The EmailJS SDK did not load (offline, or blocked by an ad blocker). The contact form cannot send.');
  } else if (!configured) {
    console.warn('[Portfolio] EmailJS is not configured yet. Fill in assets/js/config.js (see SETUP.md).');
  } else {
    window.emailjs.init({
      publicKey: cfg.publicKey,
      blockHeadless: true,                                   // refuse headless-browser bots
      limitRate: { id: 'portfolio-contact', throttle: 10000 } // 1 send per 10 s per browser
    });
  }

  // Status text is stored as an i18n key so it re-translates if the visitor switches language.
  function setStatus(key, kind) {
    if (!statusEl) return;
    if (!key) {
      statusEl.removeAttribute('data-i18n');
      statusEl.textContent = '';
      statusEl.className = 'form-status';
      return;
    }
    statusEl.setAttribute('data-i18n', key);
    statusEl.textContent = i18n.t(key);
    statusEl.className = 'form-status ' + kind;
  }

  function setButton(key, disabled) {
    submitBtn.setAttribute('data-i18n', key);
    submitBtn.textContent = i18n.t(key);
    submitBtn.disabled = disabled;
  }

  function isBlank(name) {
    var field = form.elements[name];
    return !field || field.value.trim() === '';
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (!form.checkValidity() || isBlank('name') || isBlank('subject') || isBlank('message')) {
      form.classList.add('was-validated');
      setStatus('form.invalid', 'err');
      return;
    }

    if (!window.emailjs || !configured) {
      setStatus(window.emailjs ? 'form.notConfigured' : 'form.error', 'err');
      return;
    }

    setButton('form.sending', true);
    setStatus(null);

    // Tell the template which language the visitor was using (available as {{visitor_lang}}).
    // Set right before sending because form.reset() restores the hidden field's default.
    if (form.elements.visitor_lang) form.elements.visitor_lang.value = i18n.getLang();

    try {
      await window.emailjs.sendForm(cfg.serviceId, cfg.templateId, form);
      setStatus('form.success', 'ok');
      form.reset();
      form.classList.remove('was-validated');
    } catch (err) {
      // Full details go to the console for you; visitors only see a friendly message.
      console.error('[Portfolio] EmailJS send failed:', err);
      var code = err && err.status;
      if (code === 429) {
        setStatus('form.rateLimited', 'err');
      } else if (typeof code !== 'number') {
        setStatus('form.network', 'err');   // fetch failed: offline / blocked
      } else {
        setStatus('form.error', 'err');     // 400/403/412... see SETUP.md → Troubleshooting
      }
    } finally {
      setButton('form.send', false);
    }
  });

});
