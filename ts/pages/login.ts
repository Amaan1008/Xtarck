const form = $('loginForm');
const emailEl = $('email');
const passwordEl = $('password');

function showError(input, errorId, show) {
  const err = $(errorId);
  input.setAttribute('aria-invalid', show ? 'true' : 'false');
  err.classList.toggle('show', show);
}

// Password toggle
$('togglePw').addEventListener('click', function() {
  const isText = passwordEl.type === 'text';
  passwordEl.type = isText ? 'password' : 'text';
  this.setAttribute('aria-label', isText ? 'Show password' : 'Hide password');
  $('eyeIcon').innerHTML = isText
    ? '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'
    : '<path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
});

form.addEventListener('submit', async e => {
  e.preventDefault();
  let valid = true;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) {
    showError(emailEl, 'email-error', true); valid = false;
  } else showError(emailEl, 'email-error', false);
  if (!passwordEl.value.trim()) {
    showError(passwordEl, 'pw-error', true); valid = false;
  } else showError(passwordEl, 'pw-error', false);

  if (!valid) return;

  // ── Call PHP backend ──────────────────────────
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Signing in…';

  try {
    const res  = await fetch('api/login.php', {
      method:      'POST',
      credentials: 'include',
      headers:     { 'Content-Type': 'application/json' },
      body:        JSON.stringify({
        email:    emailEl.value.trim(),
        password: passwordEl.value,
      }),
    });
    const data = await res.json();
    if (data.success) {
      window.location.href = 'dashboard.html';
    } else {
      // Show server error under the password field
      const errEl = $('pw-error');
      errEl.textContent = data.message || 'Invalid email or password.';
      errEl.classList.add('show');
      passwordEl.setAttribute('aria-invalid', 'true');
    }
  } catch (err) {
    alert('Network error. Please check your connection and try again.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});

[emailEl, passwordEl].forEach(el => {
  el.addEventListener('input', () => {
    el.setAttribute('aria-invalid', 'false');
    const errId = el.id === 'email' ? 'email-error' : 'pw-error';
    $(errId).classList.remove('show');
  });
});
