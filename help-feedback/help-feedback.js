(function () {
  const form = document.querySelector('[data-help-feedback-form]');
  if (!form) return;

  const topic = form.querySelector('[name="topic"]');
  const pageUrl = form.querySelector('[name="page_url"]');
  const message = form.querySelector('[name="message"]');

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
