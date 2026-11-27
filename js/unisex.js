/* ==========================================================================
   MAISON ZAYN — Unisex Collection Page Logic (Vanilla JS)
   ========================================================================== */

(function () {
  "use strict";

  const CART_KEY = "maison_zayn_cart_v1";

  const UNISEX_PERFUMES = [
    {
      id: "oudh-imperial",
      name: "Oudh Imperial",
      family: "Oud",
      size: "50ml",
      price: 28500,
      typeLabel: "EXTRAIT DE PARFUM",
      shortDesc: "Smoked Cambodian agarwood & Kashmiri saffron",
      story:
        "Our flagship extrait pairs resinous twenty-year Cambodian agarwood with hand-harvested Kashmiri saffron threads and velvet Damask rose.",
      glassColor: "#4F3F29",
      strokeColor: "rgba(26,23,20,0.16)",
      capColor: "#C19A4F",
      notes: {
        top: ["Kashmiri Saffron", "Pink Pepper", "Bitter Orange"],
        heart: ["Damask Rose", "Guaiac Wood", "Cypriol"],
        base: ["Aged Cambodian Oudh", "Black Amber", "Incense"]
      }
    },
    {
      id: "musc-blanc",
      name: "Musc Blanc",
      family: "Fresh",
      size: "50ml",
      price: 21000,
      typeLabel: "EAU DE PARFUM",
      shortDesc: "Second-skin molecular musk & white iris",
      story:
        "Linen-crisp aldehydes melt effortlessly into powdery white iris and clean, skin-hugging botanical musks.",
      glassColor: "#F2EFEA",
      strokeColor: "rgba(26,23,20,0.16)",
      capColor: "#1A1714",
      notes: {
        top: ["Crisp Aldehydes", "Calabrian Bergamot", "White Tea"],
        heart: ["White Iris", "Neroli Blossom", "Cashmere Accord"],
        base: ["Botanical Silk Musk", "Ambrette Seed", "White Cedar"]
      }
    },
    {
      id: "ambre-nomade",
      name: "Ambre Nomade",
      family: "Amber",
      size: "50ml",
      price: 25500,
      typeLabel: "EXTRAIT DE PARFUM",
      shortDesc: "Golden labdanum, spiced cardamom & warm resin",
      story:
        "Sun-warmed Andalusian labdanum and wild Somali myrrh softened with roasted Madagascar vanilla pods for nocturnal depth.",
      glassColor: "#B87A3D",
      strokeColor: "rgba(26,23,20,0.16)",
      capColor: "#C19A4F",
      notes: {
        top: ["Green Cardamom", "Mandarin Zest", "Nutmeg"],
        heart: ["Golden Labdanum", "Cinnamon Bark", "Somali Myrrh"],
        base: ["Madagascar Vanilla", "Benzoin Resin", "Warm Ambergris"]
      }
    },
    {
      id: "bois-de-cedre",
      name: "Bois de Cèdre",
      family: "Woody",
      size: "50ml",
      price: 23000,
      typeLabel: "EAU DE PARFUM",
      shortDesc: "Atlas cedarwood, crushed fig leaf & vetiver",
      story:
        "Architectural Atlas cedar and smoky Haitian vetiver illuminated by green fig leaf and dry Florentine orris.",
      glassColor: "#8D6E4E",
      strokeColor: "rgba(26,23,20,0.16)",
      capColor: "#1A1714",
      notes: {
        top: ["Juniper Berry", "Black Pepper", "Crushed Fig Leaf"],
        heart: ["Atlas Cedarwood", "Florentine Orris", "Violet Leaf"],
        base: ["Mysore Sandalwood", "Haitian Vetiver", "Oakmoss"]
      }
    },
    {
      id: "neroli-azur",
      name: "Néroli Azur",
      family: "Fresh",
      size: "50ml",
      price: 19500,
      typeLabel: "EAU DE PARFUM",
      shortDesc: "Tunisian orange blossom, sea salt & basil",
      story:
        "Coastal Mediterranean zest capturing sun-drenched orange groves, crushed sweet basil, and clean mineral driftwood.",
      glassColor: "#C7D3CC",
      strokeColor: "rgba(26,23,20,0.16)",
      capColor: "#1A1714",
      notes: {
        top: ["Sicilian Lemon", "Green Fig", "Sea Salt"],
        heart: ["Tunisian Neroli", "Petitgrain", "Crushed Basil"],
        base: ["Driftwood", "Clean Musk", "Mineral Amber"]
      }
    },
    {
      id: "oudh-velours",
      name: "Oudh Velours",
      family: "Oud",
      size: "50ml",
      price: 27000,
      typeLabel: "EXTRAIT DE PARFUM",
      shortDesc: "Velvet Taif rose, smoked oudh & suede",
      story:
        "High-altitude Taif rose petals steeped over mellowed Assam oudh, plum nectar, and supple burnished suede.",
      glassColor: "#633D35",
      strokeColor: "rgba(26,23,20,0.16)",
      capColor: "#C19A4F",
      notes: {
        top: ["Spiced Plum", "Bergamot Peel", "Clove Bud"],
        heart: ["Taif Rose", "Blackcurrant", "Praline Resin"],
        base: ["Assam Oudh", "Velvet Suede", "Patchouli Leaf"]
      }
    }
  ];

  const state = {
    family: "All",
    query: "",
    activeModalId: null
  };

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatPKR(amount) {
    return `PKR ${Number(amount).toLocaleString("en-PK")}`;
  }

  function formatAllNotes(notesObj) {
    return [...notesObj.top, ...notesObj.heart, ...notesObj.base].join(", ");
  }

  function renderBottleSVG(product, width = 120, height = 210) {
    const upperName = product.name.toUpperCase();
    const isMultiLine = upperName.length > 16;
    const words = upperName.split(" ");
    const splitIdx = Math.ceil(words.length / 2);
    const labelNameSvg = isMultiLine
      ? `<text x="60" y="115" text-anchor="middle" fill="#1A1714" font-family="Outfit, sans-serif" font-size="4.2" font-weight="500" letter-spacing="0.4"><tspan x="60" dy="0">${escapeHtml(words.slice(0, splitIdx).join(" "))}</tspan><tspan x="60" dy="5.8">${escapeHtml(words.slice(splitIdx).join(" "))}</tspan></text>`
      : `<text x="60" y="118" text-anchor="middle" fill="#1A1714" font-family="Outfit, sans-serif" font-size="${upperName.length > 13 ? "4.1" : "4.8"}" font-weight="500" letter-spacing="0.45">${escapeHtml(upperName)}</text>`;

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 120 210" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeHtml(product.name)} perfume bottle">
        <rect x="44" y="24" width="32" height="26" rx="4" fill="${product.capColor}"/>
        <rect x="49" y="50" width="22" height="9" fill="#C19A4F"/>
        <rect x="21" y="59" width="78" height="122" rx="14" fill="rgba(255,255,255,0.55)" stroke="${product.strokeColor}" stroke-width="1.5"/>
        <rect x="26" y="66" width="68" height="104" rx="10" fill="${product.glassColor}"/>
        <rect x="29" y="70" width="4" height="94" rx="2" fill="rgba(255,255,255,0.16)"/>
        <rect x="31" y="84" width="58" height="66" rx="2" fill="#FAF8F4"/>
        <rect x="34" y="87" width="52" height="60" rx="1" fill="none" stroke="#C19A4F" stroke-width="0.75"/>
        <text x="60" y="102" text-anchor="middle" fill="#1A1714" font-family="Cormorant Garamond, Georgia, serif" font-size="7" font-weight="600" letter-spacing="1.1">MAISON ZAYN</text>
        <line x1="40" y1="107" x2="80" y2="107" stroke="#C19A4F" stroke-width="0.5"/>
        ${labelNameSvg}
        <text x="60" y="${isMultiLine ? "132" : "130"}" text-anchor="middle" fill="#6B635A" font-family="Outfit, sans-serif" font-size="4" letter-spacing="0.6">${escapeHtml(product.typeLabel)}</text>
        <text x="60" y="${isMultiLine ? "142" : "141"}" text-anchor="middle" fill="#C19A4F" font-family="Outfit, sans-serif" font-size="3.8" letter-spacing="0.9">PARIS • ORIENT</text>
      </svg>
    `;
  }

  /* ------------------------------------------------------------------------
     Cart localStorage Logic (shared key: maison_zayn_cart_v1)
     ------------------------------------------------------------------------ */
  function getCart() {
    try {
      const parsed = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    syncCartBadge(true);
  }

  function syncCartBadge(bump = false) {
    const cart = getCart();
    const totalCount = cart.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
    document.querySelectorAll("[data-cart-badge]").forEach((badge) => {
      badge.textContent = String(totalCount);
      if (bump) {
        badge.classList.remove("is-bumped");
        void badge.offsetWidth;
        badge.classList.add("is-bumped");
      }
    });
  }

  function showToast(message) {
    let toast = document.getElementById("mz-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "mz-toast";
      toast.className = "toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2600);
  }

  function addPerfumeToBag(perfumeId) {
    const perfume = UNISEX_PERFUMES.find((p) => p.id === perfumeId);
    if (!perfume) return;

    const cart = getCart();
    const existing = cart.find((item) => item.id === perfumeId);
    if (existing) {
      existing.qty = (Number(existing.qty) || 0) + 1;
    } else {
      cart.push({
        id: perfume.id,
        name: perfume.name,
        price: perfume.price,
        currency: "PKR",
        size: perfume.size,
        qty: 1
      });
    }

    saveCart(cart);
    showToast(`Added ${perfume.name} to your bag`);
  }

  /* ------------------------------------------------------------------------
     Filtering, Search & Grid Rendering
     ------------------------------------------------------------------------ */
  function getFilteredPerfumes() {
    const q = state.query.trim().toLowerCase();

    return UNISEX_PERFUMES.filter((perfume) => {
      const matchesFamily = state.family === "All" || perfume.family === state.family;
      if (!matchesFamily) return false;
      if (!q) return true;

      const searchable = [
        perfume.name,
        perfume.family,
        perfume.shortDesc,
        formatAllNotes(perfume.notes)
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(q);
    });
  }

  function renderProductCard(perfume) {
    const previewNotes = `${perfume.notes.top[0]}, ${perfume.notes.heart[0]}, ${perfume.notes.base[0]}`;

    return `
      <div class="col-12 col-md-6 col-lg-4">
        <article class="product-card" data-product-id="${escapeHtml(perfume.id)}">
          <div class="product-card__visual">
            ${renderBottleSVG(perfume, 120, 210)}
          </div>
          <span class="eyebrow product-card__eyebrow">${escapeHtml(perfume.family.toUpperCase())} &bull; UNISEX</span>
          <h3 class="product-card__title">${escapeHtml(perfume.name)}</h3>
          <p class="product-card__desc" title="${escapeHtml(perfume.shortDesc)}">${escapeHtml(perfume.shortDesc)}</p>
          <p class="product-card__notes"><strong>Notes:</strong> ${escapeHtml(previewNotes)}</p>
          <hr class="product-card__divider">
          <div class="product-card__meta">
            <span class="product-card__size">${escapeHtml(perfume.size)}</span>
            <div class="product-card__price-wrap">
              <span class="product-card__price unisex-card__price">${escapeHtml(formatPKR(perfume.price))}</span>
            </div>
          </div>
          <div class="product-card__actions">
            <button type="button" class="btn btn--secondary btn--sm" data-view-notes="${escapeHtml(perfume.id)}">View Notes</button>
            <button type="button" class="btn btn--dark btn--sm" data-unisex-add="${escapeHtml(perfume.id)}">Add to Bag</button>
          </div>
        </article>
      </div>
    `;
  }

  function renderGrid() {
    const grid = document.getElementById("unisex-product-grid");
    const emptyState = document.getElementById("unisex-empty-state");
    const emptyMsg = document.getElementById("unisex-empty-message");
    const countEl = document.getElementById("unisex-result-count");
    if (!grid) return;

    const filtered = getFilteredPerfumes();

    if (countEl) {
      countEl.textContent = `${filtered.length} Creation${filtered.length === 1 ? "" : "s"}`;
    }

    if (!filtered.length) {
      grid.innerHTML = "";
      if (emptyState) {
        emptyState.classList.remove("d-none");
      }
      if (emptyMsg) {
        const queryNote = state.query.trim()
          ? ` matching "${state.query.trim()}"`
          : "";
        const familyNote = state.family !== "All"
          ? ` in the ${state.family} family`
          : "";
        emptyMsg.textContent = `No unisex perfumes found${queryNote}${familyNote}. Reset filters to browse all six creations.`;
      }
      return;
    }

    if (emptyState) {
      emptyState.classList.add("d-none");
    }
    grid.innerHTML = filtered.map(renderProductCard).join("");
  }

  /* ------------------------------------------------------------------------
     Notes Modal (Bootstrap 5 with Vanilla Fallback)
     ------------------------------------------------------------------------ */
  function openNotesModal(perfumeId) {
    const perfume = UNISEX_PERFUMES.find((p) => p.id === perfumeId);
    const modalEl = document.getElementById("notesModal");
    if (!perfume || !modalEl) return;

    state.activeModalId = perfume.id;

    const eyebrowEl = document.getElementById("notesModalEyebrow");
    const titleEl = document.getElementById("notesModalLabel");
    const bodyEl = document.getElementById("notesModalBody");
    const sizeEl = document.getElementById("notesModalSize");
    const priceEl = document.getElementById("notesModalPrice");
    const addBtn = document.getElementById("notesModalAddBtn");

    if (eyebrowEl) {
      eyebrowEl.textContent = `${perfume.family.toUpperCase()} • ${perfume.typeLabel}`;
    }
    if (titleEl) {
      titleEl.textContent = perfume.name;
    }
    if (sizeEl) {
      sizeEl.textContent = perfume.size;
    }
    if (priceEl) {
      priceEl.textContent = formatPKR(perfume.price);
    }
    if (addBtn) {
      addBtn.dataset.modalProductId = perfume.id;
    }

    if (bodyEl) {
      bodyEl.innerHTML = `
        <div class="unisex-modal-grid">
          <div class="unisex-modal-visual">
            ${renderBottleSVG(perfume, 118, 206)}
          </div>
          <div>
            <p class="unisex-modal-story">${escapeHtml(perfume.story)}</p>
            <div class="notes-pyramid">
              <div class="notes-tier">
                <span class="notes-tier__label">Top Notes</span>
                <p class="notes-tier__items mb-0">${escapeHtml(perfume.notes.top.join(" • "))}</p>
              </div>
              <div class="notes-tier">
                <span class="notes-tier__label">Heart Notes</span>
                <p class="notes-tier__items mb-0">${escapeHtml(perfume.notes.heart.join(" • "))}</p>
              </div>
              <div class="notes-tier">
                <span class="notes-tier__label">Base Notes</span>
                <p class="notes-tier__items mb-0">${escapeHtml(perfume.notes.base.join(" • "))}</p>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (window.bootstrap && window.bootstrap.Modal) {
      window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
    } else {
      modalEl.classList.add("show");
      modalEl.style.display = "block";
      modalEl.setAttribute("aria-hidden", "false");
    }
  }

  function closeNotesModalFallback() {
    const modalEl = document.getElementById("notesModal");
    if (!modalEl || (window.bootstrap && window.bootstrap.Modal)) return;
    modalEl.classList.remove("show");
    modalEl.style.display = "none";
    modalEl.setAttribute("aria-hidden", "true");
  }

  /* ------------------------------------------------------------------------
     Event Binding & Initialization
     ------------------------------------------------------------------------ */
  function resetFilters() {
    state.family = "All";
    state.query = "";

    const searchInput = document.getElementById("unisex-search-input");
    if (searchInput) searchInput.value = "";

    document.querySelectorAll("[data-family-filter]").forEach((btn) => {
      const isAll = btn.dataset.familyFilter === "All";
      btn.classList.toggle("is-active", isAll);
      btn.setAttribute("aria-pressed", String(isAll));
    });

    renderGrid();
  }

  function initUnisexPage() {
    const filterGroup = document.getElementById("family-filter-group");
    const searchInput = document.getElementById("unisex-search-input");
    const grid = document.getElementById("unisex-product-grid");
    const resetBtn = document.getElementById("unisex-reset-btn");
    const modalAddBtn = document.getElementById("notesModalAddBtn");
    const modalEl = document.getElementById("notesModal");

    if (filterGroup) {
      filterGroup.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-family-filter]");
        if (!btn) return;
        state.family = btn.dataset.familyFilter;

        filterGroup.querySelectorAll("[data-family-filter]").forEach((chip) => {
          const active = chip === btn;
          chip.classList.toggle("is-active", active);
          chip.setAttribute("aria-pressed", String(active));
        });

        renderGrid();
      });
    }

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        state.query = e.target.value;
        renderGrid();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        resetFilters();
        searchInput?.focus();
      });
    }

    if (grid) {
      grid.addEventListener("click", (e) => {
        const notesBtn = e.target.closest("[data-view-notes]");
        if (notesBtn) {
          openNotesModal(notesBtn.dataset.viewNotes);
          return;
        }

        const addBtn = e.target.closest("[data-unisex-add]");
        if (addBtn) {
          addPerfumeToBag(addBtn.dataset.unisexAdd);
        }
      });
    }

    if (modalAddBtn) {
      modalAddBtn.addEventListener("click", () => {
        if (state.activeModalId) {
          addPerfumeToBag(state.activeModalId);
        }
      });
    }

    if (modalEl) {
      modalEl.querySelectorAll('[data-bs-dismiss="modal"]').forEach((btn) => {
        btn.addEventListener("click", closeNotesModalFallback);
      });
    }

    // Keep badge synced if items are added from global header search modal in main.js
    document.addEventListener("click", (e) => {
      if (e.target.closest('[data-action="add-to-bag"]')) {
        setTimeout(() => syncCartBadge(true), 0);
      }
    });

    syncCartBadge(false);
    renderGrid();
  }

  document.addEventListener("DOMContentLoaded", initUnisexPage);
})();
