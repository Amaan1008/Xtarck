const EYE_OPEN = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
const EYE_OFF = '<path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';

function makeToggle(btnId, inputId, iconId) {
  $(btnId).addEventListener('click', function() {
    const inp = $(inputId);
    const isText = inp.type === 'text';
    inp.type = isText ? 'password' : 'text';
    this.setAttribute('aria-label', isText ? 'Show password' : 'Hide password');
    $(iconId).innerHTML = isText ? EYE_OPEN : EYE_OFF;
  });
}
makeToggle('togglePw','password','eyeIcon1');
makeToggle('toggleConfirm','confirm','eyeIcon2');

const pwEl = $('password');
const cfEl = $('confirm');

function checkRules() {
  const v = pwEl.value;
  const len = v.length >= 8;
  const num = /\d/.test(v);
  const match = v.length > 0 && v === cfEl.value;
  setRule('rule-len', len);
  setRule('rule-num', num);
  $('rule-match').style.opacity = (cfEl.value.length > 0 || v.length > 0) ? '1' : '.4';
  setRule('rule-match', match);
}
function setRule(id, pass) {
  const el = $(id);
  el.classList.toggle('pass', pass);
  el.classList.toggle('fail', !pass && el.classList.contains('pass') || (!pass && $('password').value.length > 0));
}

pwEl.addEventListener('input', checkRules);
cfEl.addEventListener('input', checkRules);

$('signupForm').addEventListener('submit', async e => {
  e.preventDefault();
  const name  = $('fullname').value.trim();
  const email = $('email').value.trim();
  const pw    = pwEl.value;
  const cf    = cfEl.value;
  let valid   = true;

  function showErr(inputId, errorId, show, msg?) {
    const inp = $(inputId);
    const err = $(errorId);
    inp.setAttribute('aria-invalid', show ? 'true' : 'false');
    if (msg) err.textContent = msg;
    err.classList.toggle('show', show);
  }

  if (!name)  { showErr('fullname','name-error',true);    valid=false; } else showErr('fullname','name-error',false);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showErr('email','email-error',true); valid=false; } else showErr('email','email-error',false);
  if (pw.length < 8 || !/\d/.test(pw)) { valid=false; }
  if (pw !== cf) { showErr('confirm','confirm-error',true); valid=false; } else showErr('confirm','confirm-error',false);

  if (!valid) return;

  // ── Call PHP backend ──────────────────────────
  const submitBtn = $q('#signupForm button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Creating account…';

  try {
    const res  = await fetch('api/signup.php', {
      method:      'POST',
      credentials: 'include',
      headers:     { 'Content-Type': 'application/json' },
      body:        JSON.stringify({ fullname: name, email, password: pw }),
    });
    const data = await res.json();
    if (data.success) {
      window.location.href = 'onboarding.html'; // new users → personalization flow
    } else {
      // Show server error under the email field (e.g. "email already exists")
      showErr('email', 'email-error', true, data.message || 'Sign-up failed. Please try again.');
    }
  } catch (err) {
    alert('Network error. Please check your connection and try again.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});
