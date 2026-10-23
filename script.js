// CONFIGURATION 
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz2CjVUbGscUtE7D1Mp4iDoC8FQqYFyck-s2bhMCe_t66cQkaPXUEPO9mIA_-DT1oHw/exec';
const emts = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown'];
const cars = ['Ambulance 101', 'Ambulance 102', 'Ambulance 103', 'Ambulance 104'];
const shifts = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const pages = {
    Medical: [
        // SECTION: BVM and Suction
        { type: 'section', name: 'BVM and Suction' },
        { name: 'BVM Adult', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'BVM Adult Oxygen Reservoir', type: 'checkbox', srequired: '1', displayRequired: '1' },
        { name: 'BVM Pediatric', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'BVM Mask Adult', quantity: true, required: '3', displayRequired: '3' },
        { name: 'BVM Mask Pediatric', quantity: true, required: '2', displayRequired: '2 (Small Child - Infant)' },
        { name: 'HEPA Filter', quantity: true, required: '2', displayRequired: '2' },
        { name: 'Manual Suction Unit', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Suction Pipes (with adapter)', quantity: true, required: '2', displayRequired: '2 (Thin - Thick)' },
        { name: 'Suction Tubes', quantity: true, required: '4', displayRequired: '4 (Black - Blue - Green - Orange)' },
        { name: 'Suction Connector', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Airway Cannula (OPA)', quantity: true, required: '8', displayRequired: '8 (40mm - 110mm)' },

        // SECTION: Oxygen
        { type: 'section', name: 'Oxygen' },
        { name: 'Oxygen D-Size Bottle (Small)', type: 'text', quantity: true, required: '2000', displayRequired: '2000 psi', placeholder: 'Enter PSI', min: 0, max: 3000 },
        { name: 'Oxygen Regulator for Bottle', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Oxygen Keychain', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Oxygen Face Mask Adult', quantity: true, required: '3', displayRequired: '3' },
        { name: 'Oxygen Face Mask Pediatric', quantity: true, required: '1', displayRequired: '1' },
        { name: 'Oxygen Non-rebreather Mask Adult', quantity: true, required: '3', displayRequired: '3' },
        { name: 'Oxygen Non-rebreather Mask Pediatric', quantity: true, required: '1', displayRequired: '1' },
        { name: 'Oxygen Nasal Cannula Adult', quantity: true, required: '3', displayRequired: '3' },
        { name: 'Oxygen Nasal Cannula Pediatric', quantity: true, required: '1', displayRequired: '1' },
        { name: 'Oxygen Connecting Tube', quantity: true, required: '3', displayRequired: '3' },

        // SECTION: Vital Signs
        { type: 'section', name: 'Vital Signs' },
        { name: 'Shygmomanometer', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Shygmomanometer Cuffs', quantity: true, required: '1', displayRequired: '1 (ideally 4: Large Adult - Adult - Child - Infant)' },
        { name: 'Stethoscope', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Pulse Oximeter', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Thermometer Strips', quantity: true, required: '10', displayRequired: '10' },
        { name: 'Glucometer', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Glucometer Strips', quantity: true, required: '10', displayRequired: '10' },
        { name: 'Glucometer Needles', quantity: true, required: '10', displayRequired: '10' },

        // SECTION: Other
        { type: 'section', name: 'Other' },
        { name: 'Cloth Scissors', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Trash Bags Small', quantity: true, required: '10', displayRequired: '10' }
    ],

    Trauma: [
        // SECTION: Spinal
        { type: 'section', name: 'Spinal' },
        { name: 'Head Immobilizer', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Head Immobilizer Fixations', quantity: true, required: '2', displayRequired: '2' },
        { name: 'Head Immobilizer Straps', quantity: true, required: '2', displayRequired: '2' },
        { name: 'Spider Belts', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Speed Clips', quantity: true, required: '4', displayRequired: '4' },

        // SECTION: Splinting
        { type: 'section', name: 'Splinting' },
        { name: 'Pelvic Belt', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'KTD', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Ducting Tape', type: 'slider', required: '50', displayRequired: '50% at least', min: 0, max: 100, step: 5 },

        // SECTION: Bandages
        { type: 'section', name: 'Bandages' },
        { name: 'Elastic Bandage Small', quantity: true, required: '5', displayRequired: '5' },
        { name: 'Elastic Bandage Medium', quantity: true, required: '5', displayRequired: '5' },
        { name: 'Elastic Bandage Large', quantity: true, required: '5', displayRequired: '5' },
        { name: 'Compressive Bandage', quantity: true, required: '5', displayRequired: '5' },
        { name: 'Triangular Bandage', quantity: true, required: '5', displayRequired: '5' },
        { name: 'Band Aids', quantity: true, required: '10', displayRequired: '10' },

        // SECTION: Other
        { type: 'section', name: 'Other' },
        { name: 'Sterile Gauze (Set of 5)', quantity: true, required: '5', displayRequired: '5' },
        { name: 'Ice Bag', quantity: true, required: '2', displayRequired: '2' },
        { name: 'Tourniquet', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Chest Seal', quantity: true, required: '1', displayRequired: '1' }
    ],

    'Ambulance Equipment': [
        // SECTION: Rear Compartment
        { type: 'section', name: 'Rear Compartment' },
        { name: 'Foldable Stretcher', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Stair Chair', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'EZ-Glide', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Planchette', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Scoop Stretcher', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Spare Belts', quantity: true, required: '3', displayRequired: '3' },
        { name: 'Oxygen E-Size Bottle', type: 'text', quantity: true, required: '2000', displayRequired: '2000 psi', placeholder: 'Enter PSI', min: 0, max: 3000 },
        { name: 'Oxygen Regulator for Bottle', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Oxygen Keychain', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Oxygen Spare Bottle Large', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Oxygen Spare Bottle Small', type: 'checkbox', required: '1', displayRequired: '1' },

        // SECTION: Rear Compartment Cabinets
        { type: 'section', name: 'Rear Compartment Cabinets' },
        { name: 'Electrical Suction', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Suction Tubes', quantity: true, required: '4', displayRequired: '4 (Black - Blue - Green - Orange)' },
        { name: 'Suction Connector', type: 'checkbox', required: '1', displayRequired: '1' },

        // SECTION: Lifting Immobilization and Splinting
        { type: 'section', name: 'Lifting Immobilization and Splinting' },
        { name: 'Vacuum Mattress', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Vacuum Mattress Deflator', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Spinal Board', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Rigid Splints', quantity: true, required: '3', displayRequired: '3' },
        { name: 'Vacuum Splints', quantity: true, required: '3', displayRequired: '3' },
        { name: 'KED', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'KED Straps', quantity: true, required: '2', displayRequired: '2' },
        { name: 'KED Pillow', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Cervical Collar Adult', quantity: true, required: '2', displayRequired: '2' },
        { name: 'Cervical Collar Pediatric', quantity: true, required: '2', displayRequired: '2' },

        // SECTION: Under the Long Bench
        { type: 'section', name: 'Under the Long Bench' },
        { name: 'Disposable Blanket', quantity: true, required: '3', displayRequired: '3' },
        { name: 'Regular Blanket', quantity: true, required: '2', displayRequired: '2' },
        { name: 'Male Urinal', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Female Urinal', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Bed Pan', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Serum', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Blue Pad', quantity: true, required: '3', displayRequired: '3' },
        { name: 'Body Bag', quantity: true, required: '2', displayRequired: '2' },
        { name: 'Obstetric Kit', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Head Lamp', quantity: true, required: '4', displayRequired: '4' },

        // SECTION: AED Kit
        { type: 'section', name: 'AED Kit' },
        { name: 'AED', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Razor', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'AED Battery Level', type: 'slider', required: '100', displayRequired: '100%', min: 0, max: 100, step: 5 },
        { name: 'AED Patches', quantity: true, required: '2', displayRequired: '2' },
        { name: 'CPR Board', type: 'checkbox', required: '1', displayRequired: '1' },

        // SECTION: Protection
        { type: 'section', name: 'Protection' },
        { name: 'Small or Medium Gloves - Required 1 (Rear)', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Large or X-Large Gloves (Rear)', type: 'slider', required: '50', displayRequired: '50% at least', min: 0, max: 100, step: 5 },
        { name: 'Large or X-Large Gloves (Front)', type: 'slider', required: '50', displayRequired: '50% at least', min: 0, max: 100, step: 5 },
        { name: 'Surgical Face Mask (Front)', type: 'slider', required: '50', displayRequired: '50% at least', min: 0, max: 100, step: 5 },
        { name: 'Surgical Mask', quantity: true, required: '1', displayRequired: '1 box' },
        { name: 'KN95 Mask', quantity: true, required: '10', displayRequired: '10' },
        { name: 'Goggles / Face Shields', quantity: true, required: '10', displayRequired: '10' },
        { name: 'Gown', quantity: true, required: '10', displayRequired: '10' },
        { name: 'High Nitrile Gloves', quantity: true, required: '24', displayRequired: '24' },
        { name: 'Advanced PPE Kit', quantity: true, required: '2', displayRequired: '2' },
        { name: 'Extra N95 Masks', quantity: true, required: '5', displayRequired: '5' },

        // SECTION: Disinfection
        { type: 'section', name: 'Disinfection' },
        { name: 'Trash Bags Large', quantity: true, required: '5', displayRequired: '5' },
        { name: 'Descosept or Cleanisept Spray Bottle', type: 'checkbox', required: '1', displayRequired: '1' },
        { name: 'Paper Towels', quantity: true, required: '1', displayRequired: '1' },
        { name: 'Hand Sanitizer (Front)', type: 'slider', required: '50', displayRequired: '50% at least', min: 0, max: 100, step: 5 },

        // SECTION: Front
        { type: 'section', name: 'Front' },
        { name: 'Disclaimer Report (Front)', quantity: true, required: '5', displayRequired: '5' }
    ]
};

// Items where a "how to check" note adds nothing: the check is just counting
// stock, or it is a fill-level slider. The info button is hidden for these.
// Set to true to re-enable the per-item info buttons.
const infoButtonsEnabled = false;

const noInfoItems = new Set([
    'HEPA Filter', 'Suction Tubes', 'Thermometer Strips', 'Glucometer Strips',
    'Glucometer Needles', 'Trash Bags Small', 'Trash Bags Large', 'Band Aids',
    'Elastic Bandage Small', 'Elastic Bandage Medium', 'Elastic Bandage Large',
    'Spare Belts', 'KED Straps', 'Paper Towels', 'Blue Pad',
    'Disposable Blanket', 'Regular Blanket', 'Disclaimer Report (Front)',
    'AED Patches', 'Ducting Tape', 'Hand Sanitizer (Front)',
    'Small or Medium Gloves - Required 1 (Rear)', 'Large or X-Large Gloves (Rear)',
    'Large or X-Large Gloves (Front)', 'Surgical Face Mask (Front)',
    'Surgical Mask', 'KN95 Mask', 'Goggles / Face Shields', 'Gown',
    'High Nitrile Gloves', 'Advanced PPE Kit', 'Extra N95 Masks'
]);

// Default "how to properly check this item" text, shown in the info modal.
// Any user can edit it - saving stores their version in the spreadsheet and
// that saved text is what everyone sees from then on.
const itemGuideText = {
    'BVM Adult': 'Squeeze the bag fully and release - it must refill fast and the patient valve should click. Check the mask still holds a seal.',
    'BVM Adult Oxygen Reservoir': 'Reservoir bag must be flat before you start. It should inflate to at least 2/3 on the first breath - a bag that stays flat means the oxygen line is not connected.',
    'BVM Pediatric': 'Same test as the adult BVM: full squeeze, fast refill, click on the valve, and the mask still seals.',
    'BVM Mask Adult': 'All three sizes present and not cracked. Each mask must hold a seal - no tears at the rim and the strap still grips.',
    'BVM Mask Pediatric': 'Both sizes present (small child and infant), rims intact with no tears.',
    'Manual Suction Unit': 'Plunger must slide back with no air leak. Test it on the palm of your hand - it should pull hard enough to hold a vacuum.',
    'Suction Pipes (with adapter)': 'Both pipes present. Each adapter must seat fully and lock onto the suction unit.',
    'Suction Connector': 'Must click into the tubing and lock. Check the O-rings are whole, clean and lightly lubricated.',
    'Airway Cannula (OPA)': 'Sizes 40mm to 110mm present. Each must be straight with the size colour code visible, and no cracks or bends.',
    'Oxygen D-Size Bottle (Small)': 'Read the gauge on the bottle - must be 2000 psi or more. Open the valve with the keychain and listen for leaks, then close it: the gauge must not drop.',
    'Oxygen Regulator for Bottle': 'Screw it onto the valve until it seats. Open slowly with the keychain - no whistling, hissing or leak at the fitting.',
    'Oxygen Keychain': 'Must still turn freely and fit the valve. Check it is not bent or damaged.',
    'Oxygen Face Mask Adult': 'Three present. Not torn or discoloured, elastic strap intact, connector fits the oxygen line.',
    'Oxygen Face Mask Pediatric': 'One present, not torn, strap intact.',
    'Oxygen Non-rebreather Mask Adult': 'Three present. The reservoir bag must fill to at least 1/3 before it goes on a patient, and the one-way valve must work.',
    'Oxygen Non-rebreather Mask Pediatric': 'One present, reservoir fills to 1/3, valve working.',
    'Oxygen Nasal Cannula Adult': 'Three present. Tubing clear with no kinks and the prongs not blocked.',
    'Oxygen Nasal Cannula Pediatric': 'One present, tubing clear, prongs open.',
    'Oxygen Connecting Tube': 'Three present and long enough to reach from the tank to the patient. No cracks, splits or kinks.',
    'Shygmomanometer': 'Zero the needle before use. Squeeze the bulb - it must climb smoothly and fall back to 0 when released. Both tubes attached.',
    'Shygmomanometer Cuffs': 'All four sizes present and labelled. Each cuff must hold pressure for 2 minutes with no slip, and the size must match the limb.',
    'Stethoscope': 'Tubing has no cracks or splits, and the chest piece is clear in both the bell and diaphragm positions.',
    'Pulse Oximeter': 'Put your finger in - the sensor must light up and give a steady number. Check the battery and that the reading does not flicker.',
    'Glucometer': 'Run a control solution test - it must fall inside the range printed on the strip box. Battery good and the date strip matches.',
    'Cloth Scissors': 'Both blades open and close smoothly with no wobble at the pivot. No rust, handles intact.',

    'Head Immobilizer': 'Foam must be firm with no cracks. Every hinge locks in all positions and the chin and forehead pads are still padded.',
    'Head Immobilizer Fixations': 'Both pieces present, straps threaded through correctly and buckles working.',
    'Head Immobilizer Straps': 'Both straps present, no cuts or fraying, buckles click shut.',
    'Spider Belts': 'Every buckle must click and lock. Check the webbing for cuts, fraying or burnt holes.',
    'Speed Clips': 'Each clip must open and close smoothly and lock. Check the webbing for cuts or fraying.',
    'Pelvic Belt': 'Buckle clicks shut and the belt slides through it smoothly. Check the anchor points for tears.',
    'KTD': 'Vest must be one piece with all the pre-cut slots torn out. Buckle locks and the handles still hold.',
    'Compressive Bandage': 'Buckle locks and the elastic still springs back when stretched. No tears or pulled threads.',
    'Triangular Bandage': 'Still folded with the hem intact. No frayed edges and no stains.',
    'Sterile Gauze (Set of 5)': 'Seal must be unbroken. Any opened or torn pack is contaminated - discard it and replace.',
    'Ice Bag': 'No leaks and the zipper runs the whole way. Must hold ice without dripping.',
    'Tourniquet': 'Wind the band above the bleeding, tighten until the bleeding stops, then secure. It must not be able to slip once applied.',
    'Chest Seal': 'Seal must be airtight and in date. Carry two per casualty and fit the vented side up.',

    'Foldable Stretcher': 'Frame must lock solid when extended with no wobble. Straps intact, buckles working, wheels rolling freely.',
    'Stair Chair': 'Track and stair belt must thread and lock. Frame solid with no rust, wheels roll, seat strap present.',
    'EZ-Glide': 'Fabric must have no tears and the head and body straps still lock. Check the board itself for cracks.',
    'Planchette': 'Clean, no cracks or splits, and all the strap slots are intact.',
    'Scoop Stretcher': 'Head and foot sections hinge and lock. All patient straps present with working buckles.',
    'Oxygen E-Size Bottle': 'Read the gauge on the bottle - must be 2000 psi or more. Open with the keychain and listen for leaks, then close it: the gauge must not drop.',
    'Oxygen Regulator for Bottle': 'Screw onto the valve until it seats. Open slowly with the keychain - no whistling or leak at the fitting.',
    'Oxygen Keychain': 'Must still turn freely and fit the valve. Check it is not bent or damaged.',
    'Oxygen Spare Bottle Large': 'Valve cap on and gauge reading full. The valve must not be seized.',
    'Oxygen Spare Bottle Small': 'Valve cap on and gauge reading full. The valve must not be seized.',
    'Electrical Suction': 'Battery holds a full charge. Power it up and confirm the gauge reaches 300 mmHg, and that the canister lid seals.',
    'Suction Connector': 'Clicks into the tubing and locks. O-rings whole, clean and lightly lubricated.',
    'Vacuum Mattress': 'Valve must hold the vacuum with no loss over a few minutes. Seams sealed, straps and buckles intact.',
    'Vacuum Mattress Deflator': 'Hose must fit the mattress valve and the release valve has to open smoothly to drop the vacuum.',
    'Spinal Board': 'No cracks or splits anywhere. Hand holes clear, all straps present with working buckles.',
    'Rigid Splints': 'No cracks or splits. Every strap and buckle is present and working.',
    'Vacuum Splints': 'Valve must hold the vacuum. Seams intact with no pinholes and straps working.',
    'KED': 'Buckle locks. All the pre-cut slots are torn out and the vest is not torn or worn through.',
    'KED Pillow': 'Foam firm, cover cleanable and free of tears.',
    'Cervical Collar Adult': 'Clips must lock in every size and the chin, chest and back pieces are all present and not cracked.',
    'Cervical Collar Pediatric': 'Clips lock in every size. Chin support intact and the collar is not bent.',
    'Male Urinal': 'Clean, no cracks, and it must not leak with the cap on.',
    'Female Urinal': 'Clean, no cracks, and the rim must seal when the lid is closed.',
    'Bed Pan': 'Clean, no cracks, the lid fits and it does not leak.',
    'Serum': 'Check the expiry date. The pouch must not be swollen, leaking or discoloured.',
    'Body Bag': 'Zip runs the full length and the sheet slides smoothly. Seams intact with no tears.',
    'Obstetric Kit': 'Seal unbroken. Contents listed on the outside, and anything carrying a date must be in date.',
    'Head Lamp': 'Charge must last a full shift. Both lights switch on and the straps are not stretched or torn.',
    'AED': 'Power it on and let the self-test run - it must report ready with no error. Check the pads and battery are in date.',
    'Razor': 'Blades clean and free of rust, hinge tight, and it should open with one hand. Replace the blade as soon as it dulls.',
    'AED Battery Level': 'Indicator at 100%. Check the expiry printed on the battery and swap it if it is expired.',
    'CPR Board': 'Surface clean and still grips - not slick or cracked. All straps present and working.',
    'Descosept or Cleanisept Spray Bottle': 'Bottle sealed and not expired. The nozzle must still spray a fine mist.'
};








// GLOBAL STATE
let state = JSON.parse(localStorage.getItem('carCheckupState')) || {
    emt: '', car: '', shift: '', equipment: 'Stair Chair', items: {}, currentPage: 'Medical', submitted: false,
    startTime: null, endTime: null, firstCheckTime: null
};
let initialState = JSON.parse(localStorage.getItem('carInitialCheckupState')) || {};
let currentPageIndex = 0;
const pageOrder = ['Medical', 'Trauma', 'Ambulance Equipment'];
let firstCheckRecorded = false;
let isSubmitting = false;
let isNavigating = false;

// ITEM GUIDES: per-item "how to properly check this" text, shared via the Apps Script.
// localStorage is only a cache so the info buttons still work if the fetch fails.
let itemGuides = JSON.parse(localStorage.getItem('carCheckupGuides')) || {};

function saveGuidesLocal() {
    localStorage.setItem('carCheckupGuides', JSON.stringify(itemGuides));
}

function fetchGuidesFromServer() {
    return fetch(`${SCRIPT_URL}?action=getGuides`)
        .then(res => res.json())
        .then(data => {
            if (data && typeof data === 'object') {
                itemGuides = Object.assign({}, itemGuides, data);
                saveGuidesLocal();
                console.log('📖 Loaded guides:', Object.keys(itemGuides).length);
            }
        })
        .catch(err => {
            console.warn('📖 Guides unavailable from server, using local cache:', err);
        });
}

function pushGuideToServer(key, page, item, text) {
    const body = 'action=saveGuide&guide=' +
        encodeURIComponent(JSON.stringify({ key, page, item, text }));
    return fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body
    })
        .then(res => res.text())
        .then(txt => {
            if (!txt.includes('OK')) console.warn('📖 Guide not stored on server:', txt);
        })
        .catch(err => console.warn('📖 Guide stored on this device only:', err));
}

function refreshInfoButtons(key, hasGuide) {
    document.querySelectorAll('.info-btn').forEach(btn => {
        if (btn.dataset.key === key) btn.classList.toggle('has-guide', hasGuide);
    });
}

function addInfoButton(div, key, item) {
    if (!infoButtonsEnabled) return;
    if (noInfoItems.has(item.name)) return;
    const label = div.querySelector('label');
    if (!label) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'info-btn' + (getGuideText(key, item.name) ? ' has-guide' : '');
    btn.dataset.key = key;
    btn.textContent = 'i';
    btn.title = 'How to check this item';
    btn.addEventListener('click', e => {
        e.stopPropagation();
        openGuideModal(key, item);
    });

    // Group the name and the button together, directly after the name.
    const group = document.createElement('div');
    group.className = 'item-name';
    label.parentNode.insertBefore(group, label);
    group.appendChild(label);
    group.appendChild(btn);
}

function getGuideText(key, itemName) {
    return itemGuides[key] || itemGuideText[itemName] || '';
}

function openGuideModal(key, item) {
    const overlay = document.getElementById('guide-overlay');
    if (!overlay) return;
    const dashIndex = key.indexOf('-');
    overlay.dataset.key = key;
    overlay.dataset.page = key.substring(0, dashIndex);
    overlay.dataset.item = item.name;
    document.getElementById('guide-title').textContent =
        `${key.substring(0, dashIndex)}: ${item.name}`;
    document.getElementById('guide-text').value = getGuideText(key, item.name);
    overlay.classList.add('active');
    document.getElementById('guide-text').focus();
}

function closeGuideModal() {
    const overlay = document.getElementById('guide-overlay');
    if (overlay) overlay.classList.remove('active');
}

function saveGuideFromModal() {
    const overlay = document.getElementById('guide-overlay');
    if (!overlay) return;
    const key = overlay.dataset.key;
    if (!key) return;

    const text = document.getElementById('guide-text').value.trim();
    if (text) {
        itemGuides[key] = text;
    } else {
        delete itemGuides[key];
    }
    saveGuidesLocal();
    pushGuideToServer(key, overlay.dataset.page, overlay.dataset.item, text);
    refreshInfoButtons(key, !!text);
    console.log(`📖 Guide saved for ${key}`);
    closeGuideModal();
}

function showLoading(message) {
    const overlay = document.getElementById('loading-overlay');
    const text = document.getElementById('loading-text');
    if (text) text.textContent = message || 'Loading...';
    if (overlay) overlay.classList.add('active');
}

function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.classList.remove('active');
}

function lockButtons() {
    document.querySelectorAll('.btn').forEach(btn => btn.disabled = true);
}

function unlockButtons() {
    document.querySelectorAll('.btn').forEach(btn => btn.disabled = false);
}

// INIT
document.addEventListener('DOMContentLoaded', function () {
    initDropdowns();
    fetchGuidesFromServer();
    const guideOverlay = document.getElementById('guide-overlay');
    if (guideOverlay) {
        guideOverlay.addEventListener('click', e => {
            if (e.target === guideOverlay) closeGuideModal();
        });
    }
    if (state.submitted) {
        showRestock();
    } else {
        renderPage(state.currentPage || 'Medical');
    }
    window.nextPage = nextPage;
    window.prevPage = prevPage;
    window.submitInitial = submitInitial;
    window.submitFinal = submitFinal;
    window.backToCheckup = backToCheckup;
    window.resetAll = resetAll;
    window.newCheckup = newCheckup;
    window.closeGuideModal = closeGuideModal;
    window.saveGuideFromModal = saveGuideFromModal;
});

function initDropdowns() {
    ['emt', 'car', 'shift'].forEach(id => {
        const select = document.getElementById(id);
        const options = id === 'emt' ? emts : id === 'car' ? cars : shifts;
        options.forEach(opt => {
            const option = document.createElement('option');
            option.value = option.text = opt;
            select.add(option);
        });
        select.value = state[id];
        select.addEventListener('change', () => {
            state[id] = select.value;
            saveState();
        });
    });
}

const transportItems = ['Foldable Stretcher', 'Stair Chair'];
const transportKey = 'Ambulance Equipment-transport';

function isEquipmentHidden(item) {
    return transportItems.includes(item.name) && state.equipment && item.name !== state.equipment;
}

function syncTransportState(equipment, checked) {
    transportItems.forEach(name => {
        const key = `Ambulance Equipment-${encodeURIComponent(name)}`;
        state.items[key] = checked && name === equipment
            ? { checked: true, quantity: '1', value: '' }
            : { checked: false, quantity: '0', value: '' };
    });
    state.equipment = equipment || 'Stair Chair';
    saveState();
}

function renderTransportRow(container) {
    const equipment = state.equipment || 'Stair Chair';
    const saved = state.items[transportKey] || { checked: false, quantity: '0', value: '' };
    const checked = saved.checked === true;

    const div = document.createElement('div');
    div.className = 'item';
    div.style.cursor = 'pointer';

    div.innerHTML = `
        <div style="display:flex; align-items:center; gap:15px;">
            <input type="checkbox" id="${transportKey}" ${checked ? 'checked' : ''}>
            <select class="transport-select">
                <option value="Stair Chair" ${equipment === 'Stair Chair' ? 'selected' : ''}>Stair Chair</option>
                <option value="Foldable Stretcher" ${equipment === 'Foldable Stretcher' ? 'selected' : ''}>Foldable Stretcher</option>
            </select>
        </div>
        <span class="required">Required: 1</span>
    `;

    const checkbox = div.querySelector('input[type=checkbox]');
    const select = div.querySelector('.transport-select');

    if (!infoButtonsEnabled) {
        // Info button disabled - keep the rest of the row behavior.
        const saveRow = () => {
            state.items[transportKey] = { checked: checkbox.checked, quantity: checkbox.checked ? '1' : '0', value: '' };
            syncTransportState(select.value, checkbox.checked);
        };
        checkbox.addEventListener('change', saveRow);
        select.addEventListener('change', saveRow);
        div.addEventListener('click', (e) => {
            if (e.target.type === 'checkbox' || e.target.tagName === 'SELECT' ||
                e.target.tagName === 'INPUT') return;
            checkbox.checked = !checkbox.checked;
            saveRow();
        });
        container.appendChild(div);
        return;
    }

    const guideBtn = document.createElement('button');
    guideBtn.type = 'button';
    guideBtn.className = 'info-btn';
    guideBtn.textContent = 'i';
    guideBtn.title = 'How to check this item';

    const syncGuideBtn = () => {
        const name = state.equipment || 'Stair Chair';
        const guideKey = `Ambulance Equipment-${encodeURIComponent(name)}`;
        if (noInfoItems.has(name)) {
            guideBtn.remove();
            return;
        }
        guideBtn.classList.toggle('has-guide', !!getGuideText(guideKey, name));
        guideBtn.onclick = e => {
            e.stopPropagation();
            openGuideModal(guideKey, { name });
        };
    };
    if (!noInfoItems.has(state.equipment || 'Stair Chair')) {
        // Sits right after the equipment name, "Required" stays far right.
        select.after(guideBtn);
    }
    syncGuideBtn();

    const saveRow = () => {
        state.items[transportKey] = { checked: checkbox.checked, quantity: checkbox.checked ? '1' : '0', value: '' };
        syncTransportState(select.value, checkbox.checked);
        syncGuideBtn();
    };

    checkbox.addEventListener('change', saveRow);
    select.addEventListener('change', saveRow);
    div.addEventListener('click', (e) => {
        if (e.target.type === 'checkbox' || e.target.tagName === 'SELECT' ||
            e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
        checkbox.checked = !checkbox.checked;
        saveRow();
    });

    // EZ-Glide must be present before Foldable Stretcher can be chosen.
    updateFoldableStretcherOption();

    container.appendChild(div);
}

function updateFoldableStretcherOption() {
    const select = document.querySelector('.transport-select');
    if (!select) return;
    const ezKey = 'Ambulance Equipment-' + encodeURIComponent('EZ-Glide');
    const ezData = state.items[ezKey];
    const ezChecked = !!(ezData && ezData.checked === true);
    const fsOption = Array.from(select.options).find(o => o.value === 'Foldable Stretcher');
    if (fsOption) fsOption.disabled = !ezChecked;
    if (!ezChecked && select.value === 'Foldable Stretcher') {
        select.value = 'Stair Chair';
        select.dispatchEvent(new Event('change'));
    }
}

function validateQuantityInput(input) {
    // 1. Remove ALL non-digits instantly
    input.value = input.value.replace(/[^0-9]/g, '');

    // 2. Trim leading zeros only if the number is more than one digit
    // This turns "05" into "5" but keeps "0" as "0"
    if (input.value.length > 1 && input.value.startsWith('0')) {
        input.value = input.value.replace(/^0+/, '');
    }

    // 3. Optional: If user deletes everything, you can force it back to 0 
    // on 'blur' (when they leave the field) to keep your logic consistent.
}

function nextPage() {
    if (isNavigating) return;
    isNavigating = true;
    lockButtons();
    showLoading('Loading...');
    setTimeout(() => {
        currentPageIndex = Math.min(currentPageIndex + 1, pageOrder.length - 1);
        renderPage(pageOrder[currentPageIndex]);
        window.scrollTo(0, 0);
        hideLoading();
        unlockButtons();
        isNavigating = false;
    }, 350);
}

function prevPage() {
    if (isNavigating) return;
    isNavigating = true;
    lockButtons();
    showLoading('Loading...');
    setTimeout(() => {
        currentPageIndex = Math.max(currentPageIndex - 1, 0);
        renderPage(pageOrder[currentPageIndex]);
        window.scrollTo(0, 0);
        hideLoading();
        unlockButtons();
        isNavigating = false;
    }, 350);
}

function ensureAllItemsInitialized() {
    const validKeys = new Set();
    pageOrder.forEach(pageName => {
        pages[pageName].forEach(item => {
            if (item.type !== 'section' && !isEquipmentHidden(item)) {
                validKeys.add(`${pageName}-${encodeURIComponent(item.name)}`);
            }
        });
    });

    validKeys.forEach(key => {
        if (!state.items[key]) {
            state.items[key] = { quantity: '0', checked: false, value: '' };
        } else if (!state.items[key].quantity) {
            state.items[key].quantity = '0';  // Ensure EVERY item has quantity field
        }
    });
    saveState();
    console.log('✅ ALL', validKeys.size, 'items initialized with quantity: "0"');
}





function findItemByKey(key) {
    const parts = key.split('-', 2);
    if (parts.length < 2) return null;

    const pageName = parts[0];
    const encodedItemName = parts[1];
    const exactItemName = decodeURIComponent(encodedItemName);

    const page = pages[pageName];
    if (!page) return null;

    // 🔥 FIXED: Debug logging + exact match
    console.log(`🔍 findItemByKey: "${pageName}" -> "${exactItemName}"`);
    return page.find(item =>
        item.type !== 'section' && item.name === exactItemName
    );
}




function recordFirstCheck() {
    if (!firstCheckRecorded && !state.firstCheckTime) {
        state.firstCheckTime = new Date().toISOString();
        state.startTime = state.firstCheckTime;
        firstCheckRecorded = true;
        saveState();
        console.log('⏰ First check recorded at:', state.firstCheckTime);
    }
}

function renderPage(pageName) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    const pageId = pageName.toLowerCase().replace(/\s+/g, '-');
    const pageEl = document.getElementById(pageId);

    if (pageEl) {
        pageEl.classList.add('active');
        const container = pageEl.querySelector('.items');
        container.innerHTML = '';

        let transportRowRendered = false;

        pages[pageName].forEach(item => {
            if (pageName === 'Ambulance Equipment' && transportItems.includes(item.name)) {
                if (!transportRowRendered) {
                    renderTransportRow(container);
                    transportRowRendered = true;
                }
                return;
            }
            if (isEquipmentHidden(item)) return;

            if (item.type === 'section') {
                const sectionDiv = document.createElement('div');
                sectionDiv.className = 'section-header';
                Object.assign(sectionDiv.style, { margin: '30px 0 25px 0' });
                const h3 = document.createElement('h3');
                h3.textContent = item.name;
                Object.assign(h3.style, { margin: '0', fontSize: '1.2em' });
                sectionDiv.appendChild(h3);
                container.appendChild(sectionDiv);
                return;
            }

            const div = document.createElement('div');
            div.className = 'item';
            div.dataset.key = `${pageName}-${encodeURIComponent(item.name)}`;
            const key = div.dataset.key;

            // DEFAULT STATE
            let saved = state.items[key];
            if (!saved) {
                saved = item.quantity ? { quantity: '0', value: '', checked: false } : { checked: false, quantity: '0', value: '' };
                state.items[key] = saved;
            } else if (item.quantity && !saved.quantity) {
                saved.quantity = '0';
            }

            const qty = saved.quantity || '0';
            const isChecked = saved.checked || false;

            // CASE 1: PURE QUANTITY
            if (item.quantity && !item.type) {
                div.innerHTML = `
                    <label class="quantity-label">${item.name}</label>
                    <input type="number" class="input-quantity" 
                           placeholder="Qty" value="${qty}" min="0" step="1"
                           inputmode="numeric" onfocus="this.select()" oninput="validateQuantityInput(this)">
                    <span class="required">Required: ${item.displayRequired || item.required}</span>
                `;
                div.classList.add('quantity-only');
            }
            // CASE 2: PSI BOTTLES
            else if (item.type === 'text' && item.quantity) {
                div.innerHTML = `
                    <label class="quantity-label">${item.name}</label>
                    <input type="number" class="input-quantity" 
                           placeholder="${item.placeholder || 'Enter PSI'}" 
                           value="${qty}" min="${item.min || 0}" max="${item.max || 3000}" step="1"
                           inputmode="numeric" onfocus="this.select()" oninput="validateQuantityInput(this)">
                    <span class="required">Required: ${item.displayRequired || item.required}</span>
                `;
                div.classList.add('quantity-only');
            }
            // CASE 3: CHECKBOX & OTHERS
            else {
                let inputHTML = `
                    <input type="checkbox" id="${key}" ${isChecked ? 'checked' : ''}>
                    <label for="${key}">${item.name}</label>
                    <span class="required">Required: ${item.displayRequired || item.required}</span>
                `;

                if (item.quantity && item.type === 'checkbox') {
                    inputHTML += `
                        <input type="number" class="input-quantity" 
                               placeholder="Qty" value="${qty}" min="0" step="1"
                               inputmode="numeric" onfocus="this.select()" oninput="validateQuantityInput(this)"
                               ${!isChecked ? 'disabled' : ''}>
                    `;
                }
                else if (item.type === 'slider') {
                    const sliderValue = saved.value || 0;
                    inputHTML += `
                        <input type="range" class="input-slider" min="${item.min || 0}" 
                               max="${item.max || 100}" step="${item.step || 5}" value="${sliderValue}"
                               ${!isChecked ? 'disabled' : ''}>
                        <span class="slider-value ${!isChecked ? 'disabled' : ''}">${sliderValue}%</span>
                    `;
                }
                else if (item.type === 'text' && !item.quantity) {
                    inputHTML += `
                        <input type="number" class="input-value" 
                               placeholder="${item.placeholder || 'Enter value'}" 
                               value="${saved.value || ''}" min="${item.min || ''}" max="${item.max || ''}"
                               inputmode="numeric" onfocus="this.select()"
                               ${!isChecked ? 'disabled' : ''}>
                    `;
                }

                div.innerHTML = inputHTML;
            }

            addInfoButton(div, key, item);
            container.appendChild(div);
            setupItemEvents(div, item, key);

            // EZ-Glide presence gates the Foldable Stretcher transport option.
            if (item.name === 'EZ-Glide') {
                const cb = div.querySelector('input[type=checkbox]');
                if (cb) cb.addEventListener('change', updateFoldableStretcherOption);
            }

            if (div.classList.contains('quantity-only')) {
                const qtyInput = div.querySelector('.input-quantity');
                qtyInput.dispatchEvent(new Event('input'));
            }
        });

        state.currentPage = pageName;
        // Keep the transport dropdown's Foldable Stretcher option in sync.
        if (pageName === 'Ambulance Equipment') updateFoldableStretcherOption();
        saveState();
    }
}


function setupItemEvents(div, item, key) {
    // QUANTITY-ONLY ITEMS
    if (div.classList.contains('quantity-only')) {
        const quantityInput = div.querySelector('.input-quantity');
        div.style.cursor = 'default';
        quantityInput.addEventListener('input', () => {
            state.items[key].quantity = quantityInput.value || '0';
            if (state.currentPage === 'Medical' && !firstCheckRecorded && quantityInput.value > 0) {
                recordFirstCheck();
            }
            saveState();
        });
        return;
    }

    // CHECKBOX ITEMS
    const checkbox = div.querySelector('input[type=checkbox]');
    const quantityInput = div.querySelector('.input-quantity');
    const slider = div.querySelector('.input-slider');
    const sliderValueEl = div.querySelector('.slider-value');
    const valueInput = div.querySelector('.input-value');

    // Make entire item clickable (except inputs)
    div.style.cursor = 'pointer';
    div.addEventListener('click', function (e) {
        if (e.target.type === 'checkbox' || e.target.type === 'range' ||
            e.target.type === 'number' || e.target.tagName === 'INPUT' ||
            e.target.tagName === 'BUTTON') return;
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event('change'));
    });

    // Checkbox events
    checkbox?.addEventListener('change', () => {
        if (state.currentPage === 'Medical' && !firstCheckRecorded) {
            recordFirstCheck();
        }
        toggleInputs(div, item);
        saveItem(key, div);
    });

    // Quantity input
    if (quantityInput) {
        quantityInput.addEventListener('input', () => saveItem(key, div));
    }

    // Slider events
    if (slider && sliderValueEl) {
        slider.addEventListener('input', () => {
            sliderValueEl.textContent = `${slider.value}%`;
            saveItem(key, div);
        });
    }

    // Value input events
    if (valueInput) {
        valueInput.addEventListener('input', () => saveItem(key, div));
    }
}


function toggleInputs(div, item) {
    const checkbox = div.querySelector('input[type=checkbox]');
    const quantityInput = div.querySelector('.input-quantity');
    const slider = div.querySelector('.input-slider');
    const valueInput = div.querySelector('.input-value');
    const sliderValueEl = div.querySelector('.slider-value');

    const isChecked = checkbox.checked;

    if (quantityInput) quantityInput.disabled = !isChecked;
    if (valueInput) valueInput.disabled = !isChecked;
    if (slider) slider.disabled = !isChecked;
    if (sliderValueEl) {
        sliderValueEl.className = `slider-value ${!isChecked ? 'disabled' : ''}`;
    }
}


function saveItem(key, div) {
    const checkbox = div.querySelector('input[type=checkbox]');
    const quantityInput = div.querySelector('.input-quantity');
    const slider = div.querySelector('.input-slider');
    const valueInput = div.querySelector('.input-value');

    const dashIndex = key.indexOf('-');
    const pageName = key.substring(0, dashIndex);
    const itemName = decodeURIComponent(key.substring(dashIndex + 1));
    const item = pages[pageName]?.find(i => i.name === itemName);

    let finalQuantity = '0';
    let finalValue = '';

    // If there's a quantity input, use its value. If empty, default to '0'.
    if (quantityInput) {
        finalQuantity = quantityInput.value === '' ? '0' : quantityInput.value;
    } else if (slider) {
        finalQuantity = slider.value;
        finalValue = slider.value;
    } else if (item?.required?.includes('%')) {
        finalQuantity = valueInput?.value || '0';
        finalValue = finalQuantity;
    }

    state.items[key] = {
        checked: checkbox ? checkbox.checked : false,
        quantity: finalQuantity,
        value: finalValue
    };
    saveState();
}


function saveState() {
    localStorage.setItem('carCheckupState', JSON.stringify(state));
}





function submitInitial() {
    if (isSubmitting) return;
    state.emt = document.getElementById('emt').value;
    state.car = document.getElementById('car').value;
    state.shift = document.getElementById('shift').value;

    if (!state.emt || !state.car || !state.shift) {
        alert('Please select EMT, Car, and Shift first!');
        return;
    }

    isSubmitting = true;
    lockButtons();
    showLoading('Submitting checkup...');

    // 🔥 SINGLE CALL - Initialize ALL items
    console.log('🔧 Initializing ALL items...');
    ensureAllItemsInitialized();

    // Debug: Verify ALL items have quantity
    const validKeys = new Set();
    pageOrder.forEach(pageName => {
        pages[pageName].forEach(item => {
            if (item.type !== 'section' && !isEquipmentHidden(item)) {
                validKeys.add(`${pageName}-${encodeURIComponent(item.name)}`);
            }
        });
    });

    const missingQuantity = Array.from(validKeys).filter(key => !state.items[key]?.quantity);
    console.log(`🚨 Items WITHOUT quantity: ${missingQuantity.length}`);
    if (missingQuantity.length > 0) {
        console.log('❌ MISSING:', missingQuantity.slice(0, 5));
    }

    // ✅ Build data from COMPLETE state
    const allData = Array.from(validKeys).map(key => {
        const data = state.items[key];
        const dashIndex = key.indexOf('-');
        const pageName = key.substring(0, dashIndex);
        const itemName = decodeURIComponent(key.substring(dashIndex + 1));
        const item = pages[pageName]?.find(i => i.name === itemName);

        let itemVal = 0;
        if (data.quantity && parseInt(data.quantity) > 0) {
            itemVal = parseInt(data.quantity);
        } else if (data.value && parseInt(data.value) > 0) {
            itemVal = parseInt(data.value);
        } else if (data.checked === true) {
            itemVal = 1;
        }

        let status = itemVal > 0 ? '✅ PRESENT' : '❌ MISSING';
        if (item?.required?.includes('%')) status = itemVal >= 50 ? '✅ PRESENT' : '❌ MISSING';
        if (item?.required?.includes('psi') || item?.displayRequired?.includes('psi')) status = itemVal >= 2000 ? '✅ PRESENT' : '❌ MISSING';

        return {
            page: pageName,
            timestamp: new Date().toISOString(),
            start_time: state.startTime || '',
            first_check_time: state.firstCheckTime || '',
            emt: state.emt || '',
            car: state.car || '',
            shift: state.shift || '',
            equipment: state.equipment || '',
            phase: 'INITIAL CHECKUP',
            item: itemName,
            status: status,
            quantity: data.quantity || '0',  // This will ALWAYS exist now
            psi_value: data.value || '',
            checked: data.checked === true
        };
    });

    // Save snapshot BEFORE submit
    localStorage.setItem('carInitialCheckupState', JSON.stringify({ ...state }));
    console.log('💾 INITIAL STATE SAVED:', validKeys.size, 'items');

    submitData(allData, () => {
        state.submitted = true;
        saveState();
        showRestock();
        hideLoading();
        unlockButtons();
        isSubmitting = false;
    }, () => {
        hideLoading();
        unlockButtons();
        isSubmitting = false;
    });
}

function submitData(allData, onSuccess, onError) {
    console.log('🔥 FORM SUBMISSION -', allData.length, 'items');

    const body = 'data=' + encodeURIComponent(JSON.stringify(allData));

    fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body
    })
        .then(res => res.text())
        .then(text => {
            console.log('📡 Server response:', text);
            if (text.includes('OK')) {
                onSuccess();
            } else {
                alert('Server error: ' + text);
                if (onError) onError('server', text);
            }
        })
        .catch(err => {
            console.error('❌ Fetch failed, falling back to iframe:', err);
            submitViaIframe(allData, onSuccess, onError);
        });
}

function submitViaIframe(allData, onSuccess, onError) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = SCRIPT_URL;
    form.style.display = 'none';
    form.target = 'submitFrame';

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'data';
    input.value = JSON.stringify(allData);
    form.appendChild(input);

    const iframe = document.createElement('iframe');
    iframe.name = 'submitFrame';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    document.body.appendChild(form);

    let responded = false;

    iframe.addEventListener('load', () => {
        responded = true;
        form.remove();
        iframe.remove();
        console.log('✅ Server responded (iframe) - check GAS logs / sheet');
        onSuccess();
    });

    form.submit();

    setTimeout(() => {
        if (!responded) {
            console.error('❌ No response from server after 10s — check web app URL/deployment');
            form.remove();
            iframe.remove();
            alert('No response from the server after 10 seconds.\n\nCheck:\n1. The Apps Script is deployed: Deploy → New deployment → Web app → Access: Anyone\n2. The SCRIPT_URL in script.js matches the deployment URL exactly');
            if (onError) onError('timeout', 'no response');
        }
    }, 10000);
}





function showRestock() {
    if (!state.endTime) {
        state.endTime = new Date().toISOString();
        saveState();
    }

    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('restock').classList.add('active');
    window.scrollTo(0, 0);

    const restockList = document.getElementById('restock-list');
    restockList.innerHTML = '';

    let totalItemsPresent = 0;
    let totalItemsMissing = 0;
    const allMissingItems = [];

    // 1. BUILD VALID KEYS SET
    const validKeys = new Set();
    pageOrder.forEach(pageName => {
        pages[pageName].forEach(item => {
            if (item.type !== 'section' && !isEquipmentHidden(item)) {
                validKeys.add(`${pageName}-${encodeURIComponent(item.name)}`);
            }
        });
    });

    // 2. INITIALIZE MISSING STATE
    validKeys.forEach(key => {
        if (!state.items[key]) {
            const parts = key.split('-', 2);
            const pageName = parts[0];
            const itemName = decodeURIComponent(parts[1]);
            const item = pages[pageName]?.find(i => i.name === itemName);
            state.items[key] = item?.quantity ? { quantity: '0', checked: false, value: '' } : { checked: false, quantity: '0', value: '' };
        }
    });
    saveState();

    // 3. PROCESS ITEMS FOR RESTOCK LIST
    validKeys.forEach(key => {
        const itemData = state.items[key];
        const dashIndex = key.indexOf('-');
        const pageName = key.substring(0, dashIndex);
        const itemName = decodeURIComponent(key.substring(dashIndex + 1));
        const item = pages[pageName]?.find(i => i.name === itemName);

        if (!item) return;

        let currentQty = 0;
        if (itemData.quantity && parseInt(itemData.quantity) > 0) {
            currentQty = parseInt(itemData.quantity);
        } else if (itemData.value && parseInt(itemData.value) > 0) {
            currentQty = parseInt(itemData.value);
        } else if (itemData.checked === true) {
            currentQty = 1;
        }

        let requiredNum = 1;
        if (item.required) {
            if (item.required.includes('psi')) requiredNum = 2000;
            else if (item.required.includes('%')) requiredNum = 50; // Threshold to trigger restock
            else {
                const numMatch = item.required.match(/^\d+/);
                requiredNum = numMatch ? parseInt(numMatch[0]) : 1;
            }
        }

        const needsRestock = currentQty < requiredNum;

        if (!needsRestock) {
            totalItemsPresent++;
        } else {
            totalItemsMissing++;
            allMissingItems.push({ key, item, pageName, currentQty, requiredNum });
        }
    });

    if (allMissingItems.length === 0) {
        restockList.innerHTML = '<div style="text-align:center;padding:40px;color:#28a745;font-size:1.5em;">✅ All items meet requirements!</div>';
        return;
    }

    // 4. RENDER RESTOCK ITEMS
    allMissingItems.forEach(({ key, item, pageName, currentQty, requiredNum }, index) => {
        const div = document.createElement('div');
        div.className = 'item';
        div.id = `restock-item-${index}`;

        // Logic for display strings
        const isPercent = item.required?.includes('%');
        const isPsi = item.required?.includes('psi');

        const displayRequired = item.displayRequired ||
            (isPsi ? `${requiredNum} psi` : isPercent ? `${requiredNum}%` : requiredNum);

        let displayCurrent = currentQty;
        if (isPercent) displayCurrent = `${currentQty}%`;
        else if (isPsi) displayCurrent = `${currentQty} psi`;

        const getLabelHTML = (isRestocked) => {
            if (isRestocked) {
                // If restocked, show 100% or 2000psi regardless of the minimum required threshold
                const finalVal = isPercent ? "100%" : isPsi ? "2000 psi" : requiredNum;
                return `
                    <strong>${pageName}:</strong> ${item.name}
                    <div style="font-size:0.9em;color:#28a745;">
                        📊 Current: ${finalVal} | Required: ${displayRequired} 
                        <span style="color:#28a745;font-weight:bold;">✅ RESTOCKED ✓</span>
                    </div>
                `;
            } else {
                return `
                    <strong>${pageName}:</strong> ${item.name}
                    <div style="font-size:0.9em;color:#ff9800;">
                        📊 Current: ${displayCurrent} | Required: ${displayRequired} 
                        <span style="color:#e74c3c;font-weight:bold;">(-${requiredNum - currentQty})</span>
                    </div>
                `;
            }
        };

        div.innerHTML = `
            <input type="checkbox" id="${key}-restock">
            <label for="${key}-restock">${getLabelHTML(false)}</label>
            <span class="required">Needs restock</span>
        `;

        const checkbox = div.querySelector('input[type=checkbox]');
        const label = div.querySelector('label');

        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                // FIXED RESTOCK TARGET LOGIC
                let targetQty;
                if (isPercent) {
                    targetQty = "100"; // Always restock to 100% even if required is 50%
                } else if (isPsi) {
                    targetQty = "2000";
                } else {
                    targetQty = requiredNum.toString();
                }

                state.items[key] = {
                    quantity: targetQty,
                    value: targetQty,
                    checked: true
                };

                div.style.background = '#d4edda';
                div.style.border = '2px solid #28a745';
                label.innerHTML = getLabelHTML(true);
            } else {
                // UNDO LOGIC: Return to original "Incomplete" state
                state.items[key] = {
                    quantity: currentQty.toString(),
                    value: currentQty.toString(),
                    checked: currentQty > 0
                };

                div.style.background = '';
                div.style.border = '';
                label.innerHTML = getLabelHTML(false);
            }
            saveState();
        });

        restockList.appendChild(div);
    });

    // 5. SUMMARY
    const summaryDiv = document.createElement('div');
    summaryDiv.style.cssText = 'text-align:center;margin-top:30px;padding:20px;background:#fff3cd;border-radius:10px;font-size:1.2em;color:#e74c3c;border:2px solid #ffc107;';
    const totalTime = state.endTime && state.startTime ?
        ((new Date(state.endTime) - new Date(state.startTime)) / 1000 / 60).toFixed(1) : 'N/A';
    summaryDiv.innerHTML = `
        📋 <strong>${totalItemsMissing} items BELOW required</strong> - 
        <span style="color:#28a745;">${totalItemsPresent} items OK</span>
        <br><strong>⏱️ Total Checkup Time: ${totalTime} minutes</strong>
    `;
    restockList.appendChild(summaryDiv);
}




function submitFinal() {
    if (isSubmitting) return;
    isSubmitting = true;
    lockButtons();
    showLoading('Submitting final restock...');

    const initialState = JSON.parse(localStorage.getItem('carInitialCheckupState')) || {};
    state.emt = document.getElementById('emt').value;
    state.car = document.getElementById('car').value;
    state.shift = document.getElementById('shift').value;

    const validKeys = new Set();
    pageOrder.forEach(pageName => {
        pages[pageName].forEach(item => {
            if (item.type !== 'section' && !isEquipmentHidden(item)) {
                const key = `${pageName}-${encodeURIComponent(item.name)}`;
                validKeys.add(key);
            }
        });
    });

    const finalData = Array.from(validKeys).map(key => {
        const data = state.items[key] || { quantity: '0', checked: false, value: '' };
        const dashIndex = key.indexOf('-');
        const itemName = decodeURIComponent(key.substring(dashIndex + 1));
        const pageName = key.substring(0, dashIndex);
        const item = pages[pageName]?.find(i => i.name === itemName);

        // ✅ EXTRACT REQUIRED NUMBER
        let requiredNum = 1;
        if (item?.required) {
            if (item.required.includes('psi')) requiredNum = 2000;
            else if (item.required.includes('%')) requiredNum = 50;
            else {
                const numMatch = item.required.match(/^\d+/);
                requiredNum = numMatch ? parseInt(numMatch[0]) : 1;
            }
        }

        // ✅ FINAL QUANTITY (current state)
        let currentQty = 0;
        if (data.quantity && parseInt(data.quantity) > 0) currentQty = parseInt(data.quantity);
        else if (data.value && parseInt(data.value) > 0) currentQty = parseInt(data.value);
        else if (data.checked === true) currentQty = 1;

        // ✅ INITIAL QUANTITY (snapshot from submitInitial)
        const initialData = initialState.items?.[key] || { quantity: '0', checked: false, value: '' };
        let initialQty = 0;
        if (initialData.quantity && parseInt(initialData.quantity) > 0) initialQty = parseInt(initialData.quantity);
        else if (initialData.value && parseInt(initialData.value) > 0) initialQty = parseInt(initialData.value);
        else if (initialData.checked === true) initialQty = 1;

        const wasInitiallyInsufficient = initialQty < requiredNum;
        const finalStatus = (currentQty >= requiredNum)
            ? (wasInitiallyInsufficient ? '✅ RESTOCKED FROM WAREHOUSE' : '✅ PRESENT')
            : '⚠️ WAREHOUSE OUT OF STOCK';

        console.log(`📊 FINAL: ${itemName} | initial=${initialQty} | final=${currentQty} | status=${finalStatus}`);

        return {
            page: pageName,
            start_time: state.startTime || '',
            end_time: state.endTime || '',
            checkup_time: state.endTime && state.startTime ? ((new Date(state.endTime) - new Date(state.startTime)) / 1000 / 60).toFixed(1) + ' minutes' : 'N/A',
            emt: state.emt || '',
            car: state.car || '',
            shift: state.shift || '',
            equipment: state.equipment || '',
            phase: 'FINAL RESTOCK',
            item: itemName,
            final_status: finalStatus,
            quantity: data.quantity || '0',
            psi_value: data.value || '',
            checked: data.checked === true,
            initial_qty: initialQty,      // DEBUG
            final_qty: currentQty         // DEBUG
        };
    });

    submitData(finalData, () => {
        newCheckup();
        hideLoading();
        unlockButtons();
        isSubmitting = false;
    }, () => {
        hideLoading();
        unlockButtons();
        isSubmitting = false;
    });
}





function newCheckup() {
    // RESET STATE IMMEDIATELY
    state = {
        emt: '',
        car: '',
        shift: '',
        equipment: 'Stair Chair',
        items: {},
        currentPage: 'Medical',
        submitted: false,
        startTime: null,
        endTime: null,
        firstCheckTime: null
    };

    firstCheckRecorded = false;
    saveState();

    // UI RESET
    currentPageIndex = 0;
    const emtEl = document.getElementById('emt');
    const carEl = document.getElementById('car');
    const shiftEl = document.getElementById('shift');
    if (emtEl) emtEl.value = '';
    if (carEl) carEl.value = '';
    if (shiftEl) shiftEl.value = '';

    // NAVIGATE TO START
    renderPage('Medical');

    console.log('✅ System Reset: Ready for new checkup.');
    window.scrollTo(0, 0);
}


function backToCheckup() {
    state.submitted = false;
    saveState();
    currentPageIndex = pageOrder.indexOf(state.currentPage || 'Medical');
    renderPage(state.currentPage || 'Medical');
}

function resetAll() {
    if (confirm('Reset everything?')) {
        localStorage.removeItem('carCheckupState');
        location.reload();
    }
}
