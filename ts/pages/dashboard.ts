// ── Panel switching ────────────────────────────────────────────────────────────
// `var` (not `function`) so the monkey-patch reassignment further down
// (`showPanel = function(...){ ... }`, added when the premium panel was wired
// in) is allowed — see the same note on switchA/switchB in ts/pages/xtrack.ts.
var showPanel = function(name, clickedEl) {
  $qa('.panel').forEach(p => p.classList.remove('active'));
  $('panel-' + name).classList.add('active');
  $qa('.topnav-tab, .mob-tab').forEach(t => t.classList.remove('active'));
  if (clickedEl) {
    const panel = clickedEl.dataset.panel || name;
    $qa('[data-panel="' + panel + '"]').forEach(t => t.classList.add('active'));
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Places data ────────────────────────────────────────────────────────────────
const PLACES = [
  { name:"Mirissa Beach",          loc:"Southern Province",       cat:"beach",   emoji:"🏖️", bg:"linear-gradient(135deg,#0a2e45,#1a6080)", rating:5, match:98, desc:"A crescent-shaped paradise perfect for whale watching and golden-hour sunsets.", cats:["Beach","Nature"] },
  { name:"Horton Plains",          loc:"Central Province",        cat:"hiking",  emoji:"🌿", bg:"linear-gradient(135deg,#1a3a2d,#2d6e46)", rating:4, match:94, desc:"High-altitude plateau with the iconic World's End cliff drop and misty vistas.", cats:["Hiking","Nature"] },
  { name:"Ella Rock",              loc:"Uva Province",            cat:"hiking",  emoji:"🏔️", bg:"linear-gradient(135deg,#1a3020,#3a6040)", rating:5, match:92, desc:"A legendary hiking peak offering panoramic views across the lush Ella Gap.", cats:["Hiking","Adventure"] },
  { name:"Unawatuna Beach",        loc:"Southern Province",       cat:"beach",   emoji:"🌊", bg:"linear-gradient(135deg,#0a2535,#1a5070)", rating:5, match:96, desc:"Sheltered bay with calm waters, colourful coral reefs and vibrant beach cafés.", cats:["Beach","Snorkelling"] },
  { name:"Yala National Park",     loc:"Southern Province",       cat:"wildlife",emoji:"🦁", bg:"linear-gradient(135deg,#2a1040,#5a2890)", rating:4, match:88, desc:"Sri Lanka's most popular game reserve — home to leopards, elephants and crocs.", cats:["Wildlife","Nature"] },
  { name:"Galle Fort",             loc:"Southern Province",       cat:"culture", emoji:"🏛️", bg:"linear-gradient(135deg,#3a2010,#7a4a20)", rating:5, match:91, desc:"A 17th-century Dutch colonial fortress with charming streets and boutiques.", cats:["Culture","History"] },
  { name:"Sigiriya Rock",          loc:"North Central Province",  cat:"culture", emoji:"🗿", bg:"linear-gradient(135deg,#3a1a10,#8a4a30)", rating:5, match:85, desc:"Ancient rock fortress rising from the jungle, adorned with stunning frescoes.", cats:["Culture","History"] },
  { name:"Dambulla Cave Temple",   loc:"North Central Province",  cat:"culture", emoji:"🕌", bg:"linear-gradient(135deg,#1a0a30,#4a2a70)", rating:5, match:80, desc:"Sri Lanka's largest cave temple with 150+ Buddha statues carved in rock.", cats:["Culture","Temple"] },
  { name:"Wilpattu National Park", loc:"North Western Province",  cat:"wildlife",emoji:"🐆", bg:"linear-gradient(135deg,#1a3020,#2a5030)", rating:4, match:78, desc:"Pristine lakes and rich biodiversity — less crowded than Yala.", cats:["Wildlife","Nature"] },
];

function starsStr(n) {
  let s = '';
  for (let i = 1; i <= 5; i++) s += `<span style="color:${i<=n?'#f5a623':'#ddd'};font-size:12px">★</span>`;
  return s;
}

function renderRecs(filter = 'all') {
  const grid = $('rec-full-grid');
  const items = filter === 'all' ? PLACES : PLACES.filter(p => p.cat === filter);
  grid.innerHTML = items.map(p => `
    <div class="rec-full-card">
      <div class="rec-full-img" style="background:${p.bg}">
        <span style="font-size:48px;position:relative;z-index:1">${p.emoji}</span>
        <div class="rec-full-img-overlay"></div>
        <div class="rec-full-cats">${p.cats.map(c=>`<span style="background:rgba(0,0,0,.45);color:#fff;font-size:10px;backdrop-filter:blur(4px);padding:3px 8px;border-radius:5px;font-weight:600">${c}</span>`).join('')}</div>
      </div>
      <div class="rec-full-body">
        <div class="rec-full-name">${p.name}</div>
        <div class="rec-full-loc">📍 ${p.loc}</div>
        <div class="rec-full-desc">${p.desc}</div>
        <div class="rec-full-footer">
          <div class="rec-full-rating">${starsStr(p.rating)} <strong>${p.rating}.0</strong></div>
          <span class="rec-full-match">${p.match}% match</span>
        </div>
      </div>
    </div>`).join('');
}

function filterRecs(btn, cat) {
  $qa('#panel-recommendations .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderRecs(cat);
}

renderRecs('all');

// Preference toggles
$qa('#pref-filters .filter-btn').forEach(btn => {
  btn.addEventListener('click', () => btn.classList.toggle('active'));
});

// ── Helpers ────────────────────────────────────────────────────────────────────
function lkr(n) { return 'LKR ' + Number(n).toLocaleString(); }
function starsHtml(r) {
  let s = '';
  for (let i = 1; i <= 5; i++) s += `<span style="color:${i<=r?'#f5a623':'var(--border)'};font-size:13px">★</span>`;
  return s;
}
function emptyState(icon, title, sub, linkHref, linkText) {
  return `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:36px 16px;gap:10px;text-align:center">
    <div style="font-size:36px">${icon}</div>
    <div style="font-size:14px;font-weight:600;color:var(--text1)">${title}</div>
    <div style="font-size:12px;color:var(--text3)">${sub}</div>
    ${linkHref ? `<a href="${linkHref}" style="margin-top:8px;padding:9px 22px;background:var(--teal);color:#fff;border-radius:30px;font-size:12px;font-weight:600;text-decoration:none">${linkText}</a>` : ''}
  </div>`;
}

// ── Review chart ───────────────────────────────────────────────────────────────
let reviewChartInst = null;
function renderReviewChart(reviews) {
  const ctx = $('reviewChart');
  if (!ctx) return;
  if (reviewChartInst) { reviewChartInst.destroy(); reviewChartInst = null; }
  const counts = [0,0,0,0,0];
  reviews.forEach(r => { const s = parseInt(r.rating||r.stars||0); if(s>=1&&s<=5) counts[5-s]++; });
  const total = counts.reduce((a,b) => a+b, 0);
  const avg = total ? (reviews.reduce((a,r)=>a+parseInt(r.rating||r.stars||0),0)/total).toFixed(1) : null;
  $('avg-rating-display').innerHTML = avg
    ? `${avg} <span style="font-size:15px;font-family:'Montserrat',sans-serif;color:var(--teal)">/ 5.0</span>`
    : `— <span style="font-size:15px;font-family:'Montserrat',sans-serif;color:var(--teal)">/ 5.0</span>`;
  $('avg-rating-label').textContent = total ? `Based on ${total} review${total!==1?'s':''}` : 'No reviews yet';
  if (total === 0) { ctx.parentElement.innerHTML = emptyState('⭐','No reviews yet','Rate places after your trips','',''); return; }
  reviewChartInst = new Chart(ctx.getContext('2d'), {
    type: 'doughnut',
    data: { labels:['5 Stars','4 Stars','3 Stars','2 Stars','1 Star'], datasets:[{ data:counts, backgroundColor:['#2aab99','#dc7c32','#3a86c8','#9b59b6','#e4e6e2'], borderWidth:0, hoverOffset:4 }] },
    options: { responsive:true, maintainAspectRatio:false, cutout:'68%', plugins:{ legend:{position:'right',labels:{font:{size:11,family:'Montserrat'},color:'#4a5248',padding:12,boxWidth:10}} } }
  });
}

// ── Profile save ──────────────────────────────────────────────────────────────
async function saveProfile() {
  const fn = $('form-fullname').value.trim();
  const em = $('form-email').value.trim();
  try {
    await fetch('api/profile.php', { method:'POST', credentials:'include', headers:{'Content-Type':'application/json'}, body: JSON.stringify({fullname:fn, email:em}) });
    alert('Profile updated!');
  } catch(e) { alert('Could not save profile.'); }
}

// ── Populate all sections ─────────────────────────────────────────────────────
function populateDashboard(u, trips, reviews) {
  // Greeting
  const hr = new Date().getHours();
  $('welcome-greeting').textContent =
    hr < 12 ? 'Good Morning' : hr < 17 ? 'Good Afternoon' : 'Good Evening';

  // Initials
  const parts = (u.fullname||'').trim().split(/\s+/);
  const initials = parts.length >= 2
    ? (parts[0][0]+parts[parts.length-1][0]).toUpperCase()
    : (parts[0]||'?')[0].toUpperCase();

  ['nav-avatar','dash-avatar','profile-avatar'].forEach(id => {
    const el = $(id);
    if (el) el.textContent = initials;
  });

  $('profile-fullname').textContent = u.fullname || '—';
  $('profile-email').textContent    = u.email    || '—';

  if (u.created_at) {
    const d = new Date(u.created_at);
    const label = d.toLocaleDateString('en-GB',{month:'long',year:'numeric'});
    $('profile-member').textContent   = 'Member since ' + label;
    $('dash-member-since').textContent = label;
  }

  const fn = $('form-fullname'); if(fn) fn.value = u.fullname||'';
  const fe = $('form-email');    if(fe) fe.value = u.email||'';

  // Counts
  const tc = trips.length, rc = reviews.length;
  const placeSet = new Set();
  trips.forEach(t => { (t.selected||[]).forEach(p => placeSet.add(p)); });
  const pc = placeSet.size;
  const daysTravelled = trips.reduce((a,t) => a + (parseInt(t.days)||0), 0);

  $('stat-trips').textContent  = tc;
  $('stat-places').textContent = pc;
  $('stat-days').textContent   = daysTravelled;
  $('stat-saved').textContent  = tc;

  const badge = $('nav-trips-count');
  if (badge) badge.textContent = tc;

  ['pstat-trips','pstat-places','pstat-reviews'].forEach((id,i) => {
    const el = $(id);
    if(el) el.textContent = [tc,pc,rc][i];
  });

  const sub = $('trips-subtitle');
  if(sub) sub.textContent = tc===0 ? 'No saved trips yet' : tc+' saved planning session'+(tc!==1?'s':'');

  // ── Previous Plans grid ──
  const prevGrid = $('prev-plans-grid');
  if (prevGrid) {
    if (tc === 0) {
      prevGrid.innerHTML = `<div style="grid-column:1/-1">${emptyState('🗺️','No trips yet','Your saved plans will appear here','xtrack.html','Plan your first trip')}</div>`;
    } else {
      const statusOpts = ['Completed','Completed','Draft'];
      const catIcons = {beach:'🏖️',adventure:'🧗',cultural:'🏛️',wildlife:'🦁'};
      prevGrid.innerHTML = trips.slice(0, 3).map((t, i) => {
        const status = t.status || statusOpts[i % 3];
        const isComp = status.toLowerCase() === 'completed';
        const dateStr = t.created_at ? new Date(t.created_at).toLocaleDateString('en-GB',{month:'short',year:'numeric'}) : 'Recently';
        const travelers = t.travelers || '—';
        const days = t.days || '—';
        return `
          <div class="plan-card" onclick="showPanel('trips', $q('[data-panel=trips]'))">
            <div class="plan-card-header">
              <div class="plan-card-name">${t.name||'Unnamed Trip'}</div>
              <span class="plan-status ${isComp?'status-completed':'status-draft'}">${status}</span>
            </div>
            <div class="plan-meta-row">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1.5" y="2.5" width="10" height="9" rx="1.5" stroke="var(--text3)" stroke-width="1.2"/><path d="M4 1.5v2M9 1.5v2M1.5 5.5h10" stroke="var(--text3)" stroke-width="1.2" stroke-linecap="round"/></svg>
              ${dateStr}
            </div>
            <div class="plan-meta-row">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="4.5" r="2.2" stroke="var(--text3)" stroke-width="1.2"/><path d="M1.5 11.5c0-2.2 2.2-4 5-4s5 1.8 5 4" stroke="var(--text3)" stroke-width="1.2" stroke-linecap="round"/></svg>
              ${travelers} travelers
            </div>
            <div class="plan-meta-row">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5" stroke="var(--text3)" stroke-width="1.2"/><path d="M6.5 3.5v3l2 2" stroke="var(--text3)" stroke-width="1.2" stroke-linecap="round"/></svg>
              ${days} days
            </div>
          </div>`;
      }).join('');
    }
  }

  // ── My Trips full grid ──
  const tripsGrid = $('trips-grid');
  if (tripsGrid) {
    if (tc === 0) {
      tripsGrid.style.display = 'block';
      tripsGrid.innerHTML = emptyState('🗺️','You haven\'t planned any trips yet','Start the trip planner to build your first Sri Lanka adventure.','xtrack.html','Plan your first trip →');
    } else {
      tripsGrid.style.display = '';
      const catIcons = {beach:'🏖️',adventure:'🧗',cultural:'🏛️',wildlife:'🦁'};
      tripsGrid.innerHTML = trips.map(t => {
        const icon = catIcons[t.category]||(t.method==='budget'?'💰':'🗺️');
        const places = (t.selected||[]);
        const pillsHtml = places.slice(0,4).map(p=>`<span class="place-pill">${p}</span>`).join('')
          + (places.length>4?`<span class="place-pill place-pill-more">+${places.length-4} more</span>`:'');
        const meta = t.method==='budget' ? `Budget Planner · ${t.days||3} days` : `Destination Planner · ${places.length} places`;
        const footer = t.budget ? `Budget: <strong>${lkr(t.budget)}</strong>` : `Duration: <strong>${t.days||3} Days</strong>`;
        const tag = t.method==='budget'
          ? '<span class="trip-panel-tag tag-budget" style="margin-left:auto">Budget</span>'
          : '<span class="trip-panel-tag tag-dest" style="margin-left:auto">Destination</span>';
        return `
          <div class="trip-full-card">
            <div class="trip-full-header">
              <div class="trip-full-ico" style="background:#e8f7f5">${icon}</div>
              <div><div class="trip-full-title">${t.name||'Unnamed Trip'}</div><div class="trip-full-meta">${meta}</div></div>
              ${tag}
            </div>
            <div class="trip-full-places">${pillsHtml||'<span style="font-size:12px;color:var(--text3)">No places selected</span>'}</div>
            <div class="trip-full-footer">
              <span class="trip-full-budget">${footer}</span>
              <a href="xtrack.html" class="btn btn-ghost" style="font-size:12px;padding:7px 14px">Open Planner</a>
            </div>
          </div>`;
      }).join('');
    }
  }

  // ── Reviews panel ──
  const revList = $('reviews-list');
  if (revList) {
    if (rc === 0) {
      revList.innerHTML = emptyState('⭐','No reviews yet','After visiting a place, come back and rate it!','','');
    } else {
      revList.innerHTML = reviews.map(r => `
        <div class="review-item">
          <div class="review-place">${r.place_name||r.place||'Unknown Place'}</div>
          <div class="review-stars">${starsHtml(parseInt(r.rating||r.stars||5))}</div>
          ${r.comment||r.review_text ? `<div class="review-tip">"${r.comment||r.review_text}"</div>` : ''}
          <div class="review-date">${r.created_at?new Date(r.created_at).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}):''}</div>
        </div>`).join('');
    }
  }

  renderReviewChart(reviews);
}

// ── Auth guard ─────────────────────────────────────────────────────────────────
(async function initDashboard() {
  try {
    const res  = await fetch('api/check_auth.php', { credentials: 'include' });
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      console.warn('Auth API returned non-JSON response. Check PHP/DB config on server.');
      const fallbackUser = { fullname: 'User', email: '', id: 0 };
      populateDashboard(fallbackUser, [], []);
      return;
    }
    const data = await res.json();
    if (!data.success) { window.location.href = 'login.html'; return; }
    const u = data.user;

    let trips = [], reviews = [];
    try {
      const [tr, rv] = await Promise.all([
        fetch('api/trips.php',   { credentials:'include' }).then(r => r.json()),
        fetch('api/reviews.php', { credentials:'include' }).then(r => r.json()),
      ]);
      trips   = Array.isArray(tr.trips)   ? tr.trips   : [];
      reviews = Array.isArray(rv.reviews) ? rv.reviews : [];
    } catch(_){}

    populateDashboard(u, trips, reviews);

    // Load admin announcements
    try {
      const ar = await fetch('api/announcements.php', { credentials:'include' }).then(r => r.json());
      if (ar.success && Array.isArray(ar.announcements) && ar.announcements.length) {
        const iconMap = { info:'ℹ️', warning:'⚠️', success:'✅' };
        const container = $('ann-banners');
        container.innerHTML = ar.announcements.map(a => `
          <div class="ann-banner ${a.type}" id="ann-${a.id}">
            <span class="ann-banner-icon">${iconMap[a.type] || 'ℹ️'}</span>
            <div class="ann-banner-body">
              <div class="ann-banner-title">${a.title.replace(/</g,'&lt;')}</div>
              <div class="ann-banner-msg">${a.message.replace(/</g,'&lt;')}</div>
            </div>
            <button class="ann-banner-close" onclick="$('ann-${a.id}').remove()" title="Dismiss">×</button>
          </div>`).join('');
      }
    } catch(_){}

  } catch(err) {
    console.error('Auth check failed', err);
    window.location.href = 'login.html';
  }
})();

// ── PREMIUM SYSTEM ─────────────────────────────────────────────────────────────
let _premPlans = [];
let _premSelectedPlanId = null;
let _premIsPremium = false;

function lkrFmt(n) { return 'LKR ' + Number(n).toLocaleString(); }

function renderPremiumPlans(plans, isPremium, purchase) {
  _premPlans = plans;
  _premIsPremium = isPremium;

  // Show/hide active member banner
  const banner = $('prem-active-banner');
  const intro   = $('prem-intro');
  if (isPremium && purchase) {
    banner.style.display = 'flex';
    $('prem-banner-plan').textContent = purchase.plan_name + ' Plan';
    if (purchase.expires_at) {
      const exp = new Date(purchase.expires_at).toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'});
      $('prem-banner-detail').textContent = 'Active until ' + exp + ' · ' + purchase.card_brand + ' ending ' + purchase.card_last4;
    } else {
      $('prem-banner-detail').textContent = 'Lifetime access active · ' + (purchase.card_brand||'') + ' ending ' + purchase.card_last4;
    }
    intro.querySelector('h2').textContent = 'Your Premium Plans';
    intro.querySelector('p').textContent = 'You are a premium member. Upgrade to a higher tier anytime.';
  }

  const grid = $('prem-plans-grid');
  if (!plans || !plans.length) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:32px;color:var(--text3)">No plans available.</div>';
    return;
  }

  const planPeriod = d => d === 0 ? 'Lifetime' : d <= 31 ? 'per month' : d <= 95 ? 'per 3 months' : 'per year';

  grid.innerHTML = plans.map(p => {
    const isBest = p.badge === 'Best Value';
    const isLife = p.badge === 'Lifetime' || p.duration_days === 0;
    const badgeHtml = p.badge ? `<div style="position:absolute;top:-1px;right:18px;background:${isBest?'var(--amber)':'linear-gradient(135deg,#7c3aed,#5b21b6)'};color:#fff;font-size:10px;font-weight:700;padding:4px 10px;border-radius:0 0 8px 8px;letter-spacing:.5px">${p.badge}</div>` : '';
    const featuresHtml = (p.features||[]).map(f => `
      <div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:8px">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style="flex-shrink:0;margin-top:1px"><path d="M2.5 7l3 3 6-6" stroke="var(--teal)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span style="font-size:12px;color:var(--text2)">${f}</span>
      </div>`).join('');
    const alreadyOwns = isPremium && purchase && purchase.plan_name === p.name;
    const btnStyle = alreadyOwns
      ? 'background:var(--surface2);color:var(--text3);border:1.5px solid var(--border);cursor:default'
      : isBest
        ? 'background:linear-gradient(135deg,var(--amber),#b96220);color:#fff;border:none;cursor:pointer'
        : isLife
          ? 'background:linear-gradient(135deg,#7c3aed,#5b21b6);color:#fff;border:none;cursor:pointer'
          : 'background:linear-gradient(135deg,var(--teal),var(--teal-dk));color:#fff;border:none;cursor:pointer';
    const btnText = alreadyOwns ? '&#10003; Current Plan' : 'Get ' + p.name;
    const cardBorder = isBest ? '2px solid var(--amber)' : isLife ? '2px solid #7c3aed' : '1px solid var(--border)';
    return `
    <div style="background:var(--surface);border-radius:16px;border:${cardBorder};box-shadow:var(--shadow2);padding:24px;position:relative;overflow:visible;transition:transform .2s,box-shadow .2s" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform='translateY(0)'">
      ${badgeHtml}
      <div style="margin-bottom:16px">
        <div style="font-size:13px;font-weight:700;color:var(--text3);letter-spacing:.5px;text-transform:uppercase;margin-bottom:6px">${p.name}</div>
        <div style="font-size:26px;font-weight:800;color:var(--text1);font-family:'Inter',sans-serif;letter-spacing:-0.5px;margin-bottom:2px">${lkrFmt(p.price_lkr)}</div>
        <div style="font-size:11px;color:var(--text3)">${planPeriod(p.duration_days)}</div>
      </div>
      <div style="margin-bottom:20px;min-height:120px">${featuresHtml}</div>
      <button onclick="${alreadyOwns ? '' : 'openPremModal(' + p.id + ')'}"
        style="width:100%;padding:12px;border-radius:10px;font-family:'Montserrat',sans-serif;font-size:13px;font-weight:700;transition:opacity .18s;${btnStyle}">
        ${btnText}
      </button>
    </div>`;
  }).join('');
}

function openPremModal(planId) {
  const plan = _premPlans.find(p => p.id === planId);
  if (!plan) return;
  _premSelectedPlanId = planId;
  const period = plan.duration_days === 0 ? 'one-time payment' : plan.duration_days <= 31 ? 'per month' : plan.duration_days <= 95 ? 'per 3 months' : 'per year';
  $('prem-modal-plan-name').textContent = plan.name + ' Plan';
  $('prem-modal-price').textContent = lkrFmt(plan.price_lkr);
  $('prem-modal-period').textContent = period;
  $('prem-success-screen').style.display = 'none';
  $('prem-payment-form').style.display = 'block';
  $('prem-pay-err').style.display = 'none';
  ['prem-card-num','prem-card-name','prem-card-exp','prem-card-cvv'].forEach(id => {
    const el = $(id); if(el) el.value = '';
  });
  $('prem-card-brand-icon').innerHTML = '&#128179;';
  const ov = $('prem-modal-overlay');
  ov.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closePremModal(reload) {
  $('prem-modal-overlay').style.display = 'none';
  document.body.style.overflow = '';
  if (reload) initPremiumPanel();
}

function fmtCard(inp) {
  let v = inp.value.replace(/\D/g,'');
  let fmt = v.match(/.{1,4}/g);
  inp.value = fmt ? fmt.join(' ') : '';
  // Brand detection
  const icon = $('prem-card-brand-icon');
  if (v.startsWith('4')) icon.textContent = '💳 Visa';
  else if (/^5[1-5]/.test(v)) icon.textContent = '💳 MC';
  else if (/^3[47]/.test(v)) icon.textContent = '💳 Amex';
  else icon.innerHTML = '&#128179;';
}

function fmtExpiry(inp) {
  let v = inp.value.replace(/\D/g,'');
  if (v.length >= 3) v = v.slice(0,2) + '/' + v.slice(2,4);
  inp.value = v;
}

async function submitPremPayment() {
  const num  = ($('prem-card-num').value||'').replace(/\s/g,'');
  const name = ($('prem-card-name').value||'').trim();
  const exp  = ($('prem-card-exp').value||'').trim();
  const cvv  = ($('prem-card-cvv').value||'').trim();
  const errEl = $('prem-pay-err');

  const showErr = msg => { errEl.textContent = msg; errEl.style.display = 'block'; };
  errEl.style.display = 'none';

  if (!num || !name || !exp || !cvv) { showErr('Please fill in all card details.'); return; }
  if (num.replace(/\D/g,'').length < 13) { showErr('Please enter a valid card number.'); return; }
  if (!/^\d{2}\/\d{2}$/.test(exp)) { showErr('Expiry must be in MM/YY format.'); return; }
  if (cvv.length < 3) { showErr('CVV must be 3 or 4 digits.'); return; }

  const btn = $('prem-pay-btn');
  btn.disabled = true;
  btn.textContent = 'Processing...';

  try {
    const res  = await fetch('api/premium.php', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan_id: _premSelectedPlanId, card_number: num, card_name: name, card_expiry: exp, card_cvv: cvv })
    });
    const data = await res.json();

    if (data.success) {
      $('prem-payment-form').style.display = 'none';
      $('prem-success-screen').style.display = 'block';
      $('prem-success-detail').textContent = 'You now have access to all ' + data.data.plan_name + ' features.';
      const expStr = data.data.expires_at
        ? new Date(data.data.expires_at).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})
        : 'Never (Lifetime)';
      $('prem-success-receipt').innerHTML =
        '<strong>Plan:</strong> ' + data.data.plan_name + '<br>' +
        '<strong>Amount:</strong> ' + lkrFmt(data.data.amount_lkr) + '<br>' +
        '<strong>Card:</strong> ' + (data.data.card_brand||'Card') + ' ending ' + data.data.card_last4 + '<br>' +
        '<strong>Valid until:</strong> ' + expStr;
    } else {
      showErr(data.message || 'Payment failed. Please try again.');
    }
  } catch(e) {
    showErr('Network error. Please check your connection.');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Pay & Activate Premium';
  }
}

