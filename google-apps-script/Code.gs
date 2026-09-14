/**
 * UrDU Yoshlar Ittifoqi Portali - Google Apps Script Backend
 * Jadval manzili: https://docs.google.com/spreadsheets/d/1uZuaLsSpWfMrpoRf_IU0xp1fzdxMDfYqurhpDTkjcXk/edit
 * 
 * Ushbu kodni Google Jadvalingizdagi:
 * "Kengaytmalar" (Extensions) -> "Apps Script" oynasiga nusxalab qo'ying
 * va "Deploy" (Yangi tarqatish / New Deployment) qiling.
 */

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", message: "UrDU Yoshlar Ittifoqi API ishlamoqda" })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  // 30 soniyagacha bir vaqtda kelgan so'rovlarni navbatga qo'yish
  try {
    lock.waitLock(30000);
  } catch (t) {
    return createJsonResponse({ result: "error", message: "Server band, qayta urinib ko'ring" });
  }

  try {
    var contents = e.postData ? e.postData.contents : null;
    if (!contents) {
      return createJsonResponse({ result: "error", message: "Bo'sh so'rov yuborildi" });
    }

    var data = JSON.parse(contents);
    var actionType = data.type || data.action || "";
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // ------------------------------------------------------------------------
    // 1. TALABALAR MUROJAATLARI
    // ------------------------------------------------------------------------
    if (actionType === "murojaat") {
      var sheetMurojaat = getOrCreateSheet(ss, "Murojaatlar", [
        "Sana va Vaqt", "F.I.SH", "Fakultet", "Telefon / Telegram", "Murojaat matni"
      ]);
      var now = Utilities.formatDate(new Date(), "Asia/Tashkent", "yyyy-MM-dd HH:mm:ss");
      sheetMurojaat.appendRow([
        now,
        data.name || data.fish || "",
        data.faculty || data.fakultet || "",
        data.phone || data.telefon || "",
        data.message || data.matn || ""
      ]);
      return createJsonResponse({ result: "success", message: "Murojaat qabul qilindi" });
    }

    // ------------------------------------------------------------------------
    // 2. YANGILIKLAR VA E'LONLAR (Yangiliklar varag'i)
    // ------------------------------------------------------------------------
    var newsCols = [
      "id", "title", "date", "category", "badge", "readTime",
      "summary", "content", "image", "actionUrl", "actionLabel"
    ];

    if (actionType === "yangilik_qoshish") {
      var sheetNews = getOrCreateSheet(ss, "Yangiliklar", newsCols);
      var newId = data.id || ("news-" + new Date().getTime());
      
      sheetNews.appendRow([
        newId,
        data.title || "",
        data.date || Utilities.formatDate(new Date(), "Asia/Tashkent", "dd-MMM, yyyy"),
        data.category || "E'lon & Tanlov",
        data.badge || "📌 Muhim E'lon",
        data.readTime || "3 daqiqa",
        data.summary || "",
        data.content || "",
        data.image || "",
        data.actionUrl || "",
        data.actionLabel || "Batafsil maʼlumot"
      ]);
      return createJsonResponse({ result: "success", id: newId, message: "Yangilik qo'shildi" });
    }

    if (actionType === "yangilik_tahrirlash") {
      var sheetNews = getOrCreateSheet(ss, "Yangiliklar", newsCols);
      var id = data.id;
      if (!id) return createJsonResponse({ result: "error", message: "Yangilik ID ko'rsatilmagan" });

      var rowIdx = findRowIndexById(sheetNews, id);
      if (rowIdx === -1) {
        return createJsonResponse({ result: "error", message: "Yangilik topilmadi: " + id });
      }

      var rowData = [
        id,
        data.title || "",
        data.date || "",
        data.category || "",
        data.badge || "",
        data.readTime || "",
        data.summary || "",
        data.content || "",
        data.image || "",
        data.actionUrl || "",
        data.actionLabel || ""
      ];
      sheetNews.getRange(rowIdx, 1, 1, rowData.length).setValues([rowData]);
      return createJsonResponse({ result: "success", message: "Yangilik yangilandi" });
    }

    if (actionType === "yangilik_ochirish") {
      var sheetNews = getOrCreateSheet(ss, "Yangiliklar", newsCols);
      var id = data.id;
      if (!id) return createJsonResponse({ result: "error", message: "Yangilik ID ko'rsatilmagan" });

      var rowIdx = findRowIndexById(sheetNews, id);
      if (rowIdx !== -1) {
        sheetNews.deleteRow(rowIdx);
        return createJsonResponse({ result: "success", message: "Yangilik o'chirildi" });
      }
      return createJsonResponse({ result: "error", message: "O'chirish uchun yangilik topilmadi" });
    }

    // ------------------------------------------------------------------------
    // 3. TO'GARAKLAR VA KLUBLAR (Klublar varag'i)
    // ------------------------------------------------------------------------
    var clubCols = [
      "id", "title", "subtitle", "description", "category", "highlights", "image", "color"
    ];

    if (actionType === "klub_qoshish") {
      var sheetClubs = getOrCreateSheet(ss, "Klublar", clubCols);
      var newClubId = data.id || ("club-" + new Date().getTime());
      var highlightsText = "";
      if (Array.isArray(data.highlights)) {
        highlightsText = data.highlights.join(", ");
      } else if (data.highlights) {
        highlightsText = String(data.highlights);
      }

      sheetClubs.appendRow([
        newClubId,
        data.title || data.name || "",
        data.subtitle || "",
        data.description || data.tavsif || "",
        data.category || data.turi || "To‘garak",
        highlightsText,
        data.image || data.rasm || "",
        data.color || "#38bdf8"
      ]);
      return createJsonResponse({ result: "success", id: newClubId, message: "Klub/to'garak qo'shildi" });
    }

    if (actionType === "klub_tahrirlash") {
      var sheetClubs = getOrCreateSheet(ss, "Klublar", clubCols);
      var id = data.id;
      if (!id) return createJsonResponse({ result: "error", message: "Klub ID ko'rsatilmagan" });

      var rowIdx = findRowIndexById(sheetClubs, id);
      if (rowIdx === -1) {
        return createJsonResponse({ result: "error", message: "Klub topilmadi: " + id });
      }

      var highlightsText = "";
      if (Array.isArray(data.highlights)) {
        highlightsText = data.highlights.join(", ");
      } else if (data.highlights) {
        highlightsText = String(data.highlights);
      }

      var rowData = [
        id,
        data.title || "",
        data.subtitle || "",
        data.description || "",
        data.category || "To‘garak",
        highlightsText,
        data.image || "",
        data.color || "#38bdf8"
      ];
      sheetClubs.getRange(rowIdx, 1, 1, rowData.length).setValues([rowData]);
      return createJsonResponse({ result: "success", message: "Klub yangilandi" });
    }

    if (actionType === "klub_ochirish") {
      var sheetClubs = getOrCreateSheet(ss, "Klublar", clubCols);
      var id = data.id;
      if (!id) return createJsonResponse({ result: "error", message: "Klub ID ko'rsatilmagan" });

      var rowIdx = findRowIndexById(sheetClubs, id);
      if (rowIdx !== -1) {
        sheetClubs.deleteRow(rowIdx);
        return createJsonResponse({ result: "success", message: "Klub o'chirildi" });
      }
      return createJsonResponse({ result: "error", message: "O'chirish uchun klub topilmadi" });
    }

    // ------------------------------------------------------------------------
    // 4. SLIDESHOW (Slideshow varag'i)
    // ------------------------------------------------------------------------
    var slideCols = ["id", "title", "tag", "image"];

    if (actionType === "slide_qoshish") {
      var sheetSlide = getOrCreateSheet(ss, "Slideshow", slideCols);
      var newSlideId = data.id || ("slide-" + new Date().getTime());
      sheetSlide.appendRow([
        newSlideId,
        data.title || "",
        data.tag || "",
        data.image || ""
      ]);
      return createJsonResponse({ result: "success", id: newSlideId, message: "Slayd qo'shildi" });
    }

    if (actionType === "slide_ochirish") {
      var sheetSlide = getOrCreateSheet(ss, "Slideshow", slideCols);
      var id = data.id;
      var rowIdx = findRowIndexById(sheetSlide, id);
      if (rowIdx !== -1) {
        sheetSlide.deleteRow(rowIdx);
        return createJsonResponse({ result: "success", message: "Slayd o'chirildi" });
      }
      return createJsonResponse({ result: "error", message: "Slayd topilmadi" });
    }

    return createJsonResponse({ result: "error", message: "Noma'lum harakat turi: " + actionType });

  } catch (err) {
    return createJsonResponse({ result: "error", message: err.toString() });
  } finally {
    lock.releaseLock();
  }
}

// Yordamchi funksiya: ID bo'yicha qator raqamini topish (1-dan boshlanadi)
function findRowIndexById(sheet, id) {
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim() === String(id).trim()) {
      return i + 1; // 1-indexed for Sheet APIs
    }
  }
  return -1;
}

// Yordamchi funksiya: Agar varaq bo'lmasa uni yaratish va sarlavhalarini qo'yish
function getOrCreateSheet(ss, sheetName, defaultHeaders) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    if (defaultHeaders && defaultHeaders.length > 0) {
      sheet.appendRow(defaultHeaders);
    }
  } else if (sheet.getLastRow() === 0 && defaultHeaders && defaultHeaders.length > 0) {
    sheet.appendRow(defaultHeaders);
  }
  return sheet;
}

// JSON javob qaytarish
function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
