const API = '../api/admin';
const PG  = 15;
let users=[], trips=[], reviews=[], notices=[], locations=[], hotels: any = [];
let uPg=1, tPg=1, rPg=1;

// ── BOOT ──────────────────────────────────────
window.addEventListener('DOMContentLoaded', async () => {
  const ok = await checkAuth();
  if (!ok) return; // stop — redirect is already in progress
  await Promise.all([loadStats(), loadUsers(), loadTrips(), loadReviews(), loadNotices(), loadLocations(), loadHotels()]);
});

async function checkAuth() {
  try {
    const d = await api('check_auth.php');
    if (!d.success) { location.href='login.html'; return false; }
    const n = d.admin.fullname || d.admin.email;
    set('sb-name', n);
    set('sb-av', n[0].toUpperCase());
    return true;
  } catch(err) { console.error('checkAuth failed:', err); location.href='login.html'; return false; }
}

// ── FETCH ──────────────────────────────────────
async function loadStats() {
  try {
    const d = await api('stats.php');
    if (!d.success) return;
    const s = d.stats;
    set('s-u',   s.total_users   ?? 0);
    set('s-t',   s.total_trips   ?? 0);
    set('s-r',   s.total_reviews ?? 0);
    set('s-avg', s.avg_rating ? (+s.avg_rating).toFixed(1) : '—');
    set('q-bud', s.budget_trips  ?? 0);
    set('q-dst', s.dest_trips    ?? 0);
    set('q-5s',  s.five_star     ?? 0);
    set('q-ban', s.banned_users  ?? 0);
    set('q-new', s.new_today     ?? 0);
    set('q-loc', s.total_locations ?? 0);
    set('sc-loc', s.total_locations ?? 0);
    set('q-htl', s.total_hotels   ?? 0);
    set('sc-htl', s.total_hotels  ?? 0);
    set('q-plc', s.total_places   ?? 0);
    set('q-blux', `${s.budget_hotels??0} / ${s.mid_hotels??0} / ${s.luxury_hotels??0}`);
    // recent locations sidebar
    if (d.recent_locs && $('recent-locs-list')) {
      $('recent-locs-list').innerHTML = (d.recent_locs||[]).map(l=>
        `<div class="qii"><div><div class="qil">${e(l.emoji||'📍')} ${e(l.name)}</div><div class="qis">${e(l.region)}</div></div></div>`
      ).join('') || '<div style="font-size:12px;color:var(--text3);padding:8px">No locations yet.</div>';
    }
    renderTopPlaces(d.top_places || []);
  } catch(err) { console.error('loadStats failed:', err); }
}

async function loadUsers() {
  try {
    const d = await api('users.php');
    if (!d.success) { console.error('loadUsers: API failure –', d.message); return; }
    users = d.users;
    set('nb-u', users.length);
    const banned = users.filter(u=>u.status==='banned');
    set('nb-b', banned.length);
    // Render main tables FIRST — a crash in the overview must never block these
    renderUsers();
    renderBanned();
    // Overview top-5 in its own try so it never breaks the tables above
    try {
      ovTable('ov-u', users.slice(0,5).map(u=>`
      <tr>
        <td><div class="uc"><div class="uav ${u.status==='banned'?'banned':''}">${(u.fullname||'?')[0].toUpperCase()}</div><div><div class="un">${e(u.fullname)}</div><div class="ue">${e(u.email)}</div></div></div></td>
        <td>${statusBadge(u.status)}</td>
        <td><span class="badge bb">${u.trip_count}</span></td>
        <td><span class="badge bt">${u.review_count}</span></td>
        <td style="font-size:11px;color:var(--text3)">${dt(u.created_at)}</td>
      </tr>`), 5);
    } catch(err2) { console.error('loadUsers ovTable failed:', err2); }
  } catch(err) { console.error('loadUsers failed:', err); }
}
async function loadTrips() {
  try {
    const d = await api('trips.php');
    if (!d.success) return;
    trips = d.trips;
    set('nb-t', trips.length);
    ovTable('ov-t', trips.slice(0,5).map(t=>`
      <tr>
        <td style="font-weight:600;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${e(t.name)}</td>
        <td>${e(t.user_fullname)}</td>
        <td>${panelBadge(t.panel)}</td>
        <td style="font-size:11px;color:var(--text3)">${dt(t.created_at)}</td>
      </tr>`), 4);
    renderTrips();
  } catch(err) { console.error('loadTrips failed:', err); }
}

async function loadReviews() {
  try {
    const d = await api('reviews.php');
    if (!d.success) return;
    reviews = d.reviews;
    set('nb-r', reviews.length);
    ovTable('ov-r', reviews.slice(0,5).map(r=>`
      <tr>
        <td style="font-weight:600">${e(r.place_name)}</td>
        <td>${e(r.user_fullname)}</td>
        <td>${stars(r.rating)}</td>
        <td style="font-size:11px;color:var(--text3)">${dt(r.updated_at)}</td>
      </tr>`), 4);
    renderReviews();
  } catch(err) { console.error('loadReviews failed:', err); }
}

async function loadNotices() {
  try {
    const d = await api('announcements.php');
    if (!d.success) return;
    notices = d.announcements;
    set('nb-a', notices.filter(a=>a.is_active).length);
    renderNotices();
  } catch(err) { console.error('loadNotices failed:', err); }
}

// ── RENDERS ────────────────────────────────────
function renderTopPlaces(places) {
  const el = $('top-places');
  if (!places.length) { el.textContent='No reviews yet.'; return; }
  el.innerHTML = places.map((p,i)=>`
    <div class="prow">
      <div class="prk">${i+1}</div>
      <div class="prn">${e(p.place_name)}</div>
      <div style="color:#f0b429;font-size:12px">${'★'.repeat(Math.round(p.avg_rating))}</div>
      <div style="font-size:10px;color:var(--text3);flex-shrink:0">${p.review_count}x</div>
    </div>`).join('');
}

function ovTable(id, rows, cols) {
  const el = $(id);
  el.innerHTML = rows.length ? rows.join('') : `<tr><td colspan="${cols}" style="text-align:center;padding:24px;color:var(--text3)">No data yet.</td></tr>`;
}

// ── USERS TABLE ───────────────────────────────
function gfUsers() {
  const q=($('u-s')?.value||'').toLowerCase();
  const sf=$('u-sf')?.value||'';
  return users.filter(u=>(u.fullname.toLowerCase().includes(q)||u.email.toLowerCase().includes(q))&&(!sf||u.status===sf));
}
function fu(){uPg=1;renderUsers();}
function renderUsers() {
  const f=gfUsers(), st=(uPg-1)*PG, sl=f.slice(st,st+PG);
  set('u-c',`${f.length} user${f.length!==1?'s':''}`);
  const tb = $('u-tb');
  tb.innerHTML = sl.length ? sl.map(u=>`
    <tr>
      <td><div class="uc"><div class="uav ${u.status==='banned'?'banned':''}">${(u.fullname||"?")[0].toUpperCase()}</div><div><div class="un">${e(u.fullname)}</div><div class="ue">${e(u.email)}</div></div></div></td>
      <td style="font-size:12px">${u.phone||'<span style="color:var(--text3)">—</span>'}</td>
      <td>${statusBadge(u.status)}</td>
      <td><span class="badge bb">${u.trip_count}</span></td>
      <td><span class="badge bt">${u.review_count}</span></td>
      <td style="font-size:12px;color:var(--text3)">${dt(u.created_at)}</td>
      <td><div class="acts">
        <button class="ab av" onclick="openUserModal(${u.id})">View</button>
        ${u.status==='active'
          ?`<button class="ab an-ban" onclick="banUser(${u.id},'${e(u.fullname)}')">Ban</button>`
          :`<button class="ab an-unban" onclick="unbanUser(${u.id},'${e(u.fullname)}')">Unban</button>`}
        <button class="ab ad" onclick="delUser(${u.id},'${e(u.fullname)}')">Delete</button>
      </div></td>
    </tr>`).join('')
  : `<tr><td colspan="7"><div class="empty"><p>No users found.</p></div></td></tr>`;
  mkpag('u-pg', f.length, uPg, p=>{uPg=p;renderUsers();});
}

