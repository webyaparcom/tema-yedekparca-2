# tema-yedekparca-2 · 28cwnv — Footer 9 — Kurumsal

## Nedir

tema-yedekparca-2 sitesinin matrix modülü. `Footer 9 — Kurumsal` şablonu (footer kökü,
sınıf `modulex-f9`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (5 KB) |
| `index.html` | Modül şablonu (render hedefi) (5 KB) |
| `index.jpeg` | Önizleme görseli (15 KB) |
| `index.json` | Veri + tema token'ları (1 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `showlang` | `True` |
| `maxpages` | `8` |
| `bgcolor` | `var(--mx-site-surface-2, #1f2937)` |
| `color` | `var(--mx-site-text, #f3f4f6)` |
| `mutedcolor` | `color-mix(in srgb, var(--mx-site-text, #f3f4f6) 72%, transparent)` |
| `accent` | `var(--mx-site-primary, #2563eb)` |
| `bordercolor` | `color-mix(in srgb, var(--mx-site-text, #f3f4f6) 18%, transparent)` |
| `logo_maxh` | `56px` |

- `name`: `Footer 9 — Kurumsal`
- `data`: 0 kayıt. Örnek: `[]`
- Diğer anahtarlar: `category`, `description`, `version`, `icon`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **showlang**, **maxpages**, **bgcolor**, **color**, **mutedcolor**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex-f9`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-yedekparca-2 sitesinde `web/matrix/modules/28cwnv/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": "Footer 9 — Kurumsal",
  "desing": {
    "showlang": true,
    "maxpages": 8,
    "bgcolor": "var(--mx-site-surface-2, #1f2937)",
    "color": "var(--mx-site-text, #f3f4f6)",
    "mutedcolor": "color-mix(in srgb, var(--mx-site-text, #f3f4f6) 72%, transparent)",
    "accent": "var(--mx-site-primary, #2563eb)",
    "bordercolor": "color-mix(in srgb, var(--mx-site-text, #f3f4f6) 18%, transparent)",
    "logo_maxh": "56px",
    "logo_plate": false,
    "about": {
      "tr": "Kurumsal çözümler ve güvenilir hizmet.",
      "en": "Corporate solutions and reliable service.",
      "ar": "حلول مؤسسية وخدمة موثوقة."
    },
    "title_pages": {
      "tr": "Sayfalar",
      "en": "Pages",

```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
