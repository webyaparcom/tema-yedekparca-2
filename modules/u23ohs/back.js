/* referans-dikey-akis — Referans Dikey Akış — farklı hızda yukarı akan logo sütunları (15 Kas 2026 · mcp:webmaker/20261115-224259-bpa9 · D17).
   Solda başlık bölümü; sağda üç dikey sütun farklı hız ve yönde akar (orta sütun ters), üst/alt kenar yumuşar, üzerine gelince durur. Mobilde durağan ızgara.
   Üretici: scripts/modul-fabrika (aile referans) — elle düzenleme yerine tanımı değiştirip yeniden üret.
   Veri: data: [{ ad, img?, url?, sektor?, metin?, kisi?, yil? }] — metinler dil sözlüğü (marka adı düz metin de olur); görsel yoksa ad yazı logosu olarak basılır; adı da görseli de olmayan satır atlanır. */
const P = "modulex-referans-dikey-akis";
const IMG_KOK = `/img/${json.id}/`;
/* --- ortak ön ek (scripts/modul-fabrika/on-ek.js) — dil · güvenlik · sayı yardımcıları --- */
const pick = (v) => {
  if (v == null) return "";
  if (typeof v !== "object") return String(v);
  if (typeof wmPickLang === "function") { try { return wmPickLang(v, json.lang) || ""; } catch (e) { /* alt satır */ } }
  return String(v[json.lang] ?? Object.values(v)[0] ?? "");
};
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const medyaUrl = (v) => {
  const s = String(v ?? "").trim();
  if (!s || /^\s*(javascript|vbscript|file):/i.test(s)) return "";
  if (/^data:/i.test(s)) return /^data:(image|video|audio)\//i.test(s) ? s : "";
  if (s.startsWith("/") || /^https?:\/\//i.test(s)) return s;
  return `${IMG_KOK}${s}`;
};
const href = (v) => {
  const s = String(v ?? "").trim();
  if (!s || /^\s*(javascript|vbscript|data):/i.test(s)) return "";
  if (/^(https?:)?\/\//i.test(s) || /^(mailto:|tel:|#)/i.test(s)) return s;
  return wxLangInternalHref(s);
};
const dogru = (v, d) => (v === undefined || v === null || v === "") ? d : !(v === false || v === "false" || v === 0 || v === "0");
const ikonAd = (v) => String(v ?? "").trim().replace(/[^a-z0-9_]/gi, "");
const satirlar = (s) => esc(s).replace(/\r?\n/g, "<br />");
/* ilk dolu alan: yeni ad önce, eski kuşak şablonun adı yedek (G6 yalnız path değiştirerek takas eder) */
const ilk = (o, ks) => {
  for (const k of ks) {
    const v = o == null ? undefined : o[k];
    if (v == null || v === "") continue;
    if (typeof v === "object" && !Array.isArray(v) && !Object.keys(v).length) continue;
    return v;
  }
  return "";
};
const metinAl = (o, ks) => pick(ilk(o, ks)).trim();
const { desing: des = {} } = json;
const setting = webmakerdata?.setting ?? {};
const veri = Array.isArray(json.data) ? json.data : [];
const dil = String(json.lang || "");
const sayiBicim = (v, ondalik) => {
  try { return new Intl.NumberFormat(dil || undefined, { minimumFractionDigits: ondalik, maximumFractionDigits: ondalik }).format(v); } catch (e) { return String(v); }
};
const ikonH = (ad, sinif) => (ad ? `<span class="${sinif} material-symbols-outlined" aria-hidden="true">${ad}</span>` : "");
const no = (i) => String(i + 1).padStart(2, "0");
const ctaHtml = () => {
  const a1 = metinAl(des, ["cta_ad", "button"]); const u1 = href(ilk(des, ["cta_url", "buttonurl", "url"]));
  const a2 = metinAl(des, ["cta2_ad"]); const u2 = href(ilk(des, ["cta2_url"]));
  const d = (a, u, ek) => (a && u ? `<a class="${P}-dugme${ek}" href="${esc(u)}">${esc(a)}<span class="material-symbols-outlined mx-flip" aria-hidden="true">arrow_forward</span></a>` : "");
  const ic = d(a1, u1, "") + d(a2, u2, ` ${P}-dugme--ikincil`);
  return ic ? `<div class="${P}-cta">${ic}</div>` : "";
};
const basHtml = (B, ek) => {
  if (!B.ust && !B.baslik && !B.metin && !ek) return "";
  return `<header class="${P}-bas">`
    + (B.ust ? `<p class="${P}-ust">${esc(B.ust)}</p>` : "")
    + (B.baslik ? `<h2 class="${P}-baslik" id="${P}-{{id}}-b">${esc(B.baslik)}</h2>` : "")
    + (B.metin ? `<p class="${P}-metin">${satirlar(B.metin)}</p>` : "")
    + (ek || "")
    + "</header>";
};
/* --- aile: referans --- */
/* eski logo-bandi: showTitle=false → başlık bölümü yok */
if (!dogru(des.showTitle, true)) ["ust", "badge", "kicker", "baslik", "title", "metin", "description"].forEach((k) => { des[k] = ""; });
const kayitlar = veri.map((o) => {
  o = o || {};
  return {
    ad: metinAl(o, ["ad", "name", "baslik", "title"]), img: medyaUrl(ilk(o, ["img", "logo", "image"])), url: href(ilk(o, ["url", "link"])),
    sektor: metinAl(o, ["sektor", "sector", "kat", "category"]), metin: metinAl(o, ["metin", "text", "description", "yorum", "quote"]),
    kisi: metinAl(o, ["kisi", "person", "author"]), yil: metinAl(o, ["yil", "year", "since"]), ikon: ikonAd(ilk(o, ["ikon", "icon"])),
  };
}).filter((k) => k.ad || k.img);
const listeAd = metinAl(des, ["listeEtiket", "listLabel"]);
const listeA = () => (listeAd ? ` aria-label="${esc(listeAd)}"` : "");
/* baş harf rozeti (yazı logosu yanında süs): ilk iki sözcüğün ilk harfi */
const harf = (s) => { const p = String(s || "").trim().split(/\s+/).filter(Boolean); const a = (x) => [...(x || "")][0] || ""; return (p.length > 1 ? a(p[0]) + a(p[1]) : [...(p[0] || "")].slice(0, 2).join("")).toLocaleUpperCase(dil || undefined); };
const disBag = (u) => /^(https?:)?\/\//i.test(u);
/* logo: görsel varsa img (alt = ad), yoksa ad yazı logosu olarak basılır */
const lH = (k, s) => (k.img ? `<img class="${P}-${s || "logo"}" src="${esc(k.img)}" alt="${esc(k.ad)}" width="200" height="80" loading="lazy" decoding="async" />` : `<span class="${P}-${s || "kelime"}">${esc(k.ad)}</span>`);
/* tüm kartı saran bağlantı (dış bağlantı yeni sekmede) */
/* kartın içeriği tek sarmalayıcıda: url varsa bağlantı (dış → yeni sekme), yoksa div — CSS her iki hâlde aynı kutuyu biçimler */
const bag = (k, ic, s) => (k.url ? `<a class="${P}-${s || "bag"}" href="${esc(k.url)}"${disBag(k.url) ? ' target="_blank" rel="noopener noreferrer"' : ""}${k.img ? ` aria-label="${esc(k.ad)}"` : ""}>${ic}</a>` : `<div class="${P}-${s || "bag"}">${ic}</div>`);
const adH = (k, s, t) => (k.ad ? `<${t || "h3"} class="${P}-${s || "ad"}">${esc(k.ad)}</${t || "h3"}>` : "");
const sH = (k, s) => (k.sektor ? `<p class="${P}-${s || "sektor"}">${esc(k.sektor)}</p>` : "");
const mH = (k, s) => (k.metin ? `<p class="${P}-${s || "kmetin"}">${satirlar(k.metin)}</p>` : "");
const yH = (k, s) => (k.yil ? `<p class="${P}-${s || "yil"}">${esc(k.yil)}</p>` : "");
const rH = (k, s) => `<span class="${P}-${s || "harf"}" aria-hidden="true">${k.img ? `<img src="${esc(k.img)}" alt="" width="64" height="64" loading="lazy" decoding="async" />` : esc(harf(k.ad))}</span>`;
/* --- modül: referans-dikey-akis --- */
const kart = (k) => `<li class="${P}-oge">${bag(k, lH(k))}</li>`;
const sar = (ic, A, B) => {
    const s = Math.min(3, A.length);
    const sut = [];
    for (let c = 0; c < s; c++) {
      const x = A.filter((k, i) => i % s === c).map((k) => kart(k)).join("");
      sut.push(`<div class="${P}-sutun ${P}-sutun--${c}"><div class="${P}-iz"><ul class="${P}-set" role="list">${x}</ul><ul class="${P}-set ${P}-kopya" role="list" aria-hidden="true">${x.replace(/<a /g, '<a tabindex="-1" ')}</ul></div></div>`);
    }
    return `<div class="${P}-duzen"><div class="${P}-sol">${basHtml(B, "")}</div><div class="${P}-pencere" role="group"${listeA()}>${sut.join("")}</div></div>`;
  };
const B = { ust: metinAl(des, ["ust","badge","kicker"]), baslik: metinAl(des, ["baslik","title"]), metin: metinAl(des, ["metin","description"]) };
/* veri yoksa gövde hiç kurulmaz (sarmalayıcı boş listeye dokunmaz) */
const BOS = !kayitlar.length;
const govde = BOS ? "" : sar(kayitlar.map((k, i) => kart(k, i, kayitlar.length, kayitlar)).join(""), kayitlar, B);
const bas = "";
const sinif = (bas || B.ust || B.baslik || B.metin ? "" : ` ${P}--bassiz`);
html = html
  .replaceAll("{{fbsinif}}", () => sinif)
  .replaceAll("{{fbetiket}}", () => (B.baslik ? `aria-labelledby="${P}-{{id}}-b"` : ""))
  .replaceAll("{{fbbas}}", () => bas)
  .replaceAll("{{fbgovde}}", () => govde);
if (BOS) html = "";