// ── BANNED TAB ────────────────────────────────
function renderBanned() {
  const banned = users.filter(u=>u.status==='banned');
  const tb = $('ban-tb');
  tb.innerHTML = banned.length ? banned.map(u=>`
    <tr>
      <td><div class="uc"><div class="uav banned">${(u.fullname||"?")[0].toUpperCase()}</div><div class="un">${e(u.fullname)}</div></div></td>
      <td class="ue">${e(u.email)}</td>
      <td><span class="badge bb">${u.trip_count}</span></td>
      <td><span class="badge bt">${u.review_count}</span></td>
      <td style="font-size:12px;color:var(--text3)">${dt(u.created_at)}</td>
      <td><div class="acts">
        <button class="ab an-unban" onclick="unbanUser(${u.id},'${e(u.fullname)}')">Unban</button>
        <button class="ab ad" onclick="delUser(${u.id},'${e(u.fullname)}')">Delete</button>
      </div></td>
    </tr>`).join('')
  : `<tr><td colspan="6"><div class="empty"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31A7.902 7.902 0 0112 20zm6.31-3.1L7.1 5.69A7.902 7.902 0 0112 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"/></svg><p>No banned users — all accounts are in good standing.</p></div></td></tr>`;
}

// ── TRIPS TABLE ───────────────────────────────
function gfTrips() {
  const q=($('t-s')?.value||'').toLowerCase();
  const tp=$('t-tf')?.value||'';
  return trips.filter(t=>(t.name.toLowerCase().includes(q)||t.user_fullname.toLowerCase().includes(q))&&(!tp||t.panel===tp));
}
function ft(){tPg=1;renderTrips();}
function renderTrips() {
  const f=gfTrips(), st=(tPg-1)*PG, sl=f.slice(st,st+PG);
  set('t-c',`${f.length} trip${f.length!==1?'s':''}`);
  const tb=$('t-tb');
  tb.innerHTML = sl.length ? sl.map((t,i)=>`
    <tr>
      <td style="color:var(--text3);font-size:12px">${st+i+1}</td>
      <td style="font-weight:600;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${e(t.name)}</td>
      <td><div class="uc"><div class="uav" style="width:26px;height:26px;font-size:10px">${(t.user_fullname||"?")[0].toUpperCase()}</div>${e(t.user_fullname)}</div></td>
      <td>${panelBadge(t.panel)}</td>
      <td><span class="badge bgr">${t.place_count}</span></td>
      <td style="font-size:12px">${t.budget?'Rs '+Number(t.budget).toLocaleString():'—'}</td>
      <td style="font-size:12px;color:var(--text3)">${dt(t.created_at)}</td>
      <td><div class="acts"><button class="ab av" onclick="openTripModal(${t.id})">View</button><button class="ab ad" onclick="delTrip(${t.id},'${e(t.name)}')">Delete</button></div></td>
    </tr>`).join('')
  : `<tr><td colspan="8"><div class="empty"><p>No trips found.</p></div></td></tr>`;
  mkpag('t-pg', f.length, tPg, p=>{tPg=p;renderTrips();});
}

// ── REVIEWS TABLE ─────────────────────────────
function gfRevs() {
  const q=($('r-s')?.value||'').toLowerCase();
  const rt=$('r-rf')?.value||'';
  return reviews.filter(r=>(r.place_name.toLowerCase().includes(q)||r.user_fullname.toLowerCase().includes(q))&&(!rt||String(r.rating)===rt));
}
function fr(){rPg=1;renderReviews();}
function renderReviews() {
  const f=gfRevs(), st=(rPg-1)*PG, sl=f.slice(st,st+PG);
  set('r-c',`${f.length} review${f.length!==1?'s':''}`);
  const tb=$('r-tb');
  tb.innerHTML = sl.length ? sl.map(r=>`
    <tr>
      <td style="font-weight:600">${e(r.place_name)}</td>
      <td><div class="uc"><div class="uav ${r.user_status==='banned'?'banned':''}" style="width:26px;height:26px;font-size:10px">${(r.user_fullname||"?")[0].toUpperCase()}</div>${e(r.user_fullname)}</div></td>
      <td>${stars(r.rating)}</td>
      <td style="font-size:12px;color:var(--text2);max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.tip||'<span style="color:var(--text3)">—</span>'}</td>
      <td style="font-size:12px;color:var(--text3)">${dt(r.updated_at)}</td>
      <td><div class="acts"><button class="ab av" onclick="openRevModal(${r.id})">View</button><button class="ab ad" onclick="delRev(${r.id},'${e(r.place_name)}')">Delete</button></div></td>
    </tr>`).join('')
  : `<tr><td colspan="6"><div class="empty"><p>No reviews found.</p></div></td></tr>`;
  mkpag('r-pg', f.length, rPg, p=>{rPg=p;renderReviews();});
}

// ── ANNOUNCEMENTS ─────────────────────────────
function renderNotices() {
  const el = $('ann-list');
  if (!notices.length) { el.innerHTML='<div class="empty"><p>No announcements yet. Post one above.</p></div>'; return; }
  el.innerHTML = notices.map(a=>`
    <div class="ann-row">
      <div class="ann-dot ${a.type}"></div>
      <div class="ann-body">
        <div class="ann-title">${e(a.title)}</div>
        <div class="ann-msg">${e(a.message)}</div>
        <div class="ann-meta">By ${e(a.created_by)} · ${dt(a.created_at)} · Type: ${a.type}</div>
      </div>
      <div class="ann-acts">
        <button class="toggle-btn ${a.is_active?'toggle-on':'toggle-off'}" onclick="toggleAnn(${a.id})">
          ${a.is_active?'● Active':'○ Inactive'}
        </button>
        <button class="ab ad" onclick="delAnn(${a.id})">Delete</button>
      </div>
    </div>`).join('');
}

async function postAnnouncement() {
  const title = $('ann-title').value.trim();
  const msg   = $('ann-msg').value.trim();
  const type  = $('ann-type').value;
  if (!title||!msg) { toast('Fill in title and message.','err'); return; }
  const btn = $('ann-post-btn');
  btn.disabled=true; btn.textContent='Posting…';
  try {
    const d = await api('announcements.php',{method:'POST',body:{title,message:msg,type}});
    if (d.success) {
      $('ann-title').value='';
      $('ann-msg').value='';
      toast(d.message,'ok');
      await loadNotices();
      await loadStats();
    } else toast(d.message||'Failed.','err');
  } catch { toast('Network error.','err'); }
  finally { btn.disabled=false; btn.textContent='Post to Dashboard'; }
}

async function toggleAnn(id) {
  try {
    const d = await api('announcements.php?action=toggle',{method:'POST',body:{id}});
    if (d.success) { await loadNotices(); await loadStats(); toast('Status updated.'); }
    else toast(d.message||'Failed.','err');
  } catch { toast('Network error.','err'); }
}

async function delAnn(id) {
  if (!confirm('Delete this announcement?')) return;
  try {
    const d = await api('announcements.php?id='+id,{method:'DELETE'});
    if (d.success) { await loadNotices(); await loadStats(); toast('Announcement deleted.','ok'); }
    else toast(d.message||'Failed.','err');
  } catch { toast('Network error.','err'); }
}

// ── USER ACTIONS ──────────────────────────────
async function banUser(id, name) {
  if (!confirm(`Ban "${name}"?\n\nThey will be blocked from logging into the customer site.`)) return;
  try {
    const d = await api('users.php?action=ban',{method:'POST',body:{id}});
    if (d.success) {
      const u=users.find(x=>x.id===id); if(u) u.status='banned';
      renderUsers(); renderBanned(); await loadStats();
      toast(`${name} has been banned.`,'warn');
    } else toast(d.message||'Failed.','err');
  } catch { toast('Network error.','err'); }
}

async function unbanUser(id, name) {
  try {
    const d = await api('users.php?action=unban',{method:'POST',body:{id}});
    if (d.success) {
      const u=users.find(x=>x.id===id); if(u) u.status='active';
      renderUsers(); renderBanned(); await loadStats();
      toast(`${name} has been unbanned.`,'ok');
    } else toast(d.message||'Failed.','err');
  } catch { toast('Network error.','err'); }
}

async function delUser(id, name) {
  if (!confirm(`Delete "${name}" permanently?\n\nAll their trips and reviews will also be deleted.`)) return;
  try {
    const d = await api('users.php?id='+id,{method:'DELETE'});
    if (d.success) {
      users=users.filter(u=>u.id!==id);
      trips=trips.filter(t=>t.user_id!==id);
      reviews=reviews.filter(r=>r.user_id!==id);
      renderUsers(); renderBanned(); renderTrips(); renderReviews();
      await loadStats();
      toast('User deleted.','ok');
    } else toast(d.message||'Failed.','err');
  } catch { toast('Network error.','err'); }
}

async function delTrip(id, name) {
  if (!confirm(`Delete trip "${name}"?`)) return;
  try {
    const d = await api('trips.php?id='+id,{method:'DELETE'});
    if (d.success) { trips=trips.filter(t=>t.id!==id); renderTrips(); await loadStats(); toast('Trip deleted.','ok'); }
    else toast(d.message||'Failed.','err');
  } catch { toast('Network error.','err'); }
}

