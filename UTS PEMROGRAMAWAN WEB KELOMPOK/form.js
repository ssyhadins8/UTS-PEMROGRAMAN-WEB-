const form = document.getElementById('contactForm');
const alertBox = document.getElementById('formAlert');

const fields = {
  name: {
    el: document.getElementById('name'),
    err: document.getElementById('err-name'),
    test: v => v.trim().length >= 2,
    msg: 'Nama tidak boleh kosong.'
  },
  email: {
    el: document.getElementById('email'),
    err: document.getElementById('err-email'),
    test: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
    msg: 'Email tidak valid.'
  },
  subject: {
    el: document.getElementById('subject'),
    err: document.getElementById('err-subject'),
    test: v => v.trim().length > 0,
    msg: 'Subjek wajib diisi.'
  },
  message: {
    el: document.getElementById('message'),
    err: document.getElementById('err-message'),
    test: v => v.trim().length >= 10,
    msg: 'Pesan minimal 10 karakter.'
  }
};

function setError(field, show) {
  field.el.classList.toggle('is-invalid', show);
  field.err.hidden = !show;
  field.el.setAttribute('aria-invalid', show ? 'true' : 'false');
}

function validateField(field) {
  const ok = field.test(field.el.value);
  setError(field, !ok);
  return ok;
}

Object.values(fields).forEach(f => {
  f.el.addEventListener('input', () => validateField(f));
  f.el.addEventListener('blur', () => validateField(f));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const results = Object.values(fields).map(validateField);
  const allValid = results.every(Boolean);

  if (!allValid) {
    alertBox.textContent = 'Mohon periksa kembali input yang ditandai.';
    alertBox.className = 'alert error';
    alertBox.hidden = false;
    alertBox.focus?.();
    return;
  }

  // simulasi sukses kirim (AJAX bisa ditaruh di sini)
  alertBox.textContent = 'Pesan berhasil dikirim';
  alertBox.className = 'alert success';
  alertBox.hidden = false;

  form.reset();
  Object.values(fields).forEach(f => setError(f, false));

  // scroll ke alert agar terlihat
  window.scrollTo({ top: alertBox.offsetTop - 90, behavior: 'smooth' });
});
