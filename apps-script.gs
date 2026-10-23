// CONFIGURATION
// Paste your spreadsheet ID here (from the sheet URL: docs.google.com/spreadsheets/d/<THIS_PART>/edit)
// If left blank, the script uses the spreadsheet it is bound to.
const SPREADSHEET_ID = '';

function getSpreadsheet() {
  if (SPREADSHEET_ID) {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

function doPost(e) {
  if (!e || (!e.postData && !e.parameter)) {
    console.log('⚠️ No POST data received');
    return ContentService.createTextOutput('ERROR: No POST data received');
  }

  // --- ITEM GUIDES: save how-to-check text for a single item ---
  if (e.parameter && e.parameter.action === 'saveGuide') {
    return saveGuideEntry(e);
  }

  try {
    const ss = getSpreadsheet();
    if (!ss) return ContentService.createTextOutput('ERROR: No spreadsheet found - check SPREADSHEET_ID or bind the script');
    // Use the first sheet for data logging
    const sheet = ss.getSheets()[0];

    // --- 1. CLEAN KEY GENERATION ---
    const makeKey = (page, item) => {
      if (!page || !item) return 'unknown';
      return (page.toString() + '-' + item.toString())
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '')
        .trim();
    };

    // --- 2. SETUP HEADERS ---
    if (sheet.getLastRow() === 0) {
      writeHeaders(sheet);
    }

    // --- 3. DATA PARSING ---
    // e.postData.contents is the most reliable source for large payloads.
    // e.parameter.data is used as fallback.
    let rawData = '';
    if (e.postData && e.postData.contents) {
      try {
        rawData = decodeURIComponent(e.postData.contents);
      } catch (err) {
        rawData = e.postData.contents;
      }
      if (rawData.startsWith('data=')) rawData = rawData.substring(5);
    }
    if (!rawData && e.parameter && e.parameter.data) {
      rawData = e.parameter.data;
    }

    let data;
    try {
      data = JSON.parse(rawData.trim());
    } catch (error) {
      console.error('❌ Parse error:', error.toString(), '| rawData:', rawData.slice(0, 200));
      return ContentService.createTextOutput('ERROR: Parse failed - ' + error.toString());
    }

    const phase = data[0].phase;
    const emt = data[0].emt;
    const car = data[0].car;
    const equipment = data[0].equipment || '';
    const shift = data[0].shift || 'Unknown';
    const cacheKey = 'pending_' + emt + '_' + car;

    // --- 4. PHASE 1: INITIAL CHECKUP (Save to Cache Sheet) ---
    if (phase === 'INITIAL CHECKUP') {
      saveToCacheSheet(ss, cacheKey, JSON.stringify(data));
      console.log('💾 Initial state cached for ' + emt);
      return ContentService.createTextOutput('OK');
    }

    // --- 5. PHASE 2: FINAL RESTOCK ---
    const finalData = data;

    const validateDate = (dateStr) => {
      if (!dateStr || dateStr === "N/A" || dateStr === "undefined") return new Date();
      const d = new Date(dateStr);
      return isNaN(d.getTime()) ? new Date() : d;
    };

    const startTime = validateDate(finalData[0].start_time);
    const endTime = validateDate(finalData[0].end_time);
    const checkupTime = finalData[0].checkup_time || 'N/A';

    const pendingDataRaw = getFromCacheSheet(ss, cacheKey);
    const initialData = pendingDataRaw ? JSON.parse(pendingDataRaw) : [];

    // --- 6. REQUIRED QUANTITIES MAPPING ---
    const requiredQuantities = {
      'BVM Adult': '1',
      'BVM Adult Oxygen Reservoir': '1',
      'BVM Pediatric': '1',
      'BVM Mask Adult': '3 (Large Adult - Small Adult - Large Child)',
      'BVM Mask Pediatric': '2 (Small Child - Infant)',
      'HEPA Filter': '2',
      'Manual Suction Unit': '1',
      'Suction Pipes (with adapter)': '2 (Thin - Thick)',
      'Suction Tubes': '4 (Black - Blue - Green - Orange)',
      'Suction Connector': '1',
      'Airway Cannula (OPA)': '8 (40mm - 110mm)',
      'Oxygen D-Size Bottle (Small)': '2000 psi',
      'Oxygen Regulator for Bottle': '1',
      'Oxygen Keychain': '1',
      'Oxygen Face Mask Adult': '3',
      'Oxygen Face Mask Pediatric': '1',
      'Oxygen Non-rebreather Mask Adult': '3',
      'Oxygen Non-rebreather Mask Pediatric': '1',
      'Oxygen Nasal Cannula Adult': '3',
      'Oxygen Nasal Cannula Pediatric': '1',
      'Oxygen Connecting Tube': '3',
      'Shygmomanometer': '1',
      'Shygmomanometer Cuffs': '4 (Large Adult - Adult - Child - Infant)',
      'Stethoscope': '1',
      'Pulse Oximeter': '1',
      'Thermometer Strips': '10',
      'Glucometer': '1',
      'Glucometer Strips': '10',
      'Glucometer Needles': '10',
      'Cloth Scissors': '1',
      'Trash Bags Small': '10',
      'Head Immobilizer': '1',
      'Head Immobilizer Fixations': '2',
      'Head Immobilizer Straps': '2',
      'Spider Belts': '1',
      'Speed Clips': '4',
      'Pelvic Belt': '1',
      'KTD': '1',
      'Ducting Tape': '50% at least',
      'Elastic Bandage Small': '5',
      'Elastic Bandage Medium': '5',
      'Elastic Bandage Large': '5',
      'Compressive Bandage': '5',
      'Triangular Bandage': '5',
      'Band Aids': '10',
      'Sterile Gauze (Set of 5)': '5',
      'Ice Bag': '2',
      'Inongan/DHR': '1',
      'Tourniquet': '1',
      'Chest Seal': '1',
      'Foldable Stretcher': '1',
      'Stair Chair': '1',
      'EZ-Glide': '1',
      'Planchette': '1',
      'Scoop Stretcher': '1',
      'Spare Belts': '3',
      'Vacuum Mattress': '1',
      'Vacuum Mattress Deflator': '1',
      'Spinal Board': '1',
      'Rigid Splints': '3',
      'Vacuum Splints': '3',
      'KED': '1',
      'KED Straps': '2',
      'KED Pillow': '1',
      'Cervical Collar Adult': '2',
      'Cervical Collar Pediatric': '2',
      'Oxygen E-Size Bottle': '2000 psi',

      'Oxygen Spare Bottle Large': '1',
      'Oxygen Spare Bottle Small': '1',
      'Electrical Suction': '1',
      'AED': '1',
      'AED Battery Level': '100%',
      'AED Patches': '2',
      'CPR Board': '1',
      'Nitrile Gloves Small (Rear)': '50% at least',
      'Nitrile Gloves Medium (Rear)': '50% at least',
      'Nitrile Gloves Large (Rear)': '50% at least',
      'Nitrile Gloves Large (Front)': '50% at least',
      'Surgical Face Mask (Front)': '50% at least',
      'Intermediate PPE Kit (for 4 EMTs)': '3',
      'Intermediate Plus Coverall Medium': '1',
      'Intermediate Plus Coverall Large': '1',
      'Intermediate Plus Coverall X-Large': '1',
      'Protective Glasses or Goggles': '4',
      'N95 Face Mask': '4',
      'Trash Bags Large': '5',
      'Descosept or Cleanisept Spray Bottle': '1',
      'Paper Towels': '1',
      'Hand Sanitizer (Front)': '50% at least',
      'Disposable Blanket': '3',
      'Regular Blanket': '2',
      'Male Urinal': '1',
      'Female Urinal': '1',
      'Bed Pan': '1',
      'Serum': '1',
      'Blue Pad': '3',
      'Body Bag': '2',
      'Obstetric Kit': '1',
      'Head Lamp': '4',
      'Disclaimer Report (Front)': '5'
    };

    // --- 7. ALL ITEMS LIST ---
    const allItems = [
      {page: 'Medical', item: 'BVM Adult'},
      {page: 'Medical', item: 'BVM Adult Oxygen Reservoir'},
      {page: 'Medical', item: 'BVM Pediatric'},
      {page: 'Medical', item: 'BVM Mask Adult'},
      {page: 'Medical', item: 'BVM Mask Pediatric'},
      {page: 'Medical', item: 'HEPA Filter'},
      {page: 'Medical', item: 'Manual Suction Unit'},
      {page: 'Medical', item: 'Suction Pipes (with adapter)'},
      {page: 'Medical', item: 'Suction Tubes'},
      {page: 'Medical', item: 'Suction Connector'},
      {page: 'Medical', item: 'Airway Cannula (OPA)'},
      {page: 'Medical', item: 'Oxygen D-Size Bottle (Small)'},
      {page: 'Medical', item: 'Oxygen Regulator for Bottle'},
      {page: 'Medical', item: 'Oxygen Keychain'},
      {page: 'Medical', item: 'Oxygen Face Mask Adult'},
      {page: 'Medical', item: 'Oxygen Face Mask Pediatric'},
      {page: 'Medical', item: 'Oxygen Non-rebreather Mask Adult'},
      {page: 'Medical', item: 'Oxygen Non-rebreather Mask Pediatric'},
      {page: 'Medical', item: 'Oxygen Nasal Cannula Adult'},
      {page: 'Medical', item: 'Oxygen Nasal Cannula Pediatric'},
      {page: 'Medical', item: 'Oxygen Connecting Tube'},
      {page: 'Medical', item: 'Shygmomanometer'},
      {page: 'Medical', item: 'Shygmomanometer Cuffs'},
      {page: 'Medical', item: 'Stethoscope'},
      {page: 'Medical', item: 'Pulse Oximeter'},
      {page: 'Medical', item: 'Thermometer Strips'},
      {page: 'Medical', item: 'Glucometer'},
      {page: 'Medical', item: 'Glucometer Strips'},
      {page: 'Medical', item: 'Glucometer Needles'},
      {page: 'Medical', item: 'Cloth Scissors'},
      {page: 'Medical', item: 'Trash Bags Small'},
      {page: 'Trauma', item: 'Head Immobilizer'},
      {page: 'Trauma', item: 'Head Immobilizer Fixations'},
      {page: 'Trauma', item: 'Head Immobilizer Straps'},
      {page: 'Trauma', item: 'Spider Belts'},
      {page: 'Trauma', item: 'Speed Clips'},
      {page: 'Trauma', item: 'Pelvic Belt'},
      {page: 'Trauma', item: 'KTD'},
      {page: 'Trauma', item: 'Ducting Tape'},
      {page: 'Trauma', item: 'Elastic Bandage Small'},
      {page: 'Trauma', item: 'Elastic Bandage Medium'},
      {page: 'Trauma', item: 'Elastic Bandage Large'},
      {page: 'Trauma', item: 'Compressive Bandage'},
      {page: 'Trauma', item: 'Triangular Bandage'},
      {page: 'Trauma', item: 'Band Aids'},
      {page: 'Trauma', item: 'Sterile Gauze (Set of 5)'},
      {page: 'Trauma', item: 'Ice Bag'},
      {page: 'Trauma', item: 'Inongan/DHR'},
      {page: 'Trauma', item: 'Tourniquet'},
      {page: 'Trauma', item: 'Chest Seal'},
      {page: 'Ambulance Equipment', item: 'Foldable Stretcher'},
      {page: 'Ambulance Equipment', item: 'Stair Chair'},
      {page: 'Ambulance Equipment', item: 'EZ-Glide'},
      {page: 'Ambulance Equipment', item: 'Planchette'},
      {page: 'Ambulance Equipment', item: 'Scoop Stretcher'},
      {page: 'Ambulance Equipment', item: 'Spare Belts'},
      {page: 'Ambulance Equipment', item: 'Vacuum Mattress'},
      {page: 'Ambulance Equipment', item: 'Vacuum Mattress Deflator'},
      {page: 'Ambulance Equipment', item: 'Spinal Board'},
      {page: 'Ambulance Equipment', item: 'Rigid Splints'},
      {page: 'Ambulance Equipment', item: 'Vacuum Splints'},
      {page: 'Ambulance Equipment', item: 'KED'},
      {page: 'Ambulance Equipment', item: 'KED Straps'},
      {page: 'Ambulance Equipment', item: 'KED Pillow'},
      {page: 'Ambulance Equipment', item: 'Cervical Collar Adult'},
      {page: 'Ambulance Equipment', item: 'Cervical Collar Pediatric'},
      {page: 'Ambulance Equipment', item: 'Oxygen E-Size Bottle'},
      {page: 'Ambulance Equipment', item: 'Oxygen Regulator for Bottle'},

      {page: 'Ambulance Equipment', item: 'Oxygen Keychain'},
      {page: 'Ambulance Equipment', item: 'Oxygen Spare Bottle Large'},
      {page: 'Ambulance Equipment', item: 'Oxygen Spare Bottle Small'},
      {page: 'Ambulance Equipment', item: 'Electrical Suction'},
      {page: 'Ambulance Equipment', item: 'Suction Tubes'},
      {page: 'Ambulance Equipment', item: 'Suction Connector'},
      {page: 'Ambulance Equipment', item: 'AED'},
      {page: 'Ambulance Equipment', item: 'AED Battery Level'},
      {page: 'Ambulance Equipment', item: 'AED Patches'},
      {page: 'Ambulance Equipment', item: 'CPR Board'},
      {page: 'Ambulance Equipment', item: 'Nitrile Gloves Small (Rear)'},
      {page: 'Ambulance Equipment', item: 'Nitrile Gloves Medium (Rear)'},
      {page: 'Ambulance Equipment', item: 'Nitrile Gloves Large (Rear)'},
      {page: 'Ambulance Equipment', item: 'Nitrile Gloves Large (Front)'},
      {page: 'Ambulance Equipment', item: 'Surgical Face Mask (Front)'},
      {page: 'Ambulance Equipment', item: 'Intermediate PPE Kit (for 4 EMTs)'},
      {page: 'Ambulance Equipment', item: 'Intermediate Plus Coverall Medium'},
      {page: 'Ambulance Equipment', item: 'Intermediate Plus Coverall Large'},
      {page: 'Ambulance Equipment', item: 'Intermediate Plus Coverall X-Large'},
      {page: 'Ambulance Equipment', item: 'Protective Glasses or Goggles'},
      {page: 'Ambulance Equipment', item: 'N95 Face Mask'},
      {page: 'Ambulance Equipment', item: 'Trash Bags Large'},
      {page: 'Ambulance Equipment', item: 'Trash Bags Small'},
      {page: 'Ambulance Equipment', item: 'Descosept or Cleanisept Spray Bottle'},
      {page: 'Ambulance Equipment', item: 'Paper Towels'},
      {page: 'Ambulance Equipment', item: 'Hand Sanitizer (Front)'},
      {page: 'Ambulance Equipment', item: 'Disposable Blanket'},
      {page: 'Ambulance Equipment', item: 'Regular Blanket'},
      {page: 'Ambulance Equipment', item: 'Male Urinal'},
      {page: 'Ambulance Equipment', item: 'Female Urinal'},
      {page: 'Ambulance Equipment', item: 'Bed Pan'},
      {page: 'Ambulance Equipment', item: 'Serum'},
      {page: 'Ambulance Equipment', item: 'Blue Pad'},
      {page: 'Ambulance Equipment', item: 'Body Bag'},
      {page: 'Ambulance Equipment', item: 'Obstetric Kit'},
      {page: 'Ambulance Equipment', item: 'Head Lamp'},
      {page: 'Ambulance Equipment', item: 'Disclaimer Report (Front)'}
    ];


    const initialMap = {};
    initialData.forEach(r => { initialMap[makeKey(r.page, r.item)] = r; });

    const finalMap = {};
    finalData.forEach(r => { finalMap[makeKey(r.page, r.item)] = r; });

    // Only the transport equipment selected in the app is written to the sheet:
    // Stair Chair selected -> Foldable Stretcher row is skipped (and vice versa).
    // No selection -> both rows are written (as before).
    const transportItems = ['Foldable Stretcher', 'Stair Chair'];
    const itemsToWrite = allItems.filter(itemInfo => {
      if (!transportItems.includes(itemInfo.item)) return true;
      if (!equipment) return true;
      return itemInfo.item === equipment;
    });

    function getNumericValue(qty) {
      if (!qty || qty === '0' || qty === '') return 0;

      let match = qty.toString().match(/\d+/);
      if (match) {
        return parseInt(match[0], 10);
      }
      return 0;
    }

    const finalRows = [];

    itemsToWrite.forEach(itemInfo => {
      const key = makeKey(itemInfo.page, itemInfo.item);
      const initialRow = initialMap[key];
      const finalRow = finalMap[key];
      const reqTxt = requiredQuantities[itemInfo.item] || '1';
      const reqNum = getNumericValue(reqTxt);

      const isPercent = reqTxt.includes('%');
      const isPsi = reqTxt.toLowerCase().includes('psi');

      // --- 1. GET INITIAL DATA ---
      let initQtyRaw = "0";
      let initIsChecked = false;
      if (initialRow) {
        initIsChecked = initialRow.checked === true || initialRow.checked === "true";
        initQtyRaw = initialRow.quantity ?? initialRow.psi_value ?? (initIsChecked ? "1" : "0");
      }
      let initNum = getNumericValue(initQtyRaw);

      let initStatus = (initNum >= reqNum || (initIsChecked && !isPercent && !isPsi)) ? '✅ PRESENT' : '❌ INSUFFICIENT';

      // --- 2. GET FINAL DATA ---
      let finNum = initNum;
      let finIsChecked = false;

      if (finalRow) {
        finIsChecked = finalRow.checked === true || finalRow.checked === "true";
        let finalValRaw = finalRow.quantity ?? finalRow.psi_value ?? (finIsChecked ? "1" : "0");
        finNum = getNumericValue(finalValRaw);
      }

      // --- 3. FINAL LOGIC ---
      let finStatus = '';

      if (initStatus === '✅ PRESENT') {
        finStatus = '✅ PRESENT';
      } else {
        const isNowFull = finNum >= (isPercent ? 100 : reqNum) || finIsChecked;

        if (isNowFull) {
          finStatus = '✅ RESTOCKED';
          if (isPercent) finNum = 100;
          else if (isPsi) finNum = 2000;
          else if (finNum < reqNum) finNum = reqNum;
        } else {
          finStatus = '⚠️ WAREHOUSE OUT OF STOCK';
        }
      }

      // --- 4. FORMAT DISPLAY ---
      let displayInit = initNum.toString() + (isPsi ? ' psi' : isPercent ? '%' : '');
      let displayFin = finNum.toString() + (isPsi ? ' psi' : isPercent ? '%' : '');

      finalRows.push([
        startTime,
        endTime,
        checkupTime,
        emt,
        car,
        shift,
        itemInfo.page,
        itemInfo.item,
        initStatus,
        finStatus,
        displayInit,
        displayFin,
        reqTxt
      ]);
    });

    // --- 9. FINAL SHEET WRITE ---
    // Leave 2 empty rows between each submission's table so they are easy to distinguish.
    // First submission starts right after the header; later ones start 2 rows below the last one.
    const firstDataRow = sheet.getLastRow() <= 1 ? 2 : sheet.getLastRow() + 3;
    const outputRange = sheet.getRange(firstDataRow, 1, finalRows.length, 13);
    outputRange.setValues(finalRows);

    // Table borders around the whole submission block
    outputRange.setBorder(true, true, true, true, true, true);

    // Fixed column widths so nothing is hidden. Runs on the WHOLE sheet, so
    // it also fixes rows written by older versions.
    autoSizeColumns(sheet);

    deleteFromCacheSheet(ss, cacheKey);

    console.log('✅ Final report written successfully for ' + car);
    return ContentService.createTextOutput('OK');

  } catch (err) {
    console.error('❌ CRITICAL ERROR:', err.toString());
    return ContentService.createTextOutput('ERROR: ' + err.toString());
  }
}

// --- ITEM GUIDES ---
// Stores the "how to properly check this item" text in the spreadsheet so it is
// shared by every user. Lives in a hidden-ish sheet named GUIDES.
function getGuidesSheet(ss, createIfMissing) {
  let sheet = ss.getSheetByName('GUIDES');
  if (!sheet && createIfMissing) {
    sheet = ss.insertSheet('GUIDES');
    sheet.appendRow(['Key', 'Page', 'Item', 'Guide', 'Updated']);
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 300);
    sheet.setColumnWidth(2, 160);
    sheet.setColumnWidth(3, 245);
    sheet.setColumnWidth(4, 600);
    sheet.setColumnWidth(5, 160);
    sheet.getRange(1, 1, 1, 5)
      .setBackground('#1565c0')
      .setFontColor('white')
      .setFontWeight('bold');
  }
  return sheet;
}