async function delRev(id, place) {
  if (!confirm(`Delete review for "${place}"?`)) return;
  try {
    const d = await api('reviews.php?id='+id,{method:'DELETE'});
    if (d.success) { reviews=reviews.filter(r=>r.id!==id); renderReviews(); await loadStats(); toast('Review deleted.','ok'); }
    else toast(d.message||'Failed.','err');
  } catch { toast('Network error.','err'); }
}

// ── MODALS ─────────────────────────────────────
function openUserModal(id) {
  const u=users.find(x=>x.id===id); if(!u) return;
  set('m-u-av', (u.fullname||'?')[0].toUpperCase());
  $('m-u-av').className='sb-av'+(u.status==='banned'?' banned':'');
  $('m-u-av').style.cssText='width:52px;height:52px;border-radius:14px;font-size:18px';
  set('m-u-name',u.fullname); set('m-u-email',u.email);
  $('m-u-status').innerHTML=statusBadge(u.status);
  set('m-u-phone',u.phone||'—'); set('m-u-joined',dt(u.created_at));
  set('m-u-trips',u.trip_count+' trip'+(u.trip_count!==1?'s':'')); set('m-u-revs',u.review_count+' review'+(u.review_count!==1?'s':''));
  const acts=$('m-u-actions');
  acts.innerHTML=`
    <button class="mbtn mgr" onclick="cm('m-user')">Close</button>
    ${u.status==='active'
      ?`<button class="mbtn mam" onclick="cm('m-user');banUser(${u.id},'${e(u.fullname)}')">Ban User</button>`
      :`<button class="mbtn mgn" onclick="cm('m-user');unbanUser(${u.id},'${e(u.fullname)}')">Unban User</button>`}
    <button class="mbtn mrd" onclick="cm('m-user');delUser(${u.id},'${e(u.fullname)}')">Delete</button>`;
  om('m-user');
}
function openTripModal(id) {
  const t=trips.find(x=>x.id===id); if(!t) return;
  set('m-t-name',t.name); set('m-t-user',t.user_fullname);
  $('m-t-type').innerHTML=panelBadge(t.panel);
  set('m-t-date',dt(t.created_at));
  set('m-t-budget',t.budget?'Rs '+Number(t.budget).toLocaleString():'—');
  set('m-t-days',t.days?t.days+' day'+(t.days!==1?'s':''):'—');
  set('m-t-pc',t.place_count+' place'+(t.place_count!==1?'s':''));
  const pl=t.places||[];
  $('m-t-places').innerHTML=pl.length
    ?pl.map(p=>`<span class="badge bgr">${e(p)}</span>`).join('')
    :'<span style="color:var(--text3);font-size:12px">No places recorded.</span>';
  $('m-t-del').onclick=()=>{cm('m-trip');delTrip(t.id,t.name);};
  om('m-trip');
}
function openRevModal(id) {
  const r=reviews.find(x=>x.id===id); if(!r) return;
  set('m-r-place',r.place_name); set('m-r-user',r.user_fullname);
  $('m-r-rating').innerHTML=stars(r.rating)+` <span style="font-size:12px;color:var(--text2)">(${r.rating}/5)</span>`;
  set('m-r-date',dt(r.updated_at));
  $('m-r-tip').textContent=r.tip||'No travel tip provided.';
  $('m-r-del').onclick=()=>{cm('m-rev');delRev(r.id,r.place_name);};
  om('m-rev');
}
function om(id){$(id).classList.add('open');}
function cm(id){$(id).classList.remove('open');}

// ── NAVIGATION ─────────────────────────────────
const TITLES={overview:'Dashboard Overview',users:'All Users',trips:'All Trips',reviews:'All Reviews',notices:'Announcements',banned:'Banned Accounts',locations:'Manage Locations',hotels:'Manage Hotels',premium:'Premium Sales & Subscriptions',analytics:'Analytics & Reports'};
function nav(name,btn){
  $qa('.pn').forEach(p=>p.classList.remove('on'));
  $qa('.sb-btn').forEach(b=>b.classList.remove('on'));
  $('pn-'+name).classList.add('on');
  if(btn)btn.classList.add('on');
  set('ttl',TITLES[name]||name);
  $('gs').value='';
  if(name==='premium') loadPremium();
  if(name==='analytics') { loadAnalytics(); loadVisitedPlaces(); }
}
function globalSearch(v){
  const a=$q('.pn.on'); if(!a) return;
  const id=a.id.replace('pn-','');
  if(id==='users'){$('u-s').value=v;fu();}
  else if(id==='trips'){$('t-s').value=v;ft();}
  else if(id==='reviews'){$('r-s').value=v;fr();}
}

// ── PREMIUM ADMIN ──────────────────────────────────────────────
let _premData = null;
let _premPage = 1;

async function loadPremium(page?) {
  page = page || _premPage;
  _premPage = page;
  try {
    const data = await api('premium.php?page=' + page);
    if (!data.success) {
      $('psc-byplan').innerHTML = '<div style="text-align:center;padding:24px;color:var(--text3);font-size:13px">Could not load plan data.</div>';
      set('psc-tcount', 'Could not load purchases.');
      return;
    }
    _premData = data;
    const s = data.stats;
    const bp = data.by_plan || [];
    const purchases = data.purchases || [];
    const pg = data.pagination || {};

    // Stat cards
    set('psc-total', s.total_purchases);
    set('psc-users', s.unique_buyers);
    set('psc-rev', 'LKR ' + Number(s.total_revenue).toLocaleString());
    set('psc-active', s.active_subscriptions);
    set('nb-prem', s.total_purchases);

    // Insights
    const avgRev = s.unique_buyers > 0 ? Math.round(s.total_revenue / s.unique_buyers) : 0;
    set('psc-avg', 'LKR ' + Number(avgRev).toLocaleString());
    set('psc-buyers', s.unique_buyers);
    const popular = bp.length ? bp[0].plan_name : '—';
    set('psc-popular', popular);

    // By-plan breakdown
    const bpEl = $('psc-byplan');
    if (bp.length === 0) {
      bpEl.innerHTML = '<div style="text-align:center;padding:24px;color:var(--text3);font-size:13px">No sales yet.</div>';
    } else {
      bpEl.innerHTML = bp.map(p => {
        const pct = s.total_purchases > 0 ? Math.round((p.purchases / s.total_purchases) * 100) : 0;
        const color = p.plan_name === 'Elite' ? 'var(--purple)' : p.plan_name === 'Adventurer' ? 'var(--amber)' : 'var(--teal)';
        return '<div style="margin-bottom:14px">' +
          '<div style="display:flex;justify-content:space-between;margin-bottom:5px">' +
          '<span style="font-size:12px;font-weight:600;color:var(--text2)">' + p.plan_name + '</span>' +
          '<span style="font-size:12px;color:var(--text3)">' + p.purchases + ' sale' + (p.purchases != 1 ? 's' : '') + ' · LKR ' + Number(p.revenue).toLocaleString() + '</span>' +
          '</div>' +
          '<div style="background:var(--surface2);border-radius:4px;height:8px;overflow:hidden">' +
          '<div style="height:100%;background:' + color + ';border-radius:4px;width:' + pct + '%"></div>' +
          '</div></div>';
      }).join('');
    }

    // Purchases table
    set('psc-tcount', pg.total + ' purchase' + (pg.total != 1 ? 's' : '') + ' total');
    const tbody = $('psc-tbody');
    if (!purchases.length) {
      tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:32px;color:var(--text3)">No purchases yet.</td></tr>';
    } else {
      tbody.innerHTML = purchases.map((p, i) => {
        const statusCls = p.status === 'active' ? 'color:var(--green);font-weight:600' : 'color:var(--text3)';
        const expStr = p.expires_at
          ? new Date(p.expires_at).toLocaleDateString('en-GB', {day:'2-digit',month:'short',year:'numeric'})
          : 'Lifetime';
        const purchDate = new Date(p.purchased_at).toLocaleDateString('en-GB', {day:'2-digit',month:'short',year:'numeric'});
        const planColor = p.plan_name === 'Elite' ? 'var(--purple)' : p.plan_name === 'Adventurer' ? 'var(--amber)' : 'var(--teal)';
        return '<tr>' +
          '<td style="color:var(--text3);font-size:12px">#' + p.id + '</td>' +
          '<td><div class="uc"><div class="uav" style="background:linear-gradient(135deg,var(--teal),#1d8a7c)">' + (p.fullname||'?')[0].toUpperCase() + '</div><div><div class="un">' + e(p.fullname) + '</div><div class="ue">' + e(p.email) + '</div></div></div></td>' +
          '<td><span style="background:' + planColor + '22;color:' + planColor + ';font-size:11px;font-weight:700;padding:3px 9px;border-radius:6px">' + e(p.plan_name) + '</span></td>' +
          '<td style="font-weight:600">LKR ' + Number(p.amount_lkr).toLocaleString() + '</td>' +
          '<td style="font-size:12px;color:var(--text2)">' + (p.card_brand||'') + ' &bull;&bull;&bull;&bull; ' + (p.card_last4||'') + '</td>' +
          '<td><span style="' + statusCls + ';font-size:12px">' + p.status + '</span></td>' +
          '<td style="font-size:12px;color:var(--text2)">' + purchDate + '</td>' +
          '<td style="font-size:12px;color:var(--text2)">' + expStr + '</td>' +
          '</tr>';
      }).join('');
    }

    // Pagination
    const pgEl = $('psc-pagination');
    if (pg.pages > 1) {
      let h = '';
      for (let p = 1; p <= pg.pages; p++) {
        h += '<button class="pg' + (p === pg.page ? ' on' : '') + '" onclick="loadPremium(' + p + ')">' + p + '</button>';
      }
      pgEl.innerHTML = h;
    } else {
      pgEl.innerHTML = '';
    }
  } catch(err) {
    console.error('loadPremium error', err);
    // Show error state so panel doesn't stay on "Loading..."
    const bpEl = $('psc-byplan');
    if (bpEl && bpEl.textContent.trim() === 'Loading...') {
      bpEl.innerHTML = '<div style="text-align:center;padding:24px;color:var(--text3);font-size:13px">Failed to load premium data. Check API connection.</div>';
    }
    const tcEl = $('psc-tcount');
    if (tcEl && tcEl.textContent.trim() === 'Loading...') {
      set('psc-tcount', 'Error loading data.');
    }
  }
}

