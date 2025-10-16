const form = document.getElementById('contactForm');
const alertBox = document.getElementById('formAlert');

const fields = {
  name: {
    el: document.getElementById('name'),
    err: document.getElementById('err-name'),
    ok:  document.getElementById('ok-name'),
    test: v => v.trim().length > 0
  },
  email: {
    el: document.getElementById('email'),
    err: document.getElementById('err-email'),
    ok:  document.getElementById('ok-email'),
    test: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
  },
  subject: {
    el: document.getElementById('subject'),
    err: document.getElementById('err-subject'),
    ok:  document.getElementById('ok-subject'),
    test: v => v.trim().length > 0
  },
  message: {
    el: document.getElementById('message'),
    err: document.getElementById('err-message'),
    ok:  document.getElementById('ok-message'),
    // Ralat: cukup tidak kosong
    test: v => v.trim().length > 0
  }
};

function setState(field, isValid){
  field.el.classList.toggle('is-invalid', !isValid);
  field.el.classList.toggle('is-valid',  isValid);
  field.err.hidden = isValid;
  field.ok.hidden  = !isValid;
  field.el.setAttribute('aria-invalid', isValid ? 'false' : 'true');
}

function validateField(field){
  const ok = field.test(field.el.value);
  setState(field, ok);
  return ok;
}

// Live validation
Object.values(fields).forEach(f => {
  f.el.addEventListener('input', () => validateField(f));
  f.el.addEventListener('blur',  () => validateField(f));
});

// Submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const results = Object.values(fields).map(validateField);
  const allValid = results.every(Boolean);

  if (!allValid) {
    alertBox.textContent = 'Mohon periksa kembali input yang ditandai.';
    alertBox.className = 'alert error';
    alertBox.hidden = false;
    return;
  }

  // Sukses (di sini bisa diganti AJAX kirim ke server)
  alertBox.textContent = 'Pesan berhasil dikirim';
  alertBox.className = 'alert success';
  alertBox.hidden = false;

  form.reset();
  // Hapus status visual
  Object.values(fields).forEach(f => {
    f.el.classList.remove('is-invalid','is-valid');
    f.err.hidden = true;
    f.ok.hidden  = true;
  });
});
