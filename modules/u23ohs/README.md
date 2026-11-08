# tema-yedekparca-2 · u23ohs — Referans Logo Bandı

## Nedir

tema-yedekparca-2 sitesinin matrix modülü. `Referans Logo Bandı` şablonu (section kökü,
sınıf `modulex-lb`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (3 KB) |
| `index.html` | Modül şablonu (render hedefi) (6 KB) |
| `index.jpeg` | Önizleme görseli (18 KB) |
| `index.json` | Veri + tema token'ları (2 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `max` | `1200px` |
| `stil` | `kayan` |
| `speed` | `32` |
| `logoH` | `48px` |
| `grayscale` | `True` |
| `bgcolor` | `var(--mx-site-bg, #ffffff)` |
| `textcolor` | `var(--mx-site-text, #1b1b1b)` |
| `mutedcolor` | `color-mix(in srgb, var(--mx-site-text, #1b1b1b) 70%, var(--mx-site-bg, #ffffff))` |

- `name`: `Referans Logo Bandı`
- `data`: 8 kayıt. Örnek: `{"name": "Aurora Holding", "img": "", "url": ""}`
- Diğer anahtarlar: `description`, `version`, `icon`, `category`, `tags`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **max**, **stil**, **speed**, **logoH**, **grayscale**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex-lb`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-yedekparca-2 sitesinde `web/matrix/modules/u23ohs/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": {
    "tr": "Referans Logo Bandı",
    "en": "Client Logo Strip",
    "ar": "شريط شعارات العملاء"
  },
  "desing": {
    "max": "1200px",
    "stil": "kayan",
    "speed": 32,
    "logoH": "48px",
    "grayscale": true,
    "bgcolor": "var(--mx-site-bg, #ffffff)",
    "textcolor": "var(--mx-site-text, #1b1b1b)",
    "mutedcolor": "color-mix(in srgb, var(--mx-site-text, #1b1b1b) 70%, var(--mx-site-bg, #ffffff))",
    "surface": "var(--mx-site-surface, #f6f6f4)",
    "bordercolor": "color-mix(in srgb, var(--mx-site-text, #1b1b1b) 14%, transparent)",
    "accent": "var(--mx-site-primary, #2563eb)",
    "radius": "14px",
    "showTitle": true,
    "title": {
      "tr": "Bize güvenen
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