async function reloadAll(){
  toast('Refreshing…');
  await Promise.all([loadStats(),loadUsers(),loadTrips(),loadReviews(),loadNotices(),loadLocations(),loadHotels(),loadPremium()]);
  toast('All data refreshed!','ok');
}

// ── IMAGE REFRESH (Unsplash) ──────────────────────────────────
async function refreshImage(type, id, name, btn) {
  const orig = btn.textContent;
  btn.disabled = true;
  btn.textContent = '⏳';
  try {
    const d = await api('../api/fetch_image.php', {
      method: 'POST',
      body: { type, id, name }
    });
    if (d.success) {
      toast('Photo updated for "' + name + '"! Credit: ' + (d.data?.credit||'Unsplash'), 'ok');
      if (type === 'location') await loadLocations();
      else await loadHotels();
    } else {
      toast(d.message || 'Failed to fetch photo.', 'err');
    }
  } catch {
    toast('Network error fetching photo.', 'err');
  } finally {
    btn.disabled = false;
    btn.textContent = orig;
  }
}
async function logout(){
  await api('logout.php',{method:'POST'});
  location.href='login.html';
}

// ── PAGINATION ─────────────────────────────────
function mkpag(eid, total, cur, cb){
  const pages=Math.ceil(total/PG), el=$(eid);
  if(pages<=1){el.innerHTML='';return;}
  let h=`<button class="pg" onclick="(${cb.toString()})(${cur-1})" ${cur===1?'disabled':''}>‹</button>`;
  for(let p=1;p<=pages;p++){
    if(pages>7&&Math.abs(p-cur)>2&&p!==1&&p!==pages){if(p===2||p===pages-1)h+=`<span style="padding:0 4px;color:var(--text3)">…</span>`;continue;}
    h+=`<button class="pg ${p===cur?'on':''}" onclick="(${cb.toString()})(${p})">${p}</button>`;
  }
  h+=`<button class="pg" onclick="(${cb.toString()})(${cur+1})" ${cur===pages?'disabled':''}>›</button>`;
  el.innerHTML=h;
}

// ── HELPERS ────────────────────────────────────
async function api(path, opts: {method?: string, body?: any} = {}) {
  const {method='GET', body=null} = opts;
  const res = await fetch(`${API}/${path}`, {
    method, credentials:'include',
    headers: body ? {'Content-Type':'application/json'} : {},
    body: body ? JSON.stringify(body) : null
  });
  return res.json();
}
function set(id,v){const el=$(id);if(el)el.textContent=String(v??'');}
function e(s){return String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function dt(d){return d?new Date(d).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}):'—';}
function panelBadge(p){return p==='A'?'<span class="badge ba">Budget</span>':'<span class="badge bb">Destination</span>';}
function statusBadge(s){return s==='banned'?'<span class="badge br">Banned</span>':'<span class="badge bg2">Active</span>';}
function stars(n){n=parseInt(n)||0;return`<span class="stars">${'<span class="sf">★</span>'.repeat(n)}${'<span class="se">★</span>'.repeat(5-n)}</span>`;}
let _tt;
function toast(msg,type=''){
  const t=$('toast');
  t.textContent=msg; t.className='toast show'+(type?' '+type:'');
  clearTimeout(_tt); _tt=setTimeout(()=>{t.className='toast';},3200);
}

// ── LOCATIONS LOAD & RENDER ─────────────────────────
async function loadLocations() {
  try {
    const d = await api('locations.php');
    if (!d.success) return;
    locations = d.locations;
    set('nb-loc', locations.length);
    renderLocations();
  } catch(e) { console.warn('loadLocations failed', e); }
}

function renderLocations() {
  const q = ($('loc-s')?.value||'').toLowerCase();
  const f = locations.filter(l => l.name.toLowerCase().includes(q) || l.region.toLowerCase().includes(q));
  set('loc-c', f.length + ' location' + (f.length!==1?'s':''));
  const tb = $('loc-tb');
  tb.innerHTML = f.length ? f.map(l => `
    <tr>
      <td style="text-align:center;width:60px">
        ${l.image_url
          ? `<div style="position:relative;width:48px;height:38px;border-radius:8px;overflow:hidden;margin:0 auto;border:1px solid var(--border)">
               <img src="${e(l.image_url)}" alt="${e(l.name)}" style="width:100%;height:100%;object-fit:cover" onerror="this.parentElement.innerHTML='<div style=\'width:100%;height:100%;background:var(--surface2);display:flex;align-items:center;justify-content:center;font-size:18px\'>${e(l.emoji||'📍')}</div>'">
             </div>`
          : `<div style="width:48px;height:38px;border-radius:8px;background:var(--surface2);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:20px;margin:0 auto">${e(l.emoji||'📍')}</div>`
        }
      </td>
      <td>
        <div style="font-weight:700;font-size:13px;color:var(--text1)">${e(l.name)}</div>
      </td>
      <td style="font-size:12px;color:var(--text2)">${e(l.region)}</td>
      <td style="font-size:12px;color:var(--text2);font-weight:600;white-space:nowrap">${l.distance_from_colombo||0} km</td>
      <td style="max-width:180px">${(l.categories||[]).map(c=>`<span class="badge bgr" style="margin:1px 2px 1px 0;text-transform:capitalize">${c}</span>`).join('')||'<span style="color:var(--text3);font-size:11px">—</span>'}</td>
      <td style="text-align:center"><span class="badge bb" style="font-size:11px">${l.place_count||0}</span></td>
      <td style="text-align:center"><span class="badge bt" style="font-size:11px">${l.hotel_count||0}</span></td>
      <td style="text-align:center">${l.is_starting_point?'<span class="badge bg2">Yes</span>':'<span style="color:var(--text3);font-size:11px">No</span>'}</td>
      <td>${l.is_active?'<span class="badge bg2">Active</span>':'<span class="badge br">Hidden</span>'}</td>
      <td><div class="acts">
        <button class="ab av" onclick="openLocModal(${l.id})">Edit</button>
        <button class="ab" style="background:#6ab4cc;color:#fff" onclick="refreshImage('location',${l.id},'${e(l.name)}',this)" title="Fetch photo from Unsplash">🖼 Photo</button>
        <button class="ab ad" onclick="delLocation(${l.id},'${e(l.name)}')">Delete</button>
      </div></td>
    </tr>`).join('')
  : '<tr><td colspan="10"><div class="empty"><p>No locations found.</p></div></td></tr>';
}

