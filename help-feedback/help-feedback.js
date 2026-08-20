(function () {
  const form = document.querySelector('[data-help-feedback-form]');
  if (!form) return;

  const topic = form.querySelector('[name="topic"]');
  const pageUrl = form.querySelector('[name="page_url"]');
  const message = form.querySelector('[name="message"]');
  const visitorEmail = form.querySelector('[name="visitor_email"]');
  const isSpanish = document.documentElement.lang.toLowerCase().startsWith('es');

  const refinementStyles = document.createElement('style');
  refinementStyles.setAttribute('data-help-feedback-refinements', '');
  refinementStyles.textContent = `
    .hf-form-row .hf-field {
      grid-template-rows: auto 52px auto;
      align-content: start;
    }
    .hf-form-row .hf-field > label {
      min-height: 1.25rem;
      display: flex;
      align-items: flex-end;
    }
    .hf-form-row .hf-field > input,
    .hf-form-row .hf-field > select {
      height: 52px;
      min-height: 52px;
      margin: 0 !important;
      align-self: start;
    }
    .hf-reply-note {
      margin: -0.05rem 0 0;
      color: rgba(39, 49, 66, 0.7);
      font-size: 0.78rem;
      font-weight: 700;
      line-height: 1.45;
    }
  `;
  document.head.appendChild(refinementStyles);

  if (visitorEmail) {
    const emailField = visitorEmail.closest('.hf-field');
    if (emailField && !emailField.querySelector('.hf-reply-note')) {
      const note = document.createElement('p');
      note.className = 'hf-reply-note';
      note.textContent = isSpanish
        ? 'Leemos todos los mensajes, pero no podemos garantizar una respuesta personal.'
        : 'We read all messages, but a personal reply is not guaranteed.';
      emailField.appendChild(note);
    }
  }

  document.querySelectorAll('[data-feedback-topic]').forEach((button) => {
    button.addEventListener('click', () => {
      if (topic) topic.value = button.getAttribute('data-feedback-topic') || '';
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.setTimeout(() => message?.focus(), 350);
    });
  });

  if (pageUrl && !pageUrl.value) {
    const params = new URLSearchParams(window.location.search);
    const supplied = params.get('page');
    if (supplied) {
      pageUrl.value = supplied;
    } else if (document.referrer) {
      try {
        const ref = new URL(document.referrer);
        if (ref.hostname === window.location.hostname && !ref.pathname.includes('/help-feedback')) {
          pageUrl.value = ref.href;
        }
      } catch (_) {}
    }
  }

  document.querySelectorAll('[data-lang-href]').forEach((button) => {
    button.addEventListener('click', () => {
      window.location.href = button.getAttribute('data-lang-href');
    });
  });
})();
