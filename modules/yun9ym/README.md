# tema-yedekparca-2 · yun9ym — Hero 4 — Bölünmüş

## Nedir

tema-yedekparca-2 sitesinin matrix modülü. `Hero 4 — Bölünmüş` şablonu (section kökü,
sınıf `modulex-h4`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (4 KB) |
| `index.html` | Modül şablonu (render hedefi) (11 KB) |
| `index.jpeg` | Önizleme görseli (58 KB) |
| `index.json` | Veri + tema token'ları (4 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `stil` | `blob` |
| `max` | `1200px` |
| `bg` | `var(--mx-site-bg, #ffffff)` |
| `surface` | `var(--mx-site-surface, #f6f6f4)` |
| `text` | `var(--mx-site-text, #1b1b1b)` |
| `muted` | `color-mix(in srgb, var(--mx-site-text, #1b1b1b) 72%, var(--mx-site-bg, #ffffff))` |
| `accent` | `var(--mx-site-primary, #2563eb)` |
| `accentText` | `var(--mx-site-primary-contrast, #ffffff)` |

- `name`: `Hero 4 — Bölünmüş`
- `data`: 3 kayıt. Örnek: `{"icon": "groups", "text": {"tr": "500+ mutlu müşteri", "en": "500+ happy clients", "ar": "+500 عميل راضٍ"}}`
- Diğer anahtarlar: `description`, `version`, `icon`, `category`, `tags`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **stil**, **max**, **bg**, **surface**, **text**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex-h4`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-yedekparca-2 sitesinde `web/matrix/modules/yun9ym/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": {
    "tr": "Hero 4 — Bölünmüş",
    "en": "Hero 4 — Split",
    "ar": "هيرو 4 — مقسّم"
  },
  "desing": {
    "stil": "blob",
    "max": "1200px",
    "bg": "var(--mx-site-bg, #ffffff)",
    "surface": "var(--mx-site-surface, #f6f6f4)",
    "text": "var(--mx-site-text, #1b1b1b)",
    "muted": "color-mix(in srgb, var(--mx-site-text, #1b1b1b) 72%, var(--mx-site-bg, #ffffff))",
    "accent": "var(--mx-site-primary, #2563eb)",
    "accentText": "var(--mx-site-primary-contrast, #ffffff)",
    "border": "color-mix(in srgb, var(--mx-site-text, #1b1b1b) 14%, transparent)",
    "radius": "20px",
    "eyebrow": {
      "tr": "Kurumsal çözüm ortağınız",
      "en": "Your corporate solution
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