function openLocModal(id) {
  const loc = id ? locations.find(l=>l.id===id) : null;
  set('m-loc-title', loc ? 'Edit Location' : 'Add Location');
  $('loc-id').value    = loc ? loc.id : '';
  $('loc-name').value  = loc ? loc.name : '';
  $('loc-region').value= loc ? loc.region : '';
  $('loc-emoji').value = loc ? loc.emoji : '📍';
  $('loc-lat').value   = loc ? loc.lat : '';
  $('loc-lon').value   = loc ? loc.lon : '';
  $('loc-dist').value  = loc ? loc.distance_from_colombo : '';
  $('loc-sort').value  = loc ? loc.sort_order : 99;
  $('loc-desc').value  = loc ? (loc.description||'') : '';
  $('loc-starting').checked = loc ? loc.is_starting_point : false;
  ['beach','adventure','cultural','wildlife','mixed'].forEach(c=>{
    $('lcat-'+c).checked = loc ? (loc.categories||[]).includes(c) : false;
  });
  $('loc-save-btn').textContent = loc ? 'Update Location' : 'Save Location';
  $('m-loc').classList.add('open');
}

async function saveLocation() {
  const id   = $('loc-id').value;
  const name = $('loc-name').value.trim();
  const region = $('loc-region').value.trim();
  if (!name) { toast('Name is required.','err'); return; }
  if (!region) { toast('Region is required.','err'); return; }
  const categories = ['beach','adventure','cultural','wildlife','mixed']
    .filter(c => $('lcat-'+c).checked);
  const body = {
    id: id ? parseInt(id) : undefined,
    name, region,
    emoji: $('loc-emoji').value.trim()||'📍',
    lat: parseFloat($('loc-lat').value)||0,
    lon: parseFloat($('loc-lon').value)||0,
    distance_from_colombo: parseInt($('loc-dist').value)||0,
    description: $('loc-desc').value.trim(),
    is_starting_point: $('loc-starting').checked?1:0,
    sort_order: parseInt($('loc-sort').value)||99,
    is_active: 1,
    categories,
  };
  const btn = $('loc-save-btn');
  btn.disabled=true; btn.textContent='Saving…';
  try {
    const d = await api('locations.php', { method: id?'PUT':'POST', body });
    if (d.success) {
      cm('m-loc');
      await loadLocations();
      toast(id ? 'Location updated.' : 'Location added.', 'ok');
    } else toast(d.message||'Failed.','err');
  } catch { toast('Network error.','err'); }
  finally { btn.disabled=false; btn.textContent = id ? 'Update Location' : 'Save Location'; }
}

async function delLocation(id, name) {
  if (!confirm('Delete location "'+name+'"?\n\nThis will also delete all its places and hotels.')) return;
  try {
    const d = await api('locations.php?id='+id, {method:'DELETE'});
    if (d.success) { await loadLocations(); await loadHotels(); toast('Location deleted.','ok'); }
    else toast(d.message||'Failed.','err');
  } catch { toast('Network error.','err'); }
}

// ── HOTELS LOAD & RENDER ─────────────────────────────
async function loadHotels() {
  try {
    const d = await api('hotels.php');
    if (!d.success) return;
    // API returns a flat array; group by location_name for the UI
    const grouped: Record<string, any[]> = {};
    (d.hotels || []).forEach(h => {
      const loc = h.location_name || 'Unknown';
      if (!grouped[loc]) grouped[loc] = [];
      grouped[loc].push(h);
    });
    hotels = grouped;
    const count = (d.hotels || []).length;
    set('nb-htl', count);
    // Populate location filter
    const sel = $('htl-loc');
    if (sel) {
      const prev = sel.value;
      sel.innerHTML = '<option value="">All Locations</option>' +
        Object.keys(hotels).map(n=>`<option value="${e(n)}" ${prev===n?'selected':''}>${e(n)}</option>`).join('');
    }
    renderHotelsList();
  } catch(e) { console.warn('loadHotels failed', e); }
}

function renderHotelsList() {
  const q    = ($('htl-s')?.value||'').toLowerCase();
  const loc  = $('htl-loc')?.value||'';
  const tier = $('htl-tier')?.value||'';
  const flat = [];
  Object.entries(hotels).forEach(([locName, arr]: [string, any]) => {
    (arr||[]).forEach(h => flat.push({...h, location_name: locName}));
  });
  const f = flat.filter(h =>
    (!loc  || h.location_name===loc) &&
    (!tier || h.tier===tier) &&
    (!q    || h.name.toLowerCase().includes(q) || h.location_name.toLowerCase().includes(q))
  );
  set('htl-c', f.length + ' hotel' + (f.length!==1?'s':''));
  const tb = $('htl-tb');
  const TIER_LABELS = {budget:'<span class="badge ba">Budget</span>',comfortable:'<span class="badge bt">Mid-Range</span>',luxury:'<span class="badge bp">Luxury</span>'};
  tb.innerHTML = f.length ? f.map(h=>`
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:10px">
          ${h.image_url
            ? `<div style="width:48px;height:38px;border-radius:8px;overflow:hidden;flex-shrink:0;border:1px solid var(--border)">
                 <img src="${e(h.image_url)}" alt="${e(h.name)}" style="width:100%;height:100%;object-fit:cover" onerror="this.parentElement.innerHTML='<div style=\'width:100%;height:100%;background:var(--surface2);display:flex;align-items:center;justify-content:center;font-size:18px\'>${e(h.emoji||'🏨')}</div>'">
               </div>`
            : `<div style="width:48px;height:38px;border-radius:8px;background:var(--surface2);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">${e(h.emoji||'🏨')}</div>`
          }
          <div>
            <div style="font-weight:600;font-size:13px;color:var(--text1)">${e(h.name)}</div>
            <div style="font-size:10px;color:var(--text3);margin-top:2px">${(h.amenities||[]).slice(0,3).join(' · ')||'—'}</div>
          </div>
        </div>
      </td>
      <td style="font-size:12px;color:var(--text2);font-weight:500">${e(h.location_name)}</td>
      <td>${TIER_LABELS[h.tier]||h.tier}</td>
      <td style="font-size:12px;color:var(--text2)"><span style="color:#f0b429">★</span> ${h.stars||3}</td>
      <td style="font-size:12px"><span style="color:#f0b429;font-weight:600">${h.rating||'—'}</span>${h.rating_text?`<span style="font-size:10px;color:var(--text3);display:block">${e(h.rating_text)}</span>`:''}</td>
      <td style="font-size:12px;font-weight:600;color:var(--text1)">${h.price_lkr?'Rs '+Number(h.price_lkr).toLocaleString():'<span style="color:var(--text3)">—</span>'}</td>
      <td>${h.is_active?'<span class="badge bg2">Active</span>':'<span class="badge bgr">Hidden</span>'}</td>
      <td><div class="acts">
        <button class="ab av" onclick='openHotelModal(${JSON.stringify(h)})'>Edit</button>
        <button class="ab" style="background:#6ab4cc;color:#fff" onclick="refreshImage('hotel',${h.id},'${e(h.name)}',this)" title="Fetch photo from Unsplash">🖼 Photo</button>
        <button class="ab ad" onclick="delHotel(${h.id},'${e(h.name)}')">Delete</button>
      </div></td>
    </tr>`).join('')
  : '<tr><td colspan="8"><div class="empty"><p>No hotels found.</p></div></td></tr>';
}

function openHotelModal(hotel) {
  const h = typeof hotel === 'object' ? hotel : null;
  set('m-hotel-title', h ? 'Edit Hotel' : 'Add Hotel');
  $('hotel-id').value       = h ? h.id : '';
  $('hotel-name').value     = h ? h.name : '';
  $('hotel-emoji').value    = h ? (h.emoji||'🏨') : '🏨';
  $('hotel-tier').value     = h ? h.tier : 'comfortable';
  $('hotel-stars').value    = h ? h.stars : 3;
  $('hotel-rating').value   = h ? (h.rating||'') : '';
  $('hotel-rtext').value    = h ? (h.ratingText||'') : '';
  $('hotel-price').value    = h ? (h.price||'') : '';
  $('hotel-desc').value     = h ? (h.desc||h.description||'') : '';
  $('hotel-url').value      = h ? (h.bookingUrl||h.booking_url||'') : '';
  $('hotel-amenities').value= h ? (h.amenities||[]).join('\n') : '';
  // Populate location selector
  const locSel = $('hotel-loc-sel');
  locSel.innerHTML = '<option value="">— Select location —</option>' +
    locations.map(l=>`<option value="${l.id}" ${h&&h.location_id===l.id?'selected':''}>${e(l.emoji||'📍')} ${e(l.name)}</option>`).join('');
  if (h && h.location_name) {
    const match = locations.find(l=>l.name===h.location_name);
    if (match) locSel.value = match.id;
  }
  $('hotel-save-btn').textContent = h ? 'Update Hotel' : 'Save Hotel';
  $('m-hotel').classList.add('open');
}