function saveGuideEntry(e) {
  try {
    const ss = getSpreadsheet();
    const payload = JSON.parse(e.parameter.guide || '{}');
    if (!payload.key) return ContentService.createTextOutput('ERROR: missing key');

    const sheet = getGuidesSheet(ss, true);
    const values = sheet.getDataRange().getValues();

    let targetRow = -1;
    for (let i = 0; i < values.length; i++) {
      if (values[i][0] === 'Key') continue;
      if (values[i][0] === payload.key) { targetRow = i + 1; break; }
    }

    const row = [payload.key, payload.page || '', payload.item || '', payload.text || '', new Date()];

    if (targetRow > 0) {
      sheet.getRange(targetRow, 1, 1, 5).setValues([row]);
    } else {
      sheet.appendRow(row);
    }

    console.log('📖 Guide saved for ' + payload.key);
    return ContentService.createTextOutput('OK');
  } catch (err) {
    console.error('❌ Guide save failed:', err.toString());
    return ContentService.createTextOutput('ERROR: ' + err.toString());
  }
}

function getGuidesJson() {
  const empty = ContentService.createTextOutput(JSON.stringify({}))
    .setMimeType(ContentService.MimeType.JSON);
  try {
    const ss = getSpreadsheet();
    const sheet = getGuidesSheet(ss, false);
    if (!sheet) return empty;

    const out = {};
    const values = sheet.getDataRange().getValues();
    values.forEach((row, i) => {
      if (row[0] === 'Key' || !row[0]) return;
      out[row[0]] = row[3] || '';
    });

    return ContentService.createTextOutput(JSON.stringify(out))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    console.error('❌ Guide load failed:', err.toString());
    return empty;
  }
}

