/* ==========================================================================
   MAISON ZAYN — Shopping Bag Page Logic (Vanilla JS)
   ========================================================================== */

(function () {
  "use strict";

  const CART_KEY = "maison_zayn_cart_v1";
  const PROMO_KEY = "maison_zayn_promo_v1";
  const VALID_PROMO_CODE = "ZAYN10";
  const PROMO_DISCOUNT_RATE = 0.1;
  const FREE_SHIPPING_THRESHOLD = 40000;
  const STANDARD_SHIPPING_FEE = 500;

  /* Catalog metadata for rendering bottle SVGs and resolving any catalog item */
  const PRODUCT_CATALOG = {
    "oudh-imperial": {
      id: "oudh-imperial",
      name: "Oudh Imperial",
      family: "Oud • Unisex",
      size: "50ml",
      price: 28500,
      typeLabel: "EXTRAIT DE PARFUM",
      glassColor: "#4F3F29",
      strokeColor: "rgba(26,23,20,0.16)",
      capColor: "#C19A4F"
    },
    "musc-blanc": {
      id: "musc-blanc",
      name: "Musc Blanc",
      family: "Fresh • Unisex",
      size: "50ml",
      price: 21000,
      typeLabel: "EAU DE PARFUM",
      glassColor: "#F2EFEA",
      strokeColor: "rgba(26,23,20,0.16)",
      capColor: "#1A1714"
    },
    "ambre-nomade": {
      id: "ambre-nomade",
      name: "Ambre Nomade",
      family: "Amber • Unisex",
      size: "50ml",
      price: 25500,
      typeLabel: "EXTRAIT DE PARFUM",
      glassColor: "#B87A3D",
      strokeColor: "rgba(26,23,20,0.16)",
      capColor: "#C19A4F"
    },
    "bois-de-cedre": {
      id: "bois-de-cedre",
      name: "Bois de Cèdre",
      family: "Woody • Unisex",
      size: "50ml",
      price: 23000,
      typeLabel: "EAU DE PARFUM",
      glassColor: "#8D6E4E",
      strokeColor: "rgba(26,23,20,0.16)",
      capColor: "#1A1714"
    },
    "neroli-azur": {
      id: "neroli-azur",
      name: "Néroli Azur",
      family: "Fresh • Unisex",
      size: "50ml",
      price: 19500,
      typeLabel: "EAU DE PARFUM",
      glassColor: "#C7D3CC",
      strokeColor: "rgba(26,23,20,0.16)",
      capColor: "#1A1714"
    },
    "oudh-velours": {
      id: "oudh-velours",
      name: "Oudh Velours",
      family: "Oud • Unisex",
      size: "50ml",
      price: 27000,
      typeLabel: "EXTRAIT DE PARFUM",
      glassColor: "#633D35",
      strokeColor: "rgba(26,23,20,0.16)",
      capColor: "#C19A4F"
    },
    "santal-de-grasse": {
      id: "santal-de-grasse",
      name: "Santal de Grasse",
      family: "Woody • Men",
      size: "30ml",
      price: 22500,
      typeLabel: "EAU DE PARFUM",
      glassColor: "#C9A55A",
      strokeColor: "rgba(26,23,20,0.14)",
      capColor: "#1A1714"
    },
    "rose-ispahan": {
      id: "rose-ispahan",
      name: "Rose Ispahan",
      family: "Floral • Women",
      size: "30ml",
      price: 23500,
      typeLabel: "EAU DE PARFUM",
      glassColor: "#D9B8B4",
      strokeColor: "rgba(26,23,20,0.14)",
      capColor: "#1A1714"
    },
    "vetiver-cuir": {
      id: "vetiver-cuir",
      name: "Vétiver & Cuir",
      family: "Woody • Men",
      size: "30ml",
      price: 22500,
      typeLabel: "EAU DE PARFUM",
      glassColor: "#C5A888",
      strokeColor: "rgba(26,23,20,0.14)",
      capColor: "#1A1714"
    },
    "bergamote-sauvage": {
      id: "bergamote-sauvage",
      name: "Bergamote Sauvage",
      family: "Fresh • Men",
      size: "50ml",
      price: 19500,
      typeLabel: "EAU DE PARFUM",
      glassColor: "#755B40",
      strokeColor: "rgba(26,23,20,0.14)",
      capColor: "#C19A4F"
    },
    "la-collection-royale-trunk": {
      id: "la-collection-royale-trunk",
      name: "La Collection Royale Trunk",
      family: "Oudh • Unisex",
      size: "3-Piece Trunk",
      price: 65000,
      typeLabel: "EXTRAIT DE PARFUM",
      glassColor: "#EDE6DA",
      strokeColor: "rgba(26,23,20,0.16)",
      capColor: "#1A1714"
    }
  };

  let activePromoCode = sessionStorage.getItem(PROMO_KEY) === VALID_PROMO_CODE ? VALID_PROMO_CODE : "";

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatPKR(amount) {
    return `PKR ${Math.round(Number(amount) || 0).toLocaleString("en-PK")}`;
  }

  function renderBottleSVG(product, width = 72, height = 126) {
    const upperName = String(product.name || "MAISON ZAYN").toUpperCase();
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
     Cart Storage & Normalization
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
    const totalCount = cart.reduce((sum, item) => sum + Math.max(0, Number(item.qty) || 0), 0);
    document.querySelectorAll("[data-cart-badge]").forEach((badge) => {
      badge.textContent = String(totalCount);
      if (bump) {
        badge.classList.remove("is-bumped");
        void badge.offsetWidth;
        badge.classList.add("is-bumped");
      }
    });
  }

  function normalizeCartItem(entry) {
    const meta = PRODUCT_CATALOG[entry.id] || {};
    const qty = Math.max(1, Number(entry.qty) || 1);
    const price = Number(entry.price) > 0 ? Number(entry.price) : (meta.price || 20000);

    return {
      id: entry.id,
      name: entry.name || meta.name || "Maison Zayn Creation",
      family: meta.family || "Haute Parfumerie",
      size: entry.size || meta.size || "50ml",
      price,
      currency: "PKR",
      qty,
      typeLabel: meta.typeLabel || "EXTRAIT DE PARFUM",
      glassColor: meta.glassColor || "#8D6E4E",
      strokeColor: meta.strokeColor || "rgba(26,23,20,0.16)",
      capColor: meta.capColor || "#C19A4F"
    };
  }

  function hydrateCatalogDefaultsInStorage() {
    const rawCart = getCart();
    let changed = false;

    const hydrated = rawCart.map((entry) => {
      const meta = PRODUCT_CATALOG[entry.id];
      if (meta && (!entry.name || !entry.price || !entry.size)) {
        changed = true;
        return {
          id: entry.id,
          name: entry.name || meta.name,
          price: Number(entry.price) > 0 ? Number(entry.price) : meta.price,
          currency: "PKR",
          size: entry.size || meta.size,
          qty: Math.max(1, Number(entry.qty) || 1)
        };
      }
      return entry;
    });

    if (changed) {
      localStorage.setItem(CART_KEY, JSON.stringify(hydrated));
    }
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

  function calculateTotals(items) {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const totalUnits = items.reduce((sum, item) => sum + item.qty, 0);
    const hasPromo = activePromoCode === VALID_PROMO_CODE && subtotal > 0;
    const discountAmount = hasPromo ? Math.round(subtotal * PROMO_DISCOUNT_RATE) : 0;
    const discountedSubtotal = Math.max(0, subtotal - discountAmount);
    const qualifiesFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
    const shippingFee = items.length === 0 || qualifiesFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
    const grandTotal = discountedSubtotal + shippingFee;

    return {
      subtotal,
      totalUnits,
      hasPromo,
      discountAmount,
      shippingFee,
      qualifiesFreeShipping,
      grandTotal
    };
  }

  /* ------------------------------------------------------------------------
     Cart Rendering
     ------------------------------------------------------------------------ */
  function renderCartItemRow(item) {
    const itemSubtotal = item.price * item.qty;
    const isMinQty = item.qty <= 1;

    return `
      <article class="cart-bag-item" data-cart-id="${escapeHtml(item.id)}">
        <div class="cart-bag-item__visual">
          ${renderBottleSVG(item, 68, 118)}
        </div>

        <div class="cart-bag-item__info">
          <span class="eyebrow cart-bag-item__eyebrow">${escapeHtml(item.family)}</span>
          <h4 class="cart-bag-item__title">${escapeHtml(item.name)}</h4>
          <p class="cart-bag-item__meta mb-2">
            Size: <strong>${escapeHtml(item.size)}</strong> &bull; Unit Price: <strong>${escapeHtml(formatPKR(item.price))}</strong>
          </p>
          <button type="button" class="cart-bag-item__remove" data-remove-item="${escapeHtml(item.id)}">
            Remove
          </button>
        </div>

        <div class="cart-bag-item__controls">
          <div class="qty-control" role="group" aria-label="Quantity for ${escapeHtml(item.name)}">
            <button
              type="button"
              class="qty-control__btn"
              data-qty-dec="${escapeHtml(item.id)}"
              aria-label="Decrease quantity of ${escapeHtml(item.name)}"
              ${isMinQty ? 'disabled aria-disabled="true"' : ""}
            >&minus;</button>
            <span class="qty-control__value" aria-label="Quantity">${item.qty}</span>
            <button
              type="button"
              class="qty-control__btn"
              data-qty-inc="${escapeHtml(item.id)}"
              aria-label="Increase quantity of ${escapeHtml(item.name)}"
            >+</button>
          </div>
          <div class="cart-bag-item__subtotal">
            <span class="cart-bag-item__subtotal-label">Item Subtotal</span>
            <strong class="cart-bag-item__subtotal-value">${escapeHtml(formatPKR(itemSubtotal))}</strong>
          </div>
        </div>
      </article>
    `;
  }

  function syncPromoUI(totals) {
    const promoInput = document.getElementById("promo-input");
    const promoPill = document.getElementById("promo-applied-pill");
    const discountRow = document.getElementById("cart-discount-row");
    const discountEl = document.getElementById("cart-discount");

    if (promoPill) {
      promoPill.classList.toggle("d-none", !totals.hasPromo);
    }
    if (discountRow) {
      discountRow.classList.toggle("d-none", !totals.hasPromo);
    }
    if (discountEl) {
      discountEl.textContent = `- ${formatPKR(totals.discountAmount)}`;
    }
    if (promoInput && totals.hasPromo && !promoInput.value.trim()) {
      promoInput.value = VALID_PROMO_CODE;
    }
  }

  function renderCart() {
    const layoutRow = document.getElementById("cart-layout-row");
    const emptyState = document.getElementById("cart-empty-state");
    const itemsList = document.getElementById("cart-items-list");
    const itemCountEl = document.getElementById("cart-item-count");
    const subtotalEl = document.getElementById("cart-subtotal");
    const shippingEl = document.getElementById("cart-shipping");
    const shippingNoteEl = document.getElementById("cart-shipping-note");
    const grandTotalEl = document.getElementById("cart-grand-total");
    const checkoutBtn = document.getElementById("proceed-checkout-btn");

    const rawCart = getCart();
    const items = rawCart.map(normalizeCartItem);

    syncCartBadge(false);

    if (!items.length) {
      if (layoutRow) layoutRow.classList.add("d-none");
      if (emptyState) emptyState.classList.remove("d-none");
      if (itemsList) itemsList.innerHTML = "";
      if (checkoutBtn) checkoutBtn.disabled = true;
      return;
    }

    if (layoutRow) layoutRow.classList.remove("d-none");
    if (emptyState) emptyState.classList.add("d-none");
    if (checkoutBtn) checkoutBtn.disabled = false;

    const totals = calculateTotals(items);

    if (itemCountEl) {
      itemCountEl.textContent = `${totals.totalUnits} Creation${totals.totalUnits === 1 ? "" : "s"} in Bag`;
    }
    if (itemsList) {
      itemsList.innerHTML = items.map(renderCartItemRow).join("");
    }
    if (subtotalEl) {
      subtotalEl.textContent = formatPKR(totals.subtotal);
    }
    if (shippingEl) {
      shippingEl.textContent = totals.qualifiesFreeShipping ? "Complimentary" : formatPKR(totals.shippingFee);
    }
    if (grandTotalEl) {
      grandTotalEl.textContent = formatPKR(totals.grandTotal);
    }
    if (shippingNoteEl) {
      shippingNoteEl.textContent = totals.qualifiesFreeShipping
        ? "Complimentary Express Shipping unlocked for your parcel."
        : `Add ${formatPKR(FREE_SHIPPING_THRESHOLD - totals.subtotal)} more for Complimentary Express Shipping.`;
    }

    syncPromoUI(totals);
  }

  /* ------------------------------------------------------------------------
     Cart Mutations (Immediate localStorage + UI + Badge Updates)
     ------------------------------------------------------------------------ */
  function updateItemQuantity(productId, delta) {
    const cart = getCart();
    const target = cart.find((item) => item.id === productId);
    if (!target) return;

    const nextQty = Math.max(1, (Number(target.qty) || 1) + delta);
    if (nextQty === Number(target.qty)) return;

    target.qty = nextQty;
    saveCart(cart);
    renderCart();
  }

  function removeItemFromCart(productId) {
    const cart = getCart();
    const removed = cart.find((item) => item.id === productId);
    const nextCart = cart.filter((item) => item.id !== productId);
    saveCart(nextCart);
    renderCart();
    if (removed) {
      const label = removed.name || (PRODUCT_CATALOG[removed.id]?.name) || "creation";
      showToast(`Removed ${label} from your bag`);
    }
  }

  /* ------------------------------------------------------------------------
     Order Confirmation Modal (Bootstrap 5 with Vanilla Fallback)
     ------------------------------------------------------------------------ */
  function getCheckoutModalInstance() {
    const modalEl = document.getElementById("checkoutModal");
    if (!modalEl) return null;
    if (window.bootstrap && window.bootstrap.Modal) {
      return window.bootstrap.Modal.getOrCreateInstance(modalEl);
    }
    return null;
  }

  function showCheckoutModalElement() {
    const modalEl = document.getElementById("checkoutModal");
    if (!modalEl) return;
    const instance = getCheckoutModalInstance();
    if (instance) {
      instance.show();
    } else {
      modalEl.classList.add("show");
      modalEl.style.display = "block";
      modalEl.setAttribute("aria-hidden", "false");
    }
  }

  function closeCheckoutModalFallback() {
    const modalEl = document.getElementById("checkoutModal");
    if (!modalEl || (window.bootstrap && window.bootstrap.Modal)) return;
    modalEl.classList.remove("show");
    modalEl.style.display = "none";
    modalEl.setAttribute("aria-hidden", "true");
  }

  function openCheckoutConfirmationModal() {
    const items = getCart().map(normalizeCartItem);
    if (!items.length) {
      showToast("Your shopping bag is empty");
      return;
    }

    const totals = calculateTotals(items);
    const eyebrowEl = document.getElementById("checkoutModalEyebrow");
    const titleEl = document.getElementById("checkoutModalLabel");
    const bodyEl = document.getElementById("checkoutModalBody");
    const footerEl = document.getElementById("checkoutModalFooter");

    if (eyebrowEl) eyebrowEl.textContent = "ATELIER ORDER CONFIRMATION";
    if (titleEl) titleEl.textContent = "Confirm Your Order";

    if (bodyEl) {
      const itemRowsHtml = items
        .map(
          (item) => `
          <div class="checkout-modal-item">
            <div>
              <strong class="checkout-modal-item__name">${escapeHtml(item.name)}</strong>
              <span class="checkout-modal-item__meta">${escapeHtml(item.size)} &times; ${item.qty}</span>
            </div>
            <span class="checkout-modal-item__price">${escapeHtml(formatPKR(item.price * item.qty))}</span>
          </div>
        `
        )
        .join("");

      bodyEl.innerHTML = `
        <p class="checkout-modal-intro">
          Please review your Maison Zayn parcel dossier below. Confirming your order reserves your small-batch flacons and complimentary 2ml artisanal sample.
        </p>
        <div class="checkout-modal-items">
          ${itemRowsHtml}
        </div>
        <div class="checkout-modal-totals">
          <div class="cart-summary__row">
            <span>Subtotal (${totals.totalUnits} item${totals.totalUnits === 1 ? "" : "s"})</span>
            <span>${escapeHtml(formatPKR(totals.subtotal))}</span>
          </div>
          ${
            totals.hasPromo
              ? `<div class="cart-summary__row cart-summary__row--discount">
                   <span>Promo Discount (ZAYN10 &bull; 10%)</span>
                   <span>- ${escapeHtml(formatPKR(totals.discountAmount))}</span>
                 </div>`
              : ""
          }
          <div class="cart-summary__row">
            <span>Express Shipping</span>
            <span>${totals.qualifiesFreeShipping ? "Complimentary" : escapeHtml(formatPKR(totals.shippingFee))}</span>
          </div>
          <div class="cart-summary__row cart-summary__total">
            <span>Grand Total</span>
            <span>${escapeHtml(formatPKR(totals.grandTotal))}</span>
          </div>
        </div>
      `;
    }

    if (footerEl) {
      footerEl.innerHTML = `
        <button type="button" class="btn btn--secondary btn--sm" data-bs-dismiss="modal">Back to Bag</button>
        <button type="button" class="btn btn--dark btn--sm" id="confirm-order-btn">Confirm Order</button>
      `;
      document.getElementById("confirm-order-btn")?.addEventListener("click", handleOrderConfirmed);
      footerEl.querySelectorAll('[data-bs-dismiss="modal"]').forEach((btn) => {
        btn.addEventListener("click", closeCheckoutModalFallback);
      });
    }

    showCheckoutModalElement();
  }

  function handleOrderConfirmed() {
    const items = getCart().map(normalizeCartItem);
    const totals = calculateTotals(items);
    const orderNumber = `MZ-${String(Date.now()).slice(-6)}`;

    // Clear cart & promo state immediately on confirmation
    activePromoCode = "";
    sessionStorage.removeItem(PROMO_KEY);
    const promoInput = document.getElementById("promo-input");
    const promoFeedback = document.getElementById("promo-feedback");
    if (promoInput) promoInput.value = "";
    if (promoFeedback) {
      promoFeedback.textContent = "";
      promoFeedback.classList.remove("is-success", "is-error");
    }

    saveCart([]);
    renderCart();

    const eyebrowEl = document.getElementById("checkoutModalEyebrow");
    const titleEl = document.getElementById("checkoutModalLabel");
    const bodyEl = document.getElementById("checkoutModalBody");
    const footerEl = document.getElementById("checkoutModalFooter");

    if (eyebrowEl) eyebrowEl.textContent = "ORDER CONFIRMED";
    if (titleEl) titleEl.textContent = "Thank You for Your Curation";

    if (bodyEl) {
      bodyEl.innerHTML = `
        <div class="checkout-confirmed-box">
          <div class="checkout-confirmed-badge" aria-hidden="true">&#10003;</div>
          <p class="checkout-confirmed-ref">Order Reference: <strong>${escapeHtml(orderNumber)}</strong></p>
          <p class="checkout-confirmed-desc">
            Your Maison Zayn order totaling <strong>${escapeHtml(formatPKR(totals.grandTotal))}</strong> has been confirmed and your shopping bag has been cleared. A complimentary 2ml artisanal sample will accompany your parcel.
          </p>
        </div>
      `;
    }

    if (footerEl) {
      footerEl.innerHTML = `
        <button type="button" class="btn btn--secondary btn--sm" data-bs-dismiss="modal">Close</button>
        <a href="unisex.html" class="btn btn--primary btn--sm">Continue Shopping</a>
      `;
      footerEl.querySelectorAll('[data-bs-dismiss="modal"]').forEach((btn) => {
        btn.addEventListener("click", closeCheckoutModalFallback);
      });
    }

    showToast(`Order ${orderNumber} confirmed`);
  }

  /* ------------------------------------------------------------------------
     Initialization & Event Listeners
     ------------------------------------------------------------------------ */
  function initCartPage() {
    hydrateCatalogDefaultsInStorage();

    const itemsList = document.getElementById("cart-items-list");
    const promoForm = document.getElementById("promo-form");
    const promoInput = document.getElementById("promo-input");
    const promoRemoveBtn = document.getElementById("promo-remove-btn");
    const promoFeedback = document.getElementById("promo-feedback");
    const checkoutBtn = document.getElementById("proceed-checkout-btn");
    const modalEl = document.getElementById("checkoutModal");

    if (itemsList) {
      itemsList.addEventListener("click", (e) => {
        const decBtn = e.target.closest("[data-qty-dec]");
        if (decBtn) {
          updateItemQuantity(decBtn.dataset.qtyDec, -1);
          return;
        }

        const incBtn = e.target.closest("[data-qty-inc]");
        if (incBtn) {
          updateItemQuantity(incBtn.dataset.qtyInc, 1);
          return;
        }

        const removeBtn = e.target.closest("[data-remove-item]");
        if (removeBtn) {
          removeItemFromCart(removeBtn.dataset.removeItem);
        }
      });
    }

    if (promoForm) {
      promoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const code = (promoInput?.value || "").trim().toUpperCase();

        if (!code) {
          if (promoFeedback) {
            promoFeedback.textContent = "Enter promo code ZAYN10 for 10% off.";
            promoFeedback.classList.remove("is-success");
            promoFeedback.classList.add("is-error");
          }
          return;
        }

        if (code === VALID_PROMO_CODE) {
          activePromoCode = VALID_PROMO_CODE;
          sessionStorage.setItem(PROMO_KEY, VALID_PROMO_CODE);
          if (promoFeedback) {
            promoFeedback.textContent = "Privilege code ZAYN10 applied — 10% off your order.";
            promoFeedback.classList.remove("is-error");
            promoFeedback.classList.add("is-success");
          }
          renderCart();
          showToast("Promo code ZAYN10 applied (10% off)");
        } else {
          if (promoFeedback) {
            promoFeedback.textContent = `Code "${code}" is invalid. Try ZAYN10 for 10% off.`;
            promoFeedback.classList.remove("is-success");
            promoFeedback.classList.add("is-error");
          }
        }
      });
    }

    if (promoRemoveBtn) {
      promoRemoveBtn.addEventListener("click", () => {
        activePromoCode = "";
        sessionStorage.removeItem(PROMO_KEY);
        if (promoInput) promoInput.value = "";
        if (promoFeedback) {
          promoFeedback.textContent = "Promo code removed.";
          promoFeedback.classList.remove("is-error", "is-success");
        }
        renderCart();
      });
    }

    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", openCheckoutConfirmationModal);
    }

    if (modalEl) {
      modalEl.querySelectorAll('[data-bs-dismiss="modal"]').forEach((btn) => {
        btn.addEventListener("click", closeCheckoutModalFallback);
      });
    }

    // Keep cart synced if user adds an item via the global header Search Modal in main.js
    document.addEventListener("click", (e) => {
      if (e.target.closest('[data-action="add-to-bag"]')) {
        setTimeout(() => {
          hydrateCatalogDefaultsInStorage();
          syncCartBadge(true);
          renderCart();
        }, 0);
      }
    });

    // Keep cart synced across tabs
    window.addEventListener("storage", (e) => {
      if (e.key === CART_KEY) {
        hydrateCatalogDefaultsInStorage();
        renderCart();
      }
    });

    renderCart();
  }

  document.addEventListener("DOMContentLoaded", initCartPage);
})();