async function saveHotel() {
  const id   = $('hotel-id').value;
  const locId= $('hotel-loc-sel').value;
  const name = $('hotel-name').value.trim();
  if (!locId) { toast('Select a location.','err'); return; }
  if (!name)  { toast('Name is required.','err'); return; }
  const amenities = $('hotel-amenities').value
    .split('\n').map(s=>s.trim()).filter(Boolean);
  const body = {
    id: id ? parseInt(id) : undefined,
    location_id: parseInt(locId),
    name,
    emoji: $('hotel-emoji').value.trim()||'🏨',
    tier:  $('hotel-tier').value,
    stars: parseInt($('hotel-stars').value)||3,
    rating: $('hotel-rating').value,
    rating_text: $('hotel-rtext').value.trim(),
    price_lkr: $('hotel-price').value,
    description: $('hotel-desc').value.trim(),
    booking_url: $('hotel-url').value.trim(),
    amenities,
  };
  const btn = $('hotel-save-btn');
  btn.disabled=true; btn.textContent='Saving…';
  try {
    const d = await api('hotels.php', { method: id?'PUT':'POST', body });
    if (d.success) {
      cm('m-hotel');
      await loadHotels();
      toast(id ? 'Hotel updated.' : 'Hotel added.', 'ok');
    } else toast(d.message||'Failed.','err');
  } catch { toast('Network error.','err'); }
  finally { btn.disabled=false; btn.textContent = id ? 'Update Hotel' : 'Save Hotel'; }
}

async function delHotel(id, name) {
  if (!confirm('Delete hotel "'+name+'"?')) return;
  try {
    const d = await api('hotels.php?id='+id, {method:'DELETE'});
    if (d.success) { await loadHotels(); toast('Hotel deleted.','ok'); }
    else toast(d.message||'Failed.','err');
  } catch { toast('Network error.','err'); }
}

// ══════════════════════════════════════════════════════════════
// ── ANALYTICS MODULE ──────────────────────────────────────────
// ══════════════════════════════════════════════════════════════

let _anPeriod = 'week';
let _anData   = null;
const _charts: Record<string, any> = {};

// Destroy a chart instance safely before recreating
function _destroyChart(key) {
  if (_charts[key]) { _charts[key].destroy(); delete _charts[key]; }
}

// Teal-family palette
const PALETTE = {
  teal:   '#2aab99',
  amber:  '#dc7c32',
  green:  '#27ae7a',
  red:    '#d94f4f',
  blue:   '#3b82f6',
  purple: '#7c3aed',
};

// ── Set period & load ─────────────────────────────────────────
function setAnPeriod(p, btn) {
  _anPeriod = p;
  $qa('#an-pills .pill').forEach(b => b.classList.remove('on'));
  if (btn) btn.classList.add('on');
  const cr = $('an-custom');
  if (p === 'custom') { cr.classList.add('open'); return; }
  cr.classList.remove('open');
  loadAnalytics();
}

function applyCustomRange() {
  const f = $('an-from').value;
  const t = $('an-to').value;
  if (!f || !t) { toast('Pick a From and To date.', 'err'); return; }
  if (f > t)    { toast('From must be before To.', 'err'); return; }
  loadAnalytics(f, t);
}

// ── Load analytics data from API ─────────────────────────────
async function loadAnalytics(customFrom?, customTo?) {
  try {
    let url = `${API}/analytics.php?period=${_anPeriod}`;
    if (_anPeriod === 'custom' && customFrom) url += `&from=${customFrom}&to=${customTo}`;
    const d = await api(`analytics.php?period=${_anPeriod}${_anPeriod==='custom'&&customFrom?`&from=${customFrom}&to=${customTo}`:''}`);
    if (!d.success) { toast('Analytics load failed.', 'err'); return; }
    _anData = d;
    _renderAnalytics(d);
  } catch(err) { console.error('loadAnalytics error', err); toast('Analytics error.', 'err'); }
}

// ── Render everything ─────────────────────────────────────────
function _renderAnalytics(d) {
  const s  = d.summary;
  const pd = d.period;

  // Period label
  const fmt = x => new Date(x).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
  set('an-period-label', `${fmt(pd.start)} → ${fmt(pd.end)}`);

  // Summary cards
  set('an-s-users',   s.new_users);
  set('an-s-trips',   s.new_trips);
  set('an-s-reviews', s.new_reviews);
  set('an-s-rev',     'LKR ' + Number(s.total_revenue).toLocaleString());
  set('an-s-users-sub',   s.new_users   > 0 ? 'in period' : 'none this period');
  set('an-s-trips-sub',   s.new_trips   > 0 ? 'in period' : 'none this period');
  set('an-s-reviews-sub', s.new_reviews > 0 ? 'in period' : 'none this period');
  set('an-s-rev-sub',     `${s.total_sales} sale${s.total_sales!==1?'s':''}`);

  // Charts
  _chartUsers(d.user_growth);
  _chartRevenue(d.sales);
  _chartPlaces(d.top_places);
  _chartTrips(d.trip_activity);
  _chartReviews(d.review_activity);
  _chartRatings(d.ratings_dist);
  _chartPlans(d.sales_by_plan);
}

// ── Shared chart defaults ─────────────────────────────────────
// Returned as `any`: every _chartX() below adds a `.data` property (and some
// add `scales.x/y.stacked`, `legend.position`, etc.) after calling this,
// which a literal return type wouldn't allow without re-declaring the whole
// shape per chart.
function _baseOpts(type='line'): any {
  return {
    type,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#12201a',
          titleFont: { family: "'Montserrat', sans-serif", size: 12 },
          bodyFont:  { family: "'Montserrat', sans-serif", size: 11 },
          padding: 10, cornerRadius: 8,
        },
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { family: "'Montserrat', sans-serif", size: 10 }, color: '#8c9489' } },
        y: { grid: { color: 'rgba(0,0,0,.05)' }, ticks: { font: { family: "'Montserrat', sans-serif", size: 10 }, color: '#8c9489' }, beginAtZero: true },
      },
    },
  };
}

// ── User Growth ───────────────────────────────────────────────
function _chartUsers(data) {
  _destroyChart('users');
  const labels = (data||[]).map(r=>r.label);
  const vals   = (data||[]).map(r=>+r.cnt);
  const ctx    = $('ch-users').getContext('2d');
  const opts   = _baseOpts('line');
  opts.data    = {
    labels,
    datasets: [{
      label: 'New Users',
      data: vals,
      borderColor: PALETTE.teal,
      backgroundColor: 'rgba(42,171,153,.1)',
      borderWidth: 2.5,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: PALETTE.teal,
      pointRadius: vals.length < 15 ? 4 : 2,
    }],
  };
  _charts.users = new Chart(ctx, opts);
}

// ── Revenue ───────────────────────────────────────────────────
function _chartRevenue(data) {
  _destroyChart('revenue');
  const labels = (data||[]).map(r=>r.label);
  const vals   = (data||[]).map(r=>+(r.revenue||0));
  const ctx    = $('ch-revenue').getContext('2d');
  const opts   = _baseOpts('bar');
  opts.data    = {
    labels,
    datasets: [{
      label: 'Revenue (LKR)',
      data: vals,
      backgroundColor: 'rgba(245,166,35,.7)',
      borderColor: PALETTE.amber,
      borderWidth: 1.5,
      borderRadius: 6,
    }],
  };
  _charts.revenue = new Chart(ctx, opts);
}

// ── Top Crowded Places (horizontal bar) ──────────────────────
function _chartPlaces(data) {
  _destroyChart('places');
  if (!data || !data.length) {
    $('ch-places').parentElement.innerHTML = '<div class="an-empty">No review data for this period.</div>';
    return;
  }
  const labels = data.map(r => r.place_name);
  const counts = data.map(r => +r.review_count);
  const avgs   = data.map(r => +(r.avg_rating||0));
  const ctx    = $('ch-places').getContext('2d');
  _charts.places = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Reviews',
          data: counts,
          backgroundColor: labels.map((_,i) =>
            `hsla(${170 - i*10},60%,${45 + i*2}%,0.8)`),
          borderRadius: 5,
          borderSkipped: false,
        },
      ],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#12201a',
          titleFont: { family: "'Montserrat', sans-serif", size: 12 },
          bodyFont:  { family: "'Montserrat', sans-serif", size: 11 },
          padding: 10, cornerRadius: 8,
          callbacks: {
            afterBody: (items) => {
              const i = items[0].dataIndex;
              return `Avg Rating: ${avgs[i]} ⭐`;
            }
          }
        },
      },
      scales: {
        x: { grid: { color: 'rgba(0,0,0,.05)' }, ticks: { font: { family: "'Montserrat', sans-serif", size: 10 }, color: '#8c9489' }, beginAtZero: true },
        y: { grid: { display: false }, ticks: { font: { family: "'Montserrat', sans-serif", size: 11, weight: '600' }, color: '#1a1f18' } },
      },
    },
  });
}

