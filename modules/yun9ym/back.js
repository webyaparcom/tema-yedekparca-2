/* hero-4 — Bölünmüş hero (31 Eki 2026, G8-A).
   Yer tutucular: h4stil h4ctalar h4guven h4medya h4rozet — hepsi koşulsuz yerleştirilir (sızıntı yok).
   Metinler: desing {tr,en,ar} (moduleRender {{title}} vb. çözer); güven satırı json.data[] = [{icon, text{}}].
   wmPickLang CF dinamik render'da olmayabilir → güvenli sarmal. Yalnız var + klasik for (rust.md § Modul teknik). */
function h4Dil(v) {
  if (v == null) { return ""; }
  if (typeof v !== "object") { return String(v); }
  if (typeof wmPickLang === "function") { try { return wmPickLang(v, json.lang) || ""; } catch (e) { /* alt satır */ } }
  return v[json.lang] != null ? String(v[json.lang]) : (v.tr != null ? String(v.tr) : (v.en != null ? String(v.en) : ""));
}
function h4Esc(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
/* Güvenli görsel yolu: "/", http(s), data:image kabul; yalın ad → /img/<ad>; javascript: reddedilir */
function h4Url(v) {
  var s = String(v == null ? "" : v).trim();
  if (!s) { return ""; }
  if (/^\s*(javascript|vbscript|file):/i.test(s)) { return ""; }
  if (/^data:/i.test(s)) { return /^data:image\//i.test(s) ? s : ""; }
  if (s.charAt(0) === "/" || /^https?:\/\//i.test(s)) { return s; }
  return "/img/" + s;
}
function h4Href(v) {
  var s = String(v == null ? "" : v).trim();
  if (!s) { return ""; }
  if (/^\s*(javascript|vbscript|data):/i.test(s)) { return ""; }
  if (/^(https?:)?\/\//i.test(s) || /^(mailto:|tel:|#)/i.test(s)) { return s; }
  return wxLangInternalHref(s);
}
function h4Ikon(v, d) {
  var s = String(v == null ? "" : v).trim();
  return /^[a-z0-9_]{1,40}$/.test(s) ? s : d;
}

var h4Des = json.desing || {};

/* --- varyant (beyaz liste) --- */
var h4Stil = String(h4Des.stil || "blob").trim();
if (h4Stil !== "blob" && h4Stil !== "kare-kesit" && h4Stil !== "cerceveli") { h4Stil = "blob"; }

/* --- CTA'lar: metin boşsa düğme basılmaz --- */
var h4Ctalar = "";
var h4Cta1 = h4Dil(h4Des.cta1).trim();
var h4Cta1Url = h4Href(h4Des.cta1_url);
if (h4Cta1 && h4Cta1Url) {
  h4Ctalar += '<a class="modulex-h4-cta modulex-h4-cta--dolgu" href="' + h4Esc(h4Cta1Url) + '">' + h4Esc(h4Cta1) +
    '<span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span></a>';
}
var h4Cta2 = h4Dil(h4Des.cta2).trim();
var h4Cta2Url = h4Href(h4Des.cta2_url);
if (h4Cta2 && h4Cta2Url) {
  h4Ctalar += '<a class="modulex-h4-cta modulex-h4-cta--cerceve" href="' + h4Esc(h4Cta2Url) + '">' + h4Esc(h4Cta2) + "</a>";
}

/* --- güven satırı --- */
var h4Guven = "";
var h4Liste = Array.isArray(json.data) ? json.data : [];
var h4GuvenIc = "";
for (var h4i = 0; h4i < h4Liste.length; h4i++) {
  var h4It = h4Liste[h4i] || {};
  var h4Metin = h4Dil(h4It.text || h4It.name).trim();
  if (!h4Metin) { continue; }
  h4GuvenIc += '<li><span class="material-symbols-outlined" aria-hidden="true">' + h4Ikon(h4It.icon, "check_circle") + "</span><span>" + h4Esc(h4Metin) + "</span></li>";
}
if (h4GuvenIc) { h4Guven = '<ul class="modulex-h4-guven modulex-h4-in">' + h4GuvenIc + "</ul>"; }

/* --- medya: görsel varsa <img>, yoksa yer tutucu --- */
var h4Img = h4Url(h4Des.img);
var h4Alt = h4Dil(h4Des.alt);
var h4Medya = h4Img
  ? '<img class="modulex-h4-img" src="' + h4Esc(h4Img) + '" alt="' + h4Esc(h4Alt) + '" width="1000" height="800" loading="eager" fetchpriority="high" decoding="async" />'
  : '<div class="modulex-h4-ph" role="img" aria-label="' + h4Esc(h4Alt) + '"><span class="material-symbols-outlined" aria-hidden="true">image</span></div>';

/* --- yüzen rozet: değer boşsa basılmaz --- */
var h4Rozet = "";
var h4RozetDeger = h4Dil(h4Des.badge_value).trim();
var h4RozetEtiket = h4Dil(h4Des.badge_label).trim();
if (h4RozetDeger) {
  h4Rozet = '<div class="modulex-h4-rozet"><span class="modulex-h4-rozet-ikon"><span class="material-symbols-outlined" aria-hidden="true">' +
    h4Ikon(h4Des.badge_icon, "trending_up") + '</span></span><span><bdi class="modulex-h4-rozet-deger">' + h4Esc(h4RozetDeger) + "</bdi>" +
    (h4RozetEtiket ? '<span class="modulex-h4-rozet-etiket">' + h4Esc(h4RozetEtiket) + "</span>" : "") + "</span></div>";
}

html = html
  .replace(/\{\{h4stil\}\}/g, function () { return h4Stil; })
  .replace(/\{\{h4ctalar\}\}/g, function () { return h4Ctalar; })
  .replace(/\{\{h4guven\}\}/g, function () { return h4Guven; })
  .replace(/\{\{h4medya\}\}/g, function () { return h4Medya; })
  .replace(/\{\{h4rozet\}\}/g, function () { return h4Rozet; });
