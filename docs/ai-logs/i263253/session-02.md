# AI Session Log — Session 02

- **Student / Roll Number:** `i263253` (`i263253@isb.nu.edu.pk`)
- **Git Branch:** `i263253`
- **Project:** `SE-E_Group06_Perfume_and_Fragrance_Brand` — **MAISON ZAYN** Haute Parfumerie
- **Date:** 2026-11-27

---

## 1. Objective & Prompt Summary

Convert all prices, currency references, cart modal formatting, and free-shipping thresholds from USD (`$`) to Pakistani Rupees (`PKR`) across the three assigned pages and shared cart utilities without modifying teammates' pages:

- **`pages/shop.html`**
  - Update fragrance catalog prices (`Oudh Imperial`: `PKR 40,000`, `Santal de Grasse`: `PKR 31,800`, `Rose Ispahan`: `PKR 33,200`, `Musc Blanc`: `PKR 30,400`, `Vétiver & Cuir`: `PKR 31,800`, `Bergamote Sauvage`: `PKR 27,600`), card/modal price formatting, and announcement/footer free-shipping text (`PKR 40,000`), while keeping numeric price sorting accurate.
- **`pages/contact-branches.html`**
  - Update announcement bar and footer free-shipping threshold references from `$150` to `PKR 40,000`.
- **`pages/gift-sets.html`**
  - Update gift set prices (`La Collection Royale Trunk`: `PKR 92,800`, `Le Coffret Découverte`: `PKR 12,400` including `PKR 12,400` flacon credit/voucher text, `Duo Paris-Orient`: `PKR 64,900`).
  - Update Gift & Shipping Calculator options (`+PKR 3,300` for Couture Silk Ribbon & Wax Seal, `+PKR 5,500` for Gold-Leaf Flacon Engraving), flat express shipping fee (`PKR 1,500`), free express shipping threshold (`PKR 40,000`), and live breakdown formatting.
- **`js/main.js`**
  - Add shared `formatPKR` formatter (with comma grouping) and `FREE_SHIPPING_THRESHOLD` (`40000`), and update the bag modal subtotal/item prices and threshold progress message to `PKR`.

---

## 2. Repository Inspection

- Checked existing workspace files: `js/main.js`, `pages/shop.html`, `pages/contact-branches.html`, `pages/gift-sets.html`, `css/style.css`, `README.md`, and `docs/ai-logs/i263253/session-01.md`.
- Confirmed `css/style.css` and `docs/` required no currency changes and left all non-target files untouched.

---

## 3. Files Modified & Implementation Summary

### `js/main.js` (20,987 bytes)
- Added `FREE_SHIPPING_THRESHOLD = 40000` and `formatPKR(amount)` using `Math.round(Number(amount) || 0).toLocaleString('en-US')` to format prices as `PKR 40,000`.
- Exported `FREE_SHIPPING_THRESHOLD` and `formatPKR` on `window.MaisonZayn` so `shop.html` and `gift-sets.html` reuse the same formatter and threshold constant.
- Updated `renderBagModalContent()` to format item unit prices, bag subtotals, complimentary status (`Complimentary (PKR 0)`), and remaining amount toward free express shipping (`subtotal >= FREE_SHIPPING_THRESHOLD`) in `PKR`.

### `pages/shop.html` (21,483 bytes)
- Updated announcement bar and footer bottom free-shipping threshold text from `$150` to `PKR 40,000`.
- Updated `PRODUCTS` numeric `price` fields to `40000`, `31800`, `33200`, `30400`, `31800`, and `27600` so `price-asc` and `price-desc` sorting continues to compare numbers accurately.
- Updated product card rendering (`renderProducts`) and details modal (`openDetailsModal`) to format prices via `window.MaisonZayn.formatPKR(product.price)`.

### `pages/contact-branches.html` (26,250 bytes)
- Updated announcement bar and footer bottom free-shipping threshold text from `$150` to `PKR 40,000`.

### `pages/gift-sets.html` (23,537 bytes)
- Updated announcement bar, calculator lead copy, and footer bottom free-shipping threshold text to `PKR 40,000`.
- Updated `GIFT_SETS` prices to `92800`, `12400`, and `64900`, and updated Le Coffret Découverte's `$45` flacon credit/voucher copy to `PKR 12,400`.
- Updated finishing options to `data-option-price="3300"` (`+PKR 3,300`) and `data-option-price="5500"` (`+PKR 5,500`), initial summary placeholders (`PKR 0`, `PKR 1,500`, `Unlocks at PKR 40,000`), `FREE_SHIPPING_THRESHOLD` (`window.MaisonZayn.FREE_SHIPPING_THRESHOLD`), `STANDARD_EXPRESS_SHIPPING` (`1500`), and `calculateGiftAndShipping()` / modal / card rendering to use `window.MaisonZayn.formatPKR(...)`.

---

## 4. Verification Performed

- Ran `Select-String` across `js/main.js`, `pages/shop.html`, `pages/contact-branches.html`, and `pages/gift-sets.html` with pattern `\$|USD|150|18\.00`; confirmed no leftover USD currency symbols or `$150`/`$18.00` values remained (only two JS regex `$` anchors in `pages/contact-branches.html` and `STANDARD_EXPRESS_SHIPPING = 1500` in `pages/gift-sets.html` matched).
- Ran `git status -s` and `git diff` to confirm only the 4 target files (`js/main.js`, `pages/contact-branches.html`, `pages/gift-sets.html`, `pages/shop.html`) were modified.
- Note: Interactive runtime verification in a live browser was not executed in this terminal session; if testing with an existing browser `localStorage` cart (`maison_zayn_bag`) from prior USD sessions, clear the bag once via **Clear Bag** to populate fresh `PKR` prices.