// ── Trip Activity (stacked bar) ───────────────────────────────
function _chartTrips(data) {
  _destroyChart('trips');
  const labels  = (data||[]).map(r=>r.label);
  const budget  = (data||[]).map(r=>+(r.budget_cnt||0));
  const dest    = (data||[]).map(r=>+(r.dest_cnt||0));
  const ctx     = $('ch-trips').getContext('2d');
  const opts    = _baseOpts('bar');
  opts.data     = {
    labels,
    datasets: [
      { label: 'Budget', data: budget, backgroundColor: 'rgba(220,124,50,.75)', borderRadius: 5, stack: 'trips' },
      { label: 'Destination', data: dest, backgroundColor: 'rgba(59,130,246,.75)', borderRadius: 5, stack: 'trips' },
    ],
  };
  opts.options.plugins.legend = {
    display: true,
    position: 'top',
    labels: { font: { family: "'Montserrat', sans-serif", size: 11 }, boxWidth: 10, boxHeight: 10, padding: 14 },
  };
  opts.options.scales.x.stacked = true;
  opts.options.scales.y.stacked = true;
  _charts.trips = new Chart(ctx, opts);
}

// ── Review Activity ───────────────────────────────────────────
function _chartReviews(data) {
  _destroyChart('reviews');
  const labels = (data||[]).map(r=>r.label);
  const vals   = (data||[]).map(r=>+r.cnt);
  const ctx    = $('ch-reviews').getContext('2d');
  const opts   = _baseOpts('line');
  opts.data    = {
    labels,
    datasets: [{
      label: 'Reviews',
      data: vals,
      borderColor: PALETTE.green,
      backgroundColor: 'rgba(39,174,122,.1)',
      borderWidth: 2.5,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: PALETTE.green,
      pointRadius: vals.length < 15 ? 4 : 2,
    }],
  };
  _charts.reviews = new Chart(ctx, opts);
}

// ── Rating Distribution (doughnut) ───────────────────────────
function _chartRatings(data) {
  _destroyChart('ratings');
  const allStars = [1,2,3,4,5];
  const map = {};
  (data||[]).forEach(r => { map[r.rating] = +r.cnt; });
  const vals = allStars.map(s => map[s]||0);
  const labels = allStars.map(s => `${s} ★`);
  const colors = ['#d94f4f','#dc7c32','#f0b429','#27ae7a','#2aab99'];
  const ctx = $('ch-ratings').getContext('2d');
  _charts.ratings = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{ data: vals, backgroundColor: colors, borderWidth: 2, borderColor: '#fff', hoverOffset: 6 }],
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '62%',
      plugins: {
        legend: {
          display: true, position: 'right',
          labels: { font: { family: "'Montserrat', sans-serif", size: 11 }, padding: 12 },
        },
        tooltip: {
          backgroundColor: '#12201a',
          titleFont: { family: "'Montserrat', sans-serif", size: 12 },
          bodyFont:  { family: "'Montserrat', sans-serif", size: 11 },
          padding: 10, cornerRadius: 8,
        },
      },
    },
  });
}

// ── Sales by Plan (pie) ───────────────────────────────────────
function _chartPlans(data) {
  _destroyChart('plans');
  if (!data || !data.length) {
    $('ch-plans').parentElement.innerHTML = '<div class="an-empty">No premium sales data for this period.</div>';
    return;
  }
  const labels = data.map(r=>r.plan_name);
  const vals   = data.map(r=>+r.cnt);
  const colors = [PALETTE.purple, PALETTE.amber, PALETTE.teal, PALETTE.green];
  const ctx    = $('ch-plans').getContext('2d');
  _charts.plans = new Chart(ctx, {
    type: 'pie',
    data: {
      labels,
      datasets: [{ data: vals, backgroundColor: colors.slice(0,labels.length), borderWidth: 2, borderColor: '#fff' }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true, position: 'right',
          labels: { font: { family: "'Montserrat', sans-serif", size: 11 }, padding: 12 },
        },
        tooltip: {
          backgroundColor: '#12201a',
          titleFont: { family: "'Montserrat', sans-serif", size: 12 },
          bodyFont:  { family: "'Montserrat', sans-serif", size: 11 },
          padding: 10, cornerRadius: 8,
          callbacks: {
            label: (ctx) => {
              const rev = (data[ctx.dataIndex]?.revenue||0);
              return ` ${ctx.parsed} sales · LKR ${Number(rev).toLocaleString()}`;
            },
          },
        },
      },
    },
  });
}

// ── Most Visited Places in Sri Lanka (Overpass / OpenStreetMap API) ──────────
// Curated fallback data derived from known Sri Lanka tourism statistics
const _sriLankaFallback = [
  { name: 'Kandy',           count: 148, region: 'Central Province'   },
  { name: 'Colombo',         count: 142, region: 'Western Province'   },
  { name: 'Galle',           count: 129, region: 'Southern Province'  },
  { name: 'Sigiriya',        count: 112, region: 'North Central'      },
  { name: 'Nuwara Eliya',    count: 96,  region: 'Central Province'   },
  { name: 'Negombo',         count: 84,  region: 'Western Province'   },
  { name: 'Anuradhapura',    count: 79,  region: 'North Central'      },
  { name: 'Mirissa',         count: 66,  region: 'Southern Province'  },
  { name: 'Ella',            count: 61,  region: 'Uva Province'       },
  { name: 'Trincomalee',     count: 53,  region: 'Eastern Province'   },
  { name: 'Hikkaduwa',       count: 49,  region: 'Southern Province'  },
  { name: 'Polonnaruwa',     count: 45,  region: 'North Central'      },
];

let _visitedTimer = null; // guard against stale fallback timeouts

async function loadVisitedPlaces(forceRefresh?) {
  const canvas  = $('ch-visited');
  const loadDiv = $('visited-loading');
  if (!canvas || !loadDiv) return;

  // Cancel any pending fallback timeout from a previous call (race condition fix)
  if (_visitedTimer) { clearTimeout(_visitedTimer); _visitedTimer = null; }

  _destroyChart('visited');
  canvas.style.display  = 'none';
  loadDiv.style.display = 'block';
  loadDiv.textContent   = '⏳ Fetching attraction data from OpenStreetMap…';

  // Helper to show the chart (used by both success and fallback paths)
  function _showVisited(data, source) {
    loadDiv.style.display = 'none';
    canvas.style.display  = 'block';   // Bug 4 fix: was missing from success path
    _chartVisited(data, source);
  }

  try {
    // Overpass QL — count tourism=attraction nodes per named city/town in Sri Lanka
    const query = `
[out:json][timeout:35];
area["ISO3166-1"="LK"]["admin_level"="2"]->.lk;
node["tourism"~"^(attraction|museum|viewpoint|theme_park|zoo|aquarium|artwork|gallery)$"](area.lk);
out tags;`;

    const resp = await fetch('https://overpass-api.de/api/interpreter', {
      method : 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body   : 'data=' + encodeURIComponent(query),
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const json = await resp.json();

    // Tally attractions per city tag
    const tally: Record<string, number> = {};
    (json.elements || []).forEach(el => {
      const city = el.tags?.['addr:city']
                || el.tags?.['is_in:city']
                || el.tags?.['addr:town']
                || el.tags?.['addr:district']
                || null;
      if (city) tally[city] = (tally[city] || 0) + 1;
    });

    const sorted = Object.entries(tally)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([name, count]) => ({ name, count }));

    if (sorted.length < 3) throw new Error('Insufficient city-tagged data');

    _showVisited(sorted, 'OpenStreetMap');

  } catch (err) {
    console.warn('Overpass API unavailable, using curated data:', err);
    loadDiv.textContent = '📡 Live data unavailable — showing curated tourism statistics.';
    // Bug 2 fix: store timer ref so a re-call can cancel it before it fires
    _visitedTimer = setTimeout(() => {
      _visitedTimer = null;
      _showVisited(_sriLankaFallback, 'Curated Tourism Data');
    }, 1200);
  }
}

function _chartVisited(data, source) {
  _destroyChart('visited');
  const labels = data.map(r => r.name);
  const counts = data.map(r => r.count);
  const regions = data.map(r => r.region || '');

  // Gradient colour palette — warm amber → teal sweep
  const colours = labels.map((_, i) => {
    const t = i / Math.max(labels.length - 1, 1);
    const r = Math.round(220 - t * 80);   // 220 → 140
    const g = Math.round(124 + t * 47);   // 124 → 171
    const b = Math.round(50  + t * 103);  // 50  → 153
    return `rgba(${r},${g},${b},0.82)`;
  });

  const ctx = $('ch-visited').getContext('2d');
  _charts.visited = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Tourist Attractions',
        data: counts,
        backgroundColor: colours,
        borderColor: colours.map(c => c.replace('0.82', '1')),
        borderWidth: 1.5,
        borderRadius: 7,
        borderSkipped: false,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#12201a',
          titleFont: { family: "'Montserrat', sans-serif", size: 12, weight: '700' },
          bodyFont:  { family: "'Montserrat', sans-serif", size: 11 },
          padding: 12, cornerRadius: 9,
          callbacks: {
            title: (items) => items[0].label,
            label: (ctx) => {
              const reg = regions[ctx.dataIndex];
              return [
                ` 📍 ${ctx.parsed.y} attractions`,
                reg ? ` 🏡 ${reg}` : '',
              ].filter(Boolean);
            },
            afterBody: () => source ? [`\n Source: ${source}`] : [],
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            font: { family: "'Montserrat', sans-serif", size: 10, weight: '600' },
            color: '#1a1f18',
            maxRotation: 30,
          },
        },
        y: {
          grid: { color: 'rgba(0,0,0,.05)' },
          ticks: {
            font: { family: "'Montserrat', sans-serif", size: 10 },
            color: '#8c9489',
            stepSize: 20,
          },
          beginAtZero: true,
          title: {
            display: true,
            text: 'No. of Tourist Attractions',
            font: { family: "'Montserrat', sans-serif", size: 10 },
            color: '#8c9489',
          },
        },
      },
    },
  });
}