function writeHeaders(sheet) {
  const headers = [
    'Start_Time', 'End_Time', 'Checkup_Time', 'EMT', 'Car', 'Shift',
    'Category', 'Item', 'Initial_Status', 'Final_Status',
    'Initial_Quantity', 'Final_Quantity', 'Required_Quantity'
  ];
  sheet.getRange(1, 1, 1, 13).setValues([headers]);
  sheet.getRange(1, 1, 1, 13)
    .setBackground('#c62828')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, true, true);
}

// Fixed column widths per column type - deterministic, tight, single-line.
// Sized so the longest values fit fully on one line (no wrapping).
function autoSizeColumns(sheet) {
  const widths = [135, 135, 125, 95, 100, 90, 160, 245, 140, 240, 125, 115, 310];
  for (let c = 0; c < widths.length; c++) {
    sheet.setColumnWidth(c + 1, widths[c]);
  }
  // No wrapping: every cell stays single-line, rows keep default height.
  // Center every cell horizontally and vertically (applies to the whole sheet,
  // so older rows get fixed too).
  sheet.getDataRange()
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setWrap(false);
}

function saveToCacheSheet(ss, key, value) {
  let cacheSheet = ss.getSheetByName('SYSTEM_CACHE');
  if (!cacheSheet) {
    cacheSheet = ss.insertSheet('SYSTEM_CACHE');
    cacheSheet.hideSheet();
  }
  deleteFromCacheSheet(ss, key);
  cacheSheet.appendRow([key, value, new Date()]);
}

function getFromCacheSheet(ss, key) {
  const cacheSheet = ss.getSheetByName('SYSTEM_CACHE');
  if (!cacheSheet) return null;
  const vals = cacheSheet.getDataRange().getValues();
  for (let i = 0; i < vals.length; i++) {
    if (vals[i][0] === key) return vals[i][1];
  }
  return null;
}

function deleteFromCacheSheet(ss, key) {
  const cacheSheet = ss.getSheetByName('SYSTEM_CACHE');
  if (!cacheSheet) return;
  const vals = cacheSheet.getDataRange().getValues();
  for (let i = vals.length - 1; i >= 0; i--) {
    if (vals[i][0] === key) cacheSheet.deleteRow(i + 1);
  }
}

// TEST: open your /exec URL in a browser - it should show the deployment + spreadsheet info
// Also re-applies column widths/centering to the WHOLE sheet, so older tables get fixed too.
function doGet(e) {
  // --- ITEM GUIDES: fetch every saved how-to-check text ---
  if (e && e.parameter && e.parameter.action === 'getGuides') {
    return getGuidesJson();
  }

  try {
    const ss = getSpreadsheet();
    autoSizeColumns(ss.getSheets()[0]);
    return ContentService.createTextOutput(
      'DEPLOYMENT OK ✅ | VERSION: 5 (car-checkup: widths on old tables) | Spreadsheet ID: ' + ss.getId() +
      ' | First sheet: ' + ss.getSheets()[0].getName() +
      ' | Rows: ' + ss.getSheets()[0].getLastRow()
    );
  } catch (err) {
    return ContentService.createTextOutput('ERROR: ' + err.toString());
  }
}

function doOptions(e) {
  return ContentService.createTextOutput(JSON.stringify({status: 'CORS_OK'}))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
}
