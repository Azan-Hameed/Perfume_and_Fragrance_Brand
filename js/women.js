/* ==========================================================================
   MAISON ZAYN — Women's Signature Scents Page Logic (Vanilla JS)
   Keeps shared js/main.js untouched and delegates Details / Add to Bag actions.
   ========================================================================== */

(function () {
  "use strict";

  /* Curated catalog subset matching the shared product data in js/main.js */
  const WOMEN_CURATED_PRODUCTS = [
    {
      id: "rose-ispahan",
      name: "Rose Ispahan",
      eyebrow: "FLORAL • WOMEN",
      tags: ["women", "floral"],
      shortDesc: "Dewy centifolia rose & white peach nectar",
      notes: "Lychee, Rose de Mai, Madagascar Vanilla",
      size: "30ml",
      price: 33172,
      oldPrice: null,
      typeLabel: "EAU DE PARFUM",
      glassColor: "#D9B8B4",
      strokeColor: "rgba(26,23,20,0.14)",
      capColor: "#1A1714"
    },
    {
      id: "musc-blanc",
      name: "Musc Blanc",
      eyebrow: "FRESH • UNISEX",
      tags: ["fresh"],
      shortDesc: "Second-skin molecular musk & white iris",
      notes: "Aldehydes, White Iris, Silk Musk",
      size: "30ml",
      price: 30407,
      oldPrice: null,
      typeLabel: "EAU DE PARFUM",
      glassColor: "#F2EFEA",
      strokeColor: "rgba(26,23,20,0.16)",
      capColor: "#1A1714"
    },
    {
      id: "oudh-imperial",
      name: "Oudh Imperial",
      eyebrow: "OUDH • UNISEX",
      tags: ["oudh"],
      shortDesc: "Smoked Cambodian agarwood & Kashmiri saffron",
      notes: "Kashmiri Saffron, Damask Rose, Aged Cambodian Oudh",
      size: "30ml",
      price: 40082,
      oldPrice: null,
      typeLabel: "EXTRAIT DE PARFUM",
      glassColor: "#4F3F29",
      strokeColor: "rgba(255,255,255,0.45)",
      capColor: "#C19A4F"
    },
    {
      id: "la-collection-royale-trunk",
      name: "La Collection Royale Trunk",
      eyebrow: "OUDH • UNISEX",
      tags: ["oudh"],
      shortDesc: "Full-size Oudh Imperial + Pure Attar + Bakhoor",
      notes: "Oudh Imperial 100ml, Sultan's Ruh Oudh 6ml, Royal Majlis Bakhoor",
      size: "3-Piece Trunk",
      price: 92880,
      oldPrice: 109190,
      typeLabel: "EXTRAIT DE PARFUM",
      glassColor: "#EDE6DA",
      strokeColor: "rgba(26,23,20,0.16)",
      capColor: "#1A1714"
    }
  ];

  /**
   * Escapes special HTML characters so product strings render safely in templates.
   * @param {string} value - Raw text value to escape.
   * @returns {string} HTML-escaped string.
   */
  function escapeText(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /**
   * Builds the inline SVG perfume flacon matching the shared bottle design.
   * Handles long multi-word names across two centered label lines.
   * @param {Object} product - Product entry with name, colors, and concentration label.
   * @returns {string} Inline SVG markup string.
   */
  function buildBottleSvg(product) {
    const upperName = product.name.toUpperCase();
    const isMultiLine = upperName.length > 18;
    const words = upperName.split(" ");
    const splitIndex = Math.ceil(words.length / 2);

    const labelNameSvg = isMultiLine
      ? '<text x="60" y="115" text-anchor="middle" fill="#1A1714" font-family="Outfit, sans-serif" font-size="4.3" font-weight="500" letter-spacing="0.4">' +
        '<tspan x="60" dy="0">' + escapeText(words.slice(0, splitIndex).join(" ")) + "</tspan>" +
        '<tspan x="60" dy="5.8">' + escapeText(words.slice(splitIndex).join(" ")) + "</tspan>" +
        "</text>"
      : '<text x="60" y="118" text-anchor="middle" fill="#1A1714" font-family="Outfit, sans-serif" font-size="' +
        (upperName.length > 14 ? "4.1" : "4.8") +
        '" font-weight="500" letter-spacing="0.45">' +
        escapeText(upperName) +
        "</text>";

    return (
      '<svg width="120" height="210" viewBox="0 0 120 210" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' +
      escapeText(product.name) +
      ' bottle">' +
      '<rect x="44" y="24" width="32" height="26" rx="4" fill="' + product.capColor + '"/>' +
      '<rect x="49" y="50" width="22" height="9" fill="#C19A4F"/>' +
      '<rect x="21" y="59" width="78" height="122" rx="14" fill="rgba(255,255,255,0.55)" stroke="' + product.strokeColor + '" stroke-width="1.5"/>' +
      '<rect x="26" y="66" width="68" height="104" rx="10" fill="' + product.glassColor + '"/>' +
      '<rect x="29" y="70" width="4" height="94" rx="2" fill="rgba(255,255,255,0.16)"/>' +
      '<rect x="31" y="84" width="58" height="66" rx="2" fill="#FAF8F4"/>' +
      '<rect x="34" y="87" width="52" height="60" rx="1" fill="none" stroke="#C19A4F" stroke-width="0.75"/>' +
      '<text x="60" y="102" text-anchor="middle" fill="#1A1714" font-family="Cormorant Garamond, Georgia, serif" font-size="7" font-weight="600" letter-spacing="1.1">MAISON ZAYN</text>' +
      '<line x1="40" y1="107" x2="80" y2="107" stroke="#C19A4F" stroke-width="0.5"/>' +
      labelNameSvg +
      '<text x="60" y="' + (isMultiLine ? "132" : "130") + '" text-anchor="middle" fill="#6B635A" font-family="Outfit, sans-serif" font-size="4" letter-spacing="0.6">' + escapeText(product.typeLabel) + "</text>" +
      '<text x="60" y="' + (isMultiLine ? "142" : "141") + '" text-anchor="middle" fill="#C19A4F" font-family="Outfit, sans-serif" font-size="3.8" letter-spacing="0.9">PARIS &bull; ORIENT</text>' +
      "</svg>"
    );
  }

  /**
   * Builds a single product card element string using shared CSS classes.
   * Uses data-action attributes so js/main.js handles Details modal and Add to Bag.
   * @param {Object} product - Curated product object.
   * @returns {string} HTML markup for one product card.
   */
  function buildProductCardHtml(product) {
    const priceHtml = product.oldPrice
      ? '<span class="product-card__price-old">$' + product.oldPrice + '</span><span class="product-card__price">$' + product.price + "</span>"
      : '<span class="product-card__price">$' + product.price + "</span>";

    return (
      '<article class="product-card" data-product-id="' + escapeText(product.id) + '">' +
        '<div class="product-card__visual">' + buildBottleSvg(product) + "</div>" +
        '<span class="eyebrow product-card__eyebrow">' + escapeText(product.eyebrow) + "</span>" +
        '<h3 class="product-card__title">' + escapeText(product.name) + "</h3>" +
        '<p class="product-card__desc" title="' + escapeText(product.shortDesc) + '">' + escapeText(product.shortDesc) + "</p>" +
        '<p class="product-card__notes"><strong>Notes:</strong> ' + escapeText(product.notes) + "</p>" +
        '<hr class="product-card__divider">' +
        '<div class="product-card__meta">' +
          '<span class="product-card__size">' + escapeText(product.size) + "</span>" +
          '<div class="product-card__price-wrap">' + priceHtml + "</div>" +
        "</div>" +
        '<div class="product-card__actions">' +
          '<button type="button" class="btn btn--secondary btn--sm" data-action="details" data-id="' + escapeText(product.id) + '">Details</button>' +
          '<button type="button" class="btn btn--dark btn--sm" data-action="add-to-bag" data-id="' + escapeText(product.id) + '">Add to Bag</button>' +
        "</div>" +
      "</article>"
    );
  }

  /**
   * Filters and sorts the curated women's list based on active chip and sort mode.
   * @param {string} activeFilter - Selected filter key ("all", "women", "floral", "fresh", "oudh").
   * @param {string} sortMode - Selected sort key ("featured", "price-asc", "price-desc", "name").
   * @returns {Array<Object>} Filtered and sorted product array.
   */
  function getFilteredProducts(activeFilter, sortMode) {
    const filtered = WOMEN_CURATED_PRODUCTS.filter(function (item) {
      if (activeFilter === "all") return true;
      return item.tags.indexOf(activeFilter) !== -1;
    });

    const sorted = filtered.slice();
    if (sortMode === "price-asc") {
      sorted.sort(function (a, b) { return a.price - b.price; });
    } else if (sortMode === "price-desc") {
      sorted.sort(function (a, b) { return b.price - a.price; });
    } else if (sortMode === "name") {
      sorted.sort(function (a, b) { return a.name.localeCompare(b.name); });
    }
    return sorted;
  }

  /**
   * Initializes filter chip buttons, sort dropdown, and grid rendering on women.html.
   */
  function initWomenCatalog() {
    const grid = document.getElementById("women-catalog-grid");
    const countEl = document.getElementById("women-result-count");
    const sortSelect = document.getElementById("women-sort");
    const filterButtons = document.querySelectorAll("[data-women-filter]");

    if (!grid) return;

    let currentFilter = "all";
    let currentSort = "featured";

    /**
     * Re-renders the product grid and updates the accessible creation count label.
     */
    function renderCatalog() {
      const items = getFilteredProducts(currentFilter, currentSort);
      grid.innerHTML = items.map(buildProductCardHtml).join("");
      if (countEl) {
        countEl.textContent = items.length + (items.length === 1 ? " Creation" : " Creations");
      }
    }

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        filterButtons.forEach(function (btn) {
          btn.classList.remove("is-active");
          btn.setAttribute("aria-pressed", "false");
        });
        button.classList.add("is-active");
        button.setAttribute("aria-pressed", "true");
        currentFilter = button.dataset.womenFilter || "all";
        renderCatalog();
      });
    });

    if (sortSelect) {
      sortSelect.addEventListener("change", function (event) {
        currentSort = event.target.value;
        renderCatalog();
      });
    }

    renderCatalog();
  }

  document.addEventListener("DOMContentLoaded", initWomenCatalog);
})();