// ── Download PDF Report ──────────────────────────────────────
async function downloadReport() {
  if (!_anData) { toast('Load analytics first.', 'err'); return; }
  toast('Generating PDF report…');

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const d  = _anData;
  const s  = d.summary;
  const pd = d.period;
  const fmt = x => new Date(x).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
  const periodLabel = `${fmt(pd.start)} – ${fmt(pd.end)}`;

  // ── Header ──
  doc.setFillColor(18, 32, 26);
  doc.rect(0, 0, 210, 28, 'F');
  doc.setTextColor(255,255,255);
  doc.setFont('helvetica','bold');
  doc.setFontSize(20);
  doc.text('Xtrack — Analytics Report', 14, 16);
  doc.setFontSize(9);
  doc.setFont('helvetica','normal');
  doc.setTextColor(42,171,153);
  doc.text(`Period: ${periodLabel}`, 14, 24);
  doc.text(`Generated: ${new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}`, 150, 24);

  let y = 36;

  // ── Summary Stats ──
  doc.setTextColor(30,30,30);
  doc.setFont('helvetica','bold');
  doc.setFontSize(13);
  doc.text('Summary', 14, y); y += 6;

  doc.autoTable({
    startY: y,
    head: [['Metric', 'Value']],
    body: [
      ['New Users',        s.new_users],
      ['New Trips',        s.new_trips],
      ['New Reviews',      s.new_reviews],
      ['Premium Sales',    s.total_sales],
      ['Total Revenue',   `LKR ${Number(s.total_revenue).toLocaleString()}`],
    ],
    theme: 'grid',
    headStyles: { fillColor: [18,32,26], textColor: 255, fontStyle: 'bold', fontSize: 10 },
    bodyStyles: { fontSize: 10 },
    columnStyles: { 0: { fontStyle: 'bold' } },
    margin: { left: 14, right: 14 },
  });
  y = doc.lastAutoTable.finalY + 10;

  // ── Crowded Places ──
  if (d.top_places && d.top_places.length) {
    doc.setFont('helvetica','bold');
    doc.setFontSize(13);
    doc.setTextColor(30,30,30);
    doc.text('Most Crowded Places', 14, y); y += 2;
    doc.autoTable({
      startY: y,
      head: [['Rank', 'Place', 'Reviews', 'Avg Rating']],
      body: d.top_places.map((p,i) => [
        i+1,
        p.place_name,
        p.review_count,
        p.avg_rating + ' ★',
      ]),
      theme: 'striped',
      headStyles: { fillColor: [42,171,153], textColor: 255, fontStyle: 'bold', fontSize: 10 },
      bodyStyles: { fontSize: 10 },
      margin: { left: 14, right: 14 },
    });
    y = doc.lastAutoTable.finalY + 10;
  }

  // ── User Growth ──
  if (d.user_growth && d.user_growth.length) {
    if (y > 220) { doc.addPage(); y = 20; }
    doc.setFont('helvetica','bold');
    doc.setFontSize(13);
    doc.setTextColor(30,30,30);
    doc.text('User Growth', 14, y); y += 2;
    doc.autoTable({
      startY: y,
      head: [['Period', 'New Users']],
      body: d.user_growth.map(r => [r.label, r.cnt]),
      theme: 'striped',
      headStyles: { fillColor: [18,32,26], textColor: 255, fontStyle: 'bold', fontSize: 10 },
      bodyStyles: { fontSize: 10 },
      margin: { left: 14, right: 14 },
    });
    y = doc.lastAutoTable.finalY + 10;
  }

  // ── Trip Activity ──
  if (d.trip_activity && d.trip_activity.length) {
    if (y > 220) { doc.addPage(); y = 20; }
    doc.setFont('helvetica','bold');
    doc.setFontSize(13);
    doc.setTextColor(30,30,30);
    doc.text('Trip Activity', 14, y); y += 2;
    doc.autoTable({
      startY: y,
      head: [['Period', 'Total', 'Budget', 'Destination']],
      body: d.trip_activity.map(r => [r.label, r.cnt, r.budget_cnt||0, r.dest_cnt||0]),
      theme: 'striped',
      headStyles: { fillColor: [220,124,50], textColor: 255, fontStyle: 'bold', fontSize: 10 },
      bodyStyles: { fontSize: 10 },
      margin: { left: 14, right: 14 },
    });
    y = doc.lastAutoTable.finalY + 10;
  }

  // ── Premium Sales ──
  if (d.sales && d.sales.length) {
    if (y > 220) { doc.addPage(); y = 20; }
    doc.setFont('helvetica','bold');
    doc.setFontSize(13);
    doc.setTextColor(30,30,30);
    doc.text('Premium Sales', 14, y); y += 2;
    doc.autoTable({
      startY: y,
      head: [['Period', 'Sales', 'Revenue (LKR)']],
      body: d.sales.map(r => [r.label, r.cnt, 'LKR '+Number(r.revenue||0).toLocaleString()]),
      theme: 'striped',
      headStyles: { fillColor: [124,58,237], textColor: 255, fontStyle: 'bold', fontSize: 10 },
      bodyStyles: { fontSize: 10 },
      margin: { left: 14, right: 14 },
    });
    y = doc.lastAutoTable.finalY + 10;
  }

  // ── Most Visited Places in Sri Lanka ──
  const visitedData = (_charts.visited?.data?.labels || []).map((name, i) => ({
    name,
    count: _charts.visited.data.datasets[0].data[i],
  }));
  if (visitedData.length) {
    if (y > 220) { doc.addPage(); y = 20; }
    doc.setFont('helvetica','bold');
    doc.setFontSize(13);
    doc.setTextColor(30,30,30);
    doc.text('Most Visited Places in Sri Lanka', 14, y); y += 2;
    doc.autoTable({
      startY: y,
      head: [['Rank', 'City / Destination', 'Tourist Attractions']],
      body: visitedData.map((p, i) => [i + 1, p.name, p.count]),
      theme: 'striped',
      headStyles: { fillColor: [42, 171, 153], textColor: 255, fontStyle: 'bold', fontSize: 10 },
      bodyStyles: { fontSize: 10 },
      columnStyles: { 0: { halign: 'center' }, 2: { halign: 'center' } },
      margin: { left: 14, right: 14 },
    });
    y = doc.lastAutoTable.finalY + 10;
  }

  // ── Footer on each page ──
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(140,148,137);
    doc.setFont('helvetica','normal');
    doc.text(`Xtrack Admin · Analytics Report · ${periodLabel}`, 14, 290);
    doc.text(`Page ${i} of ${pageCount}`, 190, 290, { align: 'right' });
  }

  const fname = `xtrack-analytics-${pd.start}-to-${pd.end}.pdf`;
  doc.save(fname);
  toast('Report downloaded!', 'ok');
}
