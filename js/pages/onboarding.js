// ══════════════════════════════════════════════════
//   PLACE POOL  (rich metadata for smart matching)
// ══════════════════════════════════════════════════
const PLACES = [
    { n: "Ella Rock", gr: "linear-gradient(135deg,#0d1f0d,#1e5c30)", em: "🏔️",
        style: ["adventure"], env: ["mountains"], comp: ["solo", "couple", "friends"], bud: ["budget", "midrange", "varies"],
        why: { adventure: "Epic Summit Hike", mountains: "360° Peak Views", solo: "Solo Summit", couple: "Romantic Climb", friends: "Group Hike Challenge" },
        tags: ["Challenging Hike", "360° Views", "Tea Country"] },
    { n: "Sigiriya Rock Fortress", gr: "linear-gradient(135deg,#4a1f00,#c26024)", em: "🪨",
        style: ["adventure", "culture"], env: ["heritage", "mountains"], comp: ["solo", "couple", "family", "friends"], bud: ["midrange", "premium", "varies"],
        why: { adventure: "Ancient Rock Fortress Climb", culture: "5th Century Wonder", heritage: "UNESCO Marvel", mountains: "Sky-High Summit", family: "Iconic Family Day" },
        tags: ["UNESCO", "Ancient Palace", "1,200 Steps"] },
    { n: "Knuckles Mountain Range", gr: "linear-gradient(135deg,#0a2015,#1a6640)", em: "🌿",
        style: ["adventure"], env: ["mountains", "remote"], comp: ["solo", "friends"], bud: ["budget", "midrange", "varies"],
        why: { adventure: "Multi-Day Wilderness Trek", mountains: "Misty Untamed Peaks", remote: "Deep Wilderness", solo: "Off-Grid Expedition", friends: "Group Trek Adventure" },
        tags: ["Trekking", "Cloud Forest", "Endemic Wildlife"] },
    { n: "Horton Plains & World's End", gr: "linear-gradient(135deg,#112233,#4a8cc0)", em: "🌁",
        style: ["adventure", "relaxation"], env: ["mountains", "remote"], comp: ["solo", "couple", "family", "friends"], bud: ["midrange", "varies"],
        why: { adventure: "World's End Cliff Drop", relaxation: "Serene High Plateau", mountains: "High-Altitude Loop", remote: "Isolated Cloud Forest", couple: "Sunrise Together", family: "Nature Walk Together" },
        tags: ["880m Cliff Drop", "Cloud Forest", "Sambar Deer"] },
    { n: "Kitulgala White Water Rafting", gr: "linear-gradient(135deg,#0a1f40,#1a5a8a)", em: "🚣",
        style: ["adventure", "nightlife"], env: ["mountains", "remote"], comp: ["friends", "couple"], bud: ["midrange", "premium", "varies"],
        why: { adventure: "Heart-Pumping Rapids", nightlife: "Adrenaline Group Buzz", friends: "Ultimate Group Activity", couple: "Thrill Shared Together" },
        tags: ["Grade 3–4 Rapids", "Jungle River", "Award-Winning"] },
    { n: "Adam's Peak", gr: "linear-gradient(135deg,#1a0a2e,#8a4aaa)", em: "⛰️",
        style: ["adventure", "culture"], env: ["mountains", "heritage"], comp: ["solo", "couple", "friends", "family"], bud: ["budget", "midrange", "varies"],
        why: { adventure: "Night Summit Trek", culture: "Sacred Buddhist Footprint", heritage: "Pilgrimage Destination", solo: "Spiritual Solo Journey", couple: "Sunrise at the Top", friends: "Night Hike Adventure" },
        tags: ["Sunrise Summit", "Sacred Site", "5,558 Steps"] },
    { n: "Pidurangala Rock", gr: "linear-gradient(135deg,#1e2e10,#5a9a1e)", em: "🧗",
        style: ["adventure", "culture"], env: ["heritage", "mountains"], comp: ["solo", "couple", "friends"], bud: ["budget", "varies"],
        why: { adventure: "Boulder Scramble", culture: "Ancient Reclining Buddha", heritage: "Hidden Rock Temple", solo: "Budget Adventure", couple: "Sunrise View of Sigiriya", friends: "Short Fun Climb" },
        tags: ["Sunrise Views", "Budget Pick", "Best View of Sigiriya"] },
    { n: "Lipton's Seat", gr: "linear-gradient(135deg,#0a2010,#3a8a50)", em: "🍃",
        style: ["relaxation", "culture"], env: ["mountains", "countryside"], comp: ["couple", "solo", "family"], bud: ["budget", "midrange", "varies"],
        why: { relaxation: "Tea Estate Serenity", culture: "Colonial Tea Heritage", countryside: "Rolling Tea Hills", couple: "Most Romantic Viewpoint", family: "Scenic Tuk-Tuk Ride" },
        tags: ["Endless Tea Horizon", "Heritage", "Tamil Tea Pluckers"] },
    { n: "Mirissa Beach", gr: "linear-gradient(135deg,#0a1f50,#2a70d0)", em: "🏖️",
        style: ["relaxation", "food", "nightlife"], env: ["beach"], comp: ["couple", "friends", "solo", "family"], bud: ["budget", "midrange", "varies"],
        why: { relaxation: "Perfect Golden Beach", food: "Fresh Seafood & Coconuts", nightlife: "Beach Bar Scene", beach: "Sheltered Crescent Bay", couple: "Sunset Romance", friends: "Social Beach Spot", solo: "Laid-Back Escape" },
        tags: ["Whale Watching", "Sunset Beach", "Coconut Palms"] },
    { n: "Unawatuna", gr: "linear-gradient(135deg,#0a2840,#1a6888)", em: "🌊",
        style: ["relaxation", "nightlife", "food"], env: ["beach"], comp: ["friends", "couple", "solo"], bud: ["budget", "midrange", "varies"],
        why: { relaxation: "Calm Protected Cove", nightlife: "Beach Bar Strip", food: "Beachside Restaurant Scene", beach: "Natural Swimming Bay", friends: "Social Beach Town", couple: "Romantic Evenings" },
        tags: ["Snorkelling", "Beach Bars", "Galle Day Trip"] },
    { n: "Arugam Bay", gr: "linear-gradient(135deg,#0a2010,#1a7060)", em: "🏄",
        style: ["adventure", "relaxation", "nightlife"], env: ["beach", "remote"], comp: ["solo", "friends", "couple"], bud: ["budget", "midrange", "varies"],
        why: { adventure: "World-Class Surfing", relaxation: "Laid-Back Surf Town", nightlife: "Surf Town Party Nights", beach: "Epic Right-Hand Breaks", solo: "Backpacker Paradise", friends: "Surf & Socialize" },
        tags: ["World-Class Surf", "Bohemian Vibes", "East Coast Sunsets"] },
    { n: "Trincomalee", gr: "linear-gradient(135deg,#0a1a3a,#1a50a0)", em: "🐬",
        style: ["adventure", "relaxation"], env: ["beach", "heritage"], comp: ["couple", "family", "solo", "friends"], bud: ["midrange", "premium", "varies"],
        why: { adventure: "Scuba Diving & Snorkelling", relaxation: "Crystal Clear Waters", beach: "Pristine Untouched Beaches", heritage: "Dutch Fort Ruins", couple: "Romantic Harbour Town", family: "Safe Calm Swimming" },
        tags: ["Diving", "Dolphins", "Colonial Fort"] },
    { n: "Bentota", gr: "linear-gradient(135deg,#0a2030,#1a6070)", em: "🌴",
        style: ["relaxation"], env: ["beach", "countryside"], comp: ["couple", "family"], bud: ["midrange", "premium", "varies"],
        why: { relaxation: "Luxury Beach Escape", beach: "Blue Lagoon & Calm Sea", couple: "Honeymoon Favourite", family: "Safe Family Beach Resort" },
        tags: ["Water Sports", "Luxury Resorts", "Blue Lagoon"] },
    { n: "Pasikuda Beach", gr: "linear-gradient(135deg,#051520,#0a4060)", em: "🏊",
        style: ["relaxation"], env: ["beach", "remote"], comp: ["couple", "family", "solo"], bud: ["midrange", "premium"],
        why: { relaxation: "Crystal Shallow Lagoon", beach: "Sri Lanka's Shallowest Bay", family: "Safest Swimming in Sri Lanka", couple: "Secluded Paradise", solo: "Peaceful Escape" },
        tags: ["Shallow Turquoise Water", "Pristine", "East Coast Gem"] },
    { n: "Galle Fort", gr: "linear-gradient(135deg,#0a1830,#1a408a)", em: "🏯",
        style: ["culture", "food", "relaxation"], env: ["heritage", "urban"], comp: ["couple", "solo", "friends", "family"], bud: ["midrange", "premium", "varies"],
        why: { culture: "400 Years of Colonial History", food: "World-Class Cafés & Cuisine", relaxation: "Sunset Rampart Walk", heritage: "Best Colonial Fort in Asia", couple: "Most Romantic Town in Lanka", friends: "Boutique & Bar Scene" },
        tags: ["UNESCO", "Dutch Colonial", "Boutique Scene"] },
    { n: "Temple of the Tooth", gr: "linear-gradient(135deg,#5c3a00,#c47820)", em: "🛕",
        style: ["culture", "relaxation"], env: ["heritage", "urban"], comp: ["solo", "couple", "family", "friends"], bud: ["budget", "midrange", "varies"],
        why: { culture: "Sri Lanka's Most Sacred Site", heritage: "Buddha's Tooth Relic", relaxation: "Evening Puja Ceremony", solo: "Profound Spiritual Experience", family: "Living Cultural History" },
        tags: ["Sacred Relic", "Puja Ceremony", "Kandyan Heritage"] },
    { n: "Polonnaruwa Ruins", gr: "linear-gradient(135deg,#2e1500,#a05a10)", em: "🗿",
        style: ["culture", "adventure"], env: ["heritage", "countryside"], comp: ["solo", "couple", "family"], bud: ["midrange", "varies"],
        why: { culture: "Medieval Kingdom Ruins", heritage: "UNESCO Ancient Capital", adventure: "Bicycle Through Ruins", countryside: "Jungle Archaeological Park", solo: "History Immersion", couple: "Sunrise Bicycle Ride" },
        tags: ["UNESCO", "Bicycle Tour", "Gal Vihara Rock Sculptures"] },
    { n: "Dambulla Cave Temple", gr: "linear-gradient(135deg,#2e1200,#8a4000)", em: "🕌",
        style: ["culture"], env: ["heritage"], comp: ["solo", "couple", "family", "friends"], bud: ["budget", "midrange", "varies"],
        why: { culture: "2,000 Years of Buddhist Art", heritage: "5 Sacred Cave Shrines", solo: "Meditative Experience", family: "Awe-Inspiring History", couple: "Ancient Wonder Together" },
        tags: ["UNESCO", "2,100m² of Frescoes", "Golden Rock Monastery"] },
    { n: "Anuradhapura Sacred City", gr: "linear-gradient(135deg,#0d2500,#1a6600)", em: "🌳",
        style: ["culture", "relaxation"], env: ["heritage", "countryside"], comp: ["solo", "couple", "family"], bud: ["budget", "midrange", "varies"],
        why: { culture: "Sri Lanka's Oldest Capital", heritage: "2,300-Year-Old Sacred Tree", relaxation: "Peaceful Ancient Town", countryside: "Open Plains & Stupas", solo: "Deep Historical Immersion" },
        tags: ["Sacred Bo Tree", "Giant Stupas", "Ancient Capital"] },
    { n: "Jaffna", gr: "linear-gradient(135deg,#1a0a00,#8a3010)", em: "🕍",
        style: ["culture", "food"], env: ["heritage", "urban"], comp: ["solo", "couple", "friends"], bud: ["budget", "midrange"],
        why: { culture: "Unique Tamil Heritage", food: "Exceptional Jaffna Cuisine", heritage: "Fort & Hindu Temple Circuit", solo: "Off the Beaten Path", friends: "Cultural Deep-Dive" },
        tags: ["Tamil Culture", "Hidden Gem", "Authentic Local Life"] },
    { n: "Colombo", gr: "linear-gradient(135deg,#050e20,#1a2a5a)", em: "🌆",
        style: ["food", "nightlife", "culture"], env: ["urban"], comp: ["solo", "couple", "friends"], bud: ["midrange", "premium", "varies"],
        why: { food: "Sri Lanka's Best Food Scene", nightlife: "Rooftop Bars & Clubs", culture: "Colonial Meets Modern", urban: "Cosmopolitan Capital", friends: "Night Out Hub", solo: "Urban Explorer's Base" },
        tags: ["Rooftop Bars", "Street Food", "Pettah Market"] },
    { n: "Galle Face Green", gr: "linear-gradient(135deg,#0a1520,#1a4060)", em: "🌅",
        style: ["relaxation", "food", "nightlife"], env: ["urban", "beach"], comp: ["family", "couple", "friends", "solo"], bud: ["budget", "midrange", "varies"],
        why: { relaxation: "Breezy Sunset Promenade", food: "Street Food Paradise", nightlife: "Evening Gathering Spot", urban: "Colombo's Heartbeat", family: "Kite-Flying at Sunset", couple: "Romantic Seafront Walk" },
        tags: ["Sunset Promenade", "Street Food", "Colombo Landmark"] },
    { n: "Yala National Park", gr: "linear-gradient(135deg,#1e1000,#8a4010)", em: "🐆",
        style: ["adventure", "relaxation"], env: ["remote", "countryside"], comp: ["couple", "family", "friends", "solo"], bud: ["midrange", "premium", "varies"],
        why: { adventure: "World's Densest Leopard Safari", relaxation: "Sunrise Jeep Drive", remote: "Wild Untamed Dry Zone", couple: "Unforgettable Wildlife Safari", family: "Amazing for Kids", friends: "Group Safari Experience", solo: "Solitary Wild Encounter" },
        tags: ["Leopard Spotting", "Jeep Safari", "Iconic Wildlife"] },
    { n: "Minneriya National Park", gr: "linear-gradient(135deg,#0d2010,#2a6a30)", em: "🐘",
        style: ["adventure", "culture"], env: ["countryside", "heritage"], comp: ["family", "couple", "friends", "solo"], bud: ["midrange", "varies"],
        why: { adventure: "The Greatest Elephant Gathering", culture: "Ancient Irrigation Heritage", countryside: "Open Grassland Safari", family: "Magical Wildlife for Kids", couple: "Unique Shared Memory" },
        tags: ["300+ Wild Elephants", "The Gathering", "Ancient Tank"] },
    { n: "Sinharaja Rainforest", gr: "linear-gradient(135deg,#041a08,#0d5020)", em: "🌳",
        style: ["adventure", "relaxation"], env: ["remote", "mountains"], comp: ["solo", "couple", "friends"], bud: ["midrange", "varies"],
        why: { adventure: "Virgin Rainforest Trek", relaxation: "Ancient Forest Silence", remote: "Last Primary Rainforest", solo: "Rare Birdwatching", couple: "Green Wilderness Escape", friends: "Guided Forest Expedition" },
        tags: ["UNESCO Biosphere", "Endemic Species", "Pristine Jungle"] },
    { n: "Udawalawe Safari", gr: "linear-gradient(135deg,#2a1200,#905020)", em: "🦏",
        style: ["adventure"], env: ["remote", "countryside"], comp: ["family", "couple", "solo", "friends"], bud: ["midrange", "premium", "varies"],
        why: { adventure: "Open Plains Wild Safari", remote: "Vast Wilderness Reserve", family: "Best Family Wildlife Park", couple: "Sunrise Safari Memories", solo: "Lone Wildlife Encounter" },
        tags: ["Wild Elephant Herds", "Open Plains", "Jeep Safari"] },
    { n: "Pinnawala Elephant Orphanage", gr: "linear-gradient(135deg,#102a10,#1a8040)", em: "🐘",
        style: ["culture", "relaxation"], env: ["countryside"], comp: ["family", "couple", "solo"], bud: ["midrange", "varies"],
        why: { culture: "Conservation Story & History", relaxation: "Heartwarming Experience", family: "Kids Absolutely Love It", couple: "Unforgettable Encounter", solo: "Inspiring Visit" },
        tags: ["80+ Rescued Elephants", "River Bathing", "Baby Feeding"] },
    { n: "Nine Arch Bridge, Ella", gr: "linear-gradient(135deg,#0a2010,#1a7060)", em: "🌉",
        style: ["culture", "adventure", "relaxation"], env: ["mountains", "countryside", "heritage"], comp: ["couple", "solo", "friends", "family"], bud: ["budget", "midrange", "varies"],
        why: { culture: "Colonial Engineering Marvel", adventure: "Tea Estate Trail Walk", relaxation: "Morning Train Crossing", countryside: "Jungle Viaduct", couple: "Most Romantic Photo Spot", friends: "Iconic Instagram Moment", family: "Watch the Blue Train" },
        tags: ["Iconic Photo Spot", "Colonial Viaduct", "Tea Estate Walk"] },
    { n: "Nuwara Eliya", gr: "linear-gradient(135deg,#101a30,#3a6088)", em: "🌸",
        style: ["relaxation", "culture"], env: ["mountains", "countryside"], comp: ["couple", "family", "solo"], bud: ["midrange", "premium", "varies"],
        why: { relaxation: "Cool Climate Hill Station", culture: "British Colonial Charm", mountains: "Tea Plantation Country", countryside: "Strawberry Farms & Lakes", couple: "Most Romantic Hill Town", family: "Unique Climate Change" },
        tags: ["Little England", "Tea Estates", "Cool Climate"] },
    { n: "Peradeniya Botanical Gardens", gr: "linear-gradient(135deg,#061608,#1a6a40)", em: "🌺",
        style: ["relaxation", "culture"], env: ["countryside", "urban"], comp: ["family", "couple", "solo"], bud: ["budget", "midrange"],
        why: { relaxation: "Peaceful Garden Strolls", culture: "Royal Botanical Heritage Since 1821", family: "Picnic Under Giant Fig Tree", couple: "Romantic Morning Walk", solo: "Quiet Green Escape" },
        tags: ["Giant Java Fig Tree", "Orchid House", "147 Acres"] },
    { n: "Rekawa Turtle Beach", gr: "linear-gradient(135deg,#050e20,#0a3050)", em: "🐢",
        style: ["adventure", "relaxation"], env: ["beach", "remote"], comp: ["couple", "solo", "family"], bud: ["budget", "midrange"],
        why: { adventure: "Nesting Turtle Night Watch", relaxation: "Remote Pristine Beach", beach: "Unspoiled South Coast", couple: "Magical Nighttime Experience", family: "Nature Conservation Lesson", solo: "Rare Wildlife Encounter" },
        tags: ["Sea Turtle Nesting", "Night Watching", "Pristine Coast"] },
    { n: "Madu River Safari", gr: "linear-gradient(135deg,#041510,#0a4030)", em: "🛶",
        style: ["relaxation", "adventure", "culture"], env: ["countryside", "remote"], comp: ["family", "couple", "solo", "friends"], bud: ["budget", "midrange", "varies"],
        why: { relaxation: "Tranquil Mangrove Float", adventure: "Boat Safari Through Roots", culture: "Cinnamon Spice Island Visit", family: "Gentle River Adventure", couple: "Peaceful Journey Together", friends: "Relaxed Group Boat Trip" },
        tags: ["Mangrove Labyrinth", "Cinnamon Island", "Boat Safari"] },
    { n: "Kalpitiya Kite Surfing", gr: "linear-gradient(135deg,#0a1a30,#1a5a90)", em: "🪁",
        style: ["adventure", "nightlife"], env: ["beach", "remote"], comp: ["solo", "friends", "couple"], bud: ["midrange", "premium"],
        why: { adventure: "World-Class Kite Surfing Lagoon", nightlife: "Kite Surfing Community Buzz", beach: "Pristine Lagoon", solo: "Extreme Sport Solo Challenge", friends: "Kite & Party", couple: "Learn Together" },
        tags: ["Kite Surfing", "Dolphin Safaris", "Pristine Lagoon"] },
    { n: "Ritigala Ruins", gr: "linear-gradient(135deg,#0d1a05,#3a5a15)", em: "🏚️",
        style: ["adventure", "culture"], env: ["remote", "heritage", "mountains"], comp: ["solo", "couple", "friends"], bud: ["budget", "midrange"],
        why: { adventure: "Jungle Ruins Exploration", culture: "2,000-Year-Old Forest Monastery", heritage: "Forgotten Ancient Site", remote: "Hidden Deep Jungle", solo: "Off-the-Beaten-Path Discovery", couple: "Mysterious Together" },
        tags: ["Forgotten Ruins", "Jungle Monastery", "Hidden Gem"] },
];
// ══════════════════════════════════════════════════
//   ANSWER STATE
// ══════════════════════════════════════════════════
const A = { style: null, companion: null, environment: [], budget: null };
// Bind choice clicks
$qa('.choices').forEach(g => {
    const isMulti = g.dataset.multi === 'true';
    const max = parseInt(g.dataset.max || '1');
    const qk = g.dataset.q;
    const si = parseInt(g.closest('.scr').id.replace('scr-', ''));
    const btn = $('btn' + si);
    g.querySelectorAll('.ch').forEach(c => {
        c.addEventListener('click', () => {
            const v = c.dataset.v;
            if (isMulti) {
                if (c.classList.contains('sel')) {
                    c.classList.remove('sel');
                    A[qk] = A[qk].filter(x => x !== v);
                }
                else {
                    if (A[qk].length >= max) {
                        const first = g.querySelector('.ch.sel');
                        if (first) {
                            first.classList.remove('sel');
                            A[qk] = A[qk].filter(x => x !== first.dataset.v);
                        }
                    }
                    c.classList.add('sel');
                    A[qk].push(v);
                }
                if (btn)
                    btn.disabled = A[qk].length === 0;
            }
            else {
                g.querySelectorAll('.ch').forEach(x => x.classList.remove('sel'));
                c.classList.add('sel');
                A[qk] = v;
                if (btn)
                    btn.disabled = false;
            }
        });
    });
});
// ══════════════════════════════════════════════════
//   NAVIGATION
// ══════════════════════════════════════════════════
let cur = 0;
function goNext(from) {
    const fe = $('scr-' + from);
    const te = $('scr-' + (from + 1));
    fe.classList.add('out');
    setTimeout(() => { fe.classList.remove('on', 'out'); te.classList.add('on'); cur = from + 1; updProg(); }, 420);
}
function goPrev(from) {
    const fe = $('scr-' + from);
    const te = $('scr-' + (from - 1));
    fe.style.cssText = 'opacity:0;transform:translateX(55px);transition:opacity .4s,transform .4s cubic-bezier(.4,0,.2,1)';
    setTimeout(() => { fe.style.cssText = ''; fe.classList.remove('on'); te.classList.add('on'); cur = from - 1; updProg(); }, 400);
}
function updProg() {
    $('progb').style.width = (cur / 4 * 100) + '%';
    $qa('.dot').forEach(d => {
        const i = parseInt(d.dataset.i);
        d.classList.toggle('on', i === cur);
        d.classList.toggle('done', i < cur);
    });
}
// ══════════════════════════════════════════════════
//   SUBMIT → save prefs → show discovery
// ══════════════════════════════════════════════════
async function doSubmit() {
    const btn = $('btn3');
    btn.disabled = true;
    btn.innerHTML = '<span style="display:inline-block;animation:spin .7s linear infinite">⏳</span> Building your profile...';
    // Non-blocking API save
    fetch('api/onboarding.php', {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ style: A.style, companion: A.companion, environment: A.environment, budget: A.budget })
    }).catch(() => { });
    await new Promise(r => setTimeout(r, 850)); // dramatic pause
    showDiscovery();
}
function skipAll() {
    fetch('api/onboarding.php', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ skipped: true }) }).catch(() => { });
    goLaunch();
}
// ══════════════════════════════════════════════════
//   MATCHING ENGINE
// ══════════════════════════════════════════════════
function matchPlaces() {
    return PLACES.map(p => {
        let score = 0, matchTag = null;
        // Style (biggest signal)
        if (A.style && p.style.includes(A.style)) {
            score += 5;
            matchTag = p.why[A.style];
        }
        // Environment (2nd signal)
        A.environment.forEach(e => {
            if (p.env.includes(e)) {
                score += 3;
                if (!matchTag)
                    matchTag = p.why[e];
            }
        });
        // Companion (3rd)
        if (A.companion && p.comp.includes(A.companion)) {
            score += 2;
            if (!matchTag)
                matchTag = p.why[A.companion];
        }
        // Budget (tie-breaker)
        if (A.budget && p.bud.includes(A.budget))
            score += 1;
        // Tiny random so same score = shuffled
        score += Math.random() * 0.5;
        if (!matchTag)
            matchTag = p.tags[0];
        return { ...p, score, matchTag };
    }).sort((a, b) => b.score - a.score);
}
function badgeCSS(score) {
    if (score >= 8)
        return 'background:rgba(201,168,76,.88);color:#080F18';
    if (score >= 6)
        return 'background:rgba(37,176,158,.82);color:#fff';
    if (score >= 4)
        return 'background:rgba(120,170,255,.75);color:#fff';
    return 'background:rgba(255,255,255,.22);color:#fff';
}
// ══════════════════════════════════════════════════
//   BUILD DISCOVERY SCREEN
// ══════════════════════════════════════════════════
function showDiscovery() {
    // Fade out question stage
    const stage = $('stage');
    const dotrow = $('dotrow');
    stage.style.transition = 'opacity .5s';
    stage.style.opacity = '0';
    dotrow.style.transition = 'opacity .4s';
    dotrow.style.opacity = '0';
    $('progb').style.width = '100%';
    setTimeout(() => {
        stage.style.display = 'none';
        dotrow.style.display = 'none';
        // Score & pick top 12
        const top = matchPlaces().slice(0, 12);
        // Profile badge row
        const SLABELS = { adventure: '🏔️ Adventure Seeker', relaxation: '🧘 Relaxation & Wellness', culture: '🏛️ Culture Explorer', food: '🍜 Foodie', nightlife: '🎉 Social & Nightlife' };
        const CLABELS = { solo: '🧳 Solo Traveler', couple: '💑 Couple', family: '👨‍👩‍👧 Family', friends: '🧑‍🤝‍🧑 With Friends' };
        const ELABELS = { beach: '🏖️ Beach & Coast', mountains: '🌿 Mountains', urban: '🏙️ Urban', countryside: '🌾 Countryside', heritage: '🕌 Heritage', remote: '🏜️ Remote & Wild' };
        const BLABELS = { budget: '🎒 Budget Traveler', midrange: '⚖️ Mid-Range', premium: '✨ Premium', varies: '🔄 Flexible Budget' };
        const prow = $('prow');
        if (A.style)
            prow.innerHTML += `<div class="pb style">${SLABELS[A.style] || A.style}</div>`;
        if (A.companion)
            prow.innerHTML += `<div class="pb comp">${CLABELS[A.companion] || A.companion}</div>`;
        A.environment.forEach(e => prow.innerHTML += `<div class="pb env">${ELABELS[e] || e}</div>`);
        if (A.budget)
            prow.innerHTML += `<div class="pb bud">${BLABELS[A.budget] || A.budget}</div>`;
        // Dynamic headline
        const headlines = {
            adventure: 'Your Sri Lankan adventure starts here.',
            relaxation: 'Your perfect Sri Lankan escape awaits.',
            culture: 'Rich history. Deep culture. All yours.',
            food: 'Sri Lanka through flavour & local life.',
            nightlife: 'Vibrant, social Sri Lanka — curated for you.',
        };
        $('disc-title').textContent = headlines[A.style] || 'We found your perfect destinations.';
        $('disc-count').textContent = `${top.length} destinations matched to your travel profile`;
        // Build place grid HTML
        const grid = $('pgrid');
        grid.innerHTML = top.map((p, i) => `
      <div class="pc" id="pc${i}">
        <div class="pc-bg" style="background:${p.gr}"></div>
        <div class="pc-ov"></div>
        <div class="pc-badge-wrap">
          <div class="pc-badge" style="${badgeCSS(p.score)}">${p.matchTag}</div>
        </div>
        <div class="pc-content">
          <div class="pc-em">${p.em}</div>
          <div class="pc-name">${p.n}</div>
          <div class="pc-tags">${p.tags.slice(0, 2).join(' · ')}</div>
        </div>
      </div>
    `).join('');
        // Show screen
        $('disc').classList.add('on');
        // Stagger animate cards in
        top.forEach((_, i) => setTimeout(() => {
            const el = $('pc' + i);
            if (el)
                el.classList.add('vis');
        }, 480 + i * 65));
    }, 480);
}
// ══════════════════════════════════════════════════
//   LAUNCH
// ══════════════════════════════════════════════════
function goLaunch() {
    document.body.style.transition = 'opacity .5s';
    document.body.style.opacity = '0';
    setTimeout(() => window.location.href = 'xtrack.html', 500);
}
// ══════════════════════════════════════════════════
//   VISUAL FX
// ══════════════════════════════════════════════════
// Particles
(() => {
    const c = $('ptcl');
    const cols = ['rgba(201,168,76,', 'rgba(37,176,158,', 'rgba(255,255,255,'];
    for (let i = 0; i < 32; i++) {
        const el = document.createElement('div');
        el.className = 'p';
        const s = Math.random() * 4 + 1.5, col = cols[Math.floor(Math.random() * 3)];
        el.style.cssText = `left:${Math.random() * 100}%;bottom:-20px;width:${s}px;height:${s}px;background:${col}${(Math.random() * .4 + .12).toFixed(2)});animation-duration:${(Math.random() * 12 + 9).toFixed(1)}s;animation-delay:${(Math.random() * 9).toFixed(1)}s`;
        c.appendChild(el);
    }
})();
// Canvas grid
(() => {
    const cv = $('bgc'), ctx = cv.getContext('2d');
    function draw() {
        cv.width = window.innerWidth;
        cv.height = window.innerHeight;
        ctx.clearRect(0, 0, cv.width, cv.height);
        ctx.strokeStyle = 'rgba(255,255,255,0.022)';
        ctx.lineWidth = 1;
        for (let x = 0; x < cv.width; x += 58) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, cv.height);
            ctx.stroke();
        }
        for (let y = 0; y < cv.height; y += 58) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(cv.width, y);
            ctx.stroke();
        }
        ctx.strokeStyle = 'rgba(201,168,76,0.034)';
        for (let i = -cv.height; i < cv.width; i += 115) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i + cv.height, cv.height);
            ctx.stroke();
        }
    }
    window.addEventListener('resize', draw);
    draw();
})();
updProg();
//# sourceMappingURL=onboarding.js.map