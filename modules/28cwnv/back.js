/* footer-9 — Kurumsal footer (31 Eki 2026).
   Sayfalar: footer-3 kalıbı (pagesetting → page listesi, dil önekli href).
   İletişim: desing.address/phone/email; phone/email boşsa setting.phone/email. Veri yoksa satır (hepsi yoksa sütun) HİÇ basılmaz — uydurma yok.
   Sosyal/yasal: desing.social [{ad,url}] · desing.legal [{text,href}] — boşsa yok. wmPickLang CF dinamik render'da yok → güvenli sarmal. */
function f9Lang(v) {
  if (v == null) return "";
  if (typeof v !== "object") return String(v);
  if (typeof wmPickLang === "function") { try { return wmPickLang(v, json.lang) || ""; } catch (e) { /* alt satır */ } }
  return v[json.lang] != null ? String(v[json.lang]) : (v.tr != null ? String(v.tr) : (v.en != null ? String(v.en) : ""));
}
function f9Esc(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/* --- sayfalar --- */
var f9Pagesetting = (webmakerdata.pagesetting && Array.isArray(webmakerdata.pagesetting.data))
  ? webmakerdata.pagesetting.data.find(function (item) { return item.modulestatus && item.modulestatus.page; })
  : null;
var f9Html = '<li><a class="modulex-f9__link" href="' + wxLangInternalHref("") + '">@home@</a></li>';
if (f9Pagesetting && webmakerdata[f9Pagesetting.path] && Array.isArray(webmakerdata[f9Pagesetting.path].data)) {
  /* 31 Eki 2026: üst sınır desing.maxpages (varsayılan 8; 0 = sınırsız) — 37 sayfalık site tek sütun duvar oluyordu */
  var f9Max = parseInt(json.desing.maxpages, 10); if (isNaN(f9Max)) f9Max = 8;
  var f9Sayac = 0;
  for (var f9Page of webmakerdata[f9Pagesetting.path].data) {
    if (f9Max > 0 && f9Sayac >= f9Max) break;
    if (f9Page.status === "play") {
      f9Sayac++;
      f9Html += '<li><a class="modulex-f9__link" href="' + wxLangInternalHref(f9Page.pathnext || f9Page.path || "") + '">' + f9Lang(f9Page.name) + "</a></li>";
    }
  }
}

/* --- iletişim --- */
var f9Setting = webmakerdata.setting || {};
var f9Address = f9Lang(json.desing.address).trim();
var f9Phone = (f9Lang(json.desing.phone).trim()) || (typeof f9Setting.phone === "string" ? f9Setting.phone.trim() : "");
var f9Email = (f9Lang(json.desing.email).trim()) || (typeof f9Setting.email === "string" ? f9Setting.email.trim() : "");
var f9ContactItems = "";
if (f9Address) f9ContactItems += '<li><span class="material-symbols-outlined" aria-hidden="true">location_on</span><span>' + f9Esc(f9Address) + "</span></li>";
if (f9Phone) f9ContactItems += '<li><span class="material-symbols-outlined" aria-hidden="true">call</span><a class="modulex-f9__link" href="tel:' + f9Phone.replace(/[^+\d]/g, "") + '" dir="ltr">' + f9Esc(f9Phone) + "</a></li>";
if (f9Email) f9ContactItems += '<li><span class="material-symbols-outlined" aria-hidden="true">mail</span><a class="modulex-f9__link" href="mailto:' + f9Esc(f9Email) + '">' + f9Esc(f9Email) + "</a></li>";
var f9ContactHtml = f9ContactItems
  ? '<div class="modulex-f9__col modulex-f9__contact"><h3 class="modulex-f9__title">' + f9Esc(f9Lang(json.desing.title_contact)) + '</h3><ul class="modulex-f9__list">' + f9ContactItems + "</ul></div>"
  : "";

/* --- sosyal --- */
var f9SocialItems = "";
if (Array.isArray(json.desing.social)) {
  for (var f9S of json.desing.social) {
    var f9Ad = f9S ? f9Lang(f9S.ad || f9S.name).trim() : "";
    var f9Url = f9S && typeof f9S.url === "string" ? f9S.url.trim() : "";
    if (f9Ad && f9Url) f9SocialItems += '<a class="modulex-f9__chip" href="' + f9Esc(f9Url) + '" target="_blank" rel="noopener noreferrer">' + f9Esc(f9Ad) + "</a>";
  }
}
var f9SocialHtml = f9SocialItems
  ? '<div class="modulex-f9__col modulex-f9__social-col"><h3 class="modulex-f9__title">' + f9Esc(f9Lang(json.desing.title_social)) + '</h3><div class="modulex-f9__social">' + f9SocialItems + "</div></div>"
  : "";

/* --- yasal --- */
var f9LegalItems = "";
if (Array.isArray(json.desing.legal)) {
  for (var f9L of json.desing.legal) {
    var f9Text = f9L ? f9Lang(f9L.text || f9L.name).trim() : "";
    var f9Href = f9L && typeof f9L.href === "string" ? f9L.href.trim() : (f9L && typeof f9L.url === "string" ? f9L.url.trim() : "");
    if (f9Text && f9Href) f9LegalItems += '<li><a class="modulex-f9__link" href="' + f9Esc(wxLangInternalHref(f9Href)) + '">' + f9Esc(f9Text) + "</a></li>";
  }
}
var f9LegalHtml = f9LegalItems ? '<ul class="modulex-f9__legal">' + f9LegalItems + "</ul>" : "";

/* mobil alt bar (12 Kas 2026, kullanıcı emri): app benzeri ANA MENÜ — ana sayfa + play sayfaları (en çok 5 öğe, ikon+etiket).
   Alt barda Ara/E-posta/Dil YOK — dil tek yerde: üst menü (menu-9) bandı/çekmecesi + footer alt satırı. */
var F9_IKON = [
  [/(ana\s?sayfa|home)/i, "home"],
  [/\u00fc?r\u00fcn|product|katalog/i, "inventory_2"],
  [/hak|about/i, "storefront"],
  [/ileti?si?m|contact|temas/i, "mail"],
  [/haber|news|blog|g\u00fcncel|guncel/i, "newspaper"],
  [/fiyat|price|liste/i, "request_quote"],
  [/sipari|order|satin|sat\u0131n/i, "shopping_basket"],
  [/kargo|shipping|teslimat/i, "local_shipping"],
  [/soru|faq|question/i, "help"],
  [/video/i, "videocam"]
];
function f9Ikon(ad) {
  for (var fi = 0; fi < F9_IKON.length; fi++) { if (F9_IKON[fi][0].test(ad)) { return F9_IKON[fi][1]; } }
  return "menu_book";
}
var f9BarOgeler = [{ ad: "@home@", href: wxLangInternalHref(""), aktif: !page || !page.path }];
if (f9Pagesetting && webmakerdata[f9Pagesetting.path] && Array.isArray(webmakerdata[f9Pagesetting.path].data)) {
  for (var f9P of webmakerdata[f9Pagesetting.path].data) {
    if (f9BarOgeler.length >= 5) { break; }
    if (f9P.status !== "play") { continue; }
    var f9Pad = f9Lang(f9P.name).trim();
    if (!f9Pad) { continue; }
    f9BarOgeler.push({ ad: f9Esc(f9Pad), href: wxLangInternalHref(f9P.pathnext || f9P.path || ""), aktif: page && page.path === f9P.path });
  }
}
var f9Bar = f9BarOgeler.map(function (o) {
  return '<a class="modulex-f9__bar-oge" href="' + o.href + '"' + (o.aktif ? ' aria-current="page"' : "") + '>' +
    '<span class="material-symbols-outlined" aria-hidden="true">' + f9Ikon(o.ad) + "</span>" +
    '<span class="modulex-f9__bar-ad">' + o.ad + "</span></a>";
}).join("");
var f9BarHtml = '<nav class="modulex-f9__bar" aria-label="' + (json.lang === "tr" ? "Ana men\u00fc" : "Main menu") + '">' + f9Bar + "</nav>";

/* --- yerleştirme (her placeholder koşulsuz) --- */
html = html
  .replace(/{{barhtml}}/g, f9BarHtml)
  .replace(/{{html}}/g, f9Html)
  .replace(/{{contacthtml}}/g, f9ContactHtml)
  .replace(/{{socialhtml}}/g, f9SocialHtml)
  .replace(/{{legalhtml}}/g, f9LegalHtml)
  .replace(/{{year}}/g, String(new Date().getFullYear()));
/* 31 Eki 2026: sütun sayısı sınıfı — iletişim/sosyal gizliyse grid 4 yerine 2/3 sütun olur (boş hücre kalmaz) */
var f9Cols = 2 + (f9ContactHtml ? 1 : 0) + (f9SocialHtml ? 1 : 0);
html = html.replace('class="modulex-f9__main"', 'class="modulex-f9__main modulex-f9__main--c' + f9Cols + '"');
if (!f9Lang(json.desing.about).trim()) {
  html = html.replace(/<p class="modulex-f9__about">[\s\S]*?<\/p>\s*/, "");
}
if (json.desing.logo_plate === true || json.desing.logo_plate === "true") {
  html = html.replace('class="modulex-f9__logo"', 'class="modulex-f9__logo modulex-f9__logo--plate"');
}