const HARDCODED_PLANS = [
  {
    id: 1,
    name: 'Explorer',
    slug: 'explorer',
    price_lkr: 990,
    duration_days: 30,
    badge: null,
    features: ['Unlimited trip saves','AI-powered itinerary suggestions','PDF export for any trip','Detailed weather forecasts','Priority email support']
  },
  {
    id: 2,
    name: 'Adventurer',
    slug: 'adventurer',
    price_lkr: 2490,
    duration_days: 90,
    badge: 'Best Value',
    features: ['Everything in Explorer','Advanced route optimisation','Hotel price alerts','Offline trip access','Multiple trip comparison','Early access to new features']
  },
  {
    id: 3,
    name: 'Elite',
    slug: 'elite',
    price_lkr: 7990,
    duration_days: 0,
    badge: 'Lifetime',
    features: ['Everything in Adventurer','Lifetime access — pay once','Dedicated WhatsApp support','Custom trip branding','Beta feature access','Exclusive member badge']
  }
];

async function initPremiumPanel() {
  // Try to get live status from API (active subscription check)
  try {
    const res  = await fetch('api/premium.php', { credentials: 'include' });
    const data = await res.json();
    if (data.success) {
      // Use API plans if available, otherwise fall back to hardcoded
      const plans = (data.data.plans && data.data.plans.length) ? data.data.plans : HARDCODED_PLANS;
      renderPremiumPlans(plans, data.data.is_premium, data.data.purchase);
      return;
    }
  } catch(e) { /* fall through to hardcoded */ }
  // Always show plans even if API fails
  renderPremiumPlans(HARDCODED_PLANS, false, null);
}

// Load premium data when panel is shown
const _origShowPanel = showPanel;
showPanel = function(name, el) {
  _origShowPanel(name, el);
  if (name === 'premium') initPremiumPanel();
};

// Close modal on overlay click
$('prem-modal-overlay').addEventListener('click', function(e) {
  if (e.target === this) closePremModal(false);
});

async function doLogout() {
  try { await fetch('api/logout.php', { method:'POST', credentials:'include' }); } catch(_){}
  window.location.href = 'login.html';
}
