/* ==========================================================================
   MAISON ZAYN — Archive Search Page Logic (Vanilla JS)
   Uses the exact 7 shared creations and delegates modal/cart actions to js/main.js.
   ========================================================================== */

(function () {
  "use strict";

  /* Exact 7-product catalog matching js/main.js */
  const CATALOG_PRODUCTS = [
    {
      id: "oudh-imperial",
      name: "Oudh Imperial",
      eyebrow: "OUDH • UNISEX",
      categories: ["unisex", "oudh"],
      shortDesc: "Smoked Cambodian agarwood & Kashmiri saffron",
      notes: "Kashmiri Saffron, Damask Rose, Aged Cambodian Oudh",
      size: "30ml",
      price: 145,
      oldPrice: null,
      typeLabel: "EXTRAIT DE PARFUM",
      glassColor: "#4F3F29",
      strokeColor: "rgba(255,255,255,0.45)",
      capColor: "#C19A4F"
    },
    {
      id: "santal-de-grasse",
      name: "Santal de Grasse",
      eyebrow: "WOODY • MEN",
      categories: ["men", "woody"],
      shortDesc: "Creamy Mysore sandalwood & iris butter",
      notes: "Guatemalan Cardamom, Florentine Iris, Mysore Sandalwood",
      size: "30ml",
      price: 115,
      oldPrice: null,
      typeLabel: "EAU DE PARFUM",
      glassColor: "#C9A55A",
      strokeColor: "rgba(26,23,20,0.14)",
      capColor: "#1A1714"
    },
    {
      id: "rose-ispahan",
      name: "Rose Ispahan",
      eyebrow: "FLORAL • WOMEN",
      categories: ["women", "floral"],
      shortDesc: "Dewy centifolia rose & white peach nectar",
      notes: "Lychee, Rose de Mai, Madagascar Vanilla",
      size: "30ml",
      price: 120,
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
      categories: ["unisex", "fresh"],
      shortDesc: "Second-skin molecular musk & white iris",
      notes: "Aldehydes, White Iris, Silk Musk",
      size: "30ml",
      price: 110,
      oldPrice: null,
      typeLabel: "EAU DE PARFUM",
      glassColor: "#F2EFEA",
      strokeColor: "rgba(26,23,20,0.16)",
      capColor: "#1A1714"
    },
    {
      id: "vetiver-cuir",
      name: "Vétiver & Cuir",
      eyebrow: "WOODY • MEN",
      categories: ["men", "woody", "sale"],
      shortDesc: "Smoky Haitian vetiver & saddle leather",
      notes: "Black Pepper, Smoked Leather, Haitian Vetiver",
      size: "30ml",
      price: 115,
      oldPrice: 135,
      typeLabel: "EAU DE PARFUM",
      glassColor: "#C5A888",
      strokeColor: "rgba(26,23,20,0.14)",
      capColor: "#1A1714"
    },
    {
      id: "bergamote-sauvage",
      name: "Bergamote Sauvage",
      eyebrow: "FRESH • MEN",
      categories: ["men", "fresh", "sale"],
      shortDesc: "Crisp Calabrian citrus & crushed basil",
      notes: "Calabrian Bergamot, Sweet Basil, Vetiver",
      size: "50ml",
      price: 100,
      oldPrice: 125,
      typeLabel: "EAU DE PARFUM",
      glassColor: "#755B40",
      strokeColor: "rgba(26,23,20,0.14)",
      capColor: "#C19A4F"
    },
    {
      id: "la-collection-royale-trunk",
      name: "La Collection Royale Trunk",
      eyebrow: "OUDH • UNISEX",
      categories: ["unisex", "oudh", "sale"],
      shortDesc: "Full-size Oudh Imperial + Pure Attar + Bakhoor",
      notes: "Oudh Imperial 100ml, Sultan's Ruh Oudh 6ml, Royal Majlis Bakhoor",
      size: "3-Piece Trunk",
      price: 336,
      oldPrice: 395,
      typeLabel: "EXTRAIT DE PARFUM",
      glassColor: "#EDE6DA",
      strokeColor: "rgba(26,23,20,0.16)",
      capColor: "#1A1714"
    }
  ];

  /**
   * Escapes special HTML characters to prevent injection when building markup.
   * @param {string} value - Raw text string.
   * @returns {string} Escaped string safe for HTML attributes and text nodes.
   */
  function escapeText(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /**
   * Normalizes accented characters (for example "Vétiver" -> "vetiver")
   * so users can search with or without accents.
   * @param {string} text - Input string to normalize.
   * @returns {string} Lowercased ASCII-normalized string.
   */
  function normalizeText(text) {
    return String(text || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  /**
   * Generates an inline SVG perfume bottle matching the shared Maison Zayn style.
   * @param {Object} product - Product object containing name, colors, and typeLabel.
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
   * Renders one product card HTML string using the shared card layout.
   * Buttons use data-action="details" and data-action="add-to-bag" for js/main.js.
   * @param {Object} product - Catalog product object.
   * @returns {string} HTML markup for the card.
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
   * Filters and sorts CATALOG_PRODUCTS using query text, collection, scent family, and sort mode.
   * @param {Object} state - Current search state { query, category, family, sort }.
   * @returns {Array<Object>} Matching products in display order.
   */
  function filterAndSortProducts(state) {
    const normalizedQuery = normalizeText(state.query.trim());

    const matches = CATALOG_PRODUCTS.filter(function (product) {
      if (state.category !== "all" && product.categories.indexOf(state.category) === -1) {
        return false;
      }

      if (state.family !== "all" && product.categories.indexOf(state.family) === -1) {
        return false;
      }

      if (!normalizedQuery) return true;

      const searchableText = normalizeText([
        product.name,
        product.eyebrow,
        product.shortDesc,
        product.notes,
        product.size,
        product.typeLabel
      ].join(" "));

      return searchableText.indexOf(normalizedQuery) !== -1;
    });

    const sorted = matches.slice();
    if (state.sort === "price-asc") {
      sorted.sort(function (a, b) { return a.price - b.price; });
    } else if (state.sort === "price-desc") {
      sorted.sort(function (a, b) { return b.price - a.price; });
    } else if (state.sort === "name") {
      sorted.sort(function (a, b) { return a.name.localeCompare(b.name); });
    }
    return sorted;
  }

  /**
   * Reads an initial "?q=" parameter from the page URL so linked searches open pre-filtered.
   * @returns {string} Initial search query or empty string.
   */
  function readQueryFromUrl() {
    if (!window.URLSearchParams) return "";
    const params = new URLSearchParams(window.location.search);
    return (params.get("q") || "").trim();
  }

  /**
   * Wires up all DOM events for search input, suggestion pills, filters, sorting, and reset.
   */
  function initSearchPage() {
    const form = document.getElementById("archive-search-form");
    const input = document.getElementById("archive-search-input");
    const clearBtn = document.getElementById("archive-clear-btn");
    const categoryBtns = document.querySelectorAll("[data-search-category]");
    const suggestionBtns = document.querySelectorAll("[data-search-term]");
    const familySelect = document.getElementById("search-family");
    const sortSelect = document.getElementById("search-sort");
    const statusEl = document.getElementById("search-result-status");
    const resetAllBtn = document.getElementById("search-reset-all");
    const grid = document.getElementById("search-results-grid");
    const emptyState = document.getElementById("search-empty-state");
    const emptyText = document.getElementById("search-empty-text");
    const emptyResetBtn = document.getElementById("empty-reset-btn");

    if (!grid || !input) return;

    const state = {
      query: readQueryFromUrl(),
      category: "all",
      family: "all",
      sort: "featured"
    };

    input.value = state.query;

    /**
     * Updates the grid, empty state, clear button, and live status text.
     */
    function renderResults() {
      const results = filterAndSortProducts(state);
      const hasQuery = state.query.trim().length > 0;
      const hasActiveFilters = hasQuery || state.category !== "all" || state.family !== "all" || state.sort !== "featured";

      if (clearBtn) {
        clearBtn.hidden = !hasQuery;
      }
      if (resetAllBtn) {
        resetAllBtn.hidden = !hasActiveFilters;
      }

      if (results.length === 0) {
        grid.innerHTML = "";
        grid.hidden = true;
        if (emptyState) emptyState.hidden = false;
        if (emptyText) {
          emptyText.textContent = hasQuery
            ? 'No creations matched "' + state.query.trim() + '" with your selected filters. Try another note or reset filters.'
            : "No creations matched the selected collection and scent family filters.";
        }
      } else {
        grid.hidden = false;
        if (emptyState) emptyState.hidden = true;
        grid.innerHTML = results.map(buildProductCardHtml).join("");
      }

      if (statusEl) {
        const suffix = hasQuery ? ' for "' + state.query.trim() + '"' : "";
        statusEl.textContent = "Showing " + results.length + " of " + CATALOG_PRODUCTS.length + " Creations" + suffix;
      }
    }

    /**
     * Resets search input, collection chips, scent family, and sort back to defaults.
     */
    function resetAllFilters() {
      state.query = "";
      state.category = "all";
      state.family = "all";
      state.sort = "featured";

      input.value = "";
      if (familySelect) familySelect.value = "all";
      if (sortSelect) sortSelect.value = "featured";

      categoryBtns.forEach(function (btn) {
        const isAll = btn.dataset.searchCategory === "all";
        btn.classList.toggle("is-active", isAll);
        btn.setAttribute("aria-pressed", String(isAll));
      });

      renderResults();
      input.focus();
    }

    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        state.query = input.value;
        renderResults();
      });
    }

    input.addEventListener("input", function () {
      state.query = input.value;
      renderResults();
    });

    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        state.query = "";
        input.value = "";
        renderResults();
        input.focus();
      });
    }

    suggestionBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.query = btn.dataset.searchTerm || "";
        input.value = state.query;
        renderResults();
      });
    });

    categoryBtns.forEach(function (button) {
      button.addEventListener("click", function () {
        categoryBtns.forEach(function (btn) {
          btn.classList.remove("is-active");
          btn.setAttribute("aria-pressed", "false");
        });
        button.classList.add("is-active");
        button.setAttribute("aria-pressed", "true");
        state.category = button.dataset.searchCategory || "all";
        renderResults();
      });
    });

    if (familySelect) {
      familySelect.addEventListener("change", function (event) {
        state.family = event.target.value;
        renderResults();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", function (event) {
        state.sort = event.target.value;
        renderResults();
      });
    }

    if (resetAllBtn) resetAllBtn.addEventListener("click", resetAllFilters);
    if (emptyResetBtn) emptyResetBtn.addEventListener("click", resetAllFilters);

    renderResults();
  }

  document.addEventListener("DOMContentLoaded", initSearchPage);
})();
