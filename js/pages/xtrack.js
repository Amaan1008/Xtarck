/* ── DATA ── */
const CATS = [
    { id: 'hiking', label: 'Hiking', desc: 'Trek through misty mountains and scenic trails across Sri Lanka', bg: 'bg-hiking' },
    { id: 'camping', label: 'Camping', desc: 'Sleep under a star‑filled sky in the peaceful Sri Lankan wilderness', bg: 'bg-camping' },
    { id: 'beach', label: 'Beach Trip', desc: 'Sun, surf and golden sands along the stunning coastline', bg: 'bg-beach' },
    { id: 'roadtrip', label: 'Road Trip', desc: 'Hit the open road and discover hidden gems at your own pace', bg: 'bg-roadtrip' },
    { id: 'dayout', label: 'Day Out', desc: 'A refreshing city escape packed into one perfect day', bg: 'bg-dayout' },
    { id: 'family', label: 'Family Trip', desc: 'Relaxing, family‑friendly journeys across Sri Lanka', bg: 'bg-family' },
    { id: 'adventure', label: 'Adventure', desc: 'Thrilling experiences — white water rafting, zip‑lining and more', bg: 'bg-adventure' },
    { id: 'cultural', label: 'Cultural Tour', desc: 'Temples, ancient cities and authentic local heritage experiences', bg: 'bg-cultural' },
    { id: 'wildlife', label: 'Wildlife Safari', desc: 'Encounter elephants, leopards and exotic birds in their habitat', bg: 'bg-wildlife' },
];
/* ── CATEGORY-SPECIFIC DESTINATION DATABASE (50 per category) ── */
/* ── CATEGORY-SPECIFIC DESTINATION DATABASE ──
   Full lists kept as fallback. bootstrapData() will extend them
   once the DB locations load (adding the 20 main destinations per category).
─────────────────────────────────────────── */
let DESTS_BY_CAT = {
    beach: [
        'Mirissa', 'Unawatuna', 'Hikkaduwa', 'Bentota', 'Arugam Bay', 'Negombo',
        'Trincomalee', 'Nilaveli', 'Pasikuda', 'Kalkudah', 'Weligama', 'Tangalle',
        'Dickwella', 'Hiriketiya', 'Polhena', 'Rekawa', 'Koggala', 'Induruwa',
        'Beruwala', 'Aluthgama', 'Marawila', 'Kalutara', 'Kalpitiya', 'Karainagar',
        'Casuarina Beach', 'Uppuveli', 'Mutur', 'Pigeon Island', 'Jungle Beach',
        'Mawella', 'Medaketiya', 'Palatupana Beach', 'Coconut Beach Kalpitiya',
        'Panadura', 'Moragalla', 'Balapitiya', 'Ahangama', 'Kabalana', 'Dalawella',
        'Midigama', 'Lunuganga', 'Thalpe', 'Gintota', 'Kohu Goda', 'Kuchchaveli',
        'Elephant Rock Arugam Bay', 'Peanut Farm Beach', 'Okanda', 'Kudawella', 'Mirissa Headland'
    ],
    adventure: [
        "Adam's Peak", 'Ella Rock', "Little Adam's Peak", 'Knuckles Range', 'Horton Plains',
        'Pidurutalagala', 'Kirigalpotta', 'Hakgala', 'Nuwara Eliya', 'Namunukula',
        'Bambarakanda Falls', 'Diyaluma Falls', 'Rawana Falls', 'Devon Falls', "St. Clair's Falls",
        'Kitulgala White Water Rafting', 'Kithulgala Forest', 'Munnar Zip Line Kandy',
        'Sigiriya Rock Fortress', 'Pidurangala Rock', 'Ritigala Ruins', 'Riverston',
        'Bible Rock', 'Knuckles Trekking', 'Dothalugala', "Corbett's Gap",
        'Lakegala', 'Dumbara Valley', 'Sembuwatta Lake', 'Meemure Village',
        'Kuda Gal Oya', 'Minneriya Elephant Gathering', 'Udawalawe Safari',
        'Yala Jeep Safari', 'Wilpattu Safari', 'Kumana Bird Safari',
        'Kalpitiya Kite Surfing', 'Arugam Bay Surfing', 'Hikkaduwa Scuba Diving',
        'Pigeon Island Snorkelling', 'Mirissa Whale Watching', 'Trincomalee Diving',
        'Mulgirigala Rock', 'Knuckles Mountain Camping', 'Hanthana Range Hike',
        'Gal Oya Boat Safari', 'Lahugala Elephant Park', 'Maduru Oya Reservoir',
        'Kandy Mountain Biking', 'Haputale Ridge Walk', "Lipton's Seat"
    ],
    cultural: [
        'Sigiriya', 'Polonnaruwa', 'Anuradhapura', 'Kandy', 'Dambulla', 'Galle Fort',
        'Jaffna', 'Nuwara Eliya', 'Colombo', 'Matale', 'Ratnapura', 'Badulla',
        'Temple of the Tooth Relic', 'Kelaniya Raja Maha Viharaya', 'Gangaramaya Temple',
        'Isurumuniya Vihara', 'Ruwanwelisaya Stupa', 'Jetavanaramaya', 'Lovamahapaya',
        'Mihintale', 'Ritigala Monastery', 'Medirigiriya Vatadage', 'Nalanda Gedige',
        'Gal Vihara', 'Aluvihara Rock Monastery', 'Mulgirigala Raja Maha Viharaya',
        'Nainativu Nagapooshani Amman Temple', 'Koneswaram Kovil Trincomalee',
        'Munneswaram Temple', 'Kataragama', "Sri Pada (Adam's Peak) Temple",
        'Embekke Devale', 'Lankathilaka Vihara', 'Gadaladeniya Vihara',
        'Yapahuwa Rock Fortress', 'Panduwas Nuwara', 'Kurunegala Rock',
        'Buduruwagala Rock Carvings', 'Sesseruwa Buddha Statue',
        'National Museum Colombo', 'Dutch Period Museum Galle', 'Jaffna Museum',
        'Kandy Museum', 'Ratnapura Gem Museum', 'Spice Garden Matale',
        'Peradeniya Botanical Gardens', 'Hakgala Botanical Gardens',
        'Colombo Dutch Hospital', 'Pettah Market Colombo', 'Galle Face Green'
    ],
    wildlife: [
        'Yala National Park', 'Wilpattu National Park', 'Udawalawe National Park',
        'Minneriya National Park', 'Kaudulla National Park', 'Kumana National Park',
        'Lunugamvehera National Park', 'Horton Plains National Park',
        'Knuckles Conservation Forest', 'Sinharaja Rainforest',
        'Bundala National Park', 'Rekawa Turtle Watching', 'Kosgoda Turtle Hatchery',
        'Pinnawala Elephant Orphanage', 'Elephant Transit Home Udawalawe',
        'Dehiwala Zoo', 'Millennium Elephant Foundation Kegalle',
        'Gal Oya National Park', 'Maduru Oya National Park',
        'Lahugala Kitulana National Park', 'Wasgamuwa National Park',
        'Flood Plains National Park', 'Somawathiya National Park',
        'Victoria-Randenigala Sanctuary', 'Hakgala Strict Nature Reserve',
        'Pigeon Island Marine National Park', 'Bar Reef Marine Sanctuary',
        'Hikkaduwa Coral Reef', 'Mirissa Whale Watching', 'Trincomalee Dolphin Watch',
        'Arugam Bay Crocodile Safari', 'Pottuvil Lagoon Bird Safari',
        'Mannar Bird Sanctuary', 'Jaffna Lagoon Birds', 'Thalangama Wetland',
        'Bolgoda Lake', 'Madu River Mangrove Safari', 'Negombo Lagoon Birds',
        'Dutch Canal Mangroves', 'Muthurajawela Wetland', 'Kalpitiya Dolphin Safari',
        'Trincomalee Whale Shark', 'Nilaveli Reef Diving', 'Polhena Sea Turtle Reef',
        'Knuckles Leopard Trail', 'Sinharaja Purple-faced Langur', 'Yala Leopard Safari',
        'Wilpattu Sloth Bear', 'Udawalawe Tusker Herd', 'Minneriya Elephant Gathering'
    ]
};
/* Helper: get destinations for current category, fallback to all */
function getDestsForCat(cat) {
    return DESTS_BY_CAT[cat] || Object.values(DESTS_BY_CAT).flat().filter((v, i, a) => a.indexOf(v) === i).sort();
}
/* Primary destination list — filled by DB loader */
let DESTS = ['Ella', 'Kandy', 'Galle', 'Colombo', 'Sigiriya', 'Mirissa', 'Trincomalee', 'Nuwara Eliya', 'Arugam Bay', 'Yala', 'Polonnaruwa', 'Anuradhapura', 'Hikkaduwa', 'Negombo', "Adam's Peak", 'Dambulla', 'Pinnawala', 'Bentota', 'Jaffna', 'Horton Plains'];
let STARTING_LOCS = ['Colombo', 'Kandy', 'Galle', 'Negombo', 'Jaffna', 'Anuradhapura', 'Nuwara Eliya', 'Ella', 'Sigiriya', 'Trincomalee'];
let KMS = { Ella: 214, Kandy: 116, Galle: 116, Sigiriya: 169, Mirissa: 149, Trincomalee: 263, 'Nuwara Eliya': 180, 'Arugam Bay': 320, Yala: 298, Polonnaruwa: 215, Anuradhapura: 205, Hikkaduwa: 98, Negombo: 37, "Adam's Peak": 96, Dambulla: 148, Pinnawala: 88, Bentota: 60, Jaffna: 395, 'Horton Plains': 186, Colombo: 0 };
/* ── DESTINATION PLACES ── */
/* ── DESTINATION PLACES (nearby attractions) — loaded from DB ── */
let NP = {
    Ella: [{ n: 'Nine Arch Bridge', d: '1.2 km', desc: 'Iconic colonial railway bridge surrounded by lush jungle', cost: 0, hrs: 2 }, { n: "Little Adam's Peak", d: '3 km', desc: 'Scenic hike with panoramic views of the Ella valley', cost: 0, hrs: 3 }],
    Kandy: [{ n: 'Temple of the Tooth', d: '0.5 km', desc: "Sri Lanka's most sacred Buddhist temple", cost: 1500, hrs: 2 }],
    Galle: [{ n: 'Galle Fort', d: '0.2 km', desc: 'UNESCO Heritage fort built by the Portuguese and Dutch', cost: 0, hrs: 3 }],
    Colombo: [{ n: 'Gangaramaya Temple', d: '1 km', desc: 'Eclectic temple blending multiple architectural styles', cost: 300, hrs: 1 }],
};
/* NP will be fully replaced by bootstrapData() once API responds */
/* ── ROUTE-BASED EN-ROUTE PLACES ──
   Key format: "StartingCity→DestinationCity"
   Covers the most common travel corridors in Sri Lanka.
   Falls back gracefully to destination-only when no route is defined.
────────────────────────────────── */
const ROUTE_PLACES = {
    /* ─── FROM KANDY ─── */
    'Kandy→Nuwara Eliya': [
        { n: 'Ramboda Falls', d: '43 km from Kandy', desc: 'Spectacular 109 m waterfall clearly visible from the A5 highway', cost: 0, hrs: 1 },
        { n: 'Pussellawa Tea Country', d: '50 km from Kandy', desc: 'Sweeping hillside tea estates with roadside factory tours', cost: 0, hrs: 1 },
        { n: 'Kothmale Reservoir', d: '55 km from Kandy', desc: 'Scenic reservoir reflecting surrounding mountain peaks', cost: 0, hrs: 1 },
        { n: 'Labookellie Tea Estate', d: '68 km from Kandy', desc: 'Lipton\'s working tea factory — free tastings available', cost: 0, hrs: 2 },
    ],
    'Kandy→Ella': [
        { n: 'Ramboda Falls', d: '43 km from Kandy', desc: 'Spectacular 109 m waterfall clearly visible from the A5 highway', cost: 0, hrs: 1 },
        { n: 'Nuwara Eliya Town', d: '80 km from Kandy', desc: 'Sri Lanka\'s "Little England" — cool climate, tea and colonial charm', cost: 0, hrs: 2 },
        { n: 'Ambewela Farm', d: '85 km from Kandy', desc: 'Picturesque highland dairy farm known as the "New Zealand of Sri Lanka"', cost: 300, hrs: 1 },
        { n: 'Haputale Viewpoint', d: '145 km from Kandy', desc: 'Misty ridge town with views stretching to the southern coast', cost: 0, hrs: 1 },
    ],
    'Kandy→Sigiriya': [
        { n: 'Matale Aluviharaya Cave Temple', d: '28 km from Kandy', desc: 'Ancient cave temple where Buddhist scriptures were first written', cost: 500, hrs: 1 },
        { n: 'Matale Spice Garden', d: '26 km from Kandy', desc: 'Walking tour through cinnamon, pepper and clove plantations', cost: 400, hrs: 1 },
        { n: 'Dambulla Cave Temple', d: '72 km from Kandy', desc: 'UNESCO World Heritage caves with over 150 Buddha statues', cost: 1500, hrs: 2 },
    ],
    'Kandy→Dambulla': [
        { n: 'Matale Aluviharaya Cave Temple', d: '28 km from Kandy', desc: 'Ancient cave temple where Buddhist scriptures were first written', cost: 500, hrs: 1 },
        { n: 'Matale Spice Garden', d: '26 km from Kandy', desc: 'Walking tour through cinnamon, pepper and clove plantations', cost: 400, hrs: 1 },
    ],
    'Kandy→Polonnaruwa': [
        { n: 'Matale Aluviharaya Cave Temple', d: '28 km from Kandy', desc: 'Ancient cave temple where Buddhist scriptures were first written', cost: 500, hrs: 1 },
        { n: 'Dambulla Cave Temple', d: '72 km from Kandy', desc: 'UNESCO World Heritage caves with over 150 Buddha statues', cost: 1500, hrs: 2 },
        { n: 'Minneriya National Park', d: '120 km from Kandy', desc: 'Witness the legendary elephant gathering around the reservoir', cost: 3500, hrs: 4 },
    ],
    'Kandy→Pinnawala': [
        { n: 'Kegalle Viewpoint', d: '38 km from Kandy', desc: 'Panoramic views over Sabaragamuwa province', cost: 0, hrs: 1 },
    ],
    "Kandy→Adam's Peak": [
        { n: 'Kitulgala White Water Rafting', d: '55 km from Kandy', desc: 'Exhilarating rapids through the Kelani River gorge', cost: 3500, hrs: 3 },
        { n: 'Ginigathena Tea Country', d: '70 km from Kandy', desc: 'Rolling hills of tea estates along the A7 road', cost: 0, hrs: 1 },
    ],
    'Kandy→Horton Plains': [
        { n: 'Ramboda Falls', d: '43 km from Kandy', desc: 'Spectacular 109 m waterfall clearly visible from the A5 highway', cost: 0, hrs: 1 },
        { n: 'Nuwara Eliya Town', d: '80 km from Kandy', desc: 'Sri Lanka\'s "Little England" — cool climate, tea and colonial charm', cost: 0, hrs: 2 },
        { n: 'Ambewela Farm', d: '85 km from Kandy', desc: 'Picturesque highland dairy farm with sweeping grassland views', cost: 300, hrs: 1 },
    ],
    'Kandy→Galle': [
        { n: 'Pinnawala Elephant Orphanage', d: '40 km from Kandy', desc: 'World-famous sanctuary caring for over 80 rescued elephants', cost: 3000, hrs: 3 },
        { n: 'Kegalle Rubber Plantation', d: '38 km from Kandy', desc: 'See how natural rubber is tapped and processed', cost: 0, hrs: 1 },
        { n: 'Bentota Beach', d: '105 km from Kandy', desc: 'Wide golden beach — great for a quick swim or water sports stop', cost: 0, hrs: 2 },
    ],
    /* ─── FROM COLOMBO ─── */
    'Colombo→Kandy': [
        { n: 'Pinnawala Elephant Orphanage', d: '85 km from Colombo', desc: 'World-famous sanctuary caring for over 80 rescued elephants', cost: 3000, hrs: 3 },
        { n: 'Kegalle Viewpoint', d: '75 km from Colombo', desc: 'Scenic hilltop views over Sabaragamuwa province', cost: 0, hrs: 1 },
    ],
    'Colombo→Galle': [
        { n: 'Bentota Beach', d: '65 km from Colombo', desc: 'Idyllic golden beach — water sports and riverside lagoon', cost: 0, hrs: 2 },
        { n: 'Brief Garden Balapitiya', d: '70 km from Colombo', desc: 'Enchanting hillside garden created by artist Bevis Bawa', cost: 600, hrs: 2 },
        { n: 'Kosgoda Turtle Hatchery', d: '72 km from Colombo', desc: 'Conservation project protecting five species of sea turtle', cost: 500, hrs: 1 },
        { n: 'Ambalangoda Mask Museum', d: '82 km from Colombo', desc: 'Traditional Sri Lankan demon masks and kolam puppets', cost: 300, hrs: 1 },
    ],
    'Colombo→Negombo': [
        { n: 'Muthurajawela Wetlands', d: '20 km from Colombo', desc: 'Mangrove boat safari through one of South Asia\'s largest wetlands', cost: 1200, hrs: 2 },
    ],
    'Colombo→Hikkaduwa': [
        { n: 'Bentota Beach', d: '65 km from Colombo', desc: 'Idyllic golden beach — water sports and riverside lagoon', cost: 0, hrs: 2 },
        { n: 'Kosgoda Turtle Hatchery', d: '72 km from Colombo', desc: 'Conservation project protecting five species of sea turtle', cost: 500, hrs: 1 },
    ],
    'Colombo→Mirissa': [
        { n: 'Bentota Beach', d: '65 km from Colombo', desc: 'Idyllic golden beach — water sports and riverside lagoon', cost: 0, hrs: 2 },
        { n: 'Kosgoda Turtle Hatchery', d: '72 km from Colombo', desc: 'Conservation project protecting five species of sea turtle', cost: 500, hrs: 1 },
        { n: 'Galle Fort', d: '116 km from Colombo', desc: 'UNESCO Heritage fort — perfect for a coffee and stroll', cost: 0, hrs: 2 },
    ],
    'Colombo→Sigiriya': [
        { n: 'Pinnawala Elephant Orphanage', d: '85 km from Colombo', desc: 'World-famous sanctuary caring for over 80 rescued elephants', cost: 3000, hrs: 3 },
        { n: 'Dambulla Cave Temple', d: '148 km from Colombo', desc: 'UNESCO World Heritage caves with over 150 Buddha statues', cost: 1500, hrs: 2 },
    ],
    'Colombo→Nuwara Eliya': [
        { n: 'Pinnawala Elephant Orphanage', d: '85 km from Colombo', desc: 'World-famous sanctuary — see elephants bathing in the river', cost: 3000, hrs: 3 },
        { n: 'Ramboda Falls', d: '155 km from Colombo', desc: 'Spectacular 109 m waterfall visible from the A5 highway', cost: 0, hrs: 1 },
        { n: 'Labookellie Tea Estate', d: '168 km from Colombo', desc: 'Lipton\'s working tea factory with free tastings', cost: 0, hrs: 2 },
    ],
    'Colombo→Ella': [
        { n: 'Pinnawala Elephant Orphanage', d: '85 km from Colombo', desc: 'World-famous sanctuary — see elephants bathing in the river', cost: 3000, hrs: 3 },
        { n: 'Nuwara Eliya Town', d: '180 km from Colombo', desc: 'Sri Lanka\'s "Little England" — cool climate and colonial charm', cost: 0, hrs: 2 },
        { n: 'Haputale Viewpoint', d: '190 km from Colombo', desc: 'Misty ridge town with views stretching to the southern coast', cost: 0, hrs: 1 },
    ],
    'Colombo→Anuradhapura': [
        { n: 'Dambulla Cave Temple', d: '148 km from Colombo', desc: 'UNESCO World Heritage caves with over 150 Buddha statues', cost: 1500, hrs: 2 },
    ],
    "Colombo→Adam's Peak": [
        { n: 'Kitulgala White Water Rafting', d: '80 km from Colombo', desc: 'Exhilarating rapids through the Kelani River gorge', cost: 3500, hrs: 3 },
        { n: 'Ginigathena Tea Estates', d: '90 km from Colombo', desc: 'Rolling hills of tea estates along the A7 road', cost: 0, hrs: 1 },
    ],
    /* ─── FROM NUWARA ELIYA ─── */
    'Nuwara Eliya→Ella': [
        { n: 'Ambewela Farm', d: '5 km from Nuwara Eliya', desc: 'Picturesque highland dairy farm with sweeping grassland views', cost: 300, hrs: 1 },
        { n: 'Haputale Town', d: '48 km from Nuwara Eliya', desc: 'Misty ridge town perched above a dramatic escarpment', cost: 0, hrs: 1 },
        { n: 'Adisham Bungalow', d: '50 km from Nuwara Eliya', desc: 'Charming Benedictine monastery surrounded by pine trees', cost: 200, hrs: 1 },
    ],
    'Nuwara Eliya→Horton Plains': [
        { n: 'Ambewela Farm', d: '5 km from Nuwara Eliya', desc: 'Picturesque highland dairy farm — great quick stop before the plains', cost: 300, hrs: 1 },
    ],
    'Nuwara Eliya→Kandy': [
        { n: 'Labookellie Tea Estate', d: '12 km from Nuwara Eliya', desc: 'Lipton\'s working tea factory — free guided tours and tastings', cost: 0, hrs: 2 },
        { n: 'Ramboda Falls', d: '37 km from Nuwara Eliya', desc: 'Spectacular 109 m waterfall with viewing platforms', cost: 0, hrs: 1 },
        { n: 'Kothmale Reservoir', d: '45 km from Nuwara Eliya', desc: 'Scenic mountain reservoir reflecting the surrounding peaks', cost: 0, hrs: 1 },
    ],
    /* ─── FROM GALLE ─── */
    'Galle→Mirissa': [
        { n: 'Unawatuna Beach', d: '6 km from Galle', desc: 'Sheltered crescent bay — great for a quick swim', cost: 0, hrs: 2 },
        { n: 'Jungle Beach', d: '8 km from Galle', desc: 'Hidden cove accessible through coastal jungle', cost: 0, hrs: 1 },
    ],
    'Galle→Hikkaduwa': [
        { n: 'Unawatuna Beach', d: '6 km from Galle', desc: 'Sheltered crescent bay — great for snorkelling', cost: 0, hrs: 2 },
    ],
    'Galle→Bentota': [
        { n: 'Kosgoda Turtle Hatchery', d: '30 km from Galle', desc: 'Conservation project protecting five species of sea turtle', cost: 500, hrs: 1 },
        { n: 'Brief Garden Balapitiya', d: '42 km from Galle', desc: 'Enchanting hillside garden created by artist Bevis Bawa', cost: 600, hrs: 2 },
    ],
    /* ─── FROM ELLA ─── */
    'Ella→Nuwara Eliya': [
        { n: 'Adisham Bungalow', d: '35 km from Ella', desc: 'Charming Benedictine monastery surrounded by pine forests', cost: 200, hrs: 1 },
        { n: 'Haputale Town', d: '38 km from Ella', desc: 'Misty ridge town with views over the southern plains', cost: 0, hrs: 1 },
        { n: 'Ambewela Farm', d: '55 km from Ella', desc: 'Picturesque highland dairy farm with sweeping grassland views', cost: 300, hrs: 1 },
    ],
    'Ella→Yala': [
        { n: 'Kataragama Sacred Town', d: '65 km from Ella', desc: 'One of Sri Lanka\'s holiest pilgrimage sites', cost: 0, hrs: 2 },
        { n: 'Sithulpawwa Rock Temple', d: '90 km from Ella', desc: 'Ancient Buddhist monastery carved into granite rock', cost: 0, hrs: 2 },
    ],
    /* ─── FROM SIGIRIYA ─── */
    'Sigiriya→Polonnaruwa': [
        { n: 'Minneriya National Park', d: '20 km from Sigiriya', desc: 'Witness the legendary elephant gathering', cost: 3500, hrs: 4 },
        { n: 'Habarana Village', d: '15 km from Sigiriya', desc: 'Traditional Sri Lankan village with elephant rides', cost: 2000, hrs: 2 },
    ],
    'Sigiriya→Anuradhapura': [
        { n: 'Aukana Buddha Statue', d: '40 km from Sigiriya', desc: 'Magnificent 12 m standing Buddha carved from solid granite', cost: 500, hrs: 1 },
        { n: 'Kekirawa Reservoir', d: '25 km from Sigiriya', desc: 'Peaceful ancient tank with rural countryside views', cost: 0, hrs: 1 },
    ],
    /* ─── FROM TRINCOMALEE ─── */
    'Trincomalee→Sigiriya': [
        { n: 'Habarana Village', d: '80 km from Trincomalee', desc: 'Traditional Sri Lankan village experience', cost: 2000, hrs: 2 },
        { n: 'Minneriya National Park', d: '70 km from Trincomalee', desc: 'Witness the legendary elephant gathering', cost: 3500, hrs: 4 },
    ],
    'Trincomalee→Polonnaruwa': [
        { n: 'Kantale Reservoir', d: '35 km from Trincomalee', desc: 'Vast ancient reservoir with birdwatching opportunities', cost: 0, hrs: 1 },
    ],
    /* ─── FROM ANURADHAPURA ─── */
    'Anuradhapura→Sigiriya': [
        { n: 'Aukana Buddha Statue', d: '55 km from Anuradhapura', desc: 'Magnificent 12 m standing Buddha carved from solid granite', cost: 500, hrs: 1 },
        { n: 'Kekirawa Reservoir', d: '65 km from Anuradhapura', desc: 'Peaceful ancient tank with birdwatching', cost: 0, hrs: 1 },
    ],
    'Anuradhapura→Jaffna': [
        { n: 'Vavuniya Town', d: '55 km from Anuradhapura', desc: 'Gateway town to the north with local markets', cost: 0, hrs: 1 },
        { n: 'Elephant Pass', d: '100 km from Anuradhapura', desc: 'Historic narrow causeway with poignant wartime significance', cost: 0, hrs: 1 },
    ],
};
const SR = { simple: { a: 1200, f: 700, t: 500, ac: 400 }, comfortable: { a: 3500, f: 1400, t: 900, ac: 800 }, flexible: { a: 7000, f: 2800, t: 1800, ac: 1500 } };
const CC = ['#2aab99', '#dc7c32', '#1a3a2d', '#6ab4cc'];
const CL = ['Transport', 'Accommodation', 'Food', 'Activities'];
/* stat card SVG icons */
const STAT_SVGS = {
    dist: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9a6 6 0 0 1 12 0" stroke="#2aab99" stroke-width="1.5" stroke-linecap="round"/><path d="M3 9H1M17 9h-2M9 3V1M14.2 4.8l1.4-1.4M3.8 4.8L2.4 3.4" stroke="#2aab99" stroke-width="1.4" stroke-linecap="round"/><circle cx="9" cy="9" r="1.5" fill="#2aab99"/></svg>`,
    transport: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="7" width="14" height="7" rx="1.5" stroke="#2aab99" stroke-width="1.4"/><path d="M5 7V5.5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2V7" stroke="#2aab99" stroke-width="1.4"/><circle cx="5.5" cy="14" r="1.5" stroke="#2aab99" stroke-width="1.3"/><circle cx="12.5" cy="14" r="1.5" stroke="#2aab99" stroke-width="1.3"/><path d="M8.5 10h1" stroke="#2aab99" stroke-width="1.4" stroke-linecap="round"/></svg>`,
    food: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6 2v5a3 3 0 0 0 6 0V2" stroke="#2aab99" stroke-width="1.4" stroke-linecap="round"/><path d="M9 7v9M4 2v4M14 2v4" stroke="#2aab99" stroke-width="1.4" stroke-linecap="round"/></svg>`,
    accom: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2.5" y="8" width="13" height="8" rx="1" stroke="#2aab99" stroke-width="1.4"/><path d="M2.5 11h13M1 16h16" stroke="#2aab99" stroke-width="1.3" stroke-linecap="round"/><path d="M9 2L2.5 8h13L9 2z" stroke="#2aab99" stroke-width="1.4" stroke-linejoin="round"/><rect x="7.5" y="12" width="3" height="4" rx=".5" stroke="#2aab99" stroke-width="1.2"/></svg>`,
    activities: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2l1.8 3.6L15 6.5l-3 2.9.7 4.1L9 11.4l-3.7 2 .7-4.1-3-2.9 4.2-.9L9 2z" stroke="#2aab99" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
    pin: `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1C4.07 1 2.5 2.57 2.5 4.5c0 2.81 3.5 6.5 3.5 6.5s3.5-3.69 3.5-6.5C9.5 2.57 7.93 1 6 1zm0 4.63a1.13 1.13 0 1 1 0-2.26 1.13 1.13 0 0 1 0 2.26z" fill="currentColor"/></svg>`,
    calendar: `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="2.5" width="10" height="8.5" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M4 1v2M8 1v2M1 5.5h10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`,
    people: `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="4.5" cy="3" r="1.5" stroke="currentColor" stroke-width="1.2"/><circle cx="7.5" cy="3" r="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M1.5 10v-1a3 3 0 0 1 6 0v1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M8.5 5.5a2.5 2.5 0 0 1 2 2.5v2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`,
    style: `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.5" stroke="currentColor" stroke-width="1.2"/><path d="M4 6a2 2 0 1 0 4 0" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`
};
const PLACE_SVG = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2C7.24 2 5 4.24 5 7c0 4.06 5 9 5 9s5-4.94 5-9c0-2.76-2.24-5-5-5zm0 6.75A1.75 1.75 0 1 1 10 5.25a1.75 1.75 0 0 1 0 3.5z" stroke="#2aab99" stroke-width="1.4" fill="none"/></svg>`;
const ROUTE_SVG = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 10h14M10 3l7 7-7 7" stroke="#2a7ab0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CHEV_SVG = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 5.5L7 9l3.5-3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CHECK_SVG = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
/* ── STATE ── */
// Typed `any`: S.A / S.B are dynamic trip-planning state bags that pick up
// extra properties over time (S.A._lastTotal, S.A.sched, etc.) well past
// this initial shape — matching that exactly would mean re-declaring the
// interface every time a later block adds a field, so it stays loose here.
const S = { cat: null, method: null,
    A: { budget: 50000, dest: 'Ella', days: 3, people: 2, style: 'comfortable', date: '', current: 'Colombo', transport: 'public', pace: 'balanced', selHotel: null, sched: null },
    B: { dest: 'Ella', days: 3, people: 2, style: 'comfortable', date: '', current: 'Colombo', transport: 'public', pace: 'balanced', selHotel: null, sched: null },
    selA: new Set(), selB: new Set(), chA: null, chB: null };
