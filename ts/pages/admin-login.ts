// Try to load live platform stats
(async () => {
  try {
    const d = await (await fetch('../api/admin/stats.php', {credentials:'include'})).json();
    if (d.success) {
      $('lsUsers').textContent  = d.stats.total_users  ?? '—';
      $('lsTrips').textContent  = d.stats.total_trips  ?? '—';
      $('lsRevs').textContent   = d.stats.total_reviews ?? '—';
    }
  } catch {}
})();

$('password').addEventListener('keydown', e => { if(e.key==='Enter') login(); });

async function login() {
  const email    = $('email').value.trim();
  const password = $('password').value;
  const btn      = $('loginBtn');
  const err      = $('errAlert');

  err.classList.remove('show');

  if (!email || !password) { showErr('Enter your email and password.'); return; }

  btn.classList.add('loading'); btn.disabled = true;

  try {
    const res = await fetch('../api/admin/login.php', {
      method:'POST', credentials:'include',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.success) {
      window.location.href = 'dashboard.html';
    } else {
      showErr(data.message || 'Invalid admin credentials.');
    }
  } catch {
    showErr('Cannot reach server. Check your connection.');
  } finally {
    btn.classList.remove('loading'); btn.disabled = false;
  }
}

function showErr(msg) {
  $('errMsg').textContent = msg;
  $('errAlert').classList.add('show');
}