/* ── UTILS ── */
function lkr(n) { return n >= 100000 ? 'LKR ' + (n / 1000).toFixed(1) + 'k' : 'LKR ' + Math.round(n).toLocaleString(); }
function fdate(ds, off = 0) { if (!ds)
    return 'TBD'; const d = new Date(ds); d.setDate(d.getDate() + off); return d.toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' }); }
function km(d) { return KMS[d] || 150; }
/* ── ROUTE-AWARE PLACES FUNCTION ──
   Returns en-route stops first (tagged as 'En Route'),
   then destination places (tagged with the destination name).
   Falls back to destination-only if no route data exists.
─────────────────────────────────── */
function routePlaces(from, dest) {
    const key = from && from !== dest ? `${from}→${dest}` : null;
    const enRoute = (key && ROUTE_PLACES[key]) ? ROUTE_PLACES[key] : [];
    const atDest = NP[dest] || NP.Ella;
    return [
        ...enRoute.map(p => ({ ...p, section: 'En Route' })),
        ...atDest.map(p => ({ ...p, section: dest }))
    ];
}
function showToast(m) { const t = $('toast'); t.textContent = m; t.classList.add('on'); setTimeout(() => t.classList.remove('on'), 2600); }
function goTo(id) { const o = $('ptrans'); o.classList.add('on'); setTimeout(() => { $qa('.page').forEach(p => p.classList.remove('active')); $(id).classList.add('active'); window.scrollTo(0, 0); o.classList.remove('on'); }, 240); }
/* ── PAGE 1 ── */
(function () {
    $('catGrid').innerHTML = CATS.map(c => `
    <div class="cat-card" id="cc_${c.id}" onclick="pickCat('${c.id}')">
      <div class="cat-sel-mark">${CHECK_SVG}</div>
      <div class="cat-lbl">${c.label}</div>
      <div class="cat-dsc">${c.desc}</div>
      <div class="cat-arrow">Select ${c.label} <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
    </div>`).join('');
})();
function pickCat(id) {
    S.cat = id;
    const dests = getDestsForCat(id);
    S.A.dest = dests[0];
    S.B.dest = dests[0];
    $qa('.cat-card').forEach(c => c.classList.remove('sel'));
    $('cc_' + id).classList.add('sel');
    const c = CATS.find(x => x.id === id);
    showToast(c.label + ' selected — showing ' + dests.length + ' destinations');
    setTimeout(() => { $('catTag').textContent = c.label; goTo('page2'); }, 550);
}
/* ── PAGE 2 ── */
function chooseMethod(m) {
    S.method = m;
    S.selA = new Set();
    S.selB = new Set();
    if (m === 'budget') {
        buildWzA();
        goTo('page3a');
    }
    else {
        buildWzB();
        goTo('page3b');
    }
}
/* ── WIZARD ENGINE ── */
let bStep = 0, dStep = 0;
function mkProg(cid, tot, cur, lbls) {
    let h = '';
    for (let i = 0; i < tot; i++) {
        if (i > 0)
            h += `<div class="wz-line ${i <= cur ? 'done' : ''}"></div>`;
        h += `<div class="wz-step-wrap"><div class="wz-circle ${i < cur ? 'done' : i === cur ? 'active' : ''}">${i < cur ? CHECK_SVG : i + 1}</div><div class="wz-lbl ${i === cur ? 'active' : ''}">${lbls[i] || ''}</div></div>`;
    }
    $(cid).innerHTML = h;
}
const BL = ['Budget', 'Destination', 'Duration', 'Travellers', 'Location', 'Style', 'Transport', 'Pace', 'Date'];
const DL = ['Destination', 'Duration', 'Travellers', 'Location', 'Style', 'Transport', 'Pace', 'Date'];
/* WIZARD STEPS — Budget */
const BST = [
    { t: 'What is your total budget?', h: 'Enter the maximum amount you would like to spend in Sri Lankan Rupees.',
        r: () => `<div class="pfx"><span class="pfx-l">LKR</span><input class="field" id="fb" type="number" value="${S.A.budget}" min="5000" max="500000" step="1000" oninput="sSync()"></div>
    <div style="margin-top:18px"><div class="rng-val" id="rv">${lkr(S.A.budget)}</div>
    <input type="range" class="rng" id="rs" min="5000" max="300000" step="1000" value="${S.A.budget}" style="--v:${((S.A.budget - 5000) / 295000 * 100).toFixed(1)}%" oninput="rSync(this.value)">
    <div class="rng-row"><span>LKR 5,000</span><span>LKR 3,00,000</span></div></div>`,
        sv: () => { const v = parseInt($('fb').value); if (isNaN(v) || v < 5000) {
            showToast('Minimum budget: LKR 5,000');
            return false;
        } S.A.budget = v; return true; } },
    { t: 'Where would you like to go?', h: 'Choose your destination — filtered by your chosen trip type.',
        r: () => { const dests = getDestsForCat(S.cat); if (!dests.includes(S.A.dest))
            S.A.dest = dests[0]; return `<select class="field" id="fa">${dests.map(d => `<option ${d === S.A.dest ? 'selected' : ''}>${d}</option>`).join('')}</select>`; },
        sv: () => { S.A.dest = $('fa').value; return true; } },
    { t: 'How many days is your trip?', h: 'A longer trip gives more time to explore — plan within your budget.',
        r: () => `<div class="rng-val" id="dv">${S.A.days} ${S.A.days > 1 ? 'days' : 'day'}</div><input type="range" class="rng" id="fd" min="1" max="21" value="${S.A.days}" style="--v:${((S.A.days - 1) / 20 * 100).toFixed(1)}%" oninput="$('dv').textContent=this.value+' '+(this.value>1?'days':'day');this.style.setProperty('--v',((this.value-1)/20*100)+'%')"><div class="rng-row"><span>1 day</span><span>21 days</span></div>`,
        sv: () => { S.A.days = parseInt($('fd').value); return true; } },
    { t: 'How many people are travelling?', h: 'Include all travellers — adults and children.',
        r: () => `<div class="rng-val" id="pv">${S.A.people} ${S.A.people > 1 ? 'people' : 'person'}</div><input type="range" class="rng" id="fp" min="1" max="20" value="${S.A.people}" style="--v:${((S.A.people - 1) / 19 * 100).toFixed(1)}%" oninput="$('pv').textContent=this.value+' '+(this.value>1?'people':'person');this.style.setProperty('--v',((this.value-1)/19*100)+'%')"><div class="rng-row"><span>1 person</span><span>20 people</span></div>`,
        sv: () => { S.A.people = parseInt($('fp').value); return true; } },
    { t: 'Where are you currently located?', h: 'Select your starting point — we\'ll show attractions along the route to your destination.',
        r: () => `<select class="field" id="floc">
     ${STARTING_LOCS.map(c => `<option ${c === S.A.current ? 'selected' : ''}>${c}</option>`).join('')}
   </select>
   <p style="margin-top:10px;font-size:12px;color:var(--text3);line-height:1.5">This helps us show you great places to visit <strong>along the way</strong>, not just at your destination.</p>`,
        sv: () => { S.A.current = $('floc').value; return true; },
        ar: () => {
            setTimeout(() => {
                const wrap = $('floc');
                if (wrap && !$('geoBtn')) {
                    const btn = document.createElement('button');
                    btn.id = 'geoBtn';
                    btn.className = 'geo-btn';
                    btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="3" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 1v2M6.5 10v2M1 6.5h2M10 6.5h2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg> Use My Location';
                    btn.onclick = () => geolocate();
                    wrap.parentNode.insertBefore(btn, wrap.nextSibling);
                }
            }, 60);
        } },
    { t: 'What is your travel style?', h: 'This determines the quality of accommodation, food and transport.',
        r: () => `<div class="style-grid">${[{ id: 'simple', label: 'Simple', desc: 'Budget‑friendly' }, { id: 'comfortable', label: 'Comfortable', desc: 'Best balance' }, { id: 'flexible', label: 'Flexible', desc: 'Premium quality' }].map(s => `<div class="style-opt ${S.A.style === s.id ? 'sel' : ''}" onclick="setSt('A','${s.id}',this.parentNode)"><div class="style-ico"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#2aab99" stroke-width="1.4"/></svg></div><div class="style-lbl">${s.label}</div><div class="style-dsc">${s.desc}</div></div>`).join('')}</div>`,
        sv: () => true },
    { t: 'How do you plan to travel around?', h: 'This helps us estimate your transport budget accurately.',
        r: () => `<div class="style-grid">${[{ id: 'public', label: 'Public Transport', desc: 'Train & Bus', ico: '<path d="M4 4h8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM4 12v2M12 12v2M6 8h4" stroke="#2aab99" stroke-width="1.4" fill="none" stroke-linecap="round"/>' }, { id: 'self', label: 'Self-Drive', desc: 'Tuk-Tuk/Car', ico: '<circle cx="12" cy="11" r="2" stroke="#2aab99" stroke-width="1.4"/><circle cx="5" cy="11" r="2" stroke="#2aab99" stroke-width="1.4"/><path d="M3 11H1V6l4-3h6l3 3v5h-2M6 11h4" stroke="#2aab99" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>' }, { id: 'taxi', label: 'Private Cab', desc: 'Comfortable & Fast', ico: '<circle cx="12" cy="11" r="2" stroke="#2aab99" stroke-width="1.4"/><circle cx="5" cy="11" r="2" stroke="#2aab99" stroke-width="1.4"/><path d="M3 11h-1V6.5l3-3h7l3 3V11h-1M6 11h4" stroke="#2aab99" stroke-width="1.4" fill="none" stroke-linejoin="round"/>' }].map(s => `<div class="style-opt ${S.A.transport === s.id ? 'sel' : ''}" onclick="setField('A','transport','${s.id}',this.parentNode)"><div class="style-ico"><svg width="16" height="16" viewBox="0 0 16 16" fill="none">${s.ico}</svg></div><div class="style-lbl">${s.label}</div><div class="style-dsc">${s.desc}</div></div>`).join('')}</div>`,
        sv: () => true },
    { t: 'What is your preferred pace?', h: 'Helps us create a realistic daily schedule for your trip.',
        r: () => `<div class="style-grid">${[{ id: 'relaxed', label: 'Relaxed', desc: '1 spot/day', ico: '<path d="M4 9a4 4 0 0 1 8 0M2 12h12M8 2v2M5.5 3.5l1 1M10.5 3.5l-1 1" stroke="#2aab99" stroke-width="1.4" stroke-linecap="round"/>' }, { id: 'balanced', label: 'Balanced', desc: '2-3 spots/day', ico: '<path d="M8 3v10M3 8h10M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#2aab99" stroke-width="1.4" stroke-linecap="round"/>' }, { id: 'packed', label: 'Packed', desc: 'See everything fast', ico: '<path d="M8 2a6 6 0 1 0 0 12A6 6 0 1 0 8 2zM8 5v3l2 2" stroke="#2aab99" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>' }].map(s => `<div class="style-opt ${S.A.pace === s.id ? 'sel' : ''}" onclick="setField('A','pace','${s.id}',this.parentNode)"><div class="style-ico"><svg width="16" height="16" viewBox="0 0 16 16" fill="none">${s.ico}</svg></div><div class="style-lbl">${s.label}</div><div class="style-dsc">${s.desc}</div></div>`).join('')}</div>`,
        sv: () => true },
    { t: 'When does your trip begin?', h: 'Choose your preferred start date for the journey.',
        r: () => `<input type="date" class="field" id="fs" value="${S.A.date || new Date().toISOString().split('T')[0]}" min="${new Date().toISOString().split('T')[0]}"><p style="margin-top:10px;font-size:12px;color:var(--text3)">Trip ends: <strong id="endA" style="color:var(--text1)">—</strong></p>`,
        ar: () => { const e = $('fs'); const u = () => { const d = new Date(e.value || new Date()); d.setDate(d.getDate() + S.A.days - 1); const el = $('endA'); if (el)
            el.textContent = d.toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' }); }; e.addEventListener('change', u); u(); },
        sv: () => { S.A.date = $('fs').value; return true; } }
];
function setSt(w, id, c) { S[w].style = id; c.querySelectorAll('.style-opt').forEach(e => e.classList.remove('sel')); event.currentTarget.classList.add('sel'); }
function setField(w, f, v, c) { S[w][f] = v; c.querySelectorAll('.style-opt').forEach(e => e.classList.remove('sel')); event.currentTarget.classList.add('sel'); }
function toggleInterest(w, id, el) { if (!S[w].interests)
    S[w].interests = []; const i = S[w].interests.indexOf(id); if (i > -1)
    S[w].interests.splice(i, 1);
else
    S[w].interests.push(id); el.classList.toggle('sel', S[w].interests.includes(id)); }
function sSync() { const v = $('fb').value; const el = $('rv'); if (el)
    el.textContent = lkr(parseInt(v) || 0); const s = $('rs'); if (s) {
    s.value = v;
    s.style.setProperty('--v', ((v - 5000) / 295000 * 100) + '%');
} }
function rSync(v) { const el = $('fb'); if (el)
    el.value = v; const lv = $('rv'); if (lv)
    lv.textContent = lkr(parseInt(v)); const s = $('rs'); if (s)
    s.style.setProperty('--v', ((v - 5000) / 295000 * 100) + '%'); }
let wzDir = 1;
function buildWzA() { bStep = 0; wzDir = 1; renderWzA(); }
function renderWzA() {
    const s = BST[bStep];
    const n = bStep + 1;
    mkProg('wpA', BST.length, bStep, BL);
    $('wzA').innerHTML = `<div class="wz-q active${wzDir < 0 ? ' reverse' : ''}"><div class="wz-card">
    <div class="wz-qnum">Question ${n} of ${BST.length}</div>
    <div class="wz-qtitle">${s.t}</div><div class="wz-qhint">${s.h}</div>
    ${s.r()}
    <div class="wz-nav">${bStep > 0 ? '<button class="btn-back" onclick="prevA()">← Back</button>' : '<div></div>'}
    <button class="btn-next" onclick="nextA()">${bStep < BST.length - 1 ? 'Continue <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' : 'Build My Plan <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'}</button>
    </div></div></div>`;
    if (s.ar)
        setTimeout(s.ar, 50);
}
function nextA() { if (!BST[bStep].sv())
    return; if (bStep < BST.length - 1) {
    wzDir = 1;
    bStep++;
    renderWzA();
}
else {
    buildDA();
    goTo('page4a');
} }
function prevA() { if (bStep > 0) {
    wzDir = -1;
    bStep--;
    renderWzA();
} }
/* WIZARD STEPS — Destination */
const DST = [
    { t: 'Where are you heading?', h: 'Choose your destination — filtered by your chosen trip type.',
        r: () => { const dests = getDestsForCat(S.cat); if (!dests.includes(S.B.dest))
            S.B.dest = dests[0]; return `<select class="field" id="fb2">${dests.map(d => `<option ${d === S.B.dest ? 'selected' : ''}>${d}</option>`).join('')}</select>`; },
        sv: () => { S.B.dest = $('fb2').value; return true; } },
    { t: 'How many days?', h: 'Choose the length of your trip.',
        r: () => `<div class="rng-val" id="dv2">${S.B.days} ${S.B.days > 1 ? 'days' : 'day'}</div><input type="range" class="rng" id="fd2" min="1" max="21" value="${S.B.days}" style="--v:${((S.B.days - 1) / 20 * 100).toFixed(1)}%" oninput="$('dv2').textContent=this.value+' '+(this.value>1?'days':'day');this.style.setProperty('--v',((this.value-1)/20*100)+'%')"><div class="rng-row"><span>1 day</span><span>21 days</span></div>`,
        sv: () => { S.B.days = parseInt($('fd2').value); return true; } },
    { t: 'How many people are travelling?', h: 'Total travellers including adults and children.',
        r: () => `<div class="rng-val" id="pv2">${S.B.people} ${S.B.people > 1 ? 'people' : 'person'}</div><input type="range" class="rng" id="fp2" min="1" max="20" value="${S.B.people}" style="--v:${((S.B.people - 1) / 19 * 100).toFixed(1)}%" oninput="$('pv2').textContent=this.value+' '+(this.value>1?'people':'person');this.style.setProperty('--v',((this.value-1)/19*100)+'%')"><div class="rng-row"><span>1</span><span>20</span></div>`,
        sv: () => { S.B.people = parseInt($('fp2').value); return true; } },
    { t: 'Where are you currently located?', h: 'Select your starting point — we\'ll show attractions along the route to your destination.',
        r: () => `<select class="field" id="flocB">
     ${STARTING_LOCS.map(c => `<option ${c === S.B.current ? 'selected' : ''}>${c}</option>`).join('')}
   </select>
   <p style="margin-top:10px;font-size:12px;color:var(--text3);line-height:1.5">This helps us show you great places to visit <strong>along the way</strong>, not just at your destination.</p>`,
        sv: () => { S.B.current = $('flocB').value; return true; },
        ar: () => {
            setTimeout(() => {
                const wrap = $('flocB');
                if (wrap && !$('geoBtnB')) {
                    const btn = document.createElement('button');
                    btn.id = 'geoBtnB';
                    btn.className = 'geo-btn';
                    btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="3" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 1v2M6.5 10v2M1 6.5h2M10 6.5h2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg> Use My Location';
                    btn.onclick = () => geolocate(true);
                    wrap.parentNode.insertBefore(btn, wrap.nextSibling);
                }
            }, 60);
        } },
    { t: 'What is your travel preference?', h: 'This helps estimate your accommodation, food and transport.',
        r: () => `<div class="style-grid">${[{ id: 'simple', label: 'Simple', desc: 'Budget‑friendly' }, { id: 'comfortable', label: 'Comfortable', desc: 'Best balance' }, { id: 'flexible', label: 'Flexible', desc: 'Premium quality' }].map(s => `<div class="style-opt ${S.B.style === s.id ? 'sel' : ''}" onclick="setSt('B','${s.id}',this.parentNode)"><div class="style-ico"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#2aab99" stroke-width="1.4"/></svg></div><div class="style-lbl">${s.label}</div><div class="style-dsc">${s.desc}</div></div>`).join('')}</div>`,
        sv: () => true },
    { t: 'How do you plan to travel around?', h: 'This helps us estimate your transport budget accurately.',
        r: () => `<div class="style-grid">${[{ id: 'public', label: 'Public Transport', desc: 'Train & Bus', ico: '<path d="M4 4h8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM4 12v2M12 12v2M6 8h4" stroke="#2aab99" stroke-width="1.4" fill="none" stroke-linecap="round"/>' }, { id: 'self', label: 'Self-Drive', desc: 'Tuk-Tuk/Car', ico: '<circle cx="12" cy="11" r="2" stroke="#2aab99" stroke-width="1.4"/><circle cx="5" cy="11" r="2" stroke="#2aab99" stroke-width="1.4"/><path d="M3 11H1V6l4-3h6l3 3v5h-2M6 11h4" stroke="#2aab99" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>' }, { id: 'taxi', label: 'Private Cab', desc: 'Comfortable & Fast', ico: '<circle cx="12" cy="11" r="2" stroke="#2aab99" stroke-width="1.4"/><circle cx="5" cy="11" r="2" stroke="#2aab99" stroke-width="1.4"/><path d="M3 11h-1V6.5l3-3h7l3 3V11h-1M6 11h4" stroke="#2aab99" stroke-width="1.4" fill="none" stroke-linejoin="round"/>' }].map(s => `<div class="style-opt ${S.B.transport === s.id ? 'sel' : ''}" onclick="setField('B','transport','${s.id}',this.parentNode)"><div class="style-ico"><svg width="16" height="16" viewBox="0 0 16 16" fill="none">${s.ico}</svg></div><div class="style-lbl">${s.label}</div><div class="style-dsc">${s.desc}</div></div>`).join('')}</div>`,
        sv: () => true },
    { t: 'What is your preferred pace?', h: 'Helps us create a realistic daily schedule for your trip.',
        r: () => `<div class="style-grid">${[{ id: 'relaxed', label: 'Relaxed', desc: '1 spot/day', ico: '<path d="M4 9a4 4 0 0 1 8 0M2 12h12M8 2v2M5.5 3.5l1 1M10.5 3.5l-1 1" stroke="#2aab99" stroke-width="1.4" stroke-linecap="round"/>' }, { id: 'balanced', label: 'Balanced', desc: '2-3 spots/day', ico: '<path d="M8 3v10M3 8h10M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#2aab99" stroke-width="1.4" stroke-linecap="round"/>' }, { id: 'packed', label: 'Packed', desc: 'See everything fast', ico: '<path d="M8 2a6 6 0 1 0 0 12A6 6 0 1 0 8 2zM8 5v3l2 2" stroke="#2aab99" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>' }].map(s => `<div class="style-opt ${S.B.pace === s.id ? 'sel' : ''}" onclick="setField('B','pace','${s.id}',this.parentNode)"><div class="style-ico"><svg width="16" height="16" viewBox="0 0 16 16" fill="none">${s.ico}</svg></div><div class="style-lbl">${s.label}</div><div class="style-dsc">${s.desc}</div></div>`).join('')}</div>`,
        sv: () => true },
    { t: 'When does your trip begin?', h: 'Choose your preferred start date.',
        r: () => `<input type="date" class="field" id="fs2" value="${S.B.date || new Date().toISOString().split('T')[0]}" min="${new Date().toISOString().split('T')[0]}"><p style="margin-top:10px;font-size:12px;color:var(--text3)">Trip ends: <strong id="endB" style="color:var(--text1)">—</strong></p>`,
        ar: () => { const e = $('fs2'); const u = () => { const d = new Date(e.value || new Date()); d.setDate(d.getDate() + S.B.days - 1); const el = $('endB'); if (el)
            el.textContent = d.toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' }); }; e.addEventListener('change', u); u(); },
        sv: () => { S.B.date = $('fs2').value; return true; } }
];
function buildWzB() { dStep = 0; wzDir = 1; renderWzB(); }
function renderWzB() {
    const s = DST[dStep];
    const n = dStep + 1;
    mkProg('wpB', DST.length, dStep, DL);
    $('wzB').innerHTML = `<div class="wz-q active${wzDir < 0 ? ' reverse' : ''}"><div class="wz-card">
    <div class="wz-qnum">Question ${n} of ${DST.length}</div>
    <div class="wz-qtitle">${s.t}</div><div class="wz-qhint">${s.h}</div>
    ${s.r()}
    <div class="wz-nav">${dStep > 0 ? '<button class="btn-back" onclick="prevB2()">← Back</button>' : '<div></div>'}
    <button class="btn-next" onclick="nextB2()">${dStep < DST.length - 1 ? 'Continue <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' : 'Show My Plan <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'}</button>
    </div></div></div>`;
    if (s.ar)
        setTimeout(s.ar, 50);
}
function nextB2() { if (!DST[dStep].sv())
    return; if (dStep < DST.length - 1) {
    wzDir = 1;
    dStep++;
    renderWzB();
}
else {
    buildDB();
    goTo('page4b');
} }
function prevB2() { if (dStep > 0) {
    wzDir = -1;
    dStep--;
    renderWzB();
} }
/* ── CALC ── */
function calc(dest, days, people, style, sel, trans = 'taxi') {
    const r = SR[style];
    let tMult = 1;
    if (trans === 'public')
        tMult = 0.15;
    if (trans === 'self')
        tMult = 0.45;
    const c = { t: Math.round(r.t * days * people * tMult), a: Math.round(r.a * days * people), f: Math.round(r.f * days * people), ac: Math.round(r.ac * days * people), total: 0 };
    sel.forEach(n => { const p = (NP[dest] || NP.Ella).find(x => x.n === n); if (p)
        c.ac += p.cost * people; });
    c.total = c.t + c.a + c.f + c.ac;
    return c;
}
function genSched(days, dest, date, sel, pace = 'balanced') {
    const pl = [...sel];
    const out = [];
    let accAct = 0;
    for (let i = 0; i < days; i++) {
        let type, title, sub;
        if (i === 0) {
            type = 'travel';
            title = `Travel to ${dest}`;
            sub = 'Depart from starting point · Check‑in · Settle in';
        }
        else if (i === days - 1 && days > 1) {
            type = 'travel';
            title = 'Return home';
            sub = 'Check‑out · Travel back';
        }
        else {
            let placesPerDay = pace === 'relaxed' ? 1 : pace === 'packed' ? 3 : 2;
            let dayPl = [];
            for (let j = 0; j < placesPerDay; j++) {
                if (pl[accAct]) {
                    dayPl.push(pl[accAct]);
                    accAct++;
                }
            }
            if (dayPl.length > 0) {
                type = 'activity';
                title = `Visit ${dayPl.join(' & ')}`;
                sub = `Explore ${dest} area`;
            }
            else if (i % 4 === 3) {
                type = 'rest';
                title = 'Rest & Leisure';
                sub = 'Local cuisine · Free time · Relaxation';
            }
            else {
                type = 'activity';
                title = `Explore ${dest}`;
                sub = 'Local sights · Culture · Cuisine';
            }
        }
        out.push({ day: i + 1, type, title, sub, date: date ? fdate(date, i) : `Day ${i + 1}` });
    }
    return out;
}
function genDaily(dest, days, people, style, date, trans = 'taxi') {
    const r = SR[style];
    const d = km(dest);
    const out = [];
    let tMult = 1;
    if (trans === 'public')
        tMult = 0.15;
    if (trans === 'self')
        tMult = 0.45;
    const spd = tMult === 0.15 ? 45 : 65; // speed estimation
    for (let i = 0; i < days; i++) {
        let tr, ac, fo, act, dkm, hrs;
        if (i === 0) {
            dkm = d;
            hrs = Math.max(1, Math.round(d / spd));
            tr = Math.round(r.t * people * 1.5 * tMult);
            ac = Math.round(r.a * people);
            fo = Math.round(r.f * people * .8);
            act = 0;
        }
        else if (i === days - 1 && days > 1) {
            dkm = d;
            hrs = Math.max(1, Math.round(d / spd));
            tr = Math.round(r.t * people * 1.2 * tMult);
            ac = 0;
            fo = Math.round(r.f * people * .6);
            act = 0;
        }
        else {
            dkm = Math.round(12 + Math.random() * 22);
            hrs = 1 + Math.round(Math.random() * 1);
            tr = Math.round(r.t * people * .3 * tMult);
            ac = Math.round(r.a * people);
            fo = Math.round(r.f * people);
            act = Math.round(r.ac * people);
        }
        out.push({ day: i + 1, dkm, hrs, tr, ac, fo, act, tot: tr + ac + fo + act, date: date ? fdate(date, i) : `Day ${i + 1}` });
    }
    return out;
}
/* ── CHART ── */
function mkChart(cid, c, ref) {
    const ctx = $(cid);
    if (!ctx)
        return null;
    if (ref)
        ref.destroy();
    return new Chart(ctx, { type: 'doughnut', data: { labels: CL, datasets: [{ data: [c.t, c.a, c.f, c.ac], backgroundColor: CC, borderWidth: 0, hoverOffset: 5 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: '65%', plugins: { legend: { display: false }, tooltip: { callbacks: { label: x => ` ${x.label}: ${lkr(x.raw)}` } } } } });
}
function mkLeg(c) { return CL.map((l, i) => `<div class="legend-item"><div class="legend-dot" style="background:${CC[i]}"></div>${l}</div>`).join(''); }
/* ── DB PROGRESS ── */
function mkDbProg(cid) {
    const lbls = ['Category', 'Method', 'Details', 'Plan'];
    let h = '';
    for (let i = 0; i < 4; i++) {
        if (i > 0)
            h += `<div class="dbp-line done" style="margin:0 4px"></div>`;
        h += `<div class="dbp-step"><div class="dbp-circle ${i < 3 ? 'done' : 'act'}">${i < 3 ? CHECK_SVG : 4}</div><div class="dbp-lbl ${i < 3 ? 'done' : 'act'}">${lbls[i]}</div></div>`;
    }
    $(cid).innerHTML = h;
}
/* ── TAB SWITCH ── */
/* ══ GEO COORDINATES DATABASE ══ */
/* ══ GEO COORDINATES DATABASE — loaded from DB ══ */
let GEO = {
    /* Fallback coords until DB loads */
    'Colombo': [6.9271, 79.8612], 'Kandy': [7.2906, 80.6337], 'Galle': [6.0535, 80.2210],
    'Ella': [6.8667, 81.0466], 'Sigiriya': [7.9570, 80.7600], 'Mirissa': [5.9443, 80.4570],
    'Trincomalee': [8.5667, 81.2333], 'Nuwara Eliya': [6.9497, 80.7891], 'Arugam Bay': [6.8406, 81.8390],
    'Yala': [6.3730, 81.5213], 'Polonnaruwa': [7.9395, 81.0001], 'Anuradhapura': [8.3114, 80.4037],
    'Hikkaduwa': [6.1395, 80.1063], 'Negombo': [7.2004, 79.8355], "Adam's Peak": [6.8097, 80.4992],
    'Dambulla': [7.8567, 80.6515], 'Pinnawala': [7.2982, 80.3885], 'Bentota': [6.4277, 79.9986],
    'Jaffna': [9.6615, 80.0255], 'Horton Plains': [6.8020, 80.8010],
};
/* ══ MAP INSTANCES ══ */
/* ═══════════════════════════════════════════════════════════
   MAP ENGINE  —  Leaflet.js + OpenRouteService
   Real road routing, custom markers, live stats — 100% Free
═══════════════════════════════════════════════════════════ */
/* ── Routing: OSRM public API (GET request, no key, no CORS issues) ── */
const OSRM_BASE = 'https://router.project-osrm.org/route/v1/driving';
/* ── Persistent state ── */
const LF_INST = { A: null, B: null }; // Leaflet Map instances
const LF_LAYERS = { A: [], B: [] }; // Layers to remove on re-render
const LF_CACHE = { A: null, B: null }; // Route cache {key, latLngs, summary}
/* ── Haversine straight-line fallback ── */
function distKm(a, b) {
    const R = 6371, dLat = (b[0] - a[0]) * Math.PI / 180, dLng = (b[1] - a[1]) * Math.PI / 180;
    const x = Math.sin(dLat / 2) ** 2 + Math.cos(a[0] * Math.PI / 180) * Math.cos(b[0] * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
    return Math.round(2 * R * Math.asin(Math.sqrt(x)));
}
function mkMapStat(v, l) {
    return `<div class="map-stat"><div class="map-stat-val">${v}</div><div class="map-stat-lbl">${l}</div></div>`;
}
/* ── Spin keyframe (injected once) ── */
function ensureSpin() {
    if (!$('xtrSpinKf')) {
        const s = document.createElement('style');
        s.id = 'xtrSpinKf';
        s.textContent = '@keyframes xtrSpin{to{transform:rotate(360deg)}}';
        document.head.appendChild(s);
    }
}
/* ── Build SVG pin as Leaflet DivIcon ── */
function lfPin(fillColor, label, shape) {
    const isCircle = shape === 'circle';
    const fontSize = label.length > 2 ? '9px' : label.length > 1 ? '11px' : '13px';
    const w = 36, h = isCircle ? 36 : 44;
    const svgBody = isCircle
        ? `<circle cx="18" cy="18" r="14" fill="${fillColor}" stroke="white" stroke-width="2.5"/>`
        : `<path d="M18 1C10.268 1 4 7.268 4 15c0 10.5 14 24 14 24S32 25.5 32 15C32 7.268 25.732 1 18 1z" fill="${fillColor}" stroke="white" stroke-width="2"/>`;
    const textY = isCircle ? '23' : '18';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 36 ${h}">
    ${svgBody}
    <text x="18" y="${textY}" text-anchor="middle" dominant-baseline="middle" fill="white"
      font-family="Arial,Inter,sans-serif" font-size="${fontSize}" font-weight="800">${label}</text>
  </svg>`;
    return L.divIcon({
        html: svg,
        className: '',
        iconSize: [w, h],
        iconAnchor: [18, isCircle ? 18 : h],
        popupAnchor: [0, isCircle ? -18 : -h]
    });
}
/* ── Clear panel layers ── */
function lfClear(panel) {
    if (!LF_INST[panel])
        return;
    LF_LAYERS[panel].forEach(l => { try {
        LF_INST[panel].removeLayer(l);
    }
    catch (e) { } });
    LF_LAYERS[panel] = [];
}
/* ── Add a clickable marker ── */
function lfAddMarker(panel, map, lat, lng, icon, html) {
    const mk = L.marker([lat, lng], { icon }).addTo(map);
    mk.bindPopup(`<div style="font-family:'Montserrat',sans-serif;padding:4px 6px 2px;min-width:160px;max-width:240px">${html}</div>`);
    LF_LAYERS[panel].push(mk);
    return mk;
}
/* ── Build a cache key from current selection ── */
function mapCacheKey(panel) {
    const s = panel === 'A' ? S.A : S.B;
    const sel = panel === 'A' ? S.selA : S.selB;
    return [s.current, s.dest, ...[...sel].sort()].join('|');
}
/* ── Render stats row from cached summary ── */
function renderMapStats(panel, summary, places, hotel, allCount) {
    const km = (summary.distance / 1000).toFixed(1);
    const hrs = Math.floor(summary.duration / 3600);
    const mins = Math.round((summary.duration % 3600) / 60);
    const dur = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
    $('mapStats' + panel).innerHTML =
        mkMapStat(allCount + ' stops', 'Total Waypoints') +
            mkMapStat(places.length + ' places', 'Attractions Selected') +
            mkMapStat(km + ' km', 'Real Road Distance') +
            mkMapStat(dur, 'Estimated Drive Time') +
            (hotel ? mkMapStat(hotel.emoji + ' ' + hotel.name.split(' ').slice(0, 2).join(' '), 'Your Hotel') : '');
}
/* ── Main map renderer ── */
async function renderMap(panel) {
    const statsId = 'mapStats' + panel;
    const mapDivId = 'gmap' + panel;
    const s = panel === 'A' ? S.A : S.B;
    const sel = panel === 'A' ? S.selA : S.selB;
    const mapDiv = $(mapDivId);
    mapDiv.style.display = 'block';
    /* Build coord lists */
    const fromCoord = GEO[s.current] || GEO['Colombo'];
    const destCoord = GEO[s.dest] || GEO['Ella'];
    const places = [...sel].map(n => ({ name: n, coord: GEO[n] || null })).filter(p => p.coord);
    const hotel = s.selHotel;
    /* Create or reuse Leaflet map (only created once per panel) */
    if (!LF_INST[panel]) {
        LF_INST[panel] = L.map(mapDiv, {
            center: [fromCoord[0], fromCoord[1]],
            zoom: 8,
            zoomControl: true,
            scrollWheelZoom: 'center'
        });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '\u00a9 <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(LF_INST[panel]);
    }
    const map = LF_INST[panel];
    /* Fix layout BEFORE adding markers (avoids double-render) */
    map.invalidateSize();
    /* ── Check route cache — skip ORS call if selection unchanged ── */
    const cacheKey = mapCacheKey(panel);
    const cached = LF_CACHE[panel];
    const cacheHit = cached && cached.key === cacheKey;
    /* Always re-draw markers (fast, local) */
    lfClear(panel);
    lfAddMarker(panel, map, fromCoord[0], fromCoord[1], lfPin('#2aab99', 'S', 'circle'), `<div style="font-weight:800;font-size:13px;color:#1a1f18;margin-bottom:4px">Starting Point</div>
     <div style="font-size:12px;color:#4a5248">${s.current}</div>`);
    places.forEach((p, i) => {
        lfAddMarker(panel, map, p.coord[0], p.coord[1], lfPin('#3b82f6', String(i + 1), 'pin'), `<div style="font-weight:800;font-size:13px;color:#1a1f18;margin-bottom:4px">Stop ${i + 1}</div>
       <div style="font-size:13px;font-weight:600;color:#1a1f18;margin-bottom:2px">${p.name}</div>`);
    });
    lfAddMarker(panel, map, destCoord[0], destCoord[1], lfPin('#dc7c32', 'D', 'circle'), `<div style="font-weight:800;font-size:13px;color:#1a1f18;margin-bottom:4px">Destination</div>
     <div style="font-size:12px;color:#4a5248">${s.dest}</div>`);
    if (hotel) {
        lfAddMarker(panel, map, destCoord[0] + 0.006, destCoord[1] - 0.006, lfPin('#7c3aed', 'H', 'pin'), `<div style="font-weight:800;font-size:13px;color:#1a1f18;margin-bottom:5px">${hotel.emoji} ${hotel.name}</div>
       <div style="font-size:11px;font-weight:700;color:#7c3aed;text-transform:uppercase;letter-spacing:.5px;margin-bottom:5px">${hotel.tier} &nbsp;\u00b7&nbsp; \u2b50 ${hotel.rating}</div>
       <div style="font-size:11px;color:#4a5248;line-height:1.5">${hotel.desc.slice(0, 100)}\u2026</div>`);
    }
    /* ORS waypoints list */
    const MAX_WP = 48;
    let allCoords = [fromCoord, ...places.map(p => p.coord), destCoord];
    if (allCoords.length > MAX_WP) {
        const mid = places.map(p => p.coord);
        const step = mid.length / (MAX_WP - 2);
        const sampled = Array.from({ length: MAX_WP - 2 }, (_, i) => mid[Math.floor(i * step)]);
        allCoords = [fromCoord, ...sampled, destCoord];
    }
    /* ── CACHE HIT: draw saved route instantly, no API call ── */
    if (cacheHit) {
        map.invalidateSize();
        const routeLayer = L.polyline(cached.latLngs, {
            color: '#2aab99', weight: 5, opacity: .9, lineJoin: 'round', lineCap: 'round'
        }).addTo(map);
        LF_LAYERS[panel].push(routeLayer);
        /* Fit to all markers + route for best visibility */
        const allVis = [fromCoord, ...places.map(p => p.coord), destCoord].filter(Boolean);
        const combinedBounds = L.latLngBounds([...routeLayer.getLatLngs(), ...allVis.map(c => [c[0], c[1]])]);
        map.fitBounds(combinedBounds, { padding: [36, 36] });
        renderMapStats(panel, cached.summary, places, hotel, allCoords.length);
        return; // done instantly — no network request
    }
    /* ── CACHE MISS: fetch ORS route ── */
    ensureSpin();
    $(statsId).innerHTML =
        `<div style="display:flex;align-items:center;gap:10px;padding:12px 0;font-size:13px;font-weight:500;color:var(--text3)">
      <div style="width:20px;height:20px;border:2.5px solid var(--teal-mid);border-top-color:var(--teal);border-radius:50%;animation:xtrSpin .8s linear infinite;flex-shrink:0"></div>
      Calculating real road route\u2026
    </div>`;
    /* Fit markers while we wait for the route */
    const markerBounds = L.latLngBounds(allCoords.map(c => [c[0], c[1]]));
    map.fitBounds(markerBounds, { padding: [40, 40] });
    // OSRM: max 25 waypoints, GET request — no CORS preflight, no API key
    const MAX_OSRM = 25;
    let routeCoords = allCoords;
    if (routeCoords.length > MAX_OSRM) {
        const mid = places.map(p => p.coord);
        const step = mid.length / (MAX_OSRM - 2);
        const sampled = Array.from({ length: MAX_OSRM - 2 }, (_, i) => mid[Math.floor(i * step)]);
        routeCoords = [fromCoord, ...sampled, destCoord];
    }
    // OSRM coord format: "lng,lat;lng,lat;..."
    const coordStr = routeCoords.map(c => `${c[1]},${c[0]}`).join(';');
    const osrmUrl = `${OSRM_BASE}/${coordStr}?overview=full&geometries=geojson`;
    try {
        const resp = await fetch(osrmUrl); // simple GET — no preflight, works everywhere
        if (!resp.ok)
            throw new Error(`OSRM HTTP ${resp.status}`);
        const data = await resp.json();
        if (!data.routes || !data.routes[0])
            throw new Error('No route found between these locations');
        const route = data.routes[0];
        const latLngs = route.geometry.coordinates.map(c => [c[1], c[0]]); // [lng,lat] → [lat,lng]
        const summary = { distance: route.distance, duration: route.duration };
        /* Save to cache */
        LF_CACHE[panel] = { key: cacheKey, latLngs, summary };
        /* Draw teal route polyline */
        const routeLayer = L.polyline(latLngs, {
            color: '#2aab99', weight: 5, opacity: .9, lineJoin: 'round', lineCap: 'round'
        }).addTo(map);
        LF_LAYERS[panel].push(routeLayer);
        map.invalidateSize();
        /* Fit to all markers + full route so every selected place is visible */
        const allVis2 = [fromCoord, ...places.map(p => p.coord), destCoord].filter(Boolean);
        const combined2 = L.latLngBounds([...latLngs, ...allVis2.map(c => [c[0], c[1]])]);
        map.fitBounds(combined2, { padding: [36, 36] });
        renderMapStats(panel, summary, places, hotel, routeCoords.length);
    }
    catch (err) {
        console.error('OSRM routing error:', err);
        const km = distKm(fromCoord, destCoord);
        /* Still fit map to all markers so selected places are visible */
        try {
            const allVisible = [fromCoord, ...places.map(p => p.coord), destCoord].filter(Boolean);
            if (allVisible.length > 0) {
                const fallbackBounds = L.latLngBounds(allVisible.map(c => [c[0], c[1]]));
                map.fitBounds(fallbackBounds, { padding: [40, 40] });
                map.invalidateSize();
            }
        }
        catch (e2) { }
        $(statsId).innerHTML =
            mkMapStat(places.length + ' places', 'Attractions Selected') +
                mkMapStat(km + ' km', 'Straight-line Approx') +
                (hotel ? mkMapStat(hotel.emoji + ' ' + hotel.name.split(' ').slice(0, 2).join(' '), 'Your Hotel') : '');
    }
}
/* ══ TAB SWITCH ══ */
// `var` (not `function`) so the monkey-patch reassignments further down
// (`switchA = function(...){ ... }`) are allowed — TypeScript treats a plain
// `function` declaration's name as non-reassignable, but this file's original
// inline <script> reassigns switchA/switchB twice each as later features
// (hotel tab, weather tab) are layered on. `var` (rather than `let`) also
// keeps switchA/switchB visible as window.switchA/window.switchB, which
// another block further down reads directly. Behavior is unchanged.
var switchA = function (t, el) {
    $qa('#page4a .db-tab').forEach(x => x.classList.remove('active'));
    $qa('#page4a .db-tc').forEach(x => x.classList.remove('active'));
    el.classList.add('active');
    $('tcA-' + t).classList.add('active');
    if (t === 'weather')
        renderWeather('weatherA', S.A.dest, S.A.days, S.A.date, S.selA).catch(() => { });
    if (t === 'map') {
        setTimeout(() => {
            renderMap('A');
            if (LF_INST.A)
                LF_INST.A.invalidateSize();
        }, 120);
    }
};
var switchB = function (t, el) {
    $qa('#page4b .db-tab').forEach(x => x.classList.remove('active'));
    $qa('#page4b .db-tc').forEach(x => x.classList.remove('active'));
    el.classList.add('active');
    $('tcB-' + t).classList.add('active');
    if (t === 'weather')
        renderWeather('weatherB', S.B.dest, S.B.days, S.B.date, S.selB).catch(() => { });
    if (t === 'map') {
        setTimeout(() => {
            renderMap('B');
            if (LF_INST.B)
                LF_INST.B.invalidateSize();
        }, 120);
    }
};
/* ── WEATHER ── */
/* ═══════════════════════════════════════════════════════
   OPENWEATHERMAP ONE CALL API 3.0 — LIVE WEATHER ENGINE
   ═══════════════════════════════════════════════════════ */
const OWM_API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // ← Paste your key here
let DEST_COORDS = {
    'Ella': { lat: 6.8667, lon: 81.0467, region: 'Hill Country' },
    'Kandy': { lat: 7.2906, lon: 80.6337, region: 'Central Province' },
    'Galle': { lat: 6.0535, lon: 80.2210, region: 'Southern Coast' },
    'Mirissa': { lat: 5.9483, lon: 80.4716, region: 'Southern Coast' },
    'Sigiriya': { lat: 7.9572, lon: 80.7597, region: 'Cultural Triangle' },
    'Trincomalee': { lat: 8.5874, lon: 81.2152, region: 'East Coast' },
    'Nuwara Eliya': { lat: 6.9497, lon: 80.7891, region: 'Hill Country' },
    'Arugam Bay': { lat: 6.8396, lon: 81.8375, region: 'East Coast' },
    'Yala': { lat: 6.3715, lon: 81.5218, region: 'Southern Province' },
    'Polonnaruwa': { lat: 7.9403, lon: 81.0188, region: 'North Central' },
    'Anuradhapura': { lat: 8.3114, lon: 80.4037, region: 'North Central' },
    'Hikkaduwa': { lat: 6.1395, lon: 80.1044, region: 'Southern Coast' },
    'Negombo': { lat: 7.2095, lon: 79.8344, region: 'Western Coast' },
    "Adam's Peak": { lat: 6.8096, lon: 80.4997, region: 'Sabaragamuwa' },
    'Dambulla': { lat: 7.8675, lon: 80.6517, region: 'Cultural Triangle' },
    'Pinnawala': { lat: 7.3003, lon: 80.3836, region: 'Sabaragamuwa' },
    'Bentota': { lat: 6.4261, lon: 79.9961, region: 'Southern Coast' },
    'Jaffna': { lat: 9.6615, lon: 80.0255, region: 'Northern Province' },
    'Horton Plains': { lat: 6.8025, lon: 80.8039, region: 'Hill Country' },
    'Colombo': { lat: 6.9271, lon: 79.8612, region: 'Western Province' },
};
const _weatherCache = {};
const _CACHE_TTL = 30 * 60 * 1000;
function owmIdToIcon(id) {
    if (id >= 200 && id < 600)
        return 'rain';
    if (id >= 600 && id < 700)
        return 'rain';
    if (id >= 700 && id < 800)
        return 'cloudy';
    if (id === 800)
        return 'sun';
    return 'cloudy';
}
function capFirst(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
async function fetchOWMWeather(dest) {
    const now = Date.now();
    if (_weatherCache[dest] && (now - _weatherCache[dest].ts) < _CACHE_TTL)
        return _weatherCache[dest];
    const coords = DEST_COORDS[dest];
    if (!coords)
        return null;
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=minutely,hourly,alerts&appid=${OWM_API_KEY}&units=metric`;
    try {
        const res = await fetch(url);
        if (!res.ok)
            throw new Error('OWM_' + res.status);
        const data = await res.json();
        const forecast = (data.daily || []).slice(0, 8).map(d => ({
            hi: Math.round(d.temp.max), lo: Math.round(d.temp.min),
            icon: owmIdToIcon(d.weather[0].id), desc: capFirst(d.weather[0].description),
            pop: Math.round((d.pop || 0) * 100), uvi: Math.round(d.uvi || 0), humidity: d.humidity || 0,
        }));
        const cur = data.current || {};
        const current = {
            hi: forecast[0] ? forecast[0].hi : Math.round(cur.temp || 28),
            lo: forecast[0] ? forecast[0].lo : Math.round(cur.feels_like || 20),
            icon: owmIdToIcon(cur.weather?.[0]?.id || 800),
            desc: capFirst(cur.weather?.[0]?.description || 'Clear'),
            region: (DEST_COORDS[dest] || {}).region || 'Sri Lanka',
            humidity: cur.humidity || 0, wind: Math.round(cur.wind_speed || 0), uvi: Math.round(cur.uvi || 0),
        };
        const cached = { forecast, current, ts: now };
        _weatherCache[dest] = cached;
        PLACE_WEATHER_DATA[dest] = current;
        WEATHER_DATA[dest] = forecast;
        return cached;
    }
    catch (e) {
        console.warn('OWM fetch failed:', dest, e.message);
        return null;
    }
}
const WEATHER_DATA = {
    Ella: [{ hi: 24, lo: 15, icon: 'rain', desc: 'Light Rain' }, { hi: 25, lo: 16, icon: 'cloudy', desc: 'Partly Cloudy' }, { hi: 26, lo: 15, icon: 'sun', desc: 'Sunny' }, { hi: 23, lo: 14, icon: 'rain', desc: 'Showers' }, { hi: 25, lo: 16, icon: 'sun', desc: 'Clear' }, { hi: 24, lo: 15, icon: 'cloudy', desc: 'Overcast' }, { hi: 26, lo: 16, icon: 'sun', desc: 'Sunny' }],
    Kandy: [{ hi: 29, lo: 20, icon: 'cloudy', desc: 'Partly Cloudy' }, { hi: 30, lo: 21, icon: 'sun', desc: 'Sunny' }, { hi: 28, lo: 20, icon: 'rain', desc: 'Showers' }, { hi: 30, lo: 22, icon: 'sun', desc: 'Sunny' }, { hi: 29, lo: 21, icon: 'cloudy', desc: 'Cloudy' }, { hi: 31, lo: 22, icon: 'sun', desc: 'Hot & Sunny' }, { hi: 30, lo: 21, icon: 'sun', desc: 'Clear' }],
    Galle: [{ hi: 31, lo: 24, icon: 'sun', desc: 'Sunny' }, { hi: 32, lo: 25, icon: 'sun', desc: 'Hot' }, { hi: 30, lo: 24, icon: 'cloudy', desc: 'Partly Cloudy' }, { hi: 31, lo: 25, icon: 'sun', desc: 'Sunny' }, { hi: 29, lo: 24, icon: 'rain', desc: 'Sea Breeze' }, { hi: 31, lo: 25, icon: 'sun', desc: 'Sunny' }, { hi: 32, lo: 25, icon: 'sun', desc: 'Clear' }],
    Mirissa: [{ hi: 31, lo: 25, icon: 'sun', desc: 'Sunny' }, { hi: 32, lo: 26, icon: 'sun', desc: 'Hot' }, { hi: 30, lo: 25, icon: 'cloudy', desc: 'Breezy' }, { hi: 31, lo: 25, icon: 'sun', desc: 'Clear' }, { hi: 29, lo: 24, icon: 'rain', desc: 'Brief Showers' }, { hi: 32, lo: 26, icon: 'sun', desc: 'Sunny' }, { hi: 31, lo: 25, icon: 'sun', desc: 'Warm' }],
    Sigiriya: [{ hi: 34, lo: 23, icon: 'sun', desc: 'Hot & Dry' }, { hi: 35, lo: 24, icon: 'sun', desc: 'Sunny' }, { hi: 33, lo: 23, icon: 'cloudy', desc: 'Partly Cloudy' }, { hi: 35, lo: 24, icon: 'sun', desc: 'Sunny' }, { hi: 34, lo: 23, icon: 'sun', desc: 'Clear' }, { hi: 33, lo: 22, icon: 'cloudy', desc: 'Hazy' }, { hi: 35, lo: 24, icon: 'sun', desc: 'Hot' }],
    Trincomalee: [{ hi: 33, lo: 26, icon: 'sun', desc: 'Hot & Sunny' }, { hi: 34, lo: 26, icon: 'sun', desc: 'Hot' }, { hi: 33, lo: 25, icon: 'sun', desc: 'Sunny' }, { hi: 32, lo: 25, icon: 'cloudy', desc: 'Partly Cloudy' }, { hi: 34, lo: 26, icon: 'sun', desc: 'Clear' }, { hi: 33, lo: 25, icon: 'sun', desc: 'Sunny' }, { hi: 32, lo: 24, icon: 'cloudy', desc: 'Breezy' }],
    'Nuwara Eliya': [{ hi: 19, lo: 10, icon: 'rain', desc: 'Cool & Misty' }, { hi: 20, lo: 11, icon: 'cloudy', desc: 'Overcast' }, { hi: 21, lo: 12, icon: 'sun', desc: 'Partly Sunny' }, { hi: 18, lo: 10, icon: 'rain', desc: 'Light Rain' }, { hi: 20, lo: 11, icon: 'cloudy', desc: 'Cool & Cloudy' }, { hi: 22, lo: 12, icon: 'sun', desc: 'Clear' }, { hi: 19, lo: 10, icon: 'rain', desc: 'Drizzle' }],
    'Arugam Bay': [{ hi: 31, lo: 24, icon: 'sun', desc: 'Sunny' }, { hi: 32, lo: 25, icon: 'sun', desc: 'Warm & Breezy' }, { hi: 30, lo: 24, icon: 'cloudy', desc: 'Partly Cloudy' }, { hi: 31, lo: 24, icon: 'sun', desc: 'Clear' }, { hi: 30, lo: 23, icon: 'sun', desc: 'Sunny' }, { hi: 31, lo: 25, icon: 'sun', desc: 'Hot' }, { hi: 29, lo: 23, icon: 'cloudy', desc: 'Breezy' }],
    Yala: [{ hi: 34, lo: 24, icon: 'sun', desc: 'Hot & Dry' }, { hi: 35, lo: 25, icon: 'sun', desc: 'Very Hot' }, { hi: 34, lo: 24, icon: 'sun', desc: 'Sunny' }, { hi: 33, lo: 23, icon: 'sun', desc: 'Clear' }, { hi: 35, lo: 25, icon: 'sun', desc: 'Hot' }, { hi: 34, lo: 24, icon: 'cloudy', desc: 'Partly Cloudy' }, { hi: 35, lo: 25, icon: 'sun', desc: 'Sunny' }],
    Polonnaruwa: [{ hi: 35, lo: 24, icon: 'sun', desc: 'Hot & Sunny' }, { hi: 36, lo: 25, icon: 'sun', desc: 'Very Hot' }, { hi: 34, lo: 24, icon: 'sun', desc: 'Clear' }, { hi: 35, lo: 25, icon: 'sun', desc: 'Hot' }, { hi: 34, lo: 23, icon: 'cloudy', desc: 'Partly Cloudy' }, { hi: 35, lo: 24, icon: 'sun', desc: 'Sunny' }, { hi: 33, lo: 23, icon: 'sun', desc: 'Warm' }],
    Anuradhapura: [{ hi: 34, lo: 23, icon: 'sun', desc: 'Warm & Clear' }, { hi: 35, lo: 24, icon: 'sun', desc: 'Hot' }, { hi: 33, lo: 23, icon: 'sun', desc: 'Sunny' }, { hi: 34, lo: 24, icon: 'sun', desc: 'Clear' }, { hi: 33, lo: 22, icon: 'cloudy', desc: 'Partly Cloudy' }, { hi: 34, lo: 23, icon: 'sun', desc: 'Sunny' }, { hi: 35, lo: 24, icon: 'sun', desc: 'Hot' }],
    Hikkaduwa: [{ hi: 30, lo: 24, icon: 'sun', desc: 'Sunny' }, { hi: 31, lo: 25, icon: 'sun', desc: 'Hot' }, { hi: 29, lo: 24, icon: 'cloudy', desc: 'Partly Cloudy' }, { hi: 30, lo: 24, icon: 'sun', desc: 'Clear' }, { hi: 29, lo: 23, icon: 'rain', desc: 'Brief Showers' }, { hi: 30, lo: 24, icon: 'sun', desc: 'Sunny' }, { hi: 31, lo: 25, icon: 'sun', desc: 'Warm' }],
    Negombo: [{ hi: 30, lo: 24, icon: 'cloudy', desc: 'Partly Cloudy' }, { hi: 31, lo: 25, icon: 'sun', desc: 'Sunny' }, { hi: 30, lo: 24, icon: 'sun', desc: 'Clear' }, { hi: 29, lo: 23, icon: 'rain', desc: 'Brief Showers' }, { hi: 30, lo: 24, icon: 'sun', desc: 'Sunny' }, { hi: 30, lo: 24, icon: 'cloudy', desc: 'Overcast' }, { hi: 31, lo: 25, icon: 'sun', desc: 'Warm' }],
    "Adam's Peak": [{ hi: 20, lo: 12, icon: 'rain', desc: 'Misty & Cool' }, { hi: 21, lo: 13, icon: 'cloudy', desc: 'Overcast' }, { hi: 22, lo: 13, icon: 'sun', desc: 'Clear Spells' }, { hi: 19, lo: 11, icon: 'rain', desc: 'Showers' }, { hi: 20, lo: 12, icon: 'cloudy', desc: 'Cool & Cloudy' }, { hi: 21, lo: 12, icon: 'sun', desc: 'Partly Sunny' }, { hi: 20, lo: 11, icon: 'rain', desc: 'Drizzle' }],
    Dambulla: [{ hi: 34, lo: 23, icon: 'sun', desc: 'Hot & Sunny' }, { hi: 35, lo: 24, icon: 'sun', desc: 'Very Hot' }, { hi: 33, lo: 23, icon: 'cloudy', desc: 'Partly Cloudy' }, { hi: 34, lo: 24, icon: 'sun', desc: 'Clear' }, { hi: 35, lo: 24, icon: 'sun', desc: 'Hot' }, { hi: 33, lo: 23, icon: 'sun', desc: 'Sunny' }, { hi: 34, lo: 24, icon: 'sun', desc: 'Hot & Dry' }],
    Pinnawala: [{ hi: 30, lo: 22, icon: 'cloudy', desc: 'Partly Cloudy' }, { hi: 31, lo: 23, icon: 'sun', desc: 'Sunny' }, { hi: 29, lo: 21, icon: 'rain', desc: 'Showers' }, { hi: 30, lo: 22, icon: 'sun', desc: 'Clear' }, { hi: 29, lo: 21, icon: 'cloudy', desc: 'Overcast' }, { hi: 30, lo: 22, icon: 'sun', desc: 'Sunny' }, { hi: 31, lo: 23, icon: 'sun', desc: 'Warm' }],
    Bentota: [{ hi: 31, lo: 25, icon: 'sun', desc: 'Sunny' }, { hi: 32, lo: 25, icon: 'sun', desc: 'Hot' }, { hi: 30, lo: 24, icon: 'cloudy', desc: 'Partly Cloudy' }, { hi: 31, lo: 25, icon: 'sun', desc: 'Clear' }, { hi: 29, lo: 24, icon: 'rain', desc: 'Sea Breeze' }, { hi: 31, lo: 25, icon: 'sun', desc: 'Sunny' }, { hi: 32, lo: 25, icon: 'sun', desc: 'Warm' }],
    Jaffna: [{ hi: 34, lo: 26, icon: 'sun', desc: 'Hot & Dry' }, { hi: 35, lo: 27, icon: 'sun', desc: 'Very Hot' }, { hi: 34, lo: 26, icon: 'sun', desc: 'Clear' }, { hi: 33, lo: 25, icon: 'cloudy', desc: 'Hazy' }, { hi: 34, lo: 26, icon: 'sun', desc: 'Sunny' }, { hi: 35, lo: 27, icon: 'sun', desc: 'Hot' }, { hi: 33, lo: 25, icon: 'sun', desc: 'Warm' }],
    'Horton Plains': [{ hi: 18, lo: 9, icon: 'rain', desc: 'Cool & Windy' }, { hi: 19, lo: 10, icon: 'cloudy', desc: 'Overcast' }, { hi: 20, lo: 10, icon: 'sun', desc: 'Clear Spells' }, { hi: 17, lo: 8, icon: 'rain', desc: 'Heavy Mist' }, { hi: 19, lo: 9, icon: 'cloudy', desc: 'Cloudy' }, { hi: 20, lo: 10, icon: 'sun', desc: 'Partly Sunny' }, { hi: 18, lo: 8, icon: 'rain', desc: 'Drizzle' }],
    Colombo: [{ hi: 31, lo: 25, icon: 'cloudy', desc: 'Partly Cloudy' }, { hi: 32, lo: 25, icon: 'sun', desc: 'Sunny' }, { hi: 30, lo: 24, icon: 'rain', desc: 'Brief Showers' }, { hi: 31, lo: 25, icon: 'sun', desc: 'Clear' }, { hi: 30, lo: 24, icon: 'cloudy', desc: 'Overcast' }, { hi: 31, lo: 25, icon: 'sun', desc: 'Sunny' }, { hi: 30, lo: 24, icon: 'cloudy', desc: 'Partly Cloudy' }],
};
const WEATHER_ICONS = {
    sun: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="7" fill="#f5c542"/><path d="M18 4v3M18 29v3M4 18h3M29 18h3M8.6 8.6l2.1 2.1M25.3 25.3l2.1 2.1M8.6 27.4l2.1-2.1M25.3 10.7l2.1-2.1" stroke="#f5c542" stroke-width="2" stroke-linecap="round"/></svg>`,
    cloudy: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none"><circle cx="14" cy="15" r="5" fill="#fdd87a" opacity=".7"/><path d="M8 22a6 6 0 0 1 0-12h1A8 8 0 1 1 26 22H8z" fill="#c5ccd4"/></svg>`,
    rain: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none"><path d="M8 20a6 6 0 0 1 0-12h1A8 8 0 1 1 26 20H8z" fill="#9baab8"/><path d="M12 24l-2 4M18 24l-2 4M24 24l-2 4" stroke="#6ab4cc" stroke-width="2" stroke-linecap="round"/></svg>`,
};
/* ── MONSOON ZONES ── */
const MONSOON_ZONE = {
    SW: ['Colombo', 'Negombo', 'Galle', 'Hikkaduwa', 'Mirissa', 'Bentota', 'Kandy', 'Nuwara Eliya', 'Ella', 'Horton Plains', "Adam's Peak", 'Pinnawala'],
    NE: ['Trincomalee', 'Arugam Bay', 'Jaffna', 'Polonnaruwa', 'Anuradhapura', 'Sigiriya', 'Dambulla'],
    BOTH: ['Yala'],
};
/* month 0=Jan..11=Dec: 1=poor,2=fair,3=good,4=very good,5=excellent */
const MONTH_RATINGS = {
    Ella: [3, 3, 3, 4, 3, 2, 2, 2, 2, 3, 3, 4],
    Kandy: [3, 4, 4, 4, 3, 2, 2, 2, 2, 3, 3, 3],
    Galle: [5, 5, 5, 5, 4, 2, 2, 2, 3, 4, 4, 5],
    Mirissa: [5, 5, 5, 5, 4, 2, 2, 2, 3, 4, 4, 5],
    Sigiriya: [4, 4, 4, 4, 3, 3, 3, 3, 3, 4, 3, 4],
    Trincomalee: [2, 2, 3, 4, 5, 5, 5, 5, 4, 3, 2, 2],
    'Nuwara Eliya': [3, 3, 3, 4, 3, 2, 2, 2, 2, 3, 3, 3],
    'Arugam Bay': [2, 2, 3, 4, 5, 5, 5, 5, 4, 3, 2, 2],
    Yala: [4, 4, 4, 4, 3, 3, 3, 3, 3, 4, 3, 4],
    Polonnaruwa: [4, 4, 4, 4, 3, 3, 3, 3, 3, 4, 3, 4],
    Anuradhapura: [4, 4, 4, 4, 3, 3, 3, 3, 3, 4, 3, 4],
    Hikkaduwa: [5, 5, 5, 5, 4, 2, 2, 2, 3, 4, 4, 5],
    Negombo: [4, 4, 4, 4, 3, 2, 2, 2, 3, 3, 3, 4],
    "Adam's Peak": [3, 3, 4, 4, 3, 2, 2, 2, 2, 3, 3, 3],
    Dambulla: [4, 4, 4, 4, 3, 3, 3, 3, 3, 4, 3, 4],
    Pinnawala: [3, 4, 4, 4, 3, 2, 2, 2, 2, 3, 3, 3],
    Bentota: [5, 5, 5, 5, 4, 2, 2, 2, 3, 4, 4, 5],
    Jaffna: [2, 2, 3, 4, 5, 5, 5, 5, 4, 3, 2, 2],
    'Horton Plains': [3, 3, 3, 4, 3, 2, 2, 2, 2, 3, 3, 3],
    Colombo: [4, 4, 4, 4, 3, 2, 2, 2, 3, 3, 3, 4],
};
/* Coastal dests: sea conditions by month [0=Jan]: 'calm','moderate','rough' */
const SEA_DATA = {
    Galle: 'calm,calm,calm,calm,rough,rough,rough,rough,rough,moderate,calm,calm'.split(','),
    Mirissa: 'calm,calm,calm,calm,rough,rough,rough,rough,rough,moderate,calm,calm'.split(','),
    Hikkaduwa: 'calm,calm,calm,calm,rough,rough,rough,rough,rough,moderate,calm,calm'.split(','),
    Bentota: 'calm,calm,calm,calm,rough,rough,rough,rough,rough,moderate,calm,calm'.split(','),
    Negombo: 'calm,calm,calm,moderate,rough,rough,rough,rough,moderate,calm,calm,calm'.split(','),
    Trincomalee: 'rough,rough,moderate,moderate,calm,calm,calm,calm,calm,moderate,rough,rough'.split(','),
    'Arugam Bay': 'rough,rough,moderate,moderate,calm,calm,calm,calm,calm,moderate,rough,rough'.split(','),
    Jaffna: 'rough,rough,moderate,moderate,calm,calm,calm,calm,moderate,rough,rough,rough'.split(','),
};
/* Sun times for Sri Lanka (fixed approximate) */
const SUN_TIMES = { rise: '6:00 AM', set: '6:15 PM' };
/* Alternative destinations when weather is poor */
const ALT_DESTS = {
    Galle: ['Mirissa', 'Hikkaduwa', 'Bentota', 'Negombo'],
    Mirissa: ['Galle', 'Hikkaduwa', 'Bentota'],
    Ella: ['Kandy', 'Sigiriya', 'Dambulla'],
    'Nuwara Eliya': ['Kandy', 'Ella', 'Pinnawala'],
    'Horton Plains': ['Kandy', 'Ella', 'Pinnawala'],
    Trincomalee: ['Arugam Bay', 'Sigiriya', 'Polonnaruwa'],
    'Arugam Bay': ['Trincomalee', 'Yala', 'Sigiriya'],
    Jaffna: ['Trincomalee', 'Anuradhapura', 'Sigiriya'],
    Colombo: ['Negombo', 'Kandy', 'Galle'],
    Kandy: ['Sigiriya', 'Dambulla', 'Pinnawala'],
    Sigiriya: ['Dambulla', 'Polonnaruwa', 'Anuradhapura'],
};
/* What NOT to do per condition */
const NOT_TO_DO = {
    rain_cold: ['Do not attempt long mountain hikes alone', 'Do not wear cotton — it stays wet and drains body heat', 'Avoid dusk/dawn outdoor activities — visibility is very low', 'Do not leave waterproofs at the hotel — carry them always', 'Avoid riding open tuk-tuks in heavy rain'],
    rain_warm: ['Do not attempt slippery trail hikes without proper footwear', 'Avoid keeping electronics in open bags — moisture will damage them', 'Do not ignore flash flood warnings in river valleys', 'Avoid booking open-air restaurants without a backup plan', 'Do not schedule multiple outdoor spots on the same rainy day'],
    cloudy: ['No major restrictions — enjoy the comfortable conditions!'],
    hot: ['Do not go sightseeing between 11am and 3pm — peak heat hours', 'Avoid dark or heavy clothing — they trap heat dangerously', 'Do not skip water breaks — dehydration sets in quickly', 'Avoid alcohol during outdoor activity — it accelerates dehydration', 'Do not leave children or elderly without shade and water', 'Avoid touching metal surfaces (railings, car doors) — they burn'],
    mild: ['Avoid visiting crowded spots without an early-morning plan', 'Do not leave without at least a light layer for the evening chill'],
};
/* ── VISIT RECOMMENDATION ENGINE ── */
function getVisitRec(w) {
    const ic = w.icon, hi = w.hi;
    if (ic === 'rain') {
        if (hi <= 20)
            return { level: 'caution',
                verdict: 'Plan Ahead — Cool & Rainy',
                body: 'Cool temperatures and frequent mist create a dramatic atmosphere, but pack warm waterproof layers. Mornings are usually clearest — plan outdoor activities early.',
                tips: ['🧥 Pack waterproof jacket', '🌡 Wear warm layers', '📷 Great for moody photography', '⏰ Go outdoors before 10am', '👟 Waterproof footwear needed'] };
        return { level: 'caution',
            verdict: 'Visit with Rain Gear',
            body: 'Showers are likely but the scenery is lush and rewarding. Plan outdoor activities in the morning and carry a compact raincoat at all times.',
            tips: ['🌂 Carry a compact raincoat', '⛅ Plan activities in the morning', '🏨 Have indoor backup plans', '🐍 Watch for slippery trails', '💦 Waterproof your bag & gear'] };
    }
    if (ic === 'cloudy') {
        return { level: 'good',
            verdict: 'Good — Comfortable Conditions',
            body: 'Overcast skies keep the heat manageable and the light is soft — great for sightseeing and photography. Temperatures are pleasant all day long.',
            tips: ['🕶 Light layers recommended', '📷 Ideal diffused light for photos', '🥾 Great for all-day hikes', '🌤 Rain unlikely but carry an umbrella', '✅ All outdoor activities suitable'] };
    }
    if (hi >= 34)
        return { level: 'caution',
            verdict: 'Visit with Heat Precautions',
            body: 'Bright sunshine and high temperatures make this visually stunning but physically demanding. Pace yourself and avoid the peak midday heat.',
            tips: ['💧 Carry 2L+ water at all times', '🧴 Apply SPF 50+ sunscreen', '🕙 Outdoor visits before 11am or after 4pm', '🎩 Wear a hat & light clothing', '🏪 Take shade breaks every hour'] };
    if (hi >= 29)
        return { level: 'good',
            verdict: 'Excellent — Ideal Visiting Conditions',
            body: 'Warm sunshine and clear skies offer near-perfect conditions for sightseeing, beach trips and adventures. One of the best times to visit this destination.',
            tips: ['🌞 All activities highly suitable', '🧴 Apply sunscreen daily', '💧 Stay hydrated in the warmth', '😎 Bring sunglasses', '🏖 Perfect for outdoor & beach activities'] };
    return { level: 'good',
        verdict: 'Excellent — Perfect Weather',
        body: 'Comfortable temperatures and clear skies create ideal conditions for any activity. Outdoor exploration, hikes and cultural visits are all well-suited to these conditions.',
        tips: ['✅ Ideal for all planned activities', '🥾 Great hiking & walking weather', '🌿 Comfortable all day long', '📸 Perfect light for photography', '🎒 Pack light — great conditions expected'] };
}
function getDayBadge(icon, hi) {
    if (icon === 'rain')
        return { cls: 'r', txt: 'Rain' };
    if (icon === 'cloudy')
        return { cls: 'g', txt: 'Good' };
    if (hi >= 34)
        return { cls: 'c', txt: 'Hot' };
    return { cls: 'g', txt: 'Good' };
}
/* ── PER-PLACE DETAILED RECOMMENDATION ── */
function getPlaceDetailedRec(w) {
    const hi = w.hi, icon = w.icon;
    if (icon === 'rain') {
        if (hi <= 20)
            return {
                level: 'caution',
                title: '⚠️ Cold & Wet — Prepare Carefully',
                summary: 'Temperatures are low with frequent rain or mist. This destination requires warm waterproof gear. Morning spells are typically clearest.',
                warning: 'Cold conditions can be dangerous for unprepared visitors. Hypothermia risk increases if you get wet in these temperatures.',
                actions: ['Wear 3+ layers including a waterproof outer shell', 'Waterproof boots essential — trails will be muddy', 'Plan all outdoor activity between 6am and 11am', 'Carry hot drinks in a thermos', 'Have a warm indoor venue as a backup plan', 'Avoid solo hiking — go in a group']
            };
        return {
            level: 'caution',
            title: '🌧 Rain Expected — Bring Gear',
            summary: 'Showers are likely throughout the day. The landscape will be beautifully lush but outdoor activities may be disrupted.',
            warning: 'Slippery paths and reduced visibility may affect outdoor experiences. Check local conditions on the day.',
            actions: ['Pack a quality compact raincoat or poncho', 'Wear waterproof or quick-dry footwear', 'Plan major outdoor activities for the morning', 'Keep electronics in a waterproof bag', 'Book a mix of indoor and outdoor experiences', 'Have a flexible itinerary — delays possible']
        };
    }
    if (icon === 'cloudy') {
        return {
            level: 'good',
            title: '⛅ Overcast — Great Conditions Overall',
            summary: 'Cloud cover keeps temperatures comfortable and provides soft, even light. Ideal for sightseeing and photography without harsh glare.',
            warning: null,
            actions: ['All planned activities are suitable today', 'Bring a light jacket for cooler moments', 'Excellent light conditions for photos', 'No sun protection urgency but consider sunscreen', 'Stay flexible — clouds may clear for sunny spells']
        };
    }
    if (hi >= 34)
        return {
            level: 'caution',
            title: '☀️ Very Hot — Heat Advisory in Effect',
            summary: 'Temperatures will exceed 34°C. Outdoor activities are enjoyable but heat exhaustion is a real risk without proper precautions.',
            warning: 'Do NOT visit ancient sites or go on hikes during midday (11am–3pm). The heat can be dangerous, especially for children and elderly visitors.',
            actions: ['Start outdoor activities by 7–9am before the heat peaks', 'Return to shade or your hotel between 11am and 3pm', 'Carry and drink at least 2–3 litres of water per person', 'Apply SPF 50+ sunscreen and reapply every 2 hours', 'Wear a wide-brimmed hat and light, breathable clothing', 'Recognise heat exhaustion signs: dizziness, nausea, rapid pulse']
        };
    if (hi >= 29)
        return {
            level: 'good',
            title: '🌤 Warm & Sunny — Highly Recommended',
            summary: 'Near-perfect weather for exploring. Warm, bright conditions suit all types of outdoor activities and sightseeing.',
            warning: null,
            actions: ['All planned activities are highly suitable', 'Apply sunscreen and wear sunglasses', 'Carry water — you will need it in the warmth', 'Arrive at popular spots early to beat crowds', 'Perfect conditions for photography and outdoor dining']
        };
    return {
        level: 'good',
        title: '✅ Comfortable & Clear — Ideal Conditions',
        summary: 'Pleasant temperatures and clear skies make this one of the best times to visit. All activities are well-suited to these conditions.',
        warning: null,
        actions: ['Ideal for all planned activities', 'Light layers are sufficient', 'Great visibility for scenic viewpoints', 'Perfect hiking and cultural tour weather', 'Enjoy outdoor dining — conditions are comfortable all day']
    };
}
/* ── HELPER: rain chance from icon ── */
function rainChance(icon, hi) {
    if (icon === 'rain')
        return hi <= 20 ? '75%' : '65%';
    if (icon === 'cloudy')
        return '28%';
    if (hi >= 34)
        return '8%';
    return '12%';
}
/* ── HELPER: best time of day ── */
function bestVisitTime(icon, hi) {
    if (icon === 'rain')
        return 'Best: 6–10am (drier mornings)';
    if (hi >= 34)
        return 'Best: Before 10am or after 4pm';
    if (icon === 'cloudy')
        return 'Best: All day — comfortable';
    return 'Best: Early morning for fewer crowds';
}
/* ── HELPER: activity suitability ── */
function getActivitySuit(icon, hi, dest) {
    const rain = icon === 'rain', hot = hi >= 34, coastal = SEA_DATA[dest];
    return [
        { name: '🥾 Hiking', cls: rain ? 'no' : hot ? 'maybe' : 'yes' },
        { name: '🏛 Cultural', cls: rain ? 'maybe' : 'yes' },
        { name: '📷 Photography', cls: (icon === 'cloudy' || icon === 'rain' && hi > 20) ? 'yes' : 'yes' },
        { name: '🏊 Swimming', cls: coastal ? (SEA_DATA[dest][new Date().getMonth()] === 'calm' ? 'yes' : 'no') : (rain ? 'no' : 'yes') },
        { name: '🐘 Safari', cls: rain ? 'maybe' : 'yes' },
        { name: '🚣 Water Sports', cls: rain ? 'no' : hot ? 'yes' : 'yes' },
    ];
}
/* ── HELPER: best/worst day index ── */
function getBestDay(arr) {
    let best = 0;
    arr.forEach((d, i) => {
        const score = (d.icon === 'sun' ? 2 : d.icon === 'cloudy' ? 1 : 0) + (d.hi < 34 ? 1 : 0) + (d.hi >= 22 ? 1 : 0);
        const bscore = (arr[best].icon === 'sun' ? 2 : arr[best].icon === 'cloudy' ? 1 : 0) + (arr[best].hi < 34 ? 1 : 0) + (arr[best].hi >= 22 ? 1 : 0);
        if (score > bscore)
            best = i;
    });
    return best;
}
function getWorstDay(arr) {
    let worst = 0;
    arr.forEach((d, i) => {
        const score = (d.icon === 'rain' ? 2 : 0) + (d.hi >= 34 ? 1 : 0) + (d.hi < 18 ? 1 : 0);
        const wscore = (arr[worst].icon === 'rain' ? 2 : 0) + (arr[worst].hi >= 34 ? 1 : 0) + (arr[worst].hi < 18 ? 1 : 0);
        if (score > wscore)
            worst = i;
    });
    return worst;
}
/* ── HELPER: monsoon info ── */
function getMonsoonInfo(dest, dateStr) {
    const m = dateStr ? new Date(dateStr).getMonth() : new Date().getMonth();
    const inSW = MONSOON_ZONE.SW.includes(dest) || MONSOON_ZONE.BOTH.includes(dest);
    const inNE = MONSOON_ZONE.NE.includes(dest) || MONSOON_ZONE.BOTH.includes(dest);
    const swActive = m >= 4 && m <= 8; // May–Sep
    const neActive = m >= 9 || m <= 0; // Oct–Jan
    const interM = (m === 2 || m === 3 || m === 9); // Mar,Apr,Oct
    if (inSW && swActive)
        return {
            type: 'sw', cls: 'sw',
            title: '⚠️ Southwest Monsoon Season Active',
            body: 'This destination is currently in the Southwest (Yala) monsoon. Expect frequent heavy rain, rough seas and reduced outdoor suitability. Budget travelers may find lower prices and fewer crowds.',
            badges: ['Heavy rainfall expected', 'Rough sea conditions', 'Lower accommodation prices', 'Fewer tourists'],
            crowd: '🌧 Low season — expect <strong>20–40% fewer tourists</strong> and significantly lower hotel rates. If you don\'t mind rain, this is a budget-friendly time to visit.',
        };
    if (inNE && neActive)
        return {
            type: 'ne', cls: 'ne',
            title: '⚠️ Northeast Monsoon Season Active',
            body: 'This destination is in the Northeast (Maha) monsoon zone. Expect heavy rain on the east coast. The west coast is often clear during this period — consider visiting Galle or Mirissa instead.',
            badges: ['Northeast monsoon active', 'East coast affected', 'West coast is dry now'],
            crowd: '🌧 Low season — <strong>fewer visitors, lower costs</strong>. West coast alternatives are at their best right now.',
        };
    if (interM)
        return {
            type: 'inter', cls: 'inter',
            title: '🌀 Inter-Monsoon Transition Period',
            body: 'This is a transition month between monsoon seasons. Weather can be unpredictable with afternoon thunderstorms possible. Plan flexible itineraries and keep outdoor activities to mornings.',
            badges: ['Transition period', 'Afternoon storms possible', 'Morning weather generally clear'],
            crowd: '⛅ Shoulder season — <strong>moderate crowds, moderate prices</strong>. Good balance of weather and value.',
        };
    return {
        type: 'dry', cls: 'dry',
        title: '✅ Dry Season — Best Time to Visit',
        body: 'You\'re traveling in the dry season for this destination. Expect mostly clear skies, calm seas and ideal outdoor conditions. This is peak season — book accommodation early.',
        badges: ['Dry season', 'Ideal weather', 'Peak tourist season — book early'],
        crowd: '☀️ Peak season — <strong>high demand, higher prices</strong>. Book accommodation and activities at least 2–4 weeks in advance.',
    };
}
/* ── HELPER: season label & month rating ── */
function getSeasonLabel(dest, dateStr) {
    const m = dateStr ? new Date(dateStr).getMonth() : new Date().getMonth();
    const mName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][m];
    const rating = (MONTH_RATINGS[dest] || [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3])[m];
    const labels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
    return { month: mName, rating, label: labels[rating] || 'Good' };
}
/* ── HELPER: sea conditions ── */
function getSeaCondition(dest, dateStr) {
    if (!SEA_DATA[dest])
        return null;
    const m = dateStr ? new Date(dateStr).getMonth() : new Date().getMonth();
    const cond = SEA_DATA[dest][m];
    const map = {
        calm: { cls: 'calm', label: '🌊 Calm Seas — Great for swimming & water sports', note: 'Ideal for snorkelling, surfing & whale watching' },
        moderate: { cls: 'moderate', label: '🌊 Moderate Seas — Caution advised', note: 'Suitable for experienced swimmers only — check local flags' },
        rough: { cls: 'rough', label: '🌊 Rough Seas — Not suitable for swimming', note: 'Do not enter the water — dangerous currents and waves present' },
    };
    return map[cond] || null;
}
/* ── HELPER: not-to-do list ── */
function getNotToDo(icon, hi) {
    if (icon === 'rain' && hi <= 20)
        return NOT_TO_DO.rain_cold;
    if (icon === 'rain')
        return NOT_TO_DO.rain_warm;
    if (icon === 'cloudy')
        return NOT_TO_DO.cloudy;
    if (hi >= 34)
        return NOT_TO_DO.hot;
    return NOT_TO_DO.mild;
}
/* ── HELPER: weather score for ranking ── */
function weatherScore(w) {
    let s = 5;
    if (w.icon === 'rain')
        s -= 2;
    if (w.hi >= 34)
        s -= 1;
    if (w.hi < 18)
        s -= 1;
    if (w.icon === 'sun' && w.hi >= 24 && w.hi < 34)
        s += 1;
    return Math.max(1, Math.min(5, s));
}
/* ── HELPER: draw temp trend chart ── */
let trendCharts = {};
function drawTrendChart(canvasId, daysArr) {
    const ctx = $(canvasId);
    if (!ctx)
        return;
    if (trendCharts[canvasId])
        trendCharts[canvasId].destroy();
    trendCharts[canvasId] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: daysArr.map(d => d.label),
            datasets: [
                { label: 'High °C', data: daysArr.map(d => d.hi), borderColor: '#f5c542', backgroundColor: 'rgba(245,197,66,.1)', borderWidth: 2, pointRadius: 4, pointBackgroundColor: '#f5c542', tension: .3, fill: false },
                { label: 'Low °C', data: daysArr.map(d => d.lo), borderColor: '#6ab4cc', backgroundColor: 'rgba(106,180,204,.08)', borderWidth: 2, pointRadius: 4, pointBackgroundColor: '#6ab4cc', tension: .3, fill: '-1' },
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { labels: { font: { size: 10 }, boxWidth: 12 } }, tooltip: { callbacks: { label: c => `${c.dataset.label}: ${c.raw}°C` } } },
            scales: {
                x: { grid: { display: false }, ticks: { font: { size: 9 }, maxRotation: 30 } },
                y: { grid: { color: 'rgba(0,0,0,.05)' }, ticks: { font: { size: 9 }, callback: v => v + '°' }, beginAtZero: false },
            }
        }
    });
}
async function renderWeather(elId, dest, days, date, selSet) {
    const el = $(elId);
    if (!el)
        return;
    const alreadyCached = _weatherCache[dest] && (Date.now() - _weatherCache[dest].ts) < _CACHE_TTL;
    if (!alreadyCached) {
        el.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:48px 20px;color:var(--text3)">
      <div style="width:36px;height:36px;border:3px solid var(--teal-mid);border-top-color:var(--teal);border-radius:50%;animation:xtrSpin .8s linear infinite"></div>
      <div style="font-size:13px;font-family:'Montserrat',sans-serif;font-weight:500">Fetching live weather for <strong style="color:var(--text1)">${dest}</strong>&hellip;</div>
      <div style="font-size:11px;color:var(--text3)">Powered by OpenWeatherMap</div>
    </div>`;
    }
    try {
        await fetchOWMWeather(dest);
        if (selSet && selSet.size > 0)
            await Promise.allSettled([...selSet].map(n => fetchOWMWeather(n)));
    }
    catch (e) {
        console.warn('Weather fetch error:', e);
    }
    const w = PLACE_WEATHER_DATA[dest] || { hi: 28, lo: 20, icon: 'sun', desc: 'Sunny', region: 'Sri Lanka' };
    const rec = getVisitRec(w);
    const monsoon = getMonsoonInfo(dest, date);
    const season = getSeasonLabel(dest, date);
    const sea = getSeaCondition(dest, date);
    const notDo = getNotToDo(w.icon, w.hi);
    const alts = ALT_DESTS[dest] || [];
    const showAlts = (monsoon.type === 'sw' || monsoon.type === 'ne') && alts.length > 0;
    const verdictIcons = {
        good: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="9" fill="#2aab99" opacity=".25"/><circle cx="11" cy="11" r="6" fill="#2aab99"/><path d="M8 11l2 2 4-4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        caution: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 3L2 19h18L11 3z" stroke="#dc7c32" stroke-width="1.5" stroke-linejoin="round" fill="rgba(220,124,50,.2)"/><path d="M11 10v4M11 15.5v.5" stroke="#dc7c32" stroke-width="1.6" stroke-linecap="round"/></svg>`,
        poor: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="9" fill="#d94f4f" opacity=".2"/><circle cx="11" cy="11" r="6" fill="#d94f4f"/><path d="M8.5 8.5l5 5M13.5 8.5l-5 5" stroke="white" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    };
    const forecastData = WEATHER_DATA[dest] || WEATHER_DATA.Ella;
    const count = Math.min(days, 7);
    const daysArr = Array.from({ length: count }, (_, i) => {
        const d = forecastData[i % forecastData.length];
        return { ...d, label: date ? fdate(date, i) : `Day ${i + 1}` };
    });
    const bestIdx = getBestDay(daysArr), worstIdx = getWorstDay(daysArr);
    const makeTips = tips => tips.map(t => `<span class="wt-tip">${t}</span>`).join('');
    const makeStars = r => [1, 2, 3, 4, 5].map(i => `<span class="wt-star ${i <= r ? 'on' : 'off'}">★</span>`).join('');
    const selArr = selSet ? [...selSet] : [];
    /* ── Ranked places ── */
    const rankedPlaces = [...selArr].map(n => {
        const pw = PLACE_WEATHER_DATA[n] || PLACE_WEATHER_DATA[dest] || { hi: 28, lo: 20, icon: 'sun', desc: 'Sunny' };
        return { name: n, pw, score: weatherScore(pw) };
    }).sort((a, b) => b.score - a.score);
    /* ── Conflict check ── */
    const conflicts = [];
    if (selArr.length > 1 && count > 0) {
        selArr.forEach(n => {
            const pw = PLACE_WEATHER_DATA[n] || PLACE_WEATHER_DATA[dest] || { hi: 28, lo: 20, icon: 'sun' };
            if (pw.icon === 'rain')
                conflicts.push(n);
        });
    }
    /* ── Per-place blocks ── */
    const chartId = elId + '_chart';
    const placeBlocks = selArr.map((name, idx) => {
        const pw = PLACE_WEATHER_DATA[name] || PLACE_WEATHER_DATA[dest] || { hi: 28, lo: 20, icon: 'sun', desc: 'Sunny', region: 'Sri Lanka' };
        const pForecast = WEATHER_DATA[name] || WEATHER_DATA[dest] || WEATHER_DATA.Ella;
        const pr = getPlaceDetailedRec(pw);
        const ovRec = getVisitRec(pw);
        const pSea = getSeaCondition(name, date) || getSeaCondition(dest, date);
        const pNotDo = getNotToDo(pw.icon, pw.hi);
        const pBestTime = bestVisitTime(pw.icon, pw.hi);
        const pRainPct = rainChance(pw.icon, pw.hi);
        const acts = getActivitySuit(pw.icon, pw.hi, name);
        const pDays = Array.from({ length: count }, (_, i) => {
            const d = pForecast[i % pForecast.length];
            return { ...d, label: date ? fdate(date, i) : `Day ${i + 1}` };
        });
        const pBest = getBestDay(pDays), pWorst = getWorstDay(pDays);
        const pChartId = elId + '_pc_' + idx;
        const alertBox = pr.warning ? `<div style="margin:0 0 10px;padding:9px 12px;border-radius:8px;background:#fff3cd;border:1px solid #ffc107;font-size:11px;line-height:1.55;color:#7a4800;">⚠️ <strong>Warning:</strong> ${pr.warning}</div>` : '';
        const seaBox = pSea ? `<div class="wt-sea-row ${pSea.cls}">${pSea.label}<span style="margin-left:6px;font-size:10px;opacity:.7">— ${pSea.note}</span></div>` : '';
        const actionList = pr.actions.map(a => `<li style="margin-bottom:4px">${a}</li>`).join('');
        const notDoList = pNotDo.map(a => `<li style="margin-bottom:4px">${a}</li>`).join('');
        return `<div class="wt-place-block">
      <div class="wt-place-block-head">
        <div class="wt-pb-icon">${WEATHER_ICONS[pw.icon] || WEATHER_ICONS.sun}</div>
        <div>
          <div class="wt-pb-name">${name}</div>
          <div class="wt-pb-region">${pw.region} · ${pw.desc} · 🌧 Rain: ${pRainPct}</div>
          <div style="font-size:10px;color:var(--text3);margin-top:2px">⏰ ${pBestTime}</div>
        </div>
        <div style="margin-left:auto;text-align:right">
          <div class="wt-pb-hi">${pw.hi}°C</div>
          <div class="wt-pb-lo">Low ${pw.lo}°C</div>
          <span class="wt-pb-badge ${ovRec.level}" style="margin-top:4px;display:inline-flex">${ovRec.level === 'good' ? '✓ Good to Visit' : '⚠ Visit with Care'}</span>
        </div>
      </div>
      ${seaBox ? `<div style="padding:0 16px">${seaBox}</div>` : ''}
      <div style="padding:12px 16px 0">
        <div style="font-size:11px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.6px;margin-bottom:8px">${count}-Day Forecast for ${name}</div>
        <div class="wt-forecast-grid">
          ${pDays.map((d, i) => {
            const b = getDayBadge(d.icon, d.hi);
            const dc = d.icon === 'rain' ? 'day-rain' : d.hi >= 34 ? 'day-caution' : 'day-good';
            const isBest = i === pBest && count > 1, isWorst = i === pWorst && count > 1 && pWorst !== pBest;
            return `<div class="wt-day ${dc}${isBest ? ' best-day' : isWorst ? ' worst-day' : ''}">
              ${isBest ? '<span class="wt-best-tag">BEST DAY</span>' : ''}
              ${isWorst ? '<span class="wt-worst-tag">AVOID</span>' : ''}
              <div class="wt-day-name">${d.label}</div>
              <div class="wt-day-icon" style="width:28px;height:28px;margin:0 auto 5px">${WEATHER_ICONS[d.icon] || WEATHER_ICONS.sun}</div>
              <div class="wt-day-hi" style="font-size:14px">${d.hi}°</div>
              <div class="wt-day-lo">Low ${d.lo}°</div>
              <div class="wt-day-desc">${d.desc}</div>
              <div style="font-size:9px;color:#6ab4cc;margin-top:3px">🌧${rainChance(d.icon, d.hi)}</div>
              <span class="wt-day-badge ${b.cls}">${b.txt}</span>
            </div>`;
        }).join('')}
        </div>
      </div>
      <div class="wt-activity-row">
        <span style="font-size:10px;font-weight:700;color:var(--text3);margin-right:4px">Activities:</span>
        ${acts.map(a => `<span class="wt-act ${a.cls}">${a.name}</span>`).join('')}
      </div>
      <div class="wt-place-alert ${pr.level}" style="margin:12px 16px 0">
        <div class="wt-place-alert-body"><b>${pr.title}</b><span>${pr.summary}</span></div>
      </div>
      ${alertBox}
      <div style="padding:0 16px 12px;margin-top:10px;display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div>
          <div style="font-size:11px;font-weight:700;color:var(--text2);margin-bottom:5px;text-transform:uppercase;letter-spacing:.5px">✅ What to do:</div>
          <ul style="padding-left:16px;margin:0;font-size:12px;color:var(--text2);line-height:1.7">${actionList}</ul>
        </div>
        <div>
          <div class="wt-notdo-title">🚫 What NOT to do:</div>
          <ul style="padding-left:16px;margin:0;font-size:12px;line-height:1.7">${notDoList}</ul>
        </div>
      </div>
    </div>`;
    }).join('');
    /* Ranked places HTML */
    const rankHtml = rankedPlaces.length > 0 ? `
    <div class="wt-section">
      <div class="wt-section-head">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 1l1.5 3.5H13l-3 2.5 1 3.5-3.5-2L4 10.5l1-3.5L2 4.5h4L7.5 1z" stroke="#2aab99" stroke-width="1.3" stroke-linejoin="round" fill="none"/></svg>
        <span class="wt-section-title">Best Weather — Place Ranking</span>
        <span class="wt-section-sub">${rankedPlaces.length} selected places</span>
      </div>
      <div class="wt-rank-list">
        ${rankedPlaces.map((p, i) => {
        const nc = i === 0 ? 'r1' : i === 1 ? 'r2' : i === 2 ? 'r3' : 'rn';
        const vRec = getVisitRec(p.pw);
        return `<div class="wt-rank-item">
            <div class="wt-rank-num ${nc}">${i + 1}</div>
            <div>${WEATHER_ICONS[p.pw.icon] || WEATHER_ICONS.sun}</div>
            <div style="flex:1"><div class="wt-rank-name">${p.name}</div><div style="font-size:10px;color:var(--text3)">${p.pw.region || ''} · ${p.pw.desc}</div></div>
            <div style="text-align:right"><div class="wt-rank-temp">${p.pw.hi}°/${p.pw.lo}°C</div><span class="wt-dest-verdict ${vRec.level}" style="margin-top:3px;display:inline-flex">${vRec.level === 'good' ? 'Good' : 'Caution'}</span></div>
          </div>`;
    }).join('')}
      </div>
    </div>` : '';
    /* Conflict warning */
    const conflictHtml = conflicts.length > 1 ? `
    <div class="wt-conflict">
      ⚠️ <div><strong>Weather conflict detected:</strong> ${conflicts.join(', ')} all have rainy conditions. Spread these visits across different days and always carry rain gear. Consider visiting indoor cultural sites on the wettest day.</div>
    </div>` : '';
    /* Temp chart unique canvas id */
    const uniqueChartId = elId + '_trend';
    const _heroCached = _weatherCache[dest];
    const _heroIsLive = _heroCached && (Date.now() - _heroCached.ts) < _CACHE_TTL;
    const _heroUpdRaw = _heroIsLive ? new Date(_heroCached.ts).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : null;
    const _heroUpdTime = _heroUpdRaw ? `<span style="font-size:10px;color:rgba(255,255,255,.4);font-family:'IBM Plex Mono',monospace">Updated ${_heroUpdRaw}</span>` : '';
    const _heroLiveTag = _heroIsLive
        ? `<span style="display:inline-flex;align-items:center;gap:4px;background:rgba(42,171,153,.25);border:1px solid rgba(42,171,153,.4);border-radius:20px;padding:2px 8px;font-size:10px;font-weight:600;color:rgba(255,255,255,.85);margin-left:8px"><span style="width:6px;height:6px;background:#2aab99;border-radius:50%;display:inline-block;animation:livePulse 2s ease-in-out infinite"></span>LIVE</span>`
        : `<span style="display:inline-flex;align-items:center;gap:4px;background:rgba(255,255,255,.1);border-radius:20px;padding:2px 8px;font-size:10px;color:rgba(255,255,255,.45);margin-left:8px">ESTIMATED</span>`;
    const _heroF0 = _heroCached && _heroCached.forecast && _heroCached.forecast[0];
    const _heroPrecip = (_heroF0 && _heroF0.pop != null) ? `<div style="font-size:11px;color:rgba(255,255,255,.5);margin-top:2px">💧 ${_heroF0.pop}% precip</div>` : '';
    const _heroExtraStats = (_heroIsLive && w.humidity) ? `<div style="display:flex;gap:12px;margin-top:10px;flex-wrap:wrap"><span style="font-size:11px;color:rgba(255,255,255,.65)">💧 ${w.humidity}%</span>${w.wind != null ? `<span style="font-size:11px;color:rgba(255,255,255,.65)">🌬 ${w.wind} m/s</span>` : ''} ${w.uvi != null ? `<span style="font-size:11px;color:rgba(255,255,255,.65)">☀️ UV ${w.uvi}</span>` : ''}</div>` : '';
    el.innerHTML = `<div class="wt-wrap">

    <!-- Monsoon Banner -->
    <div class="wt-monsoon ${monsoon.cls}">
      <div class="wt-monsoon-icon">${monsoon.type === 'dry' ? '☀️' : monsoon.type === 'sw' ? '🌧' : monsoon.type === 'ne' ? '🌀' : '⛅'}</div>
      <div style="flex:1">
        <div class="wt-monsoon-title">${monsoon.title}</div>
        <div class="wt-monsoon-body">${monsoon.body}</div>
        <div class="wt-monsoon-badges">${monsoon.badges.map(b => `<span class="wt-mbadge">${b}</span>`).join('')}</div>
      </div>
    </div>

    <!-- Hero card -->
    <div class="wt-hero">
      <div class="wt-hero-tag" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px">
        <span style="display:flex;align-items:center;gap:6px">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4" stroke="currentColor" stroke-width="1.2"/><path d="M5 2.5v2.5l1.5 1" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>
          Live Conditions · ${dest} ${_heroLiveTag}
        </span>
        ${_heroUpdTime}
      </div>
      <div class="wt-hero-main">
        <div class="wt-hero-left">
          <div class="wt-hero-dest">${dest}</div>
          <div class="wt-hero-region">${w.region}${_heroIsLive ? ' · OpenWeatherMap' : ' · Estimated'}</div>
          <div class="wt-hero-cond">
            <div class="wt-hero-icon">${WEATHER_ICONS[w.icon] || WEATHER_ICONS.sun}</div>
            <div class="wt-hero-desc-txt">${w.desc}</div>
          </div>
          ${_heroExtraStats}
        </div>
        <div class="wt-hero-right">
          <div class="wt-hero-hi">${w.hi}°</div>
          <div class="wt-hero-lo">Low ${w.lo}°C</div>
          <div style="font-size:11px;color:rgba(255,255,255,.5);margin-top:4px">🌧 Rain: ${rainChance(w.icon, w.hi)}</div>
          ${_heroPrecip}
        </div>
      </div>
      <!-- Season & sun info row -->
      <div class="wt-meta-row">
        <span class="wt-meta-pill">📅 ${season.month} — ${season.label}</span>
        <span class="wt-meta-pill">🌅 Sunrise ${SUN_TIMES.rise}</span>
        <span class="wt-meta-pill">🌇 Sunset ${SUN_TIMES.set}</span>
        <span class="wt-meta-pill">⏰ ${bestVisitTime(w.icon, w.hi)}</span>
        ${sea ? `<span class="wt-meta-pill">🌊 ${sea.cls === 'calm' ? 'Calm Seas' : sea.cls === 'moderate' ? 'Moderate Seas' : 'Rough Seas'}</span>` : ''}
      </div>
      <!-- Month rating -->
      <div class="wt-month-rating">
        ${makeStars(season.rating)}
        <span class="wt-month-label">${season.month} is rated <strong style="color:#f5c542">${season.label}</strong> for ${dest}</span>
      </div>
      <div class="wt-verdict ${rec.level}" style="margin-top:12px">
        <div class="wt-verdict-icon">${verdictIcons[rec.level]}</div>
        <div style="flex:1">
          <div class="wt-verdict-title">${rec.verdict}</div>
          <div class="wt-verdict-body">${rec.body}</div>
          <div class="wt-action-tips">${makeTips(rec.tips)}</div>
        </div>
      </div>
    </div>

    <!-- Crowd & budget insight -->
    <div class="wt-section">
      <div class="wt-section-head">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="5" cy="5" r="2" stroke="#2aab99" stroke-width="1.2"/><circle cx="10" cy="5" r="2" stroke="#2aab99" stroke-width="1.2"/><path d="M1.5 13v-1a3.5 3.5 0 0 1 7 0v1M10 8a3 3 0 0 1 3.5 2.5V13" stroke="#2aab99" stroke-width="1.2" stroke-linecap="round"/></svg>
        <span class="wt-section-title">Crowds & Budget Insight</span>
      </div>
      <div style="padding:14px 16px">
        <div class="wt-crowd">${monsoon.crowd}</div>
        ${showAlts ? `
        <div style="margin-top:12px;font-size:11px;font-weight:700;color:var(--text2);margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px">🔄 Consider these alternatives with better conditions:</div>
        <div class="wt-alt-grid">${alts.map(a => `<span class="wt-alt-chip">📍 ${a}</span>`).join('')}</div>` : ''}
      </div>
    </div>

    <!-- Trip forecast + trend chart -->
    <div class="wt-section">
      <div class="wt-section-head">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1.5" y="2.5" width="12" height="11" rx="1.5" stroke="#2aab99" stroke-width="1.3"/><path d="M5 1.5v2M10 1.5v2M1.5 7h12" stroke="#2aab99" stroke-width="1.3" stroke-linecap="round"/></svg>
        <span class="wt-section-title">${count}-Day Trip Forecast</span>
        <span class="wt-section-sub">${dest}</span>
      </div>
      <div class="wt-section-body">
        ${conflictHtml}
        <div class="wt-forecast-grid">
          ${daysArr.map((d, i) => {
        const b = getDayBadge(d.icon, d.hi);
        const dc = d.icon === 'rain' ? 'day-rain' : d.hi >= 34 ? 'day-caution' : 'day-good';
        const isBest = i === bestIdx && count > 1, isWorst = i === worstIdx && count > 1 && worstIdx !== bestIdx;
        return `<div class="wt-day ${dc}${isBest ? ' best-day' : isWorst ? ' worst-day' : ''}">
              ${isBest ? '<span class="wt-best-tag">BEST DAY</span>' : ''}
              ${isWorst ? '<span class="wt-worst-tag">WORST DAY</span>' : ''}
              <div class="wt-day-name">${d.label}</div>
              <div class="wt-day-icon">${WEATHER_ICONS[d.icon] || WEATHER_ICONS.sun}</div>
              <div class="wt-day-hi">${d.hi}°</div>
              <div class="wt-day-lo">Low ${d.lo}°C</div>
              <div class="wt-day-desc">${d.desc}</div>
              <div style="font-size:9px;color:#6ab4cc;margin-top:2px">🌧 ${rainChance(d.icon, d.hi)}</div>
              <span class="wt-day-badge ${b.cls}">${b.txt}</span>
            </div>`;
    }).join('')}
        </div>
        <!-- Temperature trend chart -->
        <div style="margin-top:16px;padding:12px;border:1px solid var(--border);border-radius:var(--r8);background:var(--surface2)">
          <div style="font-size:11px;font-weight:700;color:var(--text2);margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px">📈 Temperature Trend</div>
          <div class="wt-chart-wrap"><canvas id="${uniqueChartId}"></canvas></div>
        </div>
      </div>
    </div>

    <!-- Places ranking -->
    ${rankHtml}

    <!-- Selected places detail -->
    <div class="wt-section">
      <div class="wt-section-head">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 1.5C5.57 1.5 4 3.07 4 5c0 3.28 3.5 7.5 3.5 7.5S11 8.28 11 5C11 3.07 9.43 1.5 7.5 1.5zm0 4.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" stroke="#2aab99" stroke-width="1.3" fill="none"/></svg>
        <span class="wt-section-title">Selected Places — Full Forecast</span>
        <span class="wt-section-sub">${selArr.length} place${selArr.length !== 1 ? 's' : ''} selected</span>
      </div>
      ${selArr.length === 0
        ? `<div style="text-align:center;padding:32px 20px">
            <div style="width:48px;height:48px;background:var(--teal-lt);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 14px"><svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 2C8.24 2 6 4.24 6 7c0 4.06 5 9 5 9s5-4.94 5-9c0-2.76-2.24-5-5-5zm0 6.75A1.75 1.75 0 1 1 11 5.25a1.75 1.75 0 0 1 0 3.5z" stroke="#2aab99" stroke-width="1.5" fill="none"/></svg></div>
            <div style="font-size:14px;font-weight:600;color:var(--text1);margin-bottom:6px">No places selected yet</div>
            <div style="font-size:12px;color:var(--text3);line-height:1.6;max-width:300px;margin:0 auto">Go to the <strong>Places</strong> tab and tick the spots you plan to visit. Each place will show a full ${count}-day forecast, activity guide, and safety checklist here.</div>
          </div>`
        : `<div style="display:flex;flex-direction:column;gap:12px;padding:16px">${placeBlocks}</div>`}
      <div class="wt-note">Conditions shown are seasonal averages for Sri Lanka. Always verify with a live weather service before travel.</div>
    </div>

  </div>`;
    /* Draw temp trend chart after DOM is ready */
    setTimeout(() => drawTrendChart(uniqueChartId, daysArr), 80);
}
/* ── META HTML ── */
function metaHTML(from, dest, days, people, style) {
    return `<span class="th-mi"><span class="th-mi-icon">${STAT_SVGS.pin}</span>From ${from || 'Colombo'}</span>
    <span class="th-mi"><span class="th-mi-icon">${STAT_SVGS.calendar}</span>${days} ${days > 1 ? 'days' : 'day'}</span>
    <span class="th-mi"><span class="th-mi-icon">${STAT_SVGS.people}</span>${people} ${people > 1 ? 'people' : 'person'}</span>
    <span class="th-mi"><span class="th-mi-icon">${STAT_SVGS.style}</span>${style.charAt(0).toUpperCase() + style.slice(1)} style</span>`;
}
/* ─────────────────────────────────────
   PLACE DETAILS — extended info for the detail modal
───────────────────────────────────── */
const PLACE_DETAILS = {
    "Nine Arch Bridge": { gradient: 'linear-gradient(135deg,#1a3d2c 0%,#2aab99 100%)', emoji: '🌉', tags: ['Colonial', 'Railway', 'Nature'], highlights: [{ ico: '🚂', t: 'Colonial Engineering', b: 'Built in 1921 using brick and cement — no steel used during WW1.' }, { ico: '📸', t: 'Best Photo Spot', b: 'Stand on the opposite hillside early morning when the train passes for the iconic shot.' }, { ico: '🌿', t: 'Jungle Setting', b: 'Lush tea plantation jungle frames every angle of the bridge beautifully.' }], tips: ['Trains pass at roughly 7am, 9am, and 3pm — check live timings with your guesthouse.', 'The walk through the tea estate is muddy after rain — wear grip shoes.', 'Enter via the Ella town side path for the best elevated vantage point.'], bestTime: 'Early morning (6–9am) for the train crossing', difficulty: 'Easy · Well-paved path', extraDesc: 'The Nine Arch Bridge is one of Sri Lanka\'s most photographed landmarks — a sweeping 300-foot colonial-era viaduct that cuts through dense jungle. When a blue train rounds the curve overhead, the scene is pure magic. Photography enthusiasts should plan around train times for the iconic image.' },
    "Little Adam's Peak": { gradient: 'linear-gradient(135deg,#2d5e43 0%,#6ab4cc 100%)', emoji: '⛰️', tags: ['Hiking', 'Views', 'Easy'], highlights: [{ ico: '🌅', t: 'Panoramic Valley Views', b: 'Sweeping 180° views over the Ella Gap, Nine Arch Bridge and surrounding tea hills.' }, { ico: '🥾', t: 'Beginner Friendly', b: 'A well-marked, easy trail suitable for all fitness levels — completed in about 2 hours.' }, { ico: '☕', t: 'Tea Country Setting', b: 'The trail winds through active tea estates with fragrant tea bushes on both sides.' }], tips: ['Start before 7am to catch the sunrise and beat the crowds.', 'The summit ridge can be windy — bring a light layer.', 'Combine with the Nine Arch Bridge for a full morning excursion.'], bestTime: 'Dawn to 9am for sunrise views and cool temperatures', difficulty: 'Easy · 3 km round trip · ~2–3 hrs', extraDesc: 'Little Adam\'s Peak offers some of the most rewarding views in the Ella region for minimal effort. The trail rises gently through tea estates before opening out onto a spectacular ridge with views of the valley, distant hills, and the famous Nine Arch Bridge far below.' },
    "Ella Rock": { gradient: 'linear-gradient(135deg,#1a2e1a 0%,#2d5e43 100%)', emoji: '🏔️', tags: ['Challenging Hike', '360° Views', 'Adventure'], highlights: [{ ico: '🗺️', t: 'Trail Navigation Required', b: 'No official signs — a local guide is strongly recommended for the route through tea estates.' }, { ico: '🌄', t: '360° Summit Views', b: 'On a clear day you can see all the way to the southern coast — the best viewpoint in the region.' }, { ico: '🐒', t: 'Wildlife Encounters', b: 'Wild monkeys, exotic birds and occasionally sambar deer are spotted along the trail.' }], tips: ['Hire a local guide from Ella town (LKR 2,000–3,000) — the route is complex.', 'Leave by 6am to summit before clouds roll in around mid-morning.', 'Carry 1.5L water per person — no water sources on the trail.', 'Wear proper hiking shoes — the descent is steep and slippery.'], bestTime: 'Early morning (6–8am start) on clear days', difficulty: 'Challenging · 6 km · ~4–5 hrs', extraDesc: 'Ella Rock is the crown jewel of Ella\'s hiking scene and the most exhilarating experience the region offers. The unmarked trail through rubber trees, tea estates and jungle requires navigation skill, but rewards you with a summit panorama that is simply breathtaking — the whole of southern Sri Lanka stretching to the sea.' },
    "Ravana Falls": { gradient: 'linear-gradient(135deg,#1a3a5c 0%,#6ab4cc 100%)', emoji: '💧', tags: ['Waterfall', 'Nature', 'Legend'], highlights: [{ ico: '💦', t: '25m Cascade', b: 'A dramatic 25-metre tiered waterfall visible directly from the main Ella Road.' }, { ico: '🐘', t: 'Ramayana Legend', b: 'Believed to be where the demon king Ravana hid Sita in the ancient Ramayana epic.' }, { ico: '🏊', t: 'Swimming Hole', b: 'A natural pool at the base allows for a refreshing dip — popular with locals.' }], tips: ['Visit in the morning before tour buses arrive.', 'Entry is LKR 500 — no haggling with touts at the gate.', 'The rocks near the base are slippery — wear grip sandals.', 'Best flow is from November to February after rains.'], bestTime: 'Morning visits avoid crowds; post-monsoon for maximum flow', difficulty: 'Easy · Roadside access', extraDesc: 'Ravana Falls tumbles 25 metres down a tiered granite face into a cool natural swimming pool below, and is steeped in the lore of the ancient Ramayana. It\'s the most accessible major waterfall in the Ella area — you can see it directly from the A23 highway. Don\'t miss a quick dip if the water levels allow.' },
    "Lipton's Seat": { gradient: 'linear-gradient(135deg,#1a3d1a 0%,#7bbf96 100%)', emoji: '🍃', tags: ['Views', 'Tea Country', 'Heritage'], highlights: [{ ico: '🌿', t: 'Endless Tea Horizon', b: 'Uninterrupted views over the Dambethenna tea estate — one of the largest in Asia.' }, { ico: '🧑‍🌾', t: 'Tea Pluckers at Work', b: 'Watch Tamil tea pluckers working the terraced hills — a living cultural experience.' }, { ico: '☕', t: 'Ceylon Tea', b: 'Taste freshly made Ceylon tea with milk and jaggery at the top for LKR 100.' }], tips: ['Tuk-tuks from Haputale take about 45 minutes (LKR 800–1,000 round trip).', 'The viewpoint is often socked in with cloud from 10am onward — aim for sunrise.', 'Check the road condition — it can be rough after heavy rain.'], bestTime: 'Sunrise visit (6–8am) for clear, cloud-free panoramas', difficulty: 'Moderate · 22 km from Ella · Best by tuk-tuk', extraDesc: 'Lipton\'s Seat was Sir Thomas Lipton\'s favourite viewpoint, where the tea baron would survey his vast empire of green hillside plantations. The panoramic view stretches 270° over endless layers of terraced tea, mist-veiled valleys, and distant peaks — one of the most serene landscapes in all of Sri Lanka.' },
    "Temple of the Tooth": { gradient: 'linear-gradient(135deg,#7a5800 0%,#dc7c32 100%)', emoji: '🛕', tags: ['UNESCO', 'Buddhist', 'Sacred'], highlights: [{ ico: '🦷', t: "Buddha's Sacred Tooth", b: "Houses the relic of the Buddha's tooth — Sri Lanka's most revered Buddhist object." }, { ico: '🥁', t: 'Daily Perahera Rituals', b: 'Three daily ceremonies (Thevava) feature traditional drumming and ritual offerings.' }, { ico: '🏛️', t: 'Kandyan Architecture', b: 'Stunning 17th–19th century moated complex blending Sinhalese and South Indian styles.' }], tips: ['Puja ceremonies are at 5:30am, 9:30am and 6:30pm — the most atmospheric times.', 'Dress modestly (cover shoulders and knees) or rent a cloth at the entrance.', 'Entry: LKR 1,500 for foreigners — includes the small museum.', 'Arrive 30 min early for the puja to secure a good viewing position.'], bestTime: 'Puja ceremonies at dawn or dusk for the most spiritual atmosphere', difficulty: 'Easy · Central Kandy', extraDesc: "Sri Lanka's most sacred site houses the Tooth Relic of the Buddha inside an ornate gold casket that is rarely shown directly. The three-storey temple complex sits beside Kandy Lake and is surrounded by royal audience halls and museum collections spanning over 1,000 years of Kandyan history." },
    "Royal Botanical Gardens": { gradient: 'linear-gradient(135deg,#0f2a12 0%,#2aab99 100%)', emoji: '🌺', tags: ['Gardens', 'Nature', 'Peaceful'], highlights: [{ ico: '🌳', t: 'Giant Java Fig', b: 'A single 150-year-old Java fig tree spreads over 2,500 sq metres — a living cathedral.' }, { ico: '🌸', t: 'Orchid House', b: 'A dedicated orchid pavilion with hundreds of rare species from across Asia.' }, { ico: '🦜', t: 'Bird Paradise', b: 'Over 60 bird species recorded in the gardens — a birdwatcher\'s delight.' }], tips: ['Arrive early (8–9am) to see mist over the lawn and fewer crowds.', 'The spice walk in the east section is underrated — free informal guides offer spice tastings.', 'Bring a picnic — the main lawn under the giant fig is a perfect lunch spot.'], bestTime: 'Morning visit for cooler temperatures and bird activity', difficulty: 'Easy · 5 km from Kandy · 3 hrs', extraDesc: "Peradeniya Royal Botanical Gardens sprawl across 147 acres along a sweeping bend of the Mahaweli River and were established in 1821 as one of Asia's finest horticultural collections. The garden's crown jewel is the ancient Java fig tree whose aerial roots cascade over an enormous area — absolutely unmissable." },
    "Galle Fort": { gradient: 'linear-gradient(135deg,#1a2e4a 0%,#2a5aa0 100%)', emoji: '🏯', tags: ['UNESCO', 'Colonial', 'Walkable'], highlights: [{ ico: '🧱', t: 'Portuguese & Dutch Heritage', b: 'Originally built in 1588 by the Portuguese, massively expanded by the Dutch in 1663.' }, { ico: '🚶', t: 'Rampart Walk', b: 'A 1.4 km loop along the top of the ramparts with panoramic ocean views.' }, { ico: '☕', t: 'Boutique Scene', b: 'Over 60 boutique cafés, galleries, gem shops and guesthouses within the fort walls.' }], tips: ['Walk the full rampart loop at sunset — the light on the Galle Lighthouse is spectacular.', 'Explore early morning when cruise ship tourists haven\'t arrived yet.', 'The mosque and church stand within 50m of each other — a symbol of peaceful coexistence.', 'Pick up handcrafted lacework and Ceylon gems from artisan shops inside the fort.'], bestTime: 'Early morning or sunset for the best rampart walk experience', difficulty: 'Easy · Flat walking · 2–4 hrs', extraDesc: "Galle Fort is one of the best-preserved colonial sea fortresses in Asia and a UNESCO World Heritage Site. Built over 400 years by Portuguese, Dutch and British colonial powers, the fort is now a living town of 400 families — its cobblestone streets lined with Dutch colonial buildings repurposed into chic boutiques, cafés and guesthouses." },
    "Sigiriya Rock": { gradient: 'linear-gradient(135deg,#5c2d00 0%,#dc7c32 100%)', emoji: '🪨', tags: ['UNESCO', 'Ancient', 'Iconic'], highlights: [{ ico: '🎨', t: '5th Century Frescoes', b: 'Exquisite 5th-century cave paintings of heavenly maidens survive high on the rock face.' }, { ico: '💧', t: 'Water Gardens', b: 'Ancient hydraulic gardens at the base — some of the world\'s oldest surviving landscaped gardens.' }, { ico: '🦁', t: 'Lion\'s Gate', b: 'The massive carved lion\'s paws guarding the final stairway are a breathtaking sight.' }], tips: ['Arrive at opening time (7am) — summit clouds clear by 8am and crowds peak by 10am.', 'Entry LKR 4,000 is steep but non-negotiable — avoid unofficial "guides" charging at the gate.', 'The climb involves 1,200+ steps — wear proper shoes and carry water.', 'Drone flying is strictly prohibited.'], bestTime: '7–9am to beat the heat and catch the best light', difficulty: 'Moderate · 1,200 steps · ~3–4 hrs', extraDesc: "Sigiriya — the Lion Rock — is a 200-metre-high volcanic monolith crowned by the ruins of a 5th-century royal palace. King Kasyapa carved gardens, frescoes and palatial terraces into the living rock, creating one of the world's most astonishing ancient feats of engineering. No visit to Sri Lanka is complete without it." },
    "Mirissa Beach": { gradient: 'linear-gradient(135deg,#1a2e5c 0%,#3b82f6 100%)', emoji: '🏖️', tags: ['Beach', 'Swimming', 'Surfing'], highlights: [{ ico: '🌊', t: 'Protected Crescent Bay', b: 'A sheltered horseshoe bay with calm, turquoise waters safe for swimming most of the year.' }, { ico: '🌅', t: 'Stunning Sunsets', b: 'One of Sri Lanka\'s finest sunset vantage points — the beach faces due west.' }, { ico: '🍹', t: 'Beach Bar Scene', b: 'Dozens of beach shacks and bars line the sand with fresh coconuts and grilled seafood.' }], tips: ['Whale watching boats depart from Mirissa Harbour at 6:30am — book ahead in peak season.', 'Secret Beach (a 10-min walk past Parrot Rock) is far less crowded.', 'Swimming is best November to April — rough seas June to September.'], bestTime: 'November to April for flat, calm waters', difficulty: 'Easy · Direct beach access', extraDesc: "Mirissa is the jewel of Sri Lanka's south coast — a gorgeous crescent of golden sand backed by coconut palms, with the clearest blue water on the island. It's the country's premier whale watching hub from November to April, when blue whales and pods of spinner dolphins are spotted just offshore with reliable regularity." },
    "Whale Watching": { gradient: 'linear-gradient(135deg,#0a1a3d 0%,#1d4ed8 100%)', emoji: '🐋', tags: ['Wildlife', 'Ocean', 'Experience'], highlights: [{ ico: '🐳', t: 'Blue Whales', b: 'The world\'s largest animal — blue whales up to 30m — are regularly spotted here.' }, { ico: '🐬', t: 'Spinner Dolphins', b: 'Hundreds of spinner dolphins frequently escort the whale watching boats in spirited pods.' }, { ico: '🦈', t: 'Sperm Whales & More', b: 'Sperm whales, pygmy blue whales and whale sharks also make seasonal appearances.' }], tips: ['Best months are November to April — the ocean is calm and visibility excellent.', 'Book the 6:30am departure for the best chance of sightings before noon.', 'Take seasickness medication the night before if you\'re susceptible.', 'DSLR with a 300mm+ lens will get you the best whale photos.'], bestTime: 'December to March for peak sightings and calm seas', difficulty: 'Easy · 4–5 hrs on boat', extraDesc: "Mirissa has earned its reputation as one of the best whale watching destinations in Asia. The submarine canyon just offshore creates an upwelling of nutrients that attracts the world's largest concentration of blue whales from November to April. Sightings success rates are remarkably high — typically 80–90% on morning excursions." },
    "Pidurangala Rock": { gradient: 'linear-gradient(135deg,#2d3a1a 0%,#65a30d 100%)', emoji: '🧗', tags: ['Hiking', 'Views', 'Budget'], highlights: [{ ico: '🪨', t: 'Reclining Buddha', b: 'A large ancient reclining Buddha carved into the rock greets you partway up the climb.' }, { ico: '👁️', t: 'Best View of Sigiriya', b: 'The summit offers the iconic bird\'s-eye view of Sigiriya Rock that you can\'t get from Sigiriya itself.' }, { ico: '💰', t: 'Budget Alternative', b: 'At LKR 500 vs LKR 4,000 for Sigiriya, Pidurangala offers arguably better views for a fraction of the price.' }], tips: ['Do Pidurangala at sunrise — arrive by 5:30am for the golden hour view of Sigiriya.', 'The final section requires scrambling over boulders — wear closed shoes.', 'Combine with Sigiriya (different days) for the complete cultural triangle experience.'], bestTime: 'Sunrise (5:30–7am) for the most spectacular light', difficulty: 'Moderate · Boulder scramble · 2–3 hrs', extraDesc: "Pidurangala sits directly opposite Sigiriya and rewards those who climb it with a perspective that most tourists miss — the iconic bird\'s-eye panorama of Sigiriya Rock floating above the jungle canopy. At a fraction of the entrance fee, it\'s widely considered one of the best value experiences in Sri Lanka." },
    "Yala National Park": { gradient: 'linear-gradient(135deg,#2d1a00 0%,#dc7c32 100%)', emoji: '🐆', tags: ['Safari', 'Wildlife', 'Iconic'], highlights: [{ ico: '🐆', t: 'Highest Leopard Density', b: 'Yala has the world\'s highest density of wild leopards — sightings are almost guaranteed.' }, { ico: '🐘', t: 'Wild Elephant Herds', b: 'Large herds of Asian elephants cross the plains, especially near the Buttuwa watering holes.' }, { ico: '🦅', t: 'Birdwatching Paradise', b: '250+ species recorded including painted storks, crocodile birds and the Sri Lanka junglefowl.' }], tips: ['Book a licensed jeep safari well in advance — independent entry is not permitted.', 'Block 1 (the most visited) has the highest leopard sighting probability.', 'Twilight safaris (4–6pm) offer the best wildlife activity and golden light.', 'Bring binoculars — the park covers 1,000+ sq km and animals can be far away.'], bestTime: 'February to July for low water levels and concentrated wildlife', difficulty: 'Easy · Jeep safari · 4–6 hrs', extraDesc: "Yala is Sri Lanka's most famous and visited national park, protecting over 1,000 square kilometres of dry-zone forest, grassland and coastal lagoon. Its claim to fame is having the highest density of wild leopards on the planet — Block 1 alone is home to over 30 individuals. An afternoon jeep safari is one of the most thrilling wildlife experiences in Asia." },
    "Minneriya National Park": { gradient: 'linear-gradient(135deg,#1a3d2c 0%,#7bbf96 100%)', emoji: '🐘', tags: ['Elephants', 'Safari', 'Unique'], highlights: [{ ico: '🐘', t: 'The Gathering', b: 'From July to October, 200–300 wild elephants congregate around the ancient reservoir — the world\'s largest elephant gathering.' }, { ico: '🦩', t: 'Water Bird Sanctuary', b: 'The ancient tank draws thousands of egrets, painted storks and cormorants that create a spectacular aerial display.' }, { ico: '🌿', t: 'Ancient Irrigation', b: 'The Minneriya Tank was built by King Mahasena in the 3rd century AD — still functioning after 1,700 years.' }], tips: ['The Gathering peaks in September–October — book safaris 2+ weeks ahead during this period.', 'Evening safaris (3–6pm) offer the best light and the most elephants around the tank.', 'Combine with Sigiriya Rock (25 km away) for a perfect cultural-wildlife day.'], bestTime: 'July to October for The Gathering; all year for wildlife', difficulty: 'Easy · Jeep safari · 3–4 hrs', extraDesc: "Minneriya is home to the extraordinary annual phenomenon known as The Gathering — when water levels in the ancient tank drop during the dry season, hundreds of wild elephants converge on the exposed grasslands around its shores. It is the largest gathering of Asian elephants on Earth and one of the most incredible wildlife spectacles in Asia." },
    "Horton Plains": { gradient: 'linear-gradient(135deg,#1a2e40 0%,#6ab4cc 100%)', emoji: '🌁', tags: ["World's End", 'Hiking', 'Unique'], highlights: [{ ico: '⚡', t: "World's End", b: 'A sheer 880-metre cliff drop — on clear mornings you can see the southern coast 50 km away.' }, { ico: '🌿', t: 'Cloud Forest', b: 'Sri Lanka\'s highest plateau is home to endemic Rhododendron trees, giant ferns and rare sambar deer.' }, { ico: '🦌', t: 'Sambar Deer', b: 'Wild sambar deer graze fearlessly along the trail — they are so accustomed to walkers they almost ignore them.' }], tips: ['ARRIVE BY 6AM — cloud rolls in from the valley every day by 9–10am, completely obscuring the view.', 'The 9 km trail loop is easy but takes 3–4 hours — pack a breakfast.', 'Entry LKR 1,500 covers the national park fee — no additional charges inside.', 'Fog is cold — bring a light windproof jacket even in summer.'], bestTime: '6–9am before cloud covers the valley — go as early as possible', difficulty: 'Moderate · 9 km loop · 3–4 hrs', extraDesc: "Horton Plains is Sri Lanka's most dramatic high-altitude landscape — a sweeping plateau at 2,100 metres fringed by cloud forest and cut by a sheer precipice called World's End. On clear mornings the view from the cliff edge drops 880 metres to the misty lowlands below, with the coast visible on the horizon. It is entirely unlike anywhere else in the country." },
    "Ancient City of Polonnaruwa": { gradient: 'linear-gradient(135deg,#3d2200 0%,#d97706 100%)', emoji: '🏛️', tags: ['UNESCO', 'Ancient', 'History'], highlights: [{ ico: '👑', t: 'Royal Palace', b: 'The ruined 7-storey palace of King Parakramabahu with walls still standing 30 metres high.' }, { ico: '🕌', t: 'Rankoth Vehera', b: 'The fourth-largest stupa in Sri Lanka — a perfectly preserved red brick structure 55m tall.' }, { ico: '🗿', t: 'Gal Vihara', b: 'Four magnificent rock-cut Buddha images carved with extraordinary skill in the 12th century.' }], tips: ['Rent a bicycle at the entrance — the site covers 4+ km and walking is exhausting in the heat.', 'Entry LKR 2,000 includes the entire archaeological zone.', 'A guide (LKR 2,000–3,000) adds enormous historical context — highly recommended.', 'Visit early morning — the site gets very hot by 11am.'], bestTime: '7–10am before the midday heat; cool season (December–March)', difficulty: 'Easy · Bicycle recommended · 4–5 hrs', extraDesc: "Polonnaruwa was Sri Lanka's second ancient capital, built after the sacking of Anuradhapura in the 10th century. The medieval royal city contains some of the best-preserved ruins in Asia — vast stupas, intricate audience halls, royal bathing ponds and the extraordinary Gal Vihara rock sculptures. A UNESCO World Heritage Site since 1982." },
    "Dambulla Cave Temple": { gradient: 'linear-gradient(135deg,#3d1a00 0%,#b45309 100%)', emoji: '🕌', tags: ['UNESCO', 'Buddhist', 'Ancient'], highlights: [{ ico: '🗿', t: '153 Buddha Statues', b: 'Five caves house 153 Buddha images and 3 Sri Lankan kings\' statues spanning 2,000 years.' }, { ico: '🎨', t: 'Ancient Frescoes', b: '2,100 sq metres of ceiling paintings — the largest area of ancient cave paintings in the world.' }, { ico: '⛰️', t: 'Rock Fortress Setting', b: 'The caves are cut into a 160m-high golden rock that glows magnificently at sunset.' }], tips: ['Remove shoes before entering (mandatory) — the rock surface gets hot by midday.', 'Photography is allowed but no flash near the ancient frescoes.', 'The golden temple at the base of the rock is a modern addition — the real treasures are the five caves at the top.', 'The 30-minute climb has 350 steps — rewarding and not overly strenuous.'], bestTime: 'Early morning before heat builds; sunset turns the rock golden', difficulty: 'Easy · 350 steps · 2 hrs', extraDesc: "Dambulla\'s Royal Rock Temple complex has been a place of Buddhist worship for over 2,000 years. Five cave shrines are carved into a massive granite outcrop and decorated with 2,100 square metres of ceiling murals — an absolutely astonishing collection of Buddhist art that has miraculously survived the centuries almost completely intact." },
    "Sri Maha Bodhi": { gradient: 'linear-gradient(135deg,#1a3d00 0%,#4d7c0f 100%)', emoji: '🌳', tags: ['Sacred', 'Buddhist', 'Historic'], highlights: [{ ico: '🌳', t: '2,300-Year-Old Tree', b: 'The sacred fig tree grew from a cutting of the original Bodhi tree under which Buddha attained enlightenment.' }, { ico: '🙏', t: 'Holiest Buddhist Site in Lanka', b: 'A pilgrimage site for every Buddhist in Sri Lanka — visited by millions of devotees annually.' }, { ico: '🛡️', t: '24-Hour Armed Guard', b: 'Permanently protected by armed guards, 24 hours a day — testament to its immense religious significance.' }], tips: ['Dress in white if possible — most Sri Lankan pilgrims wear white as a mark of respect.', 'Remove shoes and refrain from pointing your feet toward the tree.', 'Weekends and poya (full moon) days see enormous crowds — visit on a weekday.', 'The tree is enclosed in a gold-railed platform — photography is allowed from a respectful distance.'], bestTime: 'Weekday mornings for a peaceful, meditative experience', difficulty: 'Easy · Central Anuradhapura', extraDesc: "The Sri Maha Bodhi is the world\'s oldest documented tree with a known planting date — 288 BC. Grown from a cutting of the original Bodhi tree in India under which Siddhartha Gautama attained enlightenment, it has been continuously tended by Buddhist monks for over 2,300 years, surviving wars, invasions and the test of time." },
    "Elephant Orphanage": { gradient: 'linear-gradient(135deg,#1a3d1a 0%,#2aab99 100%)', emoji: '🐘', tags: ['Wildlife', 'Conservation', 'Family'], highlights: [{ ico: '🐘', t: '80+ Rescued Elephants', b: 'The world\'s largest gathering of captive baby elephants — all rescued from the wild.' }, { ico: '🏊', t: 'River Bathing at Noon', b: 'Every day at noon the herd is walked to the Maha Oya River for bathing — spectacular to watch.' }, { ico: '🍼', t: 'Baby Bottle Feeding', b: 'Tiny baby elephants are hand-fed with giant milk bottles — one of the most heartwarming sights anywhere.' }], tips: ['Arrive for the 10am river walk — the procession through town is a unique experience.', 'Do not pay for elephant rides — they are offered unofficially and ethically questionable.', 'Feeding time at 9am, 1pm and 5pm — the 9am feed has the most baby elephants.', 'Entry LKR 3,000 for adults, LKR 1,500 children.'], bestTime: '9–11am for feeding and the noon river bath procession', difficulty: 'Easy · Family friendly · 2–3 hrs', extraDesc: "The Pinnawala Elephant Orphanage was founded in 1975 to care for abandoned and injured wild elephants and has grown into a globally renowned conservation centre with over 80 elephants — the world\'s largest herd in human care. The daily river bath procession is one of Sri Lanka\'s most photographed events and an extraordinary sight." },
};
/* ── GRADIENT PALETTE for places without specific data ── */
const PC_GRADIENTS = [
    'linear-gradient(135deg,#1a3d2c 0%,#2aab99 100%)',
    'linear-gradient(135deg,#1a2e5c 0%,#2a5aa0 100%)',
    'linear-gradient(135deg,#3d2200 0%,#dc7c32 100%)',
    'linear-gradient(135deg,#2d1a3d 0%,#7c3aed 100%)',
    'linear-gradient(135deg,#1a3d00 0%,#65a30d 100%)',
    'linear-gradient(135deg,#3d001a 0%,#be185d 100%)',
];
function pcGradient(name) {
    const d = PLACE_DETAILS[name];
    if (d)
        return d.gradient;
    let h = 0;
    for (let i = 0; i < name.length; i++)
        h = (h * 31 + name.charCodeAt(i)) & 0xffff;
    return PC_GRADIENTS[h % PC_GRADIENTS.length];
}
function pcEmoji(name) {
    const d = PLACE_DETAILS[name];
    if (d && d.emoji)
        return d.emoji;
    return '📍';
}
/* ── CURRENT SUFFIX for the detail sheet ── */
let _pdSuffix = 'B';
let _pdToggleFn = 'togPB';
/* ─────────────────────────────────────
   SHARED: renderPlaces(gridId, from, dest, selSet, toggleFn)
   Renders the route-aware places grid — rich card version.
───────────────────────────────────── */
function renderPlaces(gridId, from, dest, selSet, toggleFn) {
    _pdSuffix = gridId === 'pgA' ? 'A' : 'B';
    _pdToggleFn = toggleFn;
    const all = routePlaces(from, dest);
    const hasRoute = all.some(p => p.section === 'En Route');
    let currentSection = null;
    let html = '';
    const prefix = gridId === 'pgA' ? 'pa' : 'pb';
    // Route context banner
    const bannerText = hasRoute
        ? `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
       Showing places along your route: <strong>${from}</strong> → <strong>${dest}</strong>`
        : `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5C5.07 1.5 3.5 3.07 3.5 5c0 3.28 3.5 7.5 3.5 7.5S10.5 8.28 10.5 5C10.5 3.07 8.93 1.5 7 1.5z" stroke="currentColor" stroke-width="1.3" fill="none"/></svg>
       Showing attractions at <strong>${dest}</strong>`;
    html += `<div class="route-context-banner" style="grid-column:1/-1">${bannerText}</div>`;
    // Section headers + rich cards
    all.forEach(p => {
        const safeId = p.n.replace(/\W/g, '_');
        const isSelected = selSet.has(p.n);
        const isEnRoute = p.section === 'En Route';
        const grad = pcGradient(p.n);
        const em = pcEmoji(p.n);
        const det = PLACE_DETAILS[p.n];
        const tags = det ? det.tags : (isEnRoute ? ['En Route Stop'] : ['Attraction']);
        const pn = p.n.replace(/'/g, "\\'");
        // Section header
        if (p.section !== currentSection) {
            currentSection = p.section;
            html += `<div class="places-section-hdr" style="grid-column:1/-1">
        ${isEnRoute
                ? `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="#1d8a7c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Along the Route to ${dest}`
                : `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5C5.07 1.5 3.5 3.07 3.5 5c0 3.28 3.5 7.5 3.5 7.5S10.5 8.28 10.5 5C10.5 3.07 8.93 1.5 7 1.5zm0 4.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" stroke="#1d8a7c" stroke-width="1.3" fill="none"/></svg> At ${dest}`}
        <span style="font-size:10px;font-weight:400;color:var(--teal-dk);opacity:.7;margin-left:4px">· Tap a card to add to your plan</span>
      </div>`;
        }
        const addLabel = isSelected
            ? `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Added`
            : `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg> Add to Plan`;
        const highlights = det && det.highlights
            ? det.highlights.slice(0, 2).map(h => `<div class="pc-hi">${h.t} — ${h.b}</div>`).join('')
            : `<div class="pc-hi">${p.desc}</div>`;
        html += `
    <div class="place-card ${isSelected ? 'sel' : ''}" id="${prefix}_${safeId}">
      <!-- Image Placeholder -->
      <div class="pc-img" style="background:${grad}">
        <div class="pc-img-ph">
          <div class="pc-img-ph-lbl">📷 Photo coming soon</div>
        </div>
        <div class="pc-img-badge ${isEnRoute ? 'route' : p.cost > 0 ? 'paid' : 'free'}">
          ${isEnRoute ? '🛣 En Route' : p.cost > 0 ? '🎫 ' + lkr(p.cost) : '✓ Free Entry'}
        </div>
        <div class="pc-sel-mark">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5l3 3 6-6" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="pc-dur-badge">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="3.5" stroke="white" stroke-width="1.1"/><path d="M5 3v2l1 1" stroke="white" stroke-width="1" stroke-linecap="round"/></svg>
          ~${p.hrs}h visit
        </div>
      </div>

      <!-- Card Body -->
      <div class="pc-body">
        <div class="pc-top">
          <div class="pc-name">${p.n}</div>
          <div class="pc-dist">
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" style="display:inline;margin-right:1px"><path d="M4.5 1C3.12 1 2 2.12 2 3.5c0 2.16 2.5 4.5 2.5 4.5S7 5.66 7 3.5C7 2.12 5.88 1 4.5 1z" fill="currentColor"/></svg>
            ${p.d}
          </div>
        </div>

        <!-- Short desc -->
        <div class="pc-desc">${p.desc}</div>

        <!-- 2 highlight bullets -->
        <div class="pc-highlights">${highlights}</div>

        <!-- Tags -->
        <div class="pc-tags">${tags.map(t => `<span class="pc-tag">${t}</span>`).join('')}</div>

        <!-- Actions -->
        <div class="pc-footer">
          <button class="pc-btn-add" onclick="${toggleFn}('${pn}')">${addLabel}</button>
          <button class="pc-btn-detail" onclick="showPlaceDetail('${pn}','${_pdSuffix}','${toggleFn}')">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 5.5v4M6.5 4.5v-.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
            Details
          </button>
        </div>
      </div>
    </div>`;
    });
    $(gridId).innerHTML = html;
}
/* ── PLACE DETAIL SHEET ── */
function showPlaceDetail(name, suffix, toggleFn) {
    const allPlaces = [...Object.values(NP).flat(), ...Object.values(ROUTE_PLACES).flat()];
    const p = allPlaces.find(x => x.n === name) || { n: name, d: '', desc: '', cost: 0, hrs: 1 };
    const det = PLACE_DETAILS[name];
    const grad = pcGradient(name);
    const em = pcEmoji(name);
    const selSet = suffix === 'A' ? S.selA : S.selB;
    const isSelected = selSet.has(name);
    const tags = det ? det.tags : ['Attraction'];
    const pn = name.replace(/'/g, "\\'");
    const highlights = det && det.highlights
        ? det.highlights.map(h => `
        <div class="pd-hi-item">
          <div class="pd-hi-icon">${h.ico}</div>
          <div><div class="pd-hi-title">${h.t}</div><div class="pd-hi-text">${h.b}</div></div>
        </div>`).join('')
        : `<div class="pd-hi-item"><div class="pd-hi-icon">📍</div><div><div class="pd-hi-text">${p.desc}</div></div></div>`;
    const tips = det && det.tips
        ? det.tips.map(t => `<div class="pd-tips-row"><span>💡</span><span>${t}</span></div>`).join('')
        : '';
    const fullDesc = det ? det.extraDesc : p.desc;
    const bestTime = det ? det.bestTime : 'Morning visits recommended';
    const difficulty = det ? det.difficulty : `~${p.hrs} hours`;
    const addBtnLabel = isSelected
        ? `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5 6.5-6.5" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg> Remove from Plan`
        : `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5v11M1.5 7h11" stroke="white" stroke-width="1.8" stroke-linecap="round"/></svg> Add to My Plan`;
    $('placeDetailSheet').innerHTML = `
    <!-- Hero -->
    <div class="pd-hero" style="background:${grad}">
      <div class="pd-hero-ph">
        <div class="pd-hero-ph-icon" style="font-size:36px">${em}</div>
        <div class="pd-hero-ph-lbl">📷 Images coming soon</div>
      </div>
      <button class="pd-hero-close" onclick="closePlaceDetail()">✕</button>
      <div class="pd-hero-tags">
        ${tags.map(t => `<span class="pd-hero-tag">${t}</span>`).join('')}
      </div>
    </div>

    <!-- Body -->
    <div class="pd-body">
      <div class="pd-title-row">
        <div class="pd-title">${name}</div>
        <div class="pd-cost-badge ${p.cost > 0 ? 'pd-cost-paid' : 'pd-cost-free'}">${p.cost > 0 ? '🎫 ' + lkr(p.cost) : '✓ Free Entry'}</div>
      </div>

      <!-- Key facts -->
      <div class="pd-facts">
        <div class="pd-fact">
          <div class="pd-fact-val">📍 ${p.d || 'At Dest.'}</div>
          <div class="pd-fact-lbl">Distance</div>
        </div>
        <div class="pd-fact">
          <div class="pd-fact-val">⏱ ~${p.hrs}h</div>
          <div class="pd-fact-lbl">Visit Time</div>
        </div>
        <div class="pd-fact">
          <div class="pd-fact-val">${p.cost > 0 ? lkr(p.cost) : 'Free'}</div>
          <div class="pd-fact-lbl">Entry Fee</div>
        </div>
      </div>

      <!-- Image gallery placeholder -->
      <div class="pd-section-title">Photo Gallery</div>
      <div class="pd-img-grid" style="margin-bottom:18px">
        <div class="pd-img-ph" style="background:${grad};opacity:.35;font-size:10px;color:rgba(0,0,0,.5)">Main Photo</div>
        <div class="pd-img-ph" style="font-size:9px">Photo 2</div>
        <div class="pd-img-ph" style="font-size:9px">Photo 3</div>
      </div>

      <!-- About -->
      <div class="pd-section-title">About This Place</div>
      <div class="pd-desc">${fullDesc}</div>

      <!-- Highlights -->
      <div class="pd-section-title">What to See & Do</div>
      <div class="pd-highlights-list">${highlights}</div>

      ${tips ? `
      <!-- Tips -->
      <div class="pd-section-title">Insider Tips</div>
      <div class="pd-tips">${tips}</div>
      ` : ''}

      <!-- Info grid -->
      <div class="pd-info-grid">
        <div class="pd-info-box">
          <div class="pd-info-lbl">🕐 Best Time to Visit</div>
          <div class="pd-info-val">${bestTime}</div>
        </div>
        <div class="pd-info-box">
          <div class="pd-info-lbl">🥾 Difficulty</div>
          <div class="pd-info-val">${difficulty}</div>
        </div>
      </div>

      <!-- CTA -->
      <button class="pd-add-btn ${isSelected ? 'active' : ''}" onclick="${toggleFn}('${pn}');updatePdBtn('${pn}','${suffix}','${toggleFn}')">
        ${addBtnLabel}
      </button>
    </div>`;
    $('placeDetailOverlay').classList.add('open');
}
function closePlaceDetail() {
    $('placeDetailOverlay').classList.remove('open');
}
function updatePdBtn(name, suffix, toggleFn) {
    const selSet = suffix === 'A' ? S.selA : S.selB;
    const isSelected = selSet.has(name);
    const btn = $q('.pd-add-btn');
    if (!btn)
        return;
    btn.className = 'pd-add-btn' + (isSelected ? ' active' : '');
    btn.innerHTML = isSelected
        ? `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5 6.5-6.5" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg> Remove from Plan`
        : `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5v11M1.5 7h11" stroke="white" stroke-width="1.8" stroke-linecap="round"/></svg> Add to My Plan`;
    // Also update main grid card
    const prefix = suffix === 'A' ? 'pa' : 'pb';
    const safeId = prefix + '_' + name.replace(/\W/g, '_');
    const card = $(safeId);
    if (card) {
        if (isSelected)
            card.classList.add('sel');
        else
            card.classList.remove('sel');
        const addBtn = card.querySelector('.pc-btn-add');
        if (addBtn)
            addBtn.innerHTML = isSelected
                ? `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Added`
                : `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg> Add to Plan`;
    }
}
/* ── BUILD DASHBOARD A ── */
function buildDA() {
    const { budget, dest, days, people, style, date, current } = S.A;
    const cat = CATS.find(c => c.id === S.cat);
    mkDbProg('progA');
    $('thTitleA').textContent = `Your ${cat.label} Trip to ${dest}`;
    $('thMetaA').innerHTML = metaHTML(current, dest, days, people, style);
    updA();
    renderPlA();
    renderSchA();
    /* init adjust panel */
    const da = $('adjDA');
    if (da)
        da.textContent = days;
    const pa = $('adjPA');
    if (pa)
        pa.textContent = people;
    const dateAEl = $('adjDateA');
    if (dateAEl) {
        dateAEl.value = date || new Date().toISOString().split('T')[0];
        initAdjDate('A');
    }
    syncAdjBtns('adjStyleA', style);
    syncAdjBtns('adjTransA', S.A.transport || 'public');
    syncAdjBtns('adjPaceA', S.A.pace || 'balanced');
    renderHotels('hotelListA', dest, style, days, date);
}
function updA() {
    const { budget, dest, days, people, style, current, transport, pace } = S.A;
    const c = calc(dest, days, people, style, S.selA, transport);
    const d = km(dest);
    $('statRowA').innerHTML =
        mkStat(STAT_SVGS.dist, 'Total Distance', d * 2 + ' km') +
            mkStat(STAT_SVGS.transport, 'Transportation Cost', lkr(c.t)) +
            mkStat(STAT_SVGS.food, 'Food Cost', lkr(c.f)) +
            mkStat(STAT_SVGS.accom, 'Accommodation Cost', lkr(c.a)) +
            mkStat(STAT_SVGS.activities, 'Activities Cost', lkr(c.ac));
    $('routeA').innerHTML =
        `<div class="route-pt"><div class="route-dot"></div><div class="route-name">${current || 'Colombo'}</div></div>
     <div class="route-dashed"><span class="route-km">${d} km</span></div>
     <div class="route-pt"><div class="route-dot"></div><div class="route-name">${dest}</div></div>`;
    $('totalA').innerHTML =
        `<div><div class="tb-label">Total Estimated Cost</div><div class="tb-amount">${lkr(c.total)}</div></div>
     <div class="tb-right"><div class="tb-rlabel">Per Person</div><div class="tb-ramount">${lkr(Math.round(c.total / people))}</div></div>`;
    const w = $('warnA');
    if (c.total > budget) {
        w.classList.remove('hidden');
        w.className = 'db-warn danger';
        $('warnTA').textContent = 'Budget exceeded';
        $('warnMA').textContent = ` Over budget by ${lkr(c.total - budget)}. Consider removing a place or reducing the number of days.`;
    }
    else if ((c.total / budget) * 100 > 85) {
        w.classList.remove('hidden');
        w.className = 'db-warn';
        $('warnTA').textContent = 'Budget getting tight';
        $('warnMA').textContent = ` Only ${lkr(budget - c.total)} remaining. Consider removing a location to maintain a buffer.`;
    }
    else
        w.classList.add('hidden');
    S.chA = mkChart('chA', c, S.chA);
    $('legA').innerHTML = mkLeg(c);
    $('bbEstA').textContent = lkr(budget);
    $('bbUsedA').textContent = lkr(c.total);
    $('bbRemA').textContent = lkr(Math.max(0, budget - c.total));
    const bd = genDaily(dest, days, people, style, S.A.date, transport);
    const dlH = mkDaily(bd, dest, days);
    $('dailyA').innerHTML = dlH;
    const dl2 = $('dailyA2');
    if (dl2)
        dl2.innerHTML = dlH;
    /* sync adjust panel display values */
    const adjDAEl = $('adjDA');
    if (adjDAEl)
        adjDAEl.textContent = days;
    const adjPAEl = $('adjPA');
    if (adjPAEl)
        adjPAEl.textContent = people;
}
function mkStat(icon, label, value) {
    return `<div class="stat-card"><div class="stat-icon-wrap">${icon}</div><div class="stat-label">${label}</div><div class="stat-value">${value}</div></div>`;
}
function mkDaily(bd, dest, days) {
    return bd.map(d => `<div class="day-row" id="dr_${d.day}" onclick="togDr('dr_${d.day}')">
    <div class="day-row-h">
      <div class="day-badge">D${d.day}</div>
      <div class="day-info">
        <div class="day-title">${d.day === 1 ? `Travel to ${dest}` : d.day === days && days > 1 ? 'Return home' : `${dest} — Day ${d.day}`}</div>
        <div class="day-sub">${d.dkm} km · ${d.hrs}–${d.hrs + 1} hours</div>
      </div>
      <div class="day-cost">${lkr(d.tot)}</div>
      <div class="day-chev">${CHEV_SVG}</div>
    </div>
    <div class="day-body">
      <div class="d-cost-row"><span>Transport</span><span>${lkr(d.tr)}</span></div>
      <div class="d-cost-row"><span>Accommodation</span><span>${lkr(d.ac)}</span></div>
      <div class="d-cost-row"><span>Food</span><span>${lkr(d.fo)}</span></div>
      <div class="d-cost-row"><span>Activities</span><span>${lkr(d.act)}</span></div>
      <div class="d-cost-row"><span>Day Total</span><span>${lkr(d.tot)}</span></div>
    </div>
  </div>`).join('');
}
function togDr(id) { $(id)?.classList.toggle('open'); }
function renderPlA() {
    renderPlaces('pgA', S.A.current, S.A.dest, S.selA, 'togPA');
}
/* ── PLACE WEATHER PANEL ── */
const PLACE_WEATHER_DATA = {
    // Keyed by destination name — same as WEATHER_DATA but expanded for all dests
    Ella: { hi: 25, lo: 15, icon: 'rain', desc: 'Light Rain', region: 'Hill Country' },
    Kandy: { hi: 30, lo: 21, icon: 'cloudy', desc: 'Partly Cloudy', region: 'Central Province' },
    Galle: { hi: 31, lo: 24, icon: 'sun', desc: 'Sunny', region: 'Southern Coast' },
    Mirissa: { hi: 31, lo: 25, icon: 'sun', desc: 'Sunny', region: 'Southern Coast' },
    Sigiriya: { hi: 34, lo: 23, icon: 'sun', desc: 'Hot & Dry', region: 'Cultural Triangle' },
    Trincomalee: { hi: 33, lo: 26, icon: 'sun', desc: 'Hot & Sunny', region: 'East Coast' },
    'Nuwara Eliya': { hi: 19, lo: 10, icon: 'rain', desc: 'Cool & Misty', region: 'Hill Country' },
    'Arugam Bay': { hi: 31, lo: 24, icon: 'sun', desc: 'Warm & Breezy', region: 'East Coast' },
    Yala: { hi: 34, lo: 24, icon: 'sun', desc: 'Hot & Dry', region: 'Southern Province' },
    Polonnaruwa: { hi: 35, lo: 24, icon: 'sun', desc: 'Hot & Sunny', region: 'North Central' },
    Anuradhapura: { hi: 34, lo: 23, icon: 'sun', desc: 'Warm & Clear', region: 'North Central' },
    Hikkaduwa: { hi: 30, lo: 24, icon: 'sun', desc: 'Sunny', region: 'Southern Coast' },
    Negombo: { hi: 30, lo: 24, icon: 'cloudy', desc: 'Partly Cloudy', region: 'Western Coast' },
    "Adam's Peak": { hi: 20, lo: 12, icon: 'rain', desc: 'Misty & Cool', region: 'Sabaragamuwa' },
    Dambulla: { hi: 34, lo: 23, icon: 'sun', desc: 'Hot & Sunny', region: 'Cultural Triangle' },
    Pinnawala: { hi: 30, lo: 22, icon: 'cloudy', desc: 'Partly Cloudy', region: 'Sabaragamuwa' },
    Bentota: { hi: 31, lo: 25, icon: 'sun', desc: 'Sunny', region: 'Southern Coast' },
    Jaffna: { hi: 34, lo: 26, icon: 'sun', desc: 'Hot & Dry', region: 'Northern Province' },
    'Horton Plains': { hi: 18, lo: 9, icon: 'rain', desc: 'Cool & Windy', region: 'Hill Country' },
    Colombo: { hi: 31, lo: 25, icon: 'cloudy', desc: 'Partly Cloudy', region: 'Western Province' },
};
const REC_ICONS = {
    good: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" fill="#059669"/><path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    caution: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L1.5 15.5h15L9 2z" stroke="#d97706" stroke-width="1.5" stroke-linejoin="round" fill="#fef3c7"/><path d="M9 8v3M9 12.5v.5" stroke="#d97706" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    poor: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" fill="#ef4444"/><path d="M6 6l6 6M12 6l-6 6" stroke="white" stroke-width="1.6" stroke-linecap="round"/></svg>`,
};
function getPlaceRec(w) {
    const hi = w.hi, icon = w.icon;
    if (icon === 'rain') {
        if (hi <= 20)
            return { level: 'caution', title: 'Weather may be challenging',
                body: 'Cool temperatures and rain are expected at this location. Bring a waterproof jacket and wear layers. Morning visits are usually drier.' };
        return { level: 'caution', title: 'Light rain expected',
            body: 'Showers are likely — carry a compact raincoat. Most outdoor attractions remain enjoyable; muddy trails may be slippery.' };
    }
    if (icon === 'cloudy') {
        return { level: 'good', title: 'Good conditions for a visit',
            body: 'Comfortable overcast skies keep the heat down — great for walking tours and outdoor sightseeing without harsh glare.' };
    }
    // sun / clear
    if (hi >= 33)
        return { level: 'caution', title: 'Excellent — but stay cool',
            body: 'Bright sunshine and high temperatures make this a great day to visit. Carry water, apply sunscreen, and take shade breaks during peak hours (11am–3pm).' };
    return { level: 'good', title: 'Excellent conditions — highly recommended',
        body: 'Clear skies and comfortable temperatures make this an ideal time to visit. Make the most of the good weather and arrive early to beat the crowds.' };
}
function showPlaceWeather(placeName, dest, suffix) {
    const panelId = 'pwp' + suffix;
    const panel = $(panelId);
    if (!panel)
        return;
    /* Use place-specific weather if available, else fall back to destination */
    const w = PLACE_WEATHER_DATA[placeName] || PLACE_WEATHER_DATA[dest] || PLACE_WEATHER_DATA['Ella'];
    const rec = getPlaceDetailedRec(w);
    const iconSvg = WEATHER_ICONS[w.icon] || WEATHER_ICONS.sun;
    const warningBox = rec.warning
        ? `<div style="margin-bottom:10px;padding:9px 12px;border-radius:8px;background:#fff3cd;border:1px solid #ffc107;font-size:11px;line-height:1.55;color:#7a4800;">⚠️ <strong>Warning:</strong> ${rec.warning}</div>`
        : '';
    const actionList = rec.actions.map(a => `<li style="margin-bottom:3px">${a}</li>`).join('');
    panel.className = 'place-weather-panel visible';
    panel.innerHTML = `
    <div class="pwp-top">
      <div class="pwp-left">
        <div class="pwp-icon-wrap">${iconSvg}</div>
        <div>
          <div class="pwp-place-name">${placeName}</div>
          <div class="pwp-location-tag">${w.region} · ${w.desc}</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:12px">
        <div class="pwp-temps">
          <div class="pwp-temp-hi">${w.hi}°C</div>
          <div class="pwp-temp-lo">Low ${w.lo}°C</div>
        </div>
        <button class="pwp-dismiss" onclick="hidePlaceWeather('${suffix}')">✕ Close</button>
      </div>
    </div>
    <div style="padding:0 0 10px">
      <div class="pwp-rec ${rec.level}" style="margin-bottom:8px">
        <div class="pwp-rec-icon">${REC_ICONS[rec.level]}</div>
        <div class="pwp-rec-content">
          <div class="pwp-rec-title">${rec.title}</div>
          <div class="pwp-rec-body">${rec.summary}</div>
        </div>
      </div>
      ${warningBox}
      <div style="font-size:11px;font-weight:700;color:var(--text2);margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px">What you should do:</div>
      <ul style="padding-left:18px;margin:0;font-size:12px;color:var(--text2);line-height:1.7">
        ${actionList}
      </ul>
    </div>`;
}
function hidePlaceWeather(suffix) {
    const p = $('pwp' + suffix);
    if (p) {
        p.className = 'place-weather-panel';
        p.innerHTML = '';
    }
}
function togPA(n) {
    const wasSelected = S.selA.has(n);
    if (wasSelected)
        S.selA.delete(n);
    else
        S.selA.add(n);
    const safeId = 'pa_' + n.replace(/\W/g, '_');
    const card = $(safeId);
    if (card) {
        if (S.selA.has(n))
            card.classList.add('sel');
        else
            card.classList.remove('sel');
        const addBtn = card.querySelector('.pc-btn-add');
        if (addBtn)
            addBtn.innerHTML = S.selA.has(n)
                ? `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Added`
                : `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg> Add to Plan`;
    }
    updA();
    renderSchA();
    if (!wasSelected) {
        showPlaceWeather(n, S.A.dest, 'A');
    }
    else {
        hidePlaceWeather('A');
    }
    showToast(S.selA.has(n) ? n + ' added to plan' : n + ' removed');
    const wEl = $('weatherA');
    if (wEl && wEl.closest('.db-tc') && wEl.closest('.db-tc').classList.contains('active'))
        renderWeather('weatherA', S.A.dest, S.A.days, S.A.date, S.selA);
    const mapTcA = $('tcA-map');
    if (mapTcA && mapTcA.classList.contains('active'))
        renderMap('A');
}
/* ── DETAILED SCHEDULE GENERATOR ── */
function addTime(base, mins) {
    const [h, m] = base.split(':').map(Number);
    const total = h * 60 + m + mins;
    const nh = Math.floor(total / 60) % 24;
    const nm = total % 60;
    return String(nh).padStart(2, '0') + ':' + String(nm).padStart(2, '0');
}
function fmtDur(mins) {
    if (mins < 60)
        return mins + ' mins';
    const h = Math.floor(mins / 60), m = mins % 60;
    return h + ' hour' + (h > 1 ? 's' : '') + (m ? ' ' + m + 'm' : '');
}
function clockSVG() {
    return `<svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" stroke-width="1.2"/><path d="M5.5 3v2.5l1.5 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`;
}
function kmSVG() {
    return `<svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1.5a3 3 0 0 1 3 3c0 2.21-3 6-3 6s-3-3.79-3-6a3 3 0 0 1 3-3zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" stroke="currentColor" stroke-width="1.1" fill="none"/></svg>`;
}
function hrsSVG() {
    return `<svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" stroke-width="1.2"/><path d="M5.5 3v2.5l1.5 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`;
}
function genDetailedSched(days, dest, date, sel, pace, current) {
    const origin = current || 'Colombo';
    const out = [];
    const ACTIVITY_TEMPLATES = {
        morning: [
            { title: 'Morning Hike', desc: 'Scenic trail through nature with panoramic views', dur: 120 },
            { title: 'Cultural Visit', desc: 'Explore local heritage sites and monuments', dur: 90 },
            { title: 'Market Tour', desc: 'Browse the vibrant local market for souvenirs', dur: 75 },
            { title: 'Sunrise Viewpoint', desc: 'Catch the spectacular sunrise from the best spot', dur: 60 },
        ],
        afternoon: [
            { title: 'Nature Trail', desc: 'Walk through lush scenery and local wildlife', dur: 90 },
            { title: 'Waterfall Visit', desc: 'Cool off at a stunning nearby waterfall', dur: 75 },
            { title: 'Tea Plantation Tour', desc: 'Visit a working tea estate and see how tea is made', dur: 90 },
            { title: 'Photography Walk', desc: 'Capture the scenic beauty of the surroundings', dur: 60 },
        ],
        evening: [
            { title: 'Sunset Viewpoint', desc: 'Watch the golden sunset from a scenic vantage point', dur: 60 },
            { title: 'Cultural Show', desc: 'Enjoy traditional performances and local entertainment', dur: 90 },
            { title: 'Night Market', desc: 'Experience the lively local night market', dur: 75 },
        ]
    };
    const placeList = [...sel];
    let placeIdx = 0;
    for (let i = 0; i < days; i++) {
        const dayNum = i + 1;
        const isFirst = i === 0;
        const isLast = i === days - 1 && days > 1;
        const dateLabel = date ? fdate(date, i) : `Day ${dayNum}`;
        let activities = [];
        let startTime, endTime, totalKm, totalHrs, dayType, dayLabel;
        if (isFirst) {
            // ── TRAVEL DAY ──
            dayType = 'travel';
            dayLabel = 'Travel Day';
            startTime = '07:00';
            endTime = '22:00';
            totalKm = 180;
            totalHrs = '5-6';
            let t = '07:00';
            activities = [
                { time: t, type: 'sleep', title: 'Wake up & Prepare', desc: 'Final packing, breakfast, and preparation for the journey', dur: 60 },
                { time: (t = addTime(t, 60)), type: 'food', title: 'Breakfast', desc: 'Have a hearty breakfast before the trip', dur: 30 },
                { time: (t = addTime(t, 30)), type: 'travel', title: `Depart from ${origin}`, desc: 'Start your journey to the destination', dur: 15 },
                { time: (t = addTime(t, 150)), type: 'sleep', title: 'Rest Stop', desc: 'Quick break for refreshments and stretching', dur: 30 },
                { time: (t = addTime(t, 30)), type: 'food', title: 'Lunch Break', desc: 'Stop for lunch at a local restaurant', dur: 60 },
                { time: (t = addTime(t, 60)), type: 'travel', title: `Arrive at ${dest}`, desc: 'Reach your destination and check surroundings', dur: 30 },
                { time: (t = addTime(t, 30)), type: 'hotel', title: 'Hotel Check-in', desc: 'Check into your accommodation and freshen up', dur: 60 },
                { time: (t = addTime(t, 60)), type: 'explore', title: 'Evening Exploration', desc: 'Light exploration around the accommodation area', dur: 120 },
                { time: (t = addTime(t, 120)), type: 'food', title: 'Dinner', desc: 'Dinner at a local restaurant', dur: 60 },
                { time: addTime(t, 60), type: 'night', title: 'Rest', desc: 'Get a good night sleep for tomorrow', dur: 0 },
            ];
        }
        else if (isLast) {
            // ── RETURN DAY ──
            dayType = 'return';
            dayLabel = 'Return Day';
            startTime = '07:00';
            endTime = '20:00';
            totalKm = 180;
            totalHrs = '5-6';
            let t = '07:00';
            activities = [
                { time: t, type: 'sleep', title: 'Wake up & Pack', desc: 'Final morning — pack your bags and check belongings', dur: 60 },
                { time: (t = addTime(t, 60)), type: 'food', title: 'Breakfast', desc: 'Last breakfast at the destination', dur: 45 },
                { time: (t = addTime(t, 45)), type: 'hotel', title: 'Hotel Check-out', desc: 'Check out and settle your bill', dur: 30 },
                { time: (t = addTime(t, 30)), type: 'explore', title: 'Final Exploration', desc: `Last look around ${dest} before heading home`, dur: 90 },
                { time: (t = addTime(t, 90)), type: 'travel', title: `Depart from ${dest}`, desc: 'Begin your return journey home', dur: 15 },
                { time: (t = addTime(t, 150)), type: 'sleep', title: 'Rest Stop', desc: 'Quick break for refreshments on the way', dur: 30 },
                { time: (t = addTime(t, 30)), type: 'food', title: 'Lunch Break', desc: 'Lunch at a roadside restaurant', dur: 60 },
                { time: (t = addTime(t, 60)), type: 'travel', title: `Arrive in ${origin}`, desc: 'Back home — unpack and relax', dur: 30 },
                { time: addTime(t, 90), type: 'night', title: 'Rest', desc: 'You earned it — relax and unwind', dur: 0 },
            ];
        }
        else {
            // ── ACTIVITY DAY ──
            let placesPerDay = pace === 'relaxed' ? 1 : pace === 'packed' ? 3 : 2;
            let dayPlaces = [];
            for (let j = 0; j < placesPerDay; j++) {
                if (placeList[placeIdx]) {
                    dayPlaces.push(placeList[placeIdx]);
                    placeIdx++;
                }
            }
            if (dayPlaces.length > 0) {
                dayType = 'activity';
                dayLabel = 'Activity Day';
            }
            else {
                dayType = 'activity';
                dayLabel = 'Leisure Day';
            }
            startTime = '06:30';
            endTime = '22:00';
            totalKm = Math.round(15 + Math.random() * 25);
            totalHrs = '8-9';
            const morningAct = dayPlaces[0]
                ? { title: `Visit ${dayPlaces[0]}`, desc: `Explore the highlights and attractions of ${dayPlaces[0]}`, dur: 120 }
                : ACTIVITY_TEMPLATES.morning[(i - 1) % ACTIVITY_TEMPLATES.morning.length];
            const afternoonAct = dayPlaces[1]
                ? { title: `Explore ${dayPlaces[1]}`, desc: `Discover the best spots at ${dayPlaces[1]}`, dur: 90 }
                : ACTIVITY_TEMPLATES.afternoon[(i - 1) % ACTIVITY_TEMPLATES.afternoon.length];
            const eveningAct = ACTIVITY_TEMPLATES.evening[(i - 1) % ACTIVITY_TEMPLATES.evening.length];
            let t = '06:30';
            activities = [
                { time: t, type: 'sleep', title: 'Wake up & Freshen', desc: 'Start the day refreshed for your adventure', dur: 45 },
                { time: (t = addTime(t, 45)), type: 'food', title: 'Breakfast', desc: 'Energise with a local breakfast', dur: 45 },
                { time: (t = addTime(t, 45)), type: 'explore', title: morningAct.title, desc: morningAct.desc, dur: morningAct.dur },
                { time: (t = addTime(t, morningAct.dur)), type: 'food', title: 'Lunch Break', desc: `Lunch at a popular spot in ${dest}`, dur: 60 },
                { time: (t = addTime(t, 60)), type: 'explore', title: afternoonAct.title, desc: afternoonAct.desc, dur: afternoonAct.dur },
                { time: (t = addTime(t, afternoonAct.dur)), type: 'explore', title: eveningAct.title, desc: eveningAct.desc, dur: eveningAct.dur },
                { time: (t = addTime(t, eveningAct.dur)), type: 'food', title: 'Dinner', desc: `Enjoy dinner at a recommended restaurant in ${dest}`, dur: 60 },
                { time: addTime(t, 60), type: 'night', title: 'Rest', desc: 'Recharge for another great day tomorrow', dur: 0 },
            ];
        }
        out.push({ dayNum, dayType, dayLabel, dateLabel, startTime, endTime, totalKm, totalHrs: String(totalHrs), activities });
    }
    return out;
}
function mkDayBlock(d) {
    const typeColors = { travel: 'travel', activity: 'activity', rest: 'rest', return: 'return' };
    const typeCls = typeColors[d.dayType] || 'activity';
    const travelBadgeIco = `<svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1 4.5h7M5 1.5l3 3-3 3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    const rows = d.activities.map((act, actIdx) => {
        const durStr = act.dur > 0 ? fmtDur(act.dur) : 'Night';
        return `
    <div class="tl-row" id="tlrow_${d._panel}_${d.dayNum}_${actIdx}">
      <div class="tl-time">${act.time}</div>
      <div class="tl-connector">
        <div class="tl-dot ${act.type}"></div>
        <div class="tl-vline"></div>
      </div>
      <div class="tl-card-wrap">
        <div class="tl-card ${act.type}">
          <div class="tl-card-body">
            <div class="tl-card-title">${act.title}</div>
            <div class="tl-card-desc">${act.desc}</div>
          </div>
          <div style="display:flex;align-items:center;gap:6px;flex-shrink:0">
            <div class="tl-card-dur">${clockSVG()} ${durStr}</div>
            <button onclick="openEditAct('${d._panel}',${d.dayNum},${actIdx})" title="Edit" style="background:none;border:none;cursor:pointer;padding:4px;border-radius:6px;color:var(--text3);display:flex;align-items:center" onmouseover="this.style.background='var(--surface2)'" onmouseout="this.style.background='none'"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M9 2l2 2-7 7H2V9L9 2z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M7.5 3.5l2 2" stroke="currentColor" stroke-width="1.3"/></svg></button>
            <button onclick="deleteAct('${d._panel}',${d.dayNum},${actIdx})" title="Delete" style="background:none;border:none;cursor:pointer;padding:4px;border-radius:6px;color:var(--text3);display:flex;align-items:center" onmouseover="this.style.background='rgba(239,68,68,.1)';this.style.color='#ef4444'" onmouseout="this.style.background='none';this.style.color='var(--text3)'"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 3.5h9M5 3.5V2.5h3v1M5.5 5.5v4M7.5 5.5v4M3 3.5l.5 7h6l.5-7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          </div>
        </div>
      </div>
    </div>`;
    }).join('');
    return `
  <div class="day-block">
    <div class="day-block-head">
      <div class="day-block-left">
        <div class="day-num-circle">
          <span class="dn-label">DAY</span>
          <span class="dn-val">${d.dayNum}</span>
        </div>
        <div class="day-date-info">
          <div class="day-date-text">${d.dateLabel}</div>
          <div class="day-badge-row">
            <span class="day-type-badge ${typeCls}">${travelBadgeIco} ${d.dayLabel}</span>
          </div>
        </div>
      </div>
      <div class="day-block-meta">
        <div class="day-meta-item">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" stroke-width="1.2"/><path d="M5.5 3v2.5l1.5 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
          ${d.startTime} – ${d.endTime}
        </div>
        <div class="day-meta-item">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1.5a3 3 0 0 1 3 3c0 2.21-3 6-3 6s-3-3.79-3-6a3 3 0 0 1 3-3zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" stroke="currentColor" stroke-width="1.1" fill="none"/></svg>
          ${d.totalKm} km
        </div>
        <div class="day-meta-item">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" stroke-width="1.2"/><path d="M5.5 3v2.5l1.5 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
          ${d.totalHrs} hours
        </div>
      </div>
    </div>
    <div class="timeline">${rows}</div>
    <div class="add-act-row">
      <button class="add-act-btn" onclick="openAddAct('${d._panel}',${d.dayNum})">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1.5v11M1.5 6.5h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        Add Activity
      </button>
    </div>
  </div>`;
}
function renderSchA() {
    if (!S.A.sched)
        S.A.sched = genDetailedSched(S.A.days, S.A.dest, S.A.date, [...S.selA], S.A.pace, S.A.current);
    $('schedA').innerHTML = S.A.sched.map(d => mkDayBlock({ ...d, _panel: 'A' })).join('');
}
/* ── BUILD DASHBOARD B ── */
function buildDB() {
    const { dest, days, people, style, date, current } = S.B;
    const cat = CATS.find(c => c.id === S.cat);
    mkDbProg('progB');
    $('thTitleB').textContent = `Your ${cat.label} Trip to ${dest}`;
    $('thMetaB').innerHTML = metaHTML(current, dest, days, people, style);
    $('adjD').textContent = days;
    $('adjP').textContent = people;
    updB();
    renderPlB();
    renderSchB();
    /* init adjust panel */
    const dateBEl = $('adjDateB');
    if (dateBEl) {
        dateBEl.value = date || new Date().toISOString().split('T')[0];
        initAdjDate('B');
    }
    syncAdjBtns('adjStyleB', style);
    syncAdjBtns('adjTransB', S.B.transport || 'public');
    syncAdjBtns('adjPaceB', S.B.pace || 'balanced');
    renderHotels('hotelListB', dest, style, days, date);
}
function updB() {
    const { dest, days, people, style, current, transport, pace } = S.B;
    const c = calc(dest, days, people, style, S.selB, transport);
    const d = km(dest);
    $('statRowB').innerHTML =
        mkStat(STAT_SVGS.dist, 'Total Distance', d * 2 + ' km') +
            mkStat(STAT_SVGS.transport, 'Transportation Cost', lkr(c.t)) +
            mkStat(STAT_SVGS.food, 'Food Cost', lkr(c.f)) +
            mkStat(STAT_SVGS.accom, 'Accommodation Cost', lkr(c.a)) +
            mkStat(STAT_SVGS.activities, 'Activities Cost', lkr(c.ac));
    $('routeB').innerHTML =
        `<div class="route-pt"><div class="route-dot"></div><div class="route-name">${current || 'Colombo'}</div></div>
     <div class="route-dashed"><span class="route-km">${d} km</span></div>
     <div class="route-pt"><div class="route-dot"></div><div class="route-name">${dest}</div></div>`;
    $('totalB').innerHTML =
        `<div><div class="tb-label">Total Estimated Cost</div><div class="tb-amount">${lkr(c.total)}</div></div>
     <div class="tb-right"><div class="tb-rlabel">Per Person</div><div class="tb-ramount">${lkr(Math.round(c.total / people))}</div></div>`;
    const wB = $('warnB');
    if (S.selB.size > days - 1 && days > 2) {
        wB.classList.remove('hidden');
        $('warnTB').textContent = 'Schedule may be tight';
        $('warnMB').textContent = ` ${S.selB.size} places across ${days} days may feel rushed. Consider extending your stay.`;
    }
    else
        wB.classList.add('hidden');
    S.chB = mkChart('chB', c, S.chB);
    $('legB').innerHTML = mkLeg(c);
    $('bbEstB').textContent = lkr(c.total);
    $('bbPerB').textContent = lkr(Math.round(c.total / people));
    $('bbDayB').textContent = lkr(Math.round(c.total / days / people));
    $('dailyB').innerHTML = mkDaily(genDaily(dest, days, people, style, S.B.date, transport), dest, days);
    $('thMetaB').innerHTML = metaHTML(current, dest, days, people, style);
    $('adjD').textContent = days;
    $('adjP').textContent = people;
}
function renderPlB() {
    renderPlaces('pgB', S.B.current, S.B.dest, S.selB, 'togPB');
}
function togPB(n) {
    const wasSelected = S.selB.has(n);
    if (wasSelected)
        S.selB.delete(n);
    else
        S.selB.add(n);
    const safeId = 'pb_' + n.replace(/\W/g, '_');
    const cardB = $(safeId);
    if (cardB) {
        if (S.selB.has(n))
            cardB.classList.add('sel');
        else
            cardB.classList.remove('sel');
        const addBtnB = cardB.querySelector('.pc-btn-add');
        if (addBtnB)
            addBtnB.innerHTML = S.selB.has(n)
                ? `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Added`
                : `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg> Add to Plan`;
    }
    updB();
    renderSchB();
    if (!wasSelected) {
        showPlaceWeather(n, S.B.dest, 'B');
    }
    else {
        hidePlaceWeather('B');
    }
    showToast(S.selB.has(n) ? n + ' added to plan' : n + ' removed');
    const wEl = $('weatherB');
    if (wEl && wEl.closest('.db-tc') && wEl.closest('.db-tc').classList.contains('active'))
        renderWeather('weatherB', S.B.dest, S.B.days, S.B.date, S.selB);
    const mapTcB = $('tcB-map');
    if (mapTcB && mapTcB.classList.contains('active'))
        renderMap('B');
}
function renderSchB() {
    if (!S.B.sched)
        S.B.sched = genDetailedSched(S.B.days, S.B.dest, S.B.date, [...S.selB], S.B.pace, S.B.current);
    const el = $('schedB');
    el.setAttribute('data-sched', 'B');
    el.innerHTML = S.B.sched.map(d => mkDayBlock({ ...d, _panel: 'B' })).join('');
}
/* ═══════════════════════════════════════════════════
   HOTEL DATABASE
   Each hotel: {name, emoji, desc, stars, rating, ratingText,
                amenities, price, tier, bookingUrl}
   tier: 'budget' | 'comfortable' | 'luxury'
═══════════════════════════════════════════════════ */
/* ══ HOTELS DATABASE — loaded from DB ══
   Keyed by destination name, same structure as before.
   Fallback stub keeps renderHotels() crash-safe until API resolves.
══════════════════════════════════════════════════════════ */
let HOTELS = {
    Ella: [{ name: 'Loading…', emoji: '⏳', tier: 'comfortable', stars: 3, rating: '—', ratingText: '', desc: 'Hotel data is loading from the database.', amenities: [], price: 0, bookingUrl: '#' }],
};
/* Style → tier mapping from survey */
function styleTier(style) {
    if (style === 'simple')
        return 'budget';
    if (style === 'flexible')
        return 'luxury';
    return 'comfortable';
}
/* Star SVGs */
function mkStars(n) {
    return Array.from({ length: 5 }, (_, i) => `<span class="hotel-star">${i < n ? '★' : '☆'}</span>`).join('');
}
/* Tier display config */
const TIER_CFG = {
    budget: { label: 'Budget', badge: 'htb-budget', emoji: '💰', room: 'Basic Room', size: '16m²' },
    comfortable: { label: 'Mid-Range', badge: 'htb-comfortable', emoji: '✨', room: 'Standard Room', size: '28m²' },
    luxury: { label: 'Luxury', badge: 'htb-luxury', emoji: '👑', room: 'Deluxe Room', size: '40m²' },
};
/* ── RENDER HOTELS (redesigned) ── */
function renderHotels(containerId, dest, style, days, date) {
    var el = $(containerId);
    if (!el)
        return;
    var suffix = containerId.indexOf('A') >= 0 ? 'A' : 'B';
    var hotels = (HOTELS[dest] || HOTELS.Ella);
    var sData = suffix === 'A' ? S.A : S.B;
    var c = calc(dest, days, sData.people, style, suffix === 'A' ? S.selA : S.selB, sData.transport || 'public');
    var accomBudget = c.a;
    var selHotel = sData.selHotel;
    var chartId = 'hotelChart_' + suffix;
    var cin = '', cout = '';
    if (date) {
        cin = date;
        var dd = new Date(date);
        dd.setDate(dd.getDate() + (days || 3));
        cout = dd.toISOString().split('T')[0];
    }
    var selPanel = '';
    if (selHotel) {
        var scfg = TIER_CFG[selHotel.tier];
        var stot = selHotel.price * days;
        selPanel = '<div class="hotel-sel-card">'
            + '<div class="hotel-sel-thumb">' + selHotel.emoji + '</div>'
            + '<div class="hotel-sel-info">'
            + '<div class="hotel-sel-name">' + selHotel.name + '</div>'
            + '<div class="hotel-sel-room">' + scfg.room + ' &middot; ' + scfg.size + '</div>'
            + '<div class="hotel-sel-stars">' + Array.from({ length: 5 }, function (_, i) { return '<span class="hotel-sel-star">' + (i < selHotel.stars ? '&#9733;' : '&#9734;') + '</span>'; }).join('')
            + ' <span style="font-size:10px;color:var(--text3);margin-left:4px">' + selHotel.rating + '</span>'
            + '</div></div></div>'
            + '<div class="hotel-sel-nights-row">'
            + '<div class="hotel-sel-nights-label">' + days + ' night' + (days > 1 ? 's' : '') + '</div>'
            + '<div class="hotel-sel-nights-total">' + lkr(stot) + '</div>'
            + '</div>';
    }
    else {
        selPanel = '<div class="hotel-sel-empty">'
            + '<svg width="36" height="36" viewBox="0 0 36 36" fill="none">'
            + '<rect x="3" y="9" width="30" height="22" rx="4" stroke="#8c9489" stroke-width="1.8"/>'
            + '<path d="M3 15h30M13 9V5M23 9V5" stroke="#8c9489" stroke-width="1.8" stroke-linecap="round"/>'
            + '</svg>'
            + '<div style="font-size:12px;font-weight:600">No hotel selected</div>'
            + '<div style="font-size:11px">Pick one from the list below</div>'
            + '</div>';
    }
    var budgetTotal = suffix === 'A' ? S.A.budget : c.total;
    var remaining = suffix === 'A' ? Math.max(0, S.A.budget - c.total) : 0;
    var remClass = remaining > 0 ? 'green' : 'red';
    var h2 = '';
    h2 += '<div class="hotel-page-header">'
        + '<div class="hotel-page-icon">&#x1F3E8;</div>'
        + '<div><div class="hotel-page-title">Choose Your Accommodation</div>'
        + '<div class="hotel-page-sub">Select a hotel for ' + days + ' night' + (days > 1 ? 's' : '') + ' in ' + dest + '</div>'
        + '</div></div>';
    h2 += '<div class="hotel-top-panel">'
        + '<div class="hotel-panel-box">'
        + '<div class="hotel-panel-title">Budget Breakdown</div>'
        + '<div class="hotel-budget-chart-wrap"><canvas id="' + chartId + '" width="140" height="140"></canvas></div>'
        + '<div class="hotel-budget-legend">'
        + '<div class="hbl-item"><div class="hbl-dot" style="background:#2aab99"></div>Transport</div>'
        + '<div class="hbl-item"><div class="hbl-dot" style="background:#dc7c32"></div>Accommodation</div>'
        + '<div class="hbl-item"><div class="hbl-dot" style="background:#1a3a2d"></div>Food</div>'
        + '<div class="hbl-item"><div class="hbl-dot" style="background:#6ab4cc"></div>Activities</div>'
        + '</div>'
        + '<div class="hotel-budget-rows">'
        + '<div class="hbr-row"><span>Total Budget</span><span class="hbr-val">' + lkr(budgetTotal) + '</span></div>'
        + '<div class="hbr-row"><span>Used</span><span class="hbr-val">' + lkr(c.total) + '</span></div>'
        + '<div class="hbr-row total"><span>Remaining</span><span class="hbr-val ' + remClass + '">' + lkr(remaining) + '</span></div>'
        + '</div></div>'
        + '<div class="hotel-panel-box">'
        + '<div class="hotel-panel-title">Selected Accommodation</div>'
        + selPanel
        + '</div></div>';
    h2 += '<div class="hotel-grid">';
    hotels.forEach(function (h, idx) {
        var cfg = TIER_CFG[h.tier];
        var tot = h.price * days;
        var diff = tot - accomBudget;
        var isSel = selHotel && selHotel.name === h.name;
        var starsHtml = Array.from({ length: 5 }, function (_, i) { return '<span class="hcard-star">' + (i < h.stars ? '&#9733;' : '&#9734;') + '</span>'; }).join('');
        var maxA = 3, visA = h.amenities.slice(0, maxA), extra = h.amenities.length - maxA;
        var amenHtml = visA.map(function (a) { return '<span class="hcard-amenity">' + a + '</span>'; }).join('') + (extra > 0 ? '<span class="hcard-amenity more">+' + extra + ' more</span>' : '');
        var badge = '';
        if (isSel) {
            badge = '<div class="hcard-sel-badge"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>';
        }
        else if (diff > 0) {
            badge = '<div class="hcard-diff-badge positive">+' + lkr(diff) + '</div>';
        }
        else if (diff < 0) {
            badge = '<div class="hcard-diff-badge neutral">-' + lkr(Math.abs(diff)) + '</div>';
        }
        var locHint = (h.amenities.indexOf('Beach Access') >= 0 || h.amenities.indexOf('Sea View') >= 0) ? 'Near Beach' : h.amenities.indexOf('Mountain View') >= 0 ? 'Mountain Area' : 'Town Center';
        var _esc = function (s) { return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'"); };
        var cfn = "selectHotelFn('" + suffix + "'," + idx + ",'hotelList" + suffix + "','" + _esc(dest) + "','" + _esc(style) + "'," + days + ",'" + date + "')";
        var btnTxt = isSel ? '<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg> Selected' : 'Select Hotel';
        h2 += '<div class="hcard' + (isSel ? ' sel' : '') + '" onclick="' + cfn + '">'
            + '<div class="hcard-img">'
            + (h.image_url
                ? '<img src="' + h.image_url + '" alt="' + h.name + '" onerror="this.style.display=\'none\'">'
                    + '<div class="hcard-img-overlay"></div>'
                : '')
            + '<span class="hcard-img-emoji">' + h.emoji + '</span>'
            + badge
            + '<div class="hcard-stars-badge">' + starsHtml + '<span class="hcard-score">' + h.rating + '</span></div>'
            + '</div>'
            + '<div class="hcard-body">'
            + '<div class="hcard-name">' + h.name + '</div>'
            + '<div class="hcard-loc"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1C3.62 1 2.5 2.12 2.5 3.5c0 2.1 2.5 5 2.5 5s2.5-2.9 2.5-5C7.5 2.12 6.38 1 5 1zm0 3.25a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" fill="#8c9489"/></svg>' + locHint + '</div>'
            + '<div class="hcard-room"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect x="1" y="1" width="8" height="8" rx="1.5" stroke="#8c9489" stroke-width="1.2"/><path d="M1 5h8" stroke="#8c9489" stroke-width="1.2"/></svg>' + cfg.room + ' &middot; ' + cfg.size + '</div>'
            + '<div class="hcard-amenities">' + amenHtml + '</div>'
            + '<div class="hcard-pricing">'
            + '<div><div class="hcard-price-night">' + lkr(h.price) + '</div><div class="hcard-price-label">Per night</div></div>'
            + '<div class="hcard-price-total"><div class="hcard-price-total-val">' + lkr(tot) + '</div><div class="hcard-price-total-label">' + days + ' nights total</div></div>'
            + '</div>'
            + '<button class="hcard-btn' + (isSel ? ' sel-btn' : '') + '" onclick="event.stopPropagation();' + (isSel ? "showToast('Already selected!')" : cfn) + '">' + btnTxt + '</button>'
            + '<button class="hcard-btn book-btn" onclick="event.stopPropagation();openBkModalByIdx(\'' + suffix + '\',' + idx + ',\'' + _esc(dest) + '\',\'' + cin + '\',\'' + cout + '\')">📅 Book Now</button>'
            + '</div></div>';
    });
    h2 += '</div><p style="font-size:11px;color:var(--text3);margin-top:14px;text-align:center">&#x1F4A1; Prices are estimated per night. Book 2+ weeks ahead for peak season.</p>';
    el.innerHTML = h2;
    setTimeout(function () {
        var ctx = $(chartId);
        if (!ctx)
            return;
        if (ctx._ci)
            ctx._ci.destroy();
        ctx._ci = new Chart(ctx, { type: 'doughnut', data: { labels: ['Transport', 'Accommodation', 'Food', 'Activities'], datasets: [{ data: [c.t, c.a, c.f, c.ac], backgroundColor: ['#2aab99', '#dc7c32', '#1a3a2d', '#6ab4cc'], borderWidth: 0, hoverOffset: 4 }] }, options: { responsive: false, cutout: '65%', plugins: { legend: { display: false }, tooltip: { callbacks: { label: function (x) { return ' ' + x.label + ': ' + lkr(x.raw); } } } } } });
    }, 80);
}
function selectHotelFn(suffix, idx, containerId, dest, style, days, date) {
    var h = (HOTELS[dest] || HOTELS.Ella)[idx];
    if (suffix === 'A')
        S.A.selHotel = h;
    else
        S.B.selHotel = h;
    renderHotels(containerId, dest, style, days, date);
    showToast(h.name + ' selected — hotel added to map!');
    var mapTc = $('tc' + suffix + '-map');
    if (mapTc && mapTc.classList.contains('active'))
        renderMap(suffix);
}
/* ── BOOKING MODAL ── */
function openBkModalByIdx(suffix, idx, dest, cin, cout) {
    var h = (HOTELS[dest] || HOTELS.Ella)[idx];
    if (h)
        openBkModal(h, cin, cout, dest);
}
let bkCurrentUrl = '';
function openBkModal(hotel, cin, cout, dest) {
    bkCurrentUrl = hotel.bookingUrl;
    $('bkHotelName').textContent = hotel.name;
    $('bkHotelLocation').textContent = `${dest} · ${TIER_CFG[hotel.tier]?.label || hotel.tier}`;
    $('bkPriceBanner').textContent = lkr(hotel.price) + ' / night (estimated)';
    const today = new Date().toISOString().split('T')[0];
    const cinEl = $('bkCheckin');
    const coutEl = $('bkCheckout');
    cinEl.value = cin || today;
    cinEl.min = today;
    if (cout) {
        coutEl.value = cout;
    }
    else {
        const d = new Date(cin || today);
        d.setDate(d.getDate() + 2);
        coutEl.value = d.toISOString().split('T')[0];
    }
    coutEl.min = today;
    $('bkFormView').style.display = 'block';
    $('bkConfirmView').style.display = 'none';
    $('bookingModal').classList.add('open');
    bkCalcTotal();
}
function closeBkModal(e) { if (e.target === $('bookingModal'))
    closeBkModalDirect(); }
function closeBkModalDirect() { $('bookingModal').classList.remove('open'); }
function bkCalcTotal() {
    const cin = $('bkCheckin').value;
    const cout = $('bkCheckout').value;
    const summary = $('bkSummary');
    if (!cin || !cout) {
        summary.style.display = 'none';
        return;
    }
    const d1 = new Date(cin), d2 = new Date(cout);
    const nights = Math.round((d2.getTime() - d1.getTime()) / (86400000));
    if (nights <= 0) {
        summary.style.display = 'none';
        return;
    }
    /* parse price from banner */
    const bannerTxt = $('bkPriceBanner').textContent;
    const priceMatch = bannerTxt.match(/[\d,]+(\.\d+)?k?/);
    let pn = 0;
    if (priceMatch) {
        const raw = priceMatch[0].replace(/,/g, '');
        pn = raw.endsWith('k') ? parseFloat(raw) * 1000 : parseFloat(raw);
    }
    const total = pn * nights;
    $('bkSumRate').textContent = lkr(pn) + ' / night';
    $('bkSumNightsLbl').textContent = `× ${nights} night${nights > 1 ? 's' : ''}`;
    $('bkSumNights').textContent = '';
    $('bkSumTotal').textContent = lkr(total);
    summary.style.display = 'block';
}
function confirmBooking() {
    const hotel = $('bkHotelName').textContent;
    const cin = $('bkCheckin').value;
    const cout = $('bkCheckout').value;
    const guests = $('bkGuests').value;
    const room = $('bkRoom').value;
    if (!cin || !cout) {
        showToast('Please select check-in and check-out dates');
        return;
    }
    const d1 = new Date(cin), d2 = new Date(cout);
    if (d2 <= d1) {
        showToast('Check-out must be after check-in');
        return;
    }
    const nights = Math.round((d2.getTime() - d1.getTime()) / 86400000);
    const fmt = ds => new Date(ds).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
    $('bkConfirmDetails').innerHTML =
        `<strong>${hotel}</strong><br>
     ${fmt(cin)} → ${fmt(cout)} · ${nights} night${nights > 1 ? 's' : ''}<br>
     ${guests} · ${room}<br>
     <span style="color:var(--teal);font-weight:600">${$('bkSumTotal').textContent} total (est.)</span>`;
    $('bkFormView').style.display = 'none';
    $('bkConfirmView').style.display = 'block';
    showToast('🎉 Booking confirmed for ' + hotel + '!');
    /* open booking.com in background */
    const bUrl = bkCurrentUrl + `&checkin=${cin}&checkout=${cout}`;
    bkCurrentUrl = bUrl;
}
/* update switchA/B to call renderHotels */
const _origSwitchA = switchA;
switchA = function (t, el) {
    _origSwitchA(t, el);
    if (t === 'hotel')
        renderHotels('hotelListA', S.A.dest, S.A.style, S.A.days, S.A.date);
};
const _origSwitchB = switchB;
switchB = function (t, el) {
    _origSwitchB(t, el);
    if (t === 'hotel')
        renderHotels('hotelListB', S.B.dest, S.B.style, S.B.days, S.B.date);
};
function syncAdjBtns(containerId, activeVal) {
    const c = $(containerId);
    if (!c)
        return;
    c.querySelectorAll('.adj-opt-btn').forEach(btn => {
        const fn = btn.getAttribute('onclick') || '';
        const match = fn.match(/'([^']+)'/);
        if (match)
            btn.classList.toggle('sel', match[1] === activeVal);
    });
}
function initAdjDate(w) {
    const el = $('adjDate' + w);
    const endEl = $('adjDateEnd' + w);
    if (!el || !endEl)
        return;
    const S_w = w === 'A' ? S.A : S.B;
    const update = () => {
        const d = new Date(el.value || new Date());
        d.setDate(d.getDate() + S_w.days - 1);
        endEl.textContent = d.toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' });
    };
    update();
}
/* Dashboard A adjustments */
function adjA(field, delta) {
    if (field === 'days')
        S.A.days = Math.max(1, Math.min(21, S.A.days + delta));
    else
        S.A.people = Math.max(1, Math.min(20, S.A.people + delta));
    S.A.sched = null;
    updA();
    renderSchA();
    initAdjDate('A');
    showToast(field === 'days' ? `${S.A.days} ${S.A.days > 1 ? 'days' : 'day'}` : `${S.A.people} ${S.A.people > 1 ? 'people' : 'person'}`);
}
function adjADate(val) {
    S.A.date = val;
    S.A.sched = null;
    updA();
    renderSchA();
    initAdjDate('A');
    showToast('Start date updated');
}
function adjAStyle(val, container) {
    S.A.style = val;
    S.A.sched = null;
    container.querySelectorAll('.adj-opt-btn').forEach(b => b.classList.remove('sel'));
    event.currentTarget.classList.add('sel');
    updA();
    renderSchA();
    renderHotels('hotelListA', S.A.dest, S.A.style, S.A.days, S.A.date);
    showToast('Style: ' + val.charAt(0).toUpperCase() + val.slice(1));
}
function adjATransport(val, container) {
    S.A.transport = val;
    container.querySelectorAll('.adj-opt-btn').forEach(b => b.classList.remove('sel'));
    event.currentTarget.classList.add('sel');
    updA();
    showToast('Transport: ' + val.charAt(0).toUpperCase() + val.slice(1));
}
function adjAPace(val, container) {
    S.A.pace = val;
    S.A.sched = null;
    container.querySelectorAll('.adj-opt-btn').forEach(b => b.classList.remove('sel'));
    event.currentTarget.classList.add('sel');
    renderSchA();
    showToast('Pace: ' + val.charAt(0).toUpperCase() + val.slice(1));
}
/* Dashboard B adjustments */
function adjBDate(val) {
    S.B.date = val;
    S.B.sched = null;
    updB();
    renderSchB();
    initAdjDate('B');
    showToast('Start date updated');
}
function adjBStyle(val, container) {
    S.B.style = val;
    S.B.sched = null;
    container.querySelectorAll('.adj-opt-btn').forEach(b => b.classList.remove('sel'));
    event.currentTarget.classList.add('sel');
    updB();
    renderSchB();
    renderHotels('hotelListB', S.B.dest, S.B.style, S.B.days, S.B.date);
    showToast('Style: ' + val.charAt(0).toUpperCase() + val.slice(1));
}
function adjBTransport(val, container) {
    S.B.transport = val;
    container.querySelectorAll('.adj-opt-btn').forEach(b => b.classList.remove('sel'));
    event.currentTarget.classList.add('sel');
    updB();
    showToast('Transport: ' + val.charAt(0).toUpperCase() + val.slice(1));
}
function adjBPace(val, container) {
    S.B.pace = val;
    S.B.sched = null;
    container.querySelectorAll('.adj-opt-btn').forEach(b => b.classList.remove('sel'));
    event.currentTarget.classList.add('sel');
    renderSchB();
    showToast('Pace: ' + val.charAt(0).toUpperCase() + val.slice(1));
}
function adjB(field, delta) {
    if (field === 'days')
        S.B.days = Math.max(1, Math.min(21, S.B.days + delta));
    else
        S.B.people = Math.max(1, Math.min(20, S.B.people + delta));
    S.B.sched = null;
    updB();
    renderSchB();
    initAdjDate('B');
    showToast(field === 'days' ? `${S.B.days} ${S.B.days > 1 ? 'days' : 'day'}` : `${S.B.people} ${S.B.people > 1 ? 'people' : 'person'}`);
}
/* ════════════════════════════════════════
   NEW FEATURES JAVASCRIPT
════════════════════════════════════════ */
/* ══════════════════════════════════════════════
   THEME SYSTEM
══════════════════════════════════════════════ */
// Modes: 'dark' | 'light' | 'auto'  (auto = system pref)
let currentTheme = 'auto';
function applyTheme(mode) {
    currentTheme = mode;
    const body = document.body;
    body.classList.remove('dark-mode', 'light-mode');
    if (mode === 'dark') {
        body.classList.add('dark-mode');
    }
    else if (mode === 'light') {
        body.classList.add('light-mode');
    }
    else {
        // auto — follow system
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        body.classList.toggle('dark-mode', prefersDark);
    }
    // Sync FAB
    const isDarkNow = body.classList.contains('dark-mode');
    const fabIcon = $('themeFabIcon');
    const fabLabel = $('themeFabLabel');
    if (fabIcon)
        fabIcon.textContent = isDarkNow ? '☀️' : '🌙';
    if (fabLabel)
        fabLabel.textContent = isDarkNow ? 'Light Mode' : 'Dark Mode';
    // Sync nav toggle icons
    $qa('.theme-toggle').forEach(btn => {
        btn.title = isDarkNow ? 'Switch to Light Mode' : 'Switch to Dark Mode';
        btn.innerHTML = isDarkNow
            ? '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="3" stroke="currentColor" stroke-width="1.3"/><path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.9 2.9l1.1 1.1M10 10l1.1 1.1M2.9 11.1l1.1-1.1M10 4l1.1-1.1" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>'
            : '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.5 9A5.5 5.5 0 0 1 5 2.5a5.5 5.5 0 1 0 6.5 6.5z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    });
    // Sync profile page toggles
    const dmToggle = $('darkModeToggle');
    const lmToggle = $('lightModeToggle');
    const dmSub = $('darkModeSubtitle');
    const dmIcon = $('darkModeIcon');
    if (dmToggle)
        dmToggle.checked = (mode === 'dark');
    if (lmToggle)
        lmToggle.checked = (mode === 'light');
    if (dmSub)
        dmSub.textContent = mode === 'dark' ? 'On — using dark theme' : 'Off — using light theme';
    if (dmIcon)
        dmIcon.textContent = isDarkNow ? '🌙' : '☀️';
    localStorage.setItem('xtrack_theme', mode);
}
function toggleTheme() {
    // Cycle: light → dark → light
    const isDarkNow = document.body.classList.contains('dark-mode');
    applyTheme(isDarkNow ? 'light' : 'dark');
    showToast(document.body.classList.contains('dark-mode') ? '🌙 Dark mode on' : '☀️ Light mode on');
}
function applyThemeFromToggle(checked) {
    // Dark mode toggle in profile
    applyTheme(checked ? 'dark' : 'light');
    const lmToggle = $('lightModeToggle');
    if (lmToggle)
        lmToggle.checked = !checked;
    showToast(checked ? '🌙 Dark mode on' : '☀️ Light mode on');
}
function applyLightFromToggle(checked) {
    // Light mode toggle in profile
    applyTheme(checked ? 'light' : 'dark');
    const dmToggle = $('darkModeToggle');
    if (dmToggle)
        dmToggle.checked = !checked;
    showToast(checked ? '☀️ Light mode on' : '🌙 Dark mode on');
}
// ── Init on load ──
(() => {
    const saved = localStorage.getItem('xtrack_theme') || 'light';
    applyTheme(saved);
    // Listen for system preference changes when in auto mode
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (currentTheme === 'auto')
            applyTheme('auto');
    });
})();
// isDark shim for any legacy code that checks it
Object.defineProperty(window, 'isDark', {
    get() { return document.body.classList.contains('dark-mode'); }
});
/* ══════════════════════════════════════════════════════════
   BOOTSTRAP DATA LOADER — Fetches locations & hotels from DB
   Runs once on page load. Replaces all hardcoded JS constants.
══════════════════════════════════════════════════════════ */
async function bootstrapData() {
    try {
        const [locRes, hotelRes] = await Promise.all([
            fetch('api/locations.php').then(r => r.json()),
            fetch('api/hotels.php').then(r => r.json()),
        ]);
        // ── Locations ──────────────────────────────────────────
        if (locRes.success && locRes.locations.length) {
            const locs = locRes.locations;
            // Rebuild DESTS (all location names)
            DESTS = locs.map(l => l.name);
            // Rebuild STARTING_LOCS
            STARTING_LOCS = locs.filter(l => l.is_starting_point).map(l => l.name);
            // Rebuild KMS (distance from Colombo)
            locs.forEach(l => { KMS[l.name] = l.distance_from_colombo || 0; });
            // Merge DB locations into DESTS_BY_CAT (prepend, avoid duplicates)
            locs.forEach(l => {
                (l.categories || []).forEach(cat => {
                    if (DESTS_BY_CAT[cat] && !DESTS_BY_CAT[cat].includes(l.name)) {
                        DESTS_BY_CAT[cat].unshift(l.name);
                    }
                });
            });
            // Rebuild GEO  (destination coords)
            locs.forEach(l => { GEO[l.name] = [l.lat, l.lon]; });
            // also add each place's coords to GEO
            locs.forEach(l => {
                (l.places || []).forEach(p => {
                    if (p.lat && p.lon)
                        GEO[p.n] = [p.lat, p.lon];
                });
            });
            // Rebuild DEST_COORDS
            locs.forEach(l => {
                DEST_COORDS[l.name] = { lat: l.lat, lon: l.lon, region: l.region };
            });
            // Rebuild NP (nearby places)
            const npNew = {};
            locs.forEach(l => {
                if (l.places && l.places.length) {
                    npNew[l.name] = l.places.map(p => ({
                        n: p.n, d: p.d, desc: p.desc, cost: p.cost, hrs: p.hrs
                    }));
                }
            });
            NP = npNew;
            console.log('[Xtrack] Loaded', locs.length, 'locations from DB');
        }
        // ── Hotels ─────────────────────────────────────────────
        if (hotelRes.success) {
            HOTELS = hotelRes.hotels;
            console.log('[Xtrack] Loaded hotels from DB for', Object.keys(HOTELS).length, 'destinations');
        }
        // ── Re-populate any already-rendered selects/wizards ───
        if (typeof populateDestSelects === 'function')
            populateDestSelects();
        if (typeof refreshCategoryDestinations === 'function')
            refreshCategoryDestinations();
    }
    catch (e) {
        console.warn('[Xtrack] bootstrapData failed — using built-in fallback data', e.message);
    }
}
// Fire immediately on page load
bootstrapData();
/* ── OFFLINE DETECTION ── */
window.addEventListener('offline', () => { $('offlineBanner').classList.add('show'); });
window.addEventListener('online', () => { $('offlineBanner').classList.remove('show'); });
/* ── GEOLOCATION ── */
const LOC_COORDS = {
    'Colombo': [6.927, 79.861], 'Kandy': [7.291, 80.636], 'Galle': [6.053, 80.220],
    'Ella': [6.866, 81.046], 'Nuwara Eliya': [6.970, 80.783], 'Sigiriya': [7.957, 80.760],
    'Trincomalee': [8.575, 81.233], 'Mirissa': [5.946, 80.448], 'Hikkaduwa': [6.139, 80.105],
    'Arugam Bay': [6.840, 81.832], 'Yala': [6.374, 81.525], 'Negombo': [7.209, 79.836],
    'Jaffna': [9.661, 80.025], 'Polonnaruwa': [7.940, 81.000], 'Anuradhapura': [8.335, 80.404],
    'Dambulla': [7.869, 80.652], 'Pinnawala': [7.299, 80.382], 'Bentota': [6.426, 79.996],
    "Adam's Peak": [6.810, 80.499], 'Horton Plains': [6.803, 80.808]
};
function findNearestDest(lat, lng) {
    let best = 'Colombo', bestD = 1e9;
    for (const [n, [la, lo]] of Object.entries(LOC_COORDS)) {
        const d = Math.hypot(lat - la, lng - lo);
        if (d < bestD) {
            bestD = d;
            best = n;
        }
    }
    return best;
}
function geolocate(isB = false) {
    if (!navigator.geolocation) {
        showToast('Geolocation not supported');
        return;
    }
    const btnId = isB ? 'geoBtnB' : 'geoBtn';
    const btn = $(btnId);
    if (btn) {
        btn.classList.add('loading');
        btn.textContent = 'Locating…';
    }
    navigator.geolocation.getCurrentPosition(pos => {
        const { latitude: lat, longitude: lng } = pos.coords;
        const nearest = findNearestDest(lat, lng);
        const selId = isB ? 'flocB' : 'floc';
        const sel = $(selId);
        if (sel) {
            for (let i = 0; i < sel.options.length; i++) {
                if (sel.options[i].value === nearest) {
                    sel.selectedIndex = i;
                    break;
                }
            }
            if (isB)
                S.B.current = nearest;
            else
                S.A.current = nearest;
        }
        if (btn) {
            btn.classList.remove('loading');
            btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="3" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 1v2M6.5 10v2M1 6.5h2M10 6.5h2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg> ✓ ' + nearest;
        }
        showToast('📍 Location set to ' + nearest);
    }, err => {
        if (btn) {
            btn.classList.remove('loading');
            btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="3" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 1v2M6.5 10v2M1 6.5h2M10 6.5h2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg> Use My Location';
        }
        showToast('Could not get location: ' + err.message);
    });
}
/* ── BUDGET CONFLICT WARNING ── */
function checkBudgetConflict() {
    if (!S.A.budget || !S.A.days || !S.A.people || !S.A.style)
        return;
    const r = SR[S.A.style];
    const minDaily = (r.a + r.f + r.t * 0.15) * S.A.people;
    const minTotal = Math.round(minDaily * S.A.days);
    const existing = $('wzBudgetWarn');
    if (S.A.budget < minTotal) {
        const deficit = lkr(minTotal - S.A.budget);
        const msg = `Budget may be tight for ${S.A.days} day${S.A.days > 1 ? 's' : ''}. Minimum estimated: ${lkr(minTotal)}. Consider reducing days or switching to "Simple" style.`;
        if (!existing) {
            const warn = document.createElement('div');
            warn.id = 'wzBudgetWarn';
            warn.className = 'wz-budget-warn';
            warn.innerHTML = `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" style="flex-shrink:0"><path d="M7.5 2L1.5 13h12L7.5 2z" stroke="#7a4800" stroke-width="1.3" stroke-linejoin="round"/><path d="M7.5 6v3M7.5 10.5v.5" stroke="#7a4800" stroke-width="1.3" stroke-linecap="round"/></svg><span><strong>Budget Alert:</strong> ${msg}</span>`;
            const card = $q('.wz-card');
            if (card)
                card.appendChild(warn);
        }
        else {
            existing.querySelector('strong').nextSibling.textContent = ' ' + msg;
        }
    }
    else {
        if (existing)
            existing.remove();
    }
}
/* ── EXCHANGE RATE ── */
const FX_MOCK = { USD: 330.5, EUR: 357.2, GBP: 417.8, AUD: 219.4, INR: 3.97, JPY: 2.21 };
function renderFXStrip(panel, totalLKR) {
    const el = $('fxRates' + panel);
    if (!el)
        return;
    const amt = totalLKR || 50000;
    el.innerHTML = Object.entries(FX_MOCK).map(([cur, rate]) => `
    <span class="fx-pill">${cur} ${(amt / rate).toFixed(0)}</span>
  `).join('');
    const strip = $('fxStrip' + panel);
    if (strip)
        strip.querySelector('.fx-label').textContent = `💱 ${lkr(amt)} equals:`;
}
/* ── SHARE LINK ── */
let shareModalPanel = 'A';
function openShareModal(panel) {
    shareModalPanel = panel;
    $('shareModalOverlay').classList.add('on');
    $('shareUrlWrap').style.display = 'none';
}
function closeShareModal() { $('shareModalOverlay').classList.remove('on'); }
function buildShareURL(panel) {
    const s = panel === 'A' ? S.A : S.B;
    const state = { method: S.method, dest: s.dest, days: s.days, people: s.people, current: s.current, style: s.style, transport: s.transport, pace: s.pace, date: s.date, sel: [...(panel === 'A' ? S.selA : S.selB)] };
    const encoded = btoa(encodeURIComponent(JSON.stringify(state)));
    return window.location.origin + window.location.pathname + '?trip=' + encoded;
}
function copyShareLink() {
    const url = buildShareURL(shareModalPanel);
    const wrap = $('shareUrlWrap');
    $('shareUrlText').textContent = url;
    wrap.style.display = 'block';
    navigator.clipboard.writeText(url).then(() => showToast('🔗 Link copied to clipboard!')).catch(() => showToast('🔗 Link generated — copy from box above'));
}
// Load from URL on start
(() => {
    try {
        const params = new URLSearchParams(window.location.search);
        const trip = params.get('trip');
        if (trip) {
            const state = JSON.parse(decodeURIComponent(atob(trip)));
            S.method = state.method || 'budget';
            if (S.method === 'budget') {
                Object.assign(S.A, { dest: state.dest, days: state.days, people: state.people, current: state.current, style: state.style, transport: state.transport, pace: state.pace, date: state.date });
                S.selA = new Set(state.sel || []);
                buildDA();
                setTimeout(() => goTo('page4a'), 300);
            }
            else {
                Object.assign(S.B, { dest: state.dest, days: state.days, people: state.people, current: state.current, style: state.style, transport: state.transport, pace: state.pace, date: state.date });
                S.selB = new Set(state.sel || []);
                buildDB();
                setTimeout(() => goTo('page4b'), 300);
            }
        }
    }
    catch (e) { }
})();
/* ── ICS CALENDAR EXPORT ── */
function exportICS(panel) {
    const s = panel === 'A' ? S.A : S.B;
    const sched = genSched(s.days, s.dest, s.date, [...(panel === 'A' ? S.selA : S.selB)], s.pace);
    let ics = 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Xtrack//Sri Lanka Trip Planner//EN\r\n';
    sched.forEach((d, i) => {
        const base = s.date ? new Date(s.date) : new Date();
        base.setDate(base.getDate() + i);
        const dt = base.toISOString().replace(/-|:|T.*$/g, '').slice(0, 8);
        ics += `BEGIN:VEVENT\r\nUID:xtrack-${panel}-day${i + 1}@xtrack.app\r\nDTSTART;VALUE=DATE:${dt}\r\nDTEND;VALUE=DATE:${dt}\r\nSUMMARY:${d.title} — ${s.dest}\r\nDESCRIPTION:${d.sub}\r\nEND:VEVENT\r\n`;
    });
    ics += 'END:VCALENDAR';
    const blob = new Blob([ics], { type: 'text/calendar' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `xtrack-${s.dest.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.ics`;
    a.click();
    showToast('📅 Calendar file downloaded!');
}
/* ── PDF EXPORT (jsPDF) ── */
function exportPDF(panel) {
    showToast('📄 Preparing PDF…');
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.onload = () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        const s = panel === 'A' ? S.A : S.B;
        const u = window._currentUser || {};
        const sel = [...(panel === 'A' ? S.selA : S.selB)];
        const c = calc(s.dest, s.days, s.people, s.style, sel, s.transport);
        const daily = genDaily(s.dest, s.days, s.people, s.style, s.date, s.transport);
        /* Use stored detailed schedule (preserves user edits) */
        const sched = S[panel].sched ||
            genDetailedSched(s.days, s.dest, s.date, [...sel], s.pace, s.current);
        const genDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
        const PW = 210, ML = 14, CW = 182, RX = ML + CW; /* page width, left margin, content width, right edge */
        let y = 0, pageNum = 1;
        /* ── Helpers ── */
        const addPage = () => { doc.addPage(); pageNum++; y = 22; drawPageFooter(); };
        const checkPage = (need = 14) => { if (y + need > 276)
            addPage(); };
        const hex2rgb = h => { const r = parseInt(h.slice(1, 3), 16), g = parseInt(h.slice(3, 5), 16), b = parseInt(h.slice(5, 7), 16); return [r, g, b]; };
        const TYPE_COL = {
            sleep: '#94a3b8', food: '#f59e0b', travel: '#2aab99',
            hotel: '#7c3aed', explore: '#ea580c', night: '#475569', activity: '#2aab99'
        };
        const TYPE_LABEL = {
            sleep: 'Rest', food: 'Dining', travel: 'Travel',
            hotel: 'Hotel', explore: 'Explore', night: 'Night', activity: 'Activity'
        };
        const fmtDurPdf = m => { if (!m || m <= 0)
            return 'Night'; if (m < 60)
            return m + 'm'; return Math.floor(m / 60) + 'h' + (m % 60 ? '  ' + m % 60 + 'm' : ''); };
        /* Draw running footer (page number + tagline) on every page */
        function drawPageFooter() {
            doc.setDrawColor(200, 200, 200);
            doc.line(ML, 285, RX, 285);
            doc.setFontSize(7.5);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(180, 180, 180);
            doc.text('Generated by Xtrack · Estimates only · Actual costs may vary', ML, 290);
            doc.text('Page ' + pageNum, RX, 290, { align: 'right' });
        }
        /* Draw teal header banner on page 1 */
        function drawHeader() {
            doc.setFillColor(42, 171, 153);
            doc.rect(0, 0, PW, 18, 'F');
            /* subtle second stripe */
            doc.setFillColor(27, 139, 125);
            doc.rect(0, 15, PW, 3, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(15);
            doc.setFont(undefined, 'bold');
            doc.text('XTrack — Sri Lanka Trip Itinerary', ML, 11.5);
            doc.setFontSize(8);
            doc.setFont(undefined, 'normal');
            doc.text('Generated ' + genDate, RX, 11.5, { align: 'right' });
            y = 26;
        }
        /* ── Page 1 header ── */
        drawHeader();
        drawPageFooter();
        /* ── Traveller card ── */
        if (u.fullname) {
            doc.setFillColor(245, 252, 250);
            doc.roundedRect(ML, y, CW, 14, 2.5, 2.5, 'F');
            doc.setDrawColor(210, 240, 235);
            doc.roundedRect(ML, y, CW, 14, 2.5, 2.5, 'S');
            doc.setFontSize(7.5);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(42, 171, 153);
            doc.text('PREPARED FOR', ML + 4, y + 5);
            doc.setFontSize(10);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(30, 30, 30);
            doc.text(u.fullname, ML + 4, y + 10.5);
            let ci = u.email || '';
            if (u.phone)
                ci += (ci ? ' · ' : '') + u.phone;
            if (ci) {
                doc.setFont(undefined, 'normal');
                doc.setFontSize(8);
                doc.setTextColor(110, 110, 110);
                doc.text(ci, RX - 4, y + 10.5, { align: 'right' });
            }
            y += 19;
        }
        /* ── Trip title ── */
        const cat = CATS.find(c2 => c2.id === S.cat);
        const catLabel = cat ? cat.label : 'Trip';
        doc.setFontSize(17);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(22, 22, 22);
        doc.text(s.dest, ML, y);
        y += 7;
        doc.setFontSize(9.5);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text(s.days + ' day' + (s.days > 1 ? 's' : '') + ' · ' + s.people + ' traveller' + (s.people > 1 ? 's' : '') + ' · ' + s.style.charAt(0).toUpperCase() + s.style.slice(1) + ' style · ' + (s.transport === 'public' ? 'Public transport' : s.transport === 'self' ? 'Self-drive' : 'Private cab') + ' · ' + s.pace.charAt(0).toUpperCase() + s.pace.slice(1) + ' pace' + (s.date ? ' · Departs ' + s.date : ''), ML, y);
        y += 5;
        /* Thin teal accent line */
        doc.setDrawColor(42, 171, 153);
        doc.setLineWidth(0.6);
        doc.line(ML, y, ML + 60, y);
        doc.setLineWidth(0.2);
        y += 8;
        /* ── Budget overview strip (4 boxes) ── */
        checkPage(18);
        const bw = CW / 4, bItems = [['Transport', lkr(c.t)], [' Accommodation', lkr(c.a)], ['Food', lkr(c.f)], ['Activities', lkr(c.ac)]];
        bItems.forEach(([lbl, val], i) => {
            const bx = ML + i * bw;
            doc.setFillColor(i === 0 ? 232 : i === 1 ? 245 : i === 2 ? 255 : 232, i === 0 ? 247 : i === 1 ? 245 : i === 2 ? 251 : 252, i === 0 ? 245 : i === 1 ? 240 : i === 2 ? 235 : 245);
            doc.roundedRect(bx + (i > 0 ? 1 : 0), y, bw - (i < 3 ? 1 : 0), 14, 1.5, 1.5, 'F');
            doc.setFontSize(7);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(120, 120, 120);
            doc.text(lbl.trim().toUpperCase(), bx + (i > 0 ? 2 : 1) + 1, y + 5);
            doc.setFontSize(9.5);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(42, 171, 153);
            doc.text(val, bx + (i > 0 ? 2 : 1) + 1, y + 11);
        });
        y += 17;
        /* Total row */
        doc.setFillColor(27, 139, 125);
        doc.roundedRect(ML, y, CW, 10, 2, 2, 'F');
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text('TOTAL ESTIMATE', ML + 4, y + 6.5);
        doc.text(lkr(c.total) + '  (' + lkr(Math.round(c.total / s.people)) + ' per person)', RX - 4, y + 6.5, { align: 'right' });
        y += 15;
        /* ── Section label: Daily Itinerary ── */
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(30, 30, 30);
        doc.text('Daily Itinerary', ML, y);
        y += 2;
        doc.setDrawColor(42, 171, 153);
        doc.setLineWidth(0.5);
        doc.line(ML, y, RX, y);
        doc.setLineWidth(0.2);
        y += 7;
        /* ══════════════════════════════════════
           DAY BLOCKS
        ══════════════════════════════════════ */
        sched.forEach((day, di) => {
            const dd = daily[di] || {};
            checkPage(28);
            /* Day header bar */
            doc.setFillColor(232, 247, 245);
            doc.roundedRect(ML, y, CW, 12, 2, 2, 'F');
            doc.setDrawColor(180, 225, 218);
            doc.roundedRect(ML, y, CW, 12, 2, 2, 'S');
            /* DAY circle */
            doc.setFillColor(42, 171, 153);
            doc.circle(ML + 7, y + 6, 4.5, 'F');
            doc.setFontSize(5.5);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(255, 255, 255);
            doc.text('DAY', ML + 7, y + 4.2, { align: 'center' });
            doc.setFontSize(8);
            doc.text(String(day.dayNum), ML + 7, y + 8.2, { align: 'center' });
            /* Day label and date */
            doc.setFontSize(11);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(22, 22, 22);
            doc.text(day.dateLabel || ('Day ' + day.dayNum), ML + 14, y + 5);
            const dayTypeLbl = day.dayType === 'travel' ? 'Travel Day' : day.dayType === 'return' ? 'Return Day' : day.dayType === 'rest' ? 'Rest Day' : 'Activity Day';
            doc.setFontSize(8);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(80, 80, 80);
            doc.text(dayTypeLbl, ML + 14, y + 9.5);
            /* Meta: time range | km | hours */
            const metaParts = [];
            if (day.startTime && day.endTime)
                metaParts.push(day.startTime + ' – ' + day.endTime);
            if (day.totalKm)
                metaParts.push(day.totalKm + ' km');
            if (day.totalHrs)
                metaParts.push(day.totalHrs + ' hours');
            if (metaParts.length) {
                doc.setFontSize(7.5);
                doc.setFont(undefined, 'normal');
                doc.setTextColor(90, 90, 90);
                doc.text(metaParts.join('  ·  '), RX - 3, y + 7, { align: 'right' });
            }
            /* Daily cost */
            if (dd.tot) {
                doc.setFontSize(7.5);
                doc.setFont(undefined, 'bold');
                doc.setTextColor(42, 171, 153);
                doc.text('LKR ' + dd.tot.toLocaleString(), RX - 3, y + 11, { align: 'right' });
            }
            y += 16;
            /* ── Activity rows ── */
            const TL_X = ML + 2; /* time column left */
            const DOT_X = ML + 24; /* vertical timeline x */
            const ACT_X = ML + 29; /* activity text left */
            const DUR_X = RX - 3; /* duration text right */
            const LINE_X = DOT_X;
            /* Draw continuous vertical guide line behind all activities */
            const actStartY = y;
            (day.activities || []).forEach((act, ai) => {
                const rgb = hex2rgb(TYPE_COL[act.type] || TYPE_COL.explore);
                const isLast = ai === day.activities.length - 1;
                const durTxt = fmtDurPdf(act.dur);
                /* Estimate row height */
                doc.setFontSize(9);
                doc.setFont(undefined, 'bold');
                const titleLines = doc.splitTextToSize(act.title || 'Activity', DUR_X - ACT_X - 20);
                doc.setFontSize(7.5);
                doc.setFont(undefined, 'normal');
                const descLines = act.desc ? doc.splitTextToSize(act.desc, DUR_X - ACT_X - 4) : [];
                const rowH = 4 + titleLines.length * 4.5 + (descLines.length > 0 ? descLines.length * 3.5 + 1 : 0) + 4;
                checkPage(rowH + 2);
                /* Vertical connector line (skip for last) */
                if (!isLast) {
                    doc.setDrawColor(220, 220, 220);
                    doc.setLineWidth(0.4);
                    doc.line(LINE_X, y + 3.5, LINE_X, y + rowH + 2);
                    doc.setLineWidth(0.2);
                }
                /* Dot */
                doc.setFillColor(...rgb);
                doc.circle(DOT_X, y + 3, 2, 'F');
                /* Time */
                doc.setFontSize(8);
                doc.setFont(undefined, 'bold');
                doc.setTextColor(60, 60, 60);
                doc.text(act.time || '', TL_X, y + 4.5, { maxWidth: 20 });
                /* Type badge pill */
                const typeLabel = TYPE_LABEL[act.type] || 'Activity';
                doc.setFillColor(...rgb.map(v => Math.min(255, v + 100))); /* lighter fill */
                const badgeW = typeLabel.length * 1.6 + 4;
                doc.roundedRect(ACT_X, y - 0.5, badgeW, 4, 1, 1, 'F');
                doc.setFontSize(5.5);
                doc.setFont(undefined, 'bold');
                doc.setTextColor(...rgb.map(v => Math.max(0, v - 60)));
                doc.text(typeLabel.toUpperCase(), ACT_X + 2, y + 2.8);
                /* Duration (top right) */
                doc.setFontSize(8);
                doc.setFont(undefined, 'normal');
                doc.setTextColor(120, 120, 120);
                doc.text(durTxt, DUR_X, y + 4.5, { align: 'right' });
                /* Title */
                let ty = y + 6;
                doc.setFontSize(9.5);
                doc.setFont(undefined, 'bold');
                doc.setTextColor(22, 22, 22);
                doc.text(titleLines, ACT_X, ty);
                ty += titleLines.length * 4.5;
                /* Description */
                if (descLines.length > 0) {
                    doc.setFontSize(7.8);
                    doc.setFont(undefined, 'normal');
                    doc.setTextColor(110, 110, 110);
                    doc.text(descLines, ACT_X, ty);
                    ty += descLines.length * 3.5 + 1;
                }
                y += rowH;
            });
            y += 8; /* gap after day block */
        });
        /* ── Budget detail section ── */
        checkPage(60);
        doc.setDrawColor(200, 200, 200);
        doc.line(ML, y, RX, y);
        y += 7;
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(30, 30, 30);
        doc.text('Budget Breakdown', ML, y);
        y += 2;
        doc.setDrawColor(42, 171, 153);
        doc.setLineWidth(0.5);
        doc.line(ML, y, ML + 50, y);
        doc.setLineWidth(0.2);
        y += 8;
        const budRows = [
            ['Transportation', lkr(c.t), 'Door-to-door travel & local transport'],
            ['Accommodation', lkr(c.a), s.days + ' night' + (s.days > 1 ? 's' : '') + ' · ' + s.style + ' style'],
            ['Food & Dining', lkr(c.f), 'Breakfast, lunch, dinner & snacks'],
            ['Activities & Entry', lkr(c.ac), 'Site fees & selected place entries'],
        ];
        budRows.forEach(([lbl, val, note]) => {
            checkPage(12);
            doc.setFontSize(10);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(40, 40, 40);
            doc.text(lbl, ML + 2, y);
            doc.setFont(undefined, 'normal');
            doc.setFontSize(8);
            doc.setTextColor(130, 130, 130);
            doc.text(note, ML + 2, y + 4);
            doc.setFontSize(10);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(42, 171, 153);
            doc.text(val, RX - 2, y, { align: 'right' });
            doc.setDrawColor(238, 238, 238);
            doc.line(ML, y + 7, RX, y + 7);
            y += 11;
        });
        /* Grand total */
        checkPage(18);
        y += 2;
        doc.setFillColor(27, 139, 125);
        doc.roundedRect(ML, y, CW, 12, 2, 2, 'F');
        doc.setFontSize(10.5);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text('TOTAL ESTIMATE', ML + 5, y + 8);
        doc.text(lkr(c.total), RX - 5, y + 8, { align: 'right' });
        y += 16;
        if (s.people > 1) {
            doc.setFontSize(8.5);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(110, 110, 110);
            doc.text('Per person: ' + lkr(Math.round(c.total / s.people)) + ' (shared among ' + s.people + ' travellers)', ML + 2, y);
            y += 7;
        }
        /* ── Tips section ── */
        checkPage(32);
        y += 4;
        doc.setFillColor(255, 251, 235);
        doc.roundedRect(ML, y, CW, 28, 2, 2, 'F');
        doc.setDrawColor(253, 211, 77);
        doc.roundedRect(ML, y, CW, 28, 2, 2, 'S');
        doc.setFontSize(8.5);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(146, 100, 0);
        doc.text('Travel Tips for Sri Lanka', ML + 4, y + 6);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(7.8);
        doc.setTextColor(120, 80, 0);
        const tips = [
            '• Carry cash (LKR) — many smaller vendors don\'t accept cards',
            '• Book accommodation in advance during peak season (Dec–Mar)',
            '• Respect temple dress codes: cover shoulders and knees',
            '• Tuk-tuks are the best way to explore locally — negotiate the fare upfront',
        ];
        tips.forEach((t, i) => { doc.text(t, ML + 4, y + 12 + i * 4); });
        y += 32;
        doc.save('xtrack-' + s.dest.replace(/[^a-z0-9]/gi, '-').toLowerCase() + '.pdf');
        showToast('✅ PDF downloaded!');
    };
    document.head.appendChild(script);
}
/* ── TRIP STORAGE (localStorage) ── */
// NOTE: superseded by the server-backed async saveTrip() defined later in this
// file (same hoisting situation as _legacy_renderSavedTrips below). Kept for
// reference; not called anywhere.
function _legacy_saveTrip(panel) {
    const s = panel === 'A' ? S.A : S.B;
    const nameEl = $('saveTripName' + panel);
    const name = (nameEl && nameEl.value.trim()) || (s.dest + ' · ' + s.days + ' days');
    const trips = JSON.parse(localStorage.getItem('xtrack_trips') || '[]');
    const entry = { id: Date.now(), name, panel, state: JSON.stringify(panel === 'A' ? S.A : S.B), sel: [...(panel === 'A' ? S.selA : S.selB)], saved: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) };
    trips.unshift(entry);
    if (trips.length > 10)
        trips.pop();
    localStorage.setItem('xtrack_trips', JSON.stringify(trips));
    if (nameEl)
        nameEl.value = '';
    renderSavedTrips(panel);
    showToast('💾 Trip saved: ' + name);
}
// NOTE: superseded by the server-backed renderSavedTrips() defined later in this
// file. In the original inline <script> this was a second `function
// renderSavedTrips(){}` declaration — JS hoisting means the later one always won
// and this body never ran. Kept (renamed) for reference; not called anywhere.
function _legacy_renderSavedTrips(panel) {
    const el = $('savedTrips' + panel);
    if (!el)
        return;
    const trips = JSON.parse(localStorage.getItem('xtrack_trips') || '[]');
    if (!trips.length) {
        el.innerHTML = '<div style="font-size:12px;color:var(--text3);padding:10px 4px">No saved trips yet. Save your current plan above.</div>';
        return;
    }
    el.innerHTML = trips.map(t => `
    <div class="saved-trip-row" onclick="loadSavedTrip(${t.id})">
      <div><div class="saved-trip-name">${t.name}</div><div class="saved-trip-meta">Saved ${t.saved}</div></div>
      <button onclick="event.stopPropagation();deleteSavedTrip(${t.id})" style="background:none;border:none;color:var(--text3);cursor:pointer;font-size:16px;padding:4px">×</button>
    </div>`).join('');
}
// NOTE: superseded by the server-backed loadSavedTrip() defined later in this
// file (same hoisting situation as above). Kept for reference; not called anywhere.
function _legacy_loadSavedTrip(id) {
    const trips = JSON.parse(localStorage.getItem('xtrack_trips') || '[]');
    const t = trips.find(x => x.id === id);
    if (!t) {
        showToast('Trip not found');
        return;
    }
    const state = JSON.parse(t.state);
    if (t.panel === 'A') {
        Object.assign(S.A, state);
        S.selA = new Set(t.sel);
        buildDA();
        goTo('page4a');
    }
    else {
        Object.assign(S.B, state);
        S.selB = new Set(t.sel);
        buildDB();
        goTo('page4b');
    }
    showToast('📂 Loaded: ' + t.name);
}
// NOTE: superseded by the server-backed async deleteSavedTrip() defined later
// in this file (same hoisting situation as above). Kept for reference; not
// called anywhere.
function _legacy_deleteSavedTrip(id) {
    const trips = JSON.parse(localStorage.getItem('xtrack_trips') || '[]').filter(x => x.id !== id);
    localStorage.setItem('xtrack_trips', JSON.stringify(trips));
    renderSavedTrips('A');
    renderSavedTrips('B');
    showToast('Deleted');
}
/* ── FINALIZE (proper) ── */
// NOTE: superseded by the server-backed async finalizeTrip() defined later in
// this file (same hoisting situation as _legacy_saveTrip above). Kept for
// reference; not called anywhere.
function _legacy_finalizeTrip(panel) {
    const s = panel === 'A' ? S.A : S.B;
    saveTrip(panel);
    showToast('🎉 Trip to ' + s.dest + ' finalized & saved!');
}
/* ── REVIEWS (localStorage) ── */
let reviewCurPlace = null;
let reviewCurPanel = 'A';
let reviewCurRating = 0;
// NOTE: superseded by the server-backed getReviews()/getRating() defined later
// in this file (same hoisting situation as _legacy_renderSavedTrips above).
// Kept for reference; not called anywhere.
function _legacy_getReviews() { return JSON.parse(localStorage.getItem('xtrack_reviews') || '{}'); }
function _legacy_getRating(placeName) { const r = _legacy_getReviews(); return r[placeName] || null; }
function openReview(placeName, panel) {
    reviewCurPlace = placeName;
    reviewCurPanel = panel;
    reviewCurRating = 0;
    $('reviewModalTitle').textContent = 'Rate: ' + placeName;
    const existing = getRating(placeName);
    reviewCurRating = existing ? existing.rating : 0;
    renderReviewStars(reviewCurRating);
    $('reviewTextInput').value = existing ? (existing.tip || '') : '';
    $('reviewModalOverlay').classList.add('on');
}
function closeReviewModal() { $('reviewModalOverlay').classList.remove('on'); }
function renderReviewStars(active) {
    const row = $('reviewStarRow');
    row.innerHTML = [1, 2, 3, 4, 5].map(n => `<span class="review-star-btn ${n <= active ? 'active' : ''}" onclick="setReviewRating(${n})">★</span>`).join('');
}
function setReviewRating(n) { reviewCurRating = n; renderReviewStars(n); }
// NOTE: superseded by the server-backed async submitReview() defined later in
// this file (same hoisting situation as _legacy_saveTrip above). Kept for
// reference; not called anywhere.
function _legacy_submitReview() {
    if (!reviewCurRating) {
        showToast('Please select a star rating');
        return;
    }
    const reviews = getReviews();
    reviews[reviewCurPlace] = { rating: reviewCurRating, tip: $('reviewTextInput').value, date: new Date().toLocaleDateString() };
    localStorage.setItem('xtrack_reviews', JSON.stringify(reviews));
    closeReviewModal();
    refreshPlaceStars();
    showToast('⭐ Review saved for ' + reviewCurPlace);
}
function refreshPlaceStars() {
    $qa('[data-place-name]').forEach(el => {
        const name = el.getAttribute('data-place-name');
        const r = getRating(name);
        const starsEl = el.querySelector('.pc-review-stars');
        if (starsEl && r)
            starsEl.innerHTML = renderStarsHTML(r.rating) + `<span class="pc-review-count">(${r.rating}.0)</span>`;
    });
}
function renderStarsHTML(n) {
    return [1, 2, 3, 4, 5].map(i => `<svg class="pc-star ${i <= n ? '' : 'off'}" viewBox="0 0 12 12" fill="${i <= n ? '#fbbf24' : '#e4e6e2'}"><path d="M6 1l1.2 2.5L10 4l-2 1.9.5 2.6L6 7.2l-2.5 1.3.5-2.6L2 4l2.8-.5z"/></svg>`).join('');
}
/* ── OVERRIDE renderPlaces TO ADD REVIEWS + PRICE TRENDS ── */
const _origRenderPlaces = window.renderPlaces;
// Patch place cards to add review row after render
function patchPlaceCards() {
    setTimeout(() => {
        $qa('.place-card').forEach(card => {
            const nameEl = card.querySelector('.pc-name');
            if (!nameEl || card.hasAttribute('data-place-name'))
                return;
            const name = nameEl.textContent.trim();
            card.setAttribute('data-place-name', name);
            const body = card.querySelector('.pc-body');
            if (!body)
                return;
            const r = getRating(name);
            const reviewRow = document.createElement('div');
            reviewRow.className = 'pc-review-row';
            reviewRow.innerHTML = `<div class="pc-stars pc-review-stars">${renderStarsHTML(r ? r.rating : 0)}</div>${r ? `<span class="pc-review-count">(${r.rating}.0)</span>` : ''}<span class="pc-review-action" onclick="event.stopPropagation();openReview('${name.replace(/'/g, "\\'")}','A')">+ Rate</span>`;
            body.appendChild(reviewRow);
        });
    }, 200);
}
/* ── PRICE TREND ON HOTELS ── */
const PRICE_TRENDS = ['low', 'avg', 'avg', 'high', 'low', 'avg', 'high', 'low', 'avg', 'avg'];
const PRICE_LABELS = { 'low': '↓ Low Season', 'avg': '→ Average', 'high': '↑ Peak Season' };
function addPriceTrends() {
    setTimeout(() => {
        $qa('.hotel-price').forEach((el, i) => {
            if (el.querySelector('.price-trend'))
                return;
            const trend = PRICE_TRENDS[i % PRICE_TRENDS.length];
            const badge = document.createElement('span');
            badge.className = `price-trend ${trend}`;
            badge.textContent = PRICE_LABELS[trend];
            el.appendChild(badge);
        });
    }, 300);
}
/* ── PATCH switchA / switchB TO CALL NEW FEATURES ── */
{
    const _origSwitchA2 = window.switchA;
    window.switchA = function (t, el) {
        _origSwitchA2(t, el);
        if (t === 'overview') {
            renderFXStrip('A', S.A._lastTotal);
        }
        if (t === 'hotel') {
            setTimeout(addPriceTrends, 400);
        }
        if (t === 'places') {
            setTimeout(patchPlaceCards, 300);
        }
        if (t === 'export') {
            renderSavedTrips('A');
        }
    };
    const _origSwitchB2 = window.switchB;
    window.switchB = function (t, el) {
        _origSwitchB2(t, el);
        if (t === 'overview') {
            renderFXStrip('B', S.B._lastTotal);
        }
        if (t === 'hotel') {
            setTimeout(addPriceTrends, 400);
        }
        if (t === 'places') {
            setTimeout(patchPlaceCards, 300);
        }
        if (t === 'export') {
            renderSavedTrips('B');
        }
    };
    /* ── PATCH updA / updB TO TRIGGER FX + BUDGET WARN ── */
    const _origUpdA = window.updA;
    window.updA = function () {
        _origUpdA();
        setTimeout(() => {
            const c = calc(S.A.dest, S.A.days, S.A.people, S.A.style, [...S.selA], S.A.transport);
            S.A._lastTotal = c.total;
            renderFXStrip('A', c.total);
            checkBudgetConflict();
        }, 50);
    };
    const _origUpdB = window.updB;
    window.updB = function () {
        _origUpdB();
        setTimeout(() => {
            const c = calc(S.B.dest, S.B.days, S.B.people, S.B.style, [...S.selB], S.B.transport);
            S.B._lastTotal = c.total;
            renderFXStrip('B', c.total);
        }, 50);
    };
}
/* ── CLAUDE AI FEATURES ── */
/* --- API (internal config) --- */
function _xk() {
    const _a = 'c2stYW50LWFwaTAzLTBGNnhSc3pnRFVSUEFpTmNL', _b = 'S3h2RkdpVHRteWRORk5qZFJHVmFVTUJQMWNfRTdD', _c = 'aVNoRnFNeDZReXVOUHlydmFGU1pkVUxrV3JOeTZmQ0JnbmpTWC1nLUppMm9Hd0FB';
    return atob(_a) + atob(_b) + atob(_c);
}
function getStoredKey() { return _xk(); }
async function callClaude(prompt, maxTokens = 800) {
    const apiKey = _xk();
    if (!apiKey || !apiKey.startsWith('sk-ant')) {
        throw new Error('API_ERR');
    }
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: maxTokens,
            messages: [{ role: 'user', content: prompt }]
        })
    });
    const data = await resp.json();
    if (data.content && data.content[0])
        return data.content[0].text;
    throw new Error(data.error?.message || 'API error');
}
async function generateNarrative(panel) {
    const s = panel === 'A' ? S.A : S.B;
    const btn = $('narrativeBtn' + panel);
    const box = $('narrativeBox' + panel);
    if (btn) {
        btn.disabled = true;
        btn.textContent = 'Generating…';
    }
    box.innerHTML = '<div style="display:flex;align-items:center;gap:10px;color:var(--text3);font-size:13px"><div style="width:18px;height:18px;border:2px solid var(--teal-mid);border-top-color:var(--teal);border-radius:50%;animation:xtrSpin .8s linear infinite;flex-shrink:0"></div>Writing your trip story…</div>';
    try {
        const prompt = `Write a vivid, enthusiastic 3-paragraph travel narrative for a ${s.days}-day trip to ${s.dest}, Sri Lanka. Travel style: ${s.style}. Transport: ${s.transport}. Pace: ${s.pace}. Number of travellers: ${s.people}. Destinations: ${[...(panel === 'A' ? S.selA : S.selB)].join(', ') || s.dest}. Make it personal, inspiring and specific to Sri Lanka. Keep it under 250 words. Start directly without any preamble.`;
        const text = await callClaude(prompt, 400);
        box.innerHTML = text.replace(/\n\n/g, '</p><p>').replace(/^/, '<p>').replace(/$/, '</p>');
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 3 3.3.5-2.4 2.3.6 3.2L7 8.5l-3 1.5.6-3.2L2.2 4.5 5.5 4z" stroke="white" stroke-width="1.3" stroke-linejoin="round"/></svg> Regenerate';
        }
    }
    catch (e) {
        if (e.message === 'API_ERR') {
            box.innerHTML = `<div style="color:#f87171;font-size:13px;display:flex;align-items:center;gap:8px"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="#f87171" stroke-width="1.3"/><path d="M7 4v3M7 9.5v.5" stroke="#f87171" stroke-width="1.4" stroke-linecap="round"/></svg>AI service unavailable. Please check your connection and try again.</div>`;
        }
        else {
            box.innerHTML = `<div style="color:var(--text3);font-size:13px">Trip to <strong>${s.dest}</strong>: A ${s.days}-day ${s.style} adventure through Sri Lanka. Exploring ${[...(panel === 'A' ? S.selA : S.selB)].slice(0, 3).join(', ') || 'beautiful destinations'} with a ${s.pace} pace. Your journey begins in ${s.current || 'Colombo'} and takes you through the heart of this island paradise.</div>`;
        }
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 3 3.3.5-2.4 2.3.6 3.2L7 8.5l-3 1.5.6-3.2L2.2 4.5 5.5 4z" stroke="white" stroke-width="1.3" stroke-linejoin="round"/></svg> Retry';
        }
    }
}
async function generatePackingList(panel) {
    const s = panel === 'A' ? S.A : S.B;
    const btn = $('packingBtn' + panel);
    const box = $('packingList' + panel);
    if (btn) {
        btn.disabled = true;
        btn.textContent = 'Generating…';
    }
    box.innerHTML = '<div style="display:flex;align-items:center;gap:10px;color:var(--text3);font-size:13px"><div style="width:18px;height:18px;border:2px solid var(--teal-mid);border-top-color:var(--teal);border-radius:50%;animation:xtrSpin .8s linear infinite;flex-shrink:0"></div>Creating your packing list…</div>';
    try {
        const prompt = `Create a packing list for a ${s.days}-day ${s.style} trip to ${s.dest}, Sri Lanka. Transport: ${s.transport}. Season context: Sri Lanka tropical climate. Return ONLY valid JSON like this: {"Clothing":["item1","item2"],"Documents":["item1"],"Tech":["item1"],"Health":["item1"],"Activities":["item1"]}. Maximum 6 items per category. No markdown, no explanation, just the JSON object.`;
        const text = await callClaude(prompt, 500);
        const clean = text.replace(/```json|```/g, '').trim();
        const data = JSON.parse(clean);
        const catIcons = { 'Clothing': '👕', 'Documents': '📄', 'Tech': '📱', 'Health': '🏥', 'Activities': '🎒', 'Toiletries': '🧴', 'Misc': '🎁' };
        box.innerHTML = `<div class="packing-list">${Object.entries(data).map(([cat, items]) => `
      <div class="packing-cat">
        <div class="packing-cat-title">${catIcons[cat] || '📦'} ${cat}</div>
        <ul>${items.map(item => `<li onclick="this.classList.toggle('checked')">${item}</li>`).join('')}</ul>
      </div>`).join('')}</div>`;
    }
    catch (e) {
        if (e.message === 'API_ERR') {
            box.innerHTML = `<div style="color:#f87171;font-size:13px;display:flex;align-items:center;gap:8px"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="#f87171" stroke-width="1.3"/><path d="M7 4v3M7 9.5v.5" stroke="#f87171" stroke-width="1.4" stroke-linecap="round"/></svg>AI service unavailable. Please check your connection and try again.</div>`;
        }
        else {
            const defaults = { 'Clothing': ['Light breathable shirts', 'Comfortable walking shoes', 'Rain jacket', 'Sandals'], 'Documents': ['Passport', 'Travel insurance', 'Hotel bookings', 'Printed itinerary'], 'Health': ['Sunscreen SPF50+', 'Insect repellent', 'Rehydration sachets', 'Basic first aid kit'], 'Tech': ['Phone + charger', 'Power bank', 'Universal adapter', 'Earphones'], 'Activities': ['Daypack', 'Water bottle', 'Camera', 'Snorkelling gear if beach'] };
            box.innerHTML = `<div class="packing-list">${Object.entries(defaults).map(([cat, items]) => `<div class="packing-cat"><div class="packing-cat-title">📦 ${cat}</div><ul>${items.map(i => `<li onclick="this.classList.toggle('checked')">${i}</li>`).join('')}</ul></div>`).join('')}</div>`;
        }
    }
    if (btn) {
        btn.disabled = false;
        btn.textContent = 'Regenerate';
    }
}
async function generateActivities(panel) {
    const s = panel === 'A' ? S.A : S.B;
    const btn = $('actBtn' + panel);
    const box = $('actList' + panel);
    if (btn) {
        btn.disabled = true;
        btn.textContent = 'Loading…';
    }
    box.innerHTML = '<div style="display:flex;align-items:center;gap:10px;color:var(--text3);font-size:13px"><div style="width:18px;height:18px;border:2px solid var(--teal-mid);border-top-color:var(--teal);border-radius:50%;animation:xtrSpin .8s linear infinite;flex-shrink:0"></div>Finding activities for you…</div>';
    try {
        const prompt = `Suggest 4 unique activities for a ${s.style} traveller in ${s.dest}, Sri Lanka. Travel pace: ${s.pace}. Return ONLY valid JSON array like: [{"title":"Activity Name","desc":"2 sentence description","badge":"Free|LKR 500|LKR 2000","icon":"🏊"}]. No markdown, just the JSON array.`;
        const text = await callClaude(prompt, 400);
        const clean = text.replace(/```json|```/g, '').trim();
        const acts = JSON.parse(clean);
        box.innerHTML = acts.map(a => `
      <div class="ai-activity-card">
        <div class="ai-activity-icon"><span style="font-size:20px">${a.icon || '🎯'}</span></div>
        <div class="ai-activity-body">
          <div class="ai-activity-title">${a.title}</div>
          <div class="ai-activity-desc">${a.desc}</div>
          <div class="ai-activity-badge">${a.badge}</div>
        </div>
      </div>`).join('');
    }
    catch (e) {
        if (e.message === 'API_ERR') {
            box.innerHTML = `<div style="color:#f87171;font-size:13px;display:flex;align-items:center;gap:8px">AI service unavailable. Please check your connection and try again.</div>`;
        }
        else {
            const fallback = [{ icon: '🏔️', title: 'Scenic Viewpoint Hike', desc: 'Explore the stunning highland views around ' + s.dest + '. Best visited at sunrise.', badge: 'Free' }, { icon: '🍛', title: 'Local Food Trail', desc: 'Sample authentic Sri Lankan cuisine at local warungas.', badge: '~LKR 800' }, { icon: '🏛️', title: 'Cultural Heritage Site', desc: 'Visit nearby ancient temples reflecting Sri Lanka\'s history.', badge: '~LKR 500' }, { icon: '🚂', title: 'Scenic Train Journey', desc: 'The Kandy–Ella train route is one of the world\'s most beautiful rail journeys.', badge: '~LKR 350' }];
            box.innerHTML = fallback.map(a => `<div class="ai-activity-card"><div class="ai-activity-icon"><span style="font-size:20px">${a.icon}</span></div><div class="ai-activity-body"><div class="ai-activity-title">${a.title}</div><div class="ai-activity-desc">${a.desc}</div><div class="ai-activity-badge">${a.badge}</div></div></div>`).join('');
        }
    }
    if (btn) {
        btn.disabled = false;
        btn.textContent = 'Refresh';
    }
}
/* ── PAGE4B OVERVIEW ── */
const _origBuildDB = window.buildDB;
window.buildDB = function () {
    _origBuildDB && _origBuildDB();
    setTimeout(() => {
        renderFXStrip('B', S.B._lastTotal);
    }, 200);
};
/* ── ACCESSIBILITY: add aria-labels ── */
(() => {
    setTimeout(() => {
        $qa('.cat-card').forEach(c => { if (!c.getAttribute('role')) {
            c.setAttribute('role', 'button');
            c.setAttribute('tabindex', '0');
            c.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ')
                c.click(); };
        } });
        $qa('.db-tab').forEach(t => { if (!t.getAttribute('role')) {
            t.setAttribute('role', 'tab');
            t.setAttribute('tabindex', '0');
            t.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ')
                t.click(); };
        } });
        $qa('.nav-icon-btn').forEach((b, i) => { if (!b.getAttribute('aria-label'))
            b.setAttribute('aria-label', b.title || 'Action ' + (i + 1)); });
    }, 500);
})();
// ==== next inline <script> block ====
// ═══════════════════════════════════════════════════════
//  Xtrack — Backend Integration Layer
//  Replaces localStorage trips/reviews with PHP + MySQL.
// ═══════════════════════════════════════════════════════
// ── Auth guard: redirect to login if not authenticated ──
(async function checkAuth() {
    try {
        const res = await fetch('api/check_auth.php', { credentials: 'include' });
        // 401 = not logged in → always redirect
        if (res.status === 401) {
            window.location.href = 'login.html';
            return;
        }
        const data = await res.json();
        if (!data.success) {
            window.location.href = 'login.html';
            return;
        }
        // Store user globally for profile modal
        window._currentUser = data.user;
        // Show user name + initials in both nav bars
        const name = data.user.fullname.split(' ')[0];
        const initials = (function (n) { const p = n.trim().split(' '); return p.length >= 2 ? (p[0][0] + p[p.length - 1][0]).toUpperCase() : n.substring(0, 2).toUpperCase(); })(data.user.fullname);
        $qa('.user-greeting').forEach(el => {
            el.textContent = 'Hi, ' + name;
        });
        $qa('#profileAvatarA,#profileAvatarB').forEach(el => {
            el.textContent = initials;
        });
        // Load trips & reviews from server
        loadTripsFromServer();
        loadReviewsFromServer();
    }
    catch (e) {
        // Network error (offline / server down) — degrade gracefully
        console.warn('Auth check failed – running in offline mode.', e);
    }
})();
// ── Logout ───────────────────────────────────────────────
async function logoutUser() {
    try {
        await fetch('api/logout.php', { method: 'POST', credentials: 'include' });
    }
    catch (_) { }
    window.location.href = 'login.html';
}
// ════════════════════════════════════════════════════════
//  TRIPS  —  override the localStorage versions
// ════════════════════════════════════════════════════════
async function saveTrip(panel) {
    const s = panel === 'A' ? S.A : S.B;
    const nameEl = $('saveTripName' + panel);
    const name = (nameEl && nameEl.value.trim()) || (s.dest + ' · ' + s.days + ' days');
    // Try server first; fall back to localStorage so the app works standalone too
    let savedToServer = false;
    try {
        const res = await fetch('api/trips.php', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                panel,
                state: panel === 'A' ? S.A : S.B,
                selected: [...(panel === 'A' ? S.selA : S.selB)],
            }),
        });
        const data = await res.json();
        if (data.success) {
            savedToServer = true;
            if (nameEl)
                nameEl.value = '';
            showToast('💾 Trip saved: ' + name);
            loadTripsFromServer();
        }
    }
    catch (e) { /* no server — fall through to localStorage */ }
    if (!savedToServer) {
        // localStorage fallback (standalone / no backend)
        const trips = JSON.parse(localStorage.getItem('xtrack_trips') || '[]');
        const entry = {
            id: Date.now(), name, panel,
            state: JSON.stringify(panel === 'A' ? S.A : S.B),
            selected: [...(panel === 'A' ? S.selA : S.selB)],
            created_at: new Date().toISOString(),
        };
        trips.unshift(entry);
        if (trips.length > 10)
            trips.pop();
        localStorage.setItem('xtrack_trips', JSON.stringify(trips));
        window._serverTrips = trips.map(t => ({
            ...t,
            state: typeof t.state === 'string' ? JSON.parse(t.state) : t.state,
        }));
        if (nameEl)
            nameEl.value = '';
        renderSavedTrips('A');
        renderSavedTrips('B');
        showToast('💾 Trip saved: ' + name);
    }
}
async function loadTripsFromServer() {
    try {
        const res = await fetch('api/trips.php', { credentials: 'include' });
        const data = await res.json();
        if (!data.success)
            return;
        window._serverTrips = data.trips;
        renderSavedTrips('A');
        renderSavedTrips('B');
    }
    catch (e) {
        // No server — load from localStorage
        const local = JSON.parse(localStorage.getItem('xtrack_trips') || '[]');
        window._serverTrips = local.map(t => ({
            ...t,
            state: typeof t.state === 'string' ? JSON.parse(t.state) : t.state,
        }));
        renderSavedTrips('A');
        renderSavedTrips('B');
    }
}
function renderSavedTrips(panel) {
    const el = $('savedTrips' + panel);
    if (!el)
        return;
    const trips = window._serverTrips || [];
    if (!trips.length) {
        el.innerHTML = '<div style="font-size:12px;color:var(--text3);padding:10px 4px">No saved trips yet. Save your current plan above.</div>';
        return;
    }
    el.innerHTML = trips.map(t => `
    <div class="saved-trip-row" onclick="loadSavedTrip(${t.id})">
      <div>
        <div class="saved-trip-name">${t.name}</div>
        <div class="saved-trip-meta">Saved ${new Date(t.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
      </div>
      <button onclick="event.stopPropagation();deleteSavedTrip(${t.id})" style="background:none;border:none;color:var(--text3);cursor:pointer;font-size:16px;padding:4px">×</button>
    </div>`).join('');
}
function loadSavedTrip(id) {
    const trips = window._serverTrips || [];
    const t = trips.find(x => x.id === id);
    if (!t) {
        showToast('Trip not found');
        return;
    }
    if (t.panel === 'A') {
        Object.assign(S.A, t.state);
        S.selA = new Set(t.selected);
        buildDA();
        goTo('page4a');
    }
    else {
        Object.assign(S.B, t.state);
        S.selB = new Set(t.selected);
        buildDB();
        goTo('page4b');
    }
    showToast('📂 Loaded: ' + t.name);
}
async function deleteSavedTrip(id) {
    try {
        const res = await fetch('api/trips.php?id=' + id, {
            method: 'DELETE',
            credentials: 'include',
        });
        const data = await res.json();
        if (data.success) {
            showToast('Deleted');
            loadTripsFromServer();
        }
        else {
            showToast('⚠️ ' + data.message);
        }
    }
    catch (e) {
        showToast('⚠️ Network error.');
    }
}
async function finalizeTrip(panel) {
    const s = panel === 'A' ? S.A : S.B;
    await saveTrip(panel);
    showToast('🎉 Trip to ' + s.dest + ' finalized & saved!');
}
// ════════════════════════════════════════════════════════
//  REVIEWS  —  override the localStorage versions
// ════════════════════════════════════════════════════════
window._serverReviews = {};
async function loadReviewsFromServer() {
    try {
        const res = await fetch('api/reviews.php', { credentials: 'include' });
        const data = await res.json();
        if (data.success) {
            window._serverReviews = data.reviews;
            refreshPlaceStars();
            return;
        }
    }
    catch (e) { /* no server */ }
    // Fallback: load from localStorage
    try {
        window._serverReviews = JSON.parse(localStorage.getItem('xtrack_reviews') || '{}');
    }
    catch (e) { }
    refreshPlaceStars();
}
function getReviews() { return window._serverReviews; }
function getRating(placeName) { return window._serverReviews[placeName] || null; }
async function submitReview() {
    if (!reviewCurRating) {
        showToast('Please select a star rating');
        return;
    }
    const tip = $('reviewTextInput').value;
    try {
        const res = await fetch('api/reviews.php', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                place_name: reviewCurPlace,
                rating: reviewCurRating,
                tip,
            }),
        });
        const data = await res.json();
        if (data.success) {
            window._serverReviews[reviewCurPlace] = {
                rating: reviewCurRating,
                tip,
                date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            };
            closeReviewModal();
            refreshPlaceStars();
            showToast('⭐ Review saved for ' + reviewCurPlace);
        }
        else {
            showToast('⚠️ ' + data.message);
        }
    }
    catch (e) {
        // Fallback: save to localStorage
        try {
            const rev = JSON.parse(localStorage.getItem('xtrack_reviews') || '{}');
            rev[reviewCurPlace] = { rating: reviewCurRating, tip, date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) };
            localStorage.setItem('xtrack_reviews', JSON.stringify(rev));
            window._serverReviews = rev;
            closeReviewModal();
            refreshPlaceStars();
            showToast('⭐ Review saved for ' + reviewCurPlace);
        }
        catch (le) {
            showToast('⚠️ Could not save review.');
        }
    }
}
// ==== next inline <script> block ====
// ═══════════════════════════════════════════════════════
//  PROFILE  — open / close / load / save
// ═══════════════════════════════════════════════════════
function openProfile() {
    $('profileOverlay').classList.add('on');
    renderProfileData();
    renderProfileHistory();
}
function closeProfile() {
    $('profileOverlay').classList.remove('on');
}
function getInitials(name) {
    if (!name)
        return '?';
    const parts = name.trim().split(' ');
    return parts.length >= 2
        ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
        : name.substring(0, 2).toUpperCase();
}
function renderProfileData() {
    const u = window._currentUser;
    if (!u)
        return;
    const initials = getInitials(u.fullname);
    $('profileBigAvatar').textContent = initials;
    $('profileHeaderName').textContent = u.fullname || '—';
    $('profileHeaderEmail').textContent = u.email || '—';
    if (u.created_at) {
        const d = new Date(u.created_at);
        $('profileHeaderSince').textContent =
            'Member since ' + d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    }
    $('profileFullname').value = u.fullname || '';
    $('profileEmail').value = u.email || '';
    $('profilePhone').value = u.phone || '';
}
function renderProfileHistory() {
    const el = $('profileTripHistory');
    const trips = window._serverTrips || [];
    if (!trips.length) {
        el.innerHTML = '<div style="font-size:12px;color:var(--text3);padding:6px 0">No saved trips yet.</div>';
        return;
    }
    const icons = { A: '\u{1F4B0}', B: '\u{1F4CD}' };
    el.innerHTML = trips.map(t => {
        const dateStr = new Date(t.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        const icon = t.panel === 'A' ? '\ud83d\udcb0' : '\ud83d\udccd';
        return `
      <div class="profile-history-item">
        <div class="profile-history-icon">${icon}</div>
        <div class="profile-history-info">
          <div class="profile-history-name">${t.name}</div>
          <div class="profile-history-meta">Saved ${dateStr} &middot; ${t.panel === 'A' ? 'Budget Planner' : 'Destination Planner'}</div>
        </div>
        <button onclick="loadSavedTrip(${t.id});closeProfile()" style="background:none;border:none;color:var(--accent);font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap;padding:4px 6px">Load</button>
      </div>`;
    }).join('');
}
async function saveProfile() {
    const btn = $('profileSaveBtn');
    const fullname = $('profileFullname').value.trim();
    const phone = $('profilePhone').value.trim();
    if (!fullname) {
        showToast('\u26a0\ufe0f Name cannot be empty');
        return;
    }
    btn.disabled = true;
    btn.textContent = 'Saving\u2026';
    try {
        const res = await fetch('api/profile.php', {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullname, phone })
        });
        const data = await res.json();
        if (data.success) {
            window._currentUser.fullname = fullname;
            window._currentUser.phone = phone;
            const firstName = fullname.split(' ')[0];
            const initials = getInitials(fullname);
            $qa('.user-greeting').forEach(el => { el.textContent = 'Hi, ' + firstName; });
            $qa('#profileAvatarA,#profileAvatarB').forEach(el => { el.textContent = initials; });
            $('profileHeaderName').textContent = fullname;
            $('profileBigAvatar').textContent = initials;
            showToast('\u2705 Profile updated!');
            closeProfile();
        }
        else {
            showToast('\u26a0\ufe0f ' + (data.message || 'Could not save.'));
        }
    }
    catch (e) {
        showToast('\u26a0\ufe0f Network error. Please try again.');
    }
    finally {
        btn.disabled = false;
        btn.textContent = 'Save Changes';
    }
}
// ── New Plan & Profile Page navigation ──────────────────
function startNewPlan() {
    // Reset to step 1 (trip category) from scratch
    goTo('page1');
}
// Track which dashboard page user came from (A or B)
var _profileReturnPage = 'page4a';
function goToProfilePage() {
    // Figure out which dashboard is currently active
    if ($('page4b').classList.contains('active')) {
        _profileReturnPage = 'page4b';
    }
    else {
        _profileReturnPage = 'page4a';
    }
    // Populate profile page data
    var name = '', email = '', phone = '', since = '';
    try {
        var u = JSON.parse(localStorage.getItem('xtrack_user') || '{}');
        name = u.fullname || u.name || '';
        email = u.email || '';
        phone = u.phone || '';
        since = u.created_at ? 'Member since ' + new Date(u.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';
    }
    catch (e) { }
    var initials = getInitials(name);
    var el = function (id) { return $(id); };
    if (el('p5BigAvatar'))
        el('p5BigAvatar').textContent = initials;
    if (el('p5HeaderName'))
        el('p5HeaderName').textContent = name || 'My Profile';
    if (el('p5HeaderEmail'))
        el('p5HeaderEmail').textContent = email;
    if (el('p5HeaderSince'))
        el('p5HeaderSince').textContent = since;
    if (el('p5Fullname'))
        el('p5Fullname').value = name;
    if (el('p5Email'))
        el('p5Email').value = email;
    if (el('p5Phone'))
        el('p5Phone').value = phone;
    // Render trip history
    var hist = el('p5TripHistory');
    if (hist) {
        try {
            var trips = JSON.parse(localStorage.getItem('xtrack_trips') || '[]');
            if (!trips.length) {
                hist.innerHTML = '<div style="font-size:12px;color:var(--text3);padding:6px 0">No saved trips yet.</div>';
            }
            else {
                hist.innerHTML = trips.map(function (t) {
                    return '<div class="profile-history-item">'
                        + '<div class="profile-history-icon">' + (t.emoji || '✈️') + '</div>'
                        + '<div class="profile-history-info">'
                        + '<div class="profile-history-name">' + (t.name || t.destination || 'Trip') + '</div>'
                        + '<div class="profile-history-meta">' + (t.dates || t.date || '') + '</div>'
                        + '</div>'
                        + '<button onclick="loadSavedTrip(' + t.id + ');goTo(\'' + _profileReturnPage + '\')" style="background:none;border:none;color:var(--accent);font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap;padding:4px 6px">Load</button>'
                        + '</div>';
                }).join('');
            }
        }
        catch (e) {
            hist.innerHTML = '<div style="font-size:12px;color:var(--text3)">Could not load trips.</div>';
        }
    }
    goTo('page5');
}
function goBackFromProfile() {
    goTo(_profileReturnPage);
}
async function saveProfilePage() {
    var btn = $('p5SaveBtn');
    if (!btn)
        return;
    var fullname = ($('p5Fullname') || {}).value || '';
    var phone = ($('p5Phone') || {}).value || '';
    btn.disabled = true;
    btn.textContent = 'Saving…';
    try {
        var u = JSON.parse(localStorage.getItem('xtrack_user') || '{}');
        u.fullname = fullname;
        u.phone = phone;
        localStorage.setItem('xtrack_user', JSON.stringify(u));
        // Also call API if available
        try {
            await fetch('api/profile.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fullname, phone }), credentials: 'include' });
        }
        catch (e) { }
        // Update avatars everywhere
        var initials = getInitials(fullname);
        ['profileAvatarA', 'profileAvatarB', 'p5BigAvatar', 'profileBigAvatar'].forEach(function (id) {
            var el = $(id);
            if (el)
                el.textContent = initials;
        });
        ['userGreetingA', 'userGreetingB'].forEach(function (id) {
            var el = $(id);
            if (el)
                el.textContent = fullname.split(' ')[0] || 'Me';
        });
        if ($('p5HeaderName'))
            $('p5HeaderName').textContent = fullname;
        showToast('✅ Profile saved!');
    }
    catch (e) {
        showToast('⚠️ Could not save. Please try again.');
    }
    finally {
        btn.disabled = false;
        btn.textContent = 'Save Changes';
    }
}
/* ═══════════════════════════════════════════════════
   ACTIVITY EDITOR
═══════════════════════════════════════════════════ */
const _actCtx = { panel: null, dayNum: null, actIdx: null, mode: null }; // 'add' | 'edit'
function openAddAct(panel, dayNum) {
    _actCtx.panel = panel;
    _actCtx.dayNum = dayNum;
    _actCtx.actIdx = null;
    _actCtx.mode = 'add';
    const sched = S[panel].sched;
    const day = sched.find(d => d.dayNum === dayNum);
    // Default time: 30 min after last activity's time
    const acts = day ? day.activities : [];
    let defaultTime = '09:00';
    if (acts.length) {
        const last = acts[acts.length - 1];
        defaultTime = addTime(last.time || '09:00', (last.dur || 60) + 30);
    }
    $('actModalTitle').textContent = 'Add Activity';
    $('actInpTitle').value = '';
    $('actInpDesc').value = '';
    $('actInpTime').value = defaultTime;
    $('actInpDur').value = '60';
    $('actInpType').value = 'explore';
    $('actDeleteBtn').style.display = 'none';
    $('actModalOverlay').classList.add('on');
    $('actInpTitle').focus();
}
function openEditAct(panel, dayNum, actIdx) {
    _actCtx.panel = panel;
    _actCtx.dayNum = dayNum;
    _actCtx.actIdx = actIdx;
    _actCtx.mode = 'edit';
    const sched = S[panel].sched;
    const day = sched.find(d => d.dayNum === dayNum);
    const act = day.activities[actIdx];
    $('actModalTitle').textContent = 'Edit Activity';
    $('actInpTitle').value = act.title || '';
    $('actInpDesc').value = act.desc || '';
    $('actInpTime').value = act.time || '09:00';
    $('actInpDur').value = act.dur > 0 ? act.dur : 60;
    $('actInpType').value = act.type || 'explore';
    $('actDeleteBtn').style.display = 'flex';
    $('actModalOverlay').classList.add('on');
    $('actInpTitle').focus();
}
function closeActModal() {
    $('actModalOverlay').classList.remove('on');
}
function saveAct() {
    const title = $('actInpTitle').value.trim();
    if (!title) {
        $('actInpTitle').style.outline = '2px solid #ef4444';
        $('actInpTitle').focus();
        return;
    }
    $('actInpTitle').style.outline = '';
    const desc = $('actInpDesc').value.trim();
    const time = $('actInpTime').value || '09:00';
    const dur = parseInt($('actInpDur').value) || 60;
    const type = $('actInpType').value;
    const { panel, dayNum, actIdx, mode } = _actCtx;
    const sched = S[panel].sched;
    const day = sched.find(d => d.dayNum === dayNum);
    if (mode === 'add') {
        day.activities.push({ time, type, title, desc, dur });
        day.activities.sort((a, b) => a.time.localeCompare(b.time));
    }
    else {
        day.activities[actIdx] = { time, type, title, desc, dur };
        day.activities.sort((a, b) => a.time.localeCompare(b.time));
    }
    closeActModal();
    if (panel === 'A')
        renderSchA();
    else
        renderSchB();
    showToast(mode === 'add' ? 'Activity added' : 'Activity updated');
}
function deleteAct(panel, dayNum, actIdx) {
    const sched = S[panel].sched;
    const day = sched.find(d => d.dayNum === dayNum);
    day.activities.splice(actIdx, 1);
    if (panel === 'A')
        renderSchA();
    else
        renderSchB();
    showToast('Activity removed');
}
function deleteActFromModal() {
    const { panel, dayNum, actIdx } = _actCtx;
    closeActModal();
    deleteAct(panel, dayNum, actIdx);
}
//# sourceMappingURL=xtrack.js.map