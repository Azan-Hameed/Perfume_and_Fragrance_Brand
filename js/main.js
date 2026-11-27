/**
 * MAISON ZAYN — Shared Navigation, Cart (localStorage), Modals, Toasts & SVG Generators
 */
(function () {
  'use strict';

  const CART_KEY = 'maison_zayn_bag';
  const FREE_SHIPPING_THRESHOLD = 40000;
  let lastFocusedElement = null;

  function formatPKR(amount) {
    const num = Math.round(Number(amount) || 0);
    return 'PKR ' + num.toLocaleString('en-US');
  }

  /* --------------------------------------------------------------------------
     Cart & LocalStorage Helpers
     -------------------------------------------------------------------------- */
  function getCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (err) {
      // Fail gracefully if storage is restricted
    }
    updateBagBadge();
    window.dispatchEvent(new CustomEvent('mz:cart-updated', { detail: { cart } }));
  }

  function getCartCount() {
    return getCart().reduce(function (sum, item) {
      return sum + (Number(item.qty) || 0);
    }, 0);
  }

  function getCartSubtotal() {
    return getCart().reduce(function (sum, item) {
      return sum + (Number(item.price) || 0) * (Number(item.qty) || 0);
    }, 0);
  }

  function addToBag(item) {
    if (!item || !item.id) return;
    const cart = getCart();
    const existing = cart.find(function (entry) {
      return entry.id === item.id;
    });

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        price: Number(item.price) || 0,
        subtitle: item.subtitle || '',
        qty: 1
      });
    }

    saveCart(cart);
    showToast(item.name + ' added to your bag');
  }

  function updateItemQty(id, delta) {
    const cart = getCart();
    const next = [];
    cart.forEach(function (item) {
      if (item.id === id) {
        const updatedQty = (Number(item.qty) || 0) + delta;
        if (updatedQty > 0) {
          next.push(Object.assign({}, item, { qty: updatedQty }));
        }
      } else {
        next.push(item);
      }
    });
    saveCart(next);
  }

  function clearCart() {
    saveCart([]);
  }

  function updateBagBadge() {
    const count = getCartCount();
    const badges = document.querySelectorAll('[data-bag-count]');
    badges.forEach(function (badge) {
      badge.textContent = String(count);
      badge.classList.toggle('has-items', count > 0);
    });
  }

  /* --------------------------------------------------------------------------
     Toast Notifications
     -------------------------------------------------------------------------- */
  function ensureToastContainer() {
    let container = document.getElementById('mz-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'mz-toast-container';
      container.className = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'true');
      document.body.appendChild(container);
    }
    return container;
  }

  function showToast(message) {
    const container = ensureToastContainer();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');

    const dot = document.createElement('span');
    dot.className = 'toast__dot';
    dot.setAttribute('aria-hidden', 'true');

    const text = document.createElement('span');
    text.textContent = message;

    toast.appendChild(dot);
    toast.appendChild(text);
    container.appendChild(toast);

    window.setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'opacity 0.22s ease, transform 0.22s ease';
      window.setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 240);
    }, 3000);
  }

  /* --------------------------------------------------------------------------
     Shared Modal Helpers & Quick Bag Modal
     -------------------------------------------------------------------------- */
  function openModal(overlay) {
    if (!overlay) return;
    lastFocusedElement = document.activeElement;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const closeBtn = overlay.querySelector('[data-modal-close]');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(overlay) {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  }

  function renderBagModalContent() {
    const body = document.getElementById('mz-bag-modal-body');
    if (!body) return;

    const cart = getCart();
    const subtotal = getCartSubtotal();
    const qualifies = subtotal >= FREE_SHIPPING_THRESHOLD;
    const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

    body.innerHTML = '';

    const heading = document.createElement('h2');
    heading.id = 'mz-bag-modal-title';
    heading.className = 'modal-title';
    heading.textContent = 'Your Maison Bag';
    body.appendChild(heading);

    if (cart.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'modal-desc';
      empty.textContent = 'Your bag is currently empty. Explore our Haute Parfumerie creations or discovery coffrets to begin.';
      body.appendChild(empty);
      return;
    }

    const list = document.createElement('div');
    list.className = 'bag-items';

    cart.forEach(function (item) {
      const row = document.createElement('div');
      row.className = 'bag-item';

      const info = document.createElement('div');
      const title = document.createElement('div');
      title.className = 'bag-item__title';
      title.textContent = item.name;
      const meta = document.createElement('div');
      meta.className = 'bag-item__meta';
      meta.textContent = formatPKR(item.price) + (item.subtitle ? ' · ' + item.subtitle : '');
      info.appendChild(title);
      info.appendChild(meta);

      const controls = document.createElement('div');
      controls.className = 'bag-item__controls';

      const decBtn = document.createElement('button');
      decBtn.type = 'button';
      decBtn.className = 'qty-btn';
      decBtn.setAttribute('aria-label', 'Decrease quantity of ' + item.name);
      decBtn.textContent = '−';
      decBtn.addEventListener('click', function () {
        updateItemQty(item.id, -1);
        renderBagModalContent();
      });

      const qtySpan = document.createElement('span');
      qtySpan.textContent = String(item.qty);
      qtySpan.style.minWidth = '1.5rem';
      qtySpan.style.textAlign = 'center';

      const incBtn = document.createElement('button');
      incBtn.type = 'button';
      incBtn.className = 'qty-btn';
      incBtn.setAttribute('aria-label', 'Increase quantity of ' + item.name);
      incBtn.textContent = '+';
      incBtn.addEventListener('click', function () {
        updateItemQty(item.id, 1);
        renderBagModalContent();
      });

      controls.appendChild(decBtn);
      controls.appendChild(qtySpan);
      controls.appendChild(incBtn);

      row.appendChild(info);
      row.appendChild(controls);
      list.appendChild(row);
    });

    body.appendChild(list);

    const summary = document.createElement('div');
    summary.className = 'calc-breakdown';
    summary.innerHTML =
      '<div class="calc-row"><span>Bag Subtotal</span><strong>' + formatPKR(subtotal) + '</strong></div>' +
      '<div class="calc-row calc-row--muted"><span>Express Shipping &amp; 2ml Sample</span><span>' +
      (qualifies
        ? 'Complimentary (' + formatPKR(0) + ')'
        : formatPKR(remaining) + ' away from Free Express') +
      '</span></div>';
    body.appendChild(summary);

    const actions = document.createElement('div');
    actions.className = 'calc-actions';

    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'btn btn-outline';
    clearBtn.textContent = 'Clear Bag';
    clearBtn.addEventListener('click', function () {
      clearCart();
      renderBagModalContent();
      showToast('Your Maison bag has been cleared');
    });

    const giftLink = document.createElement('a');
    const inPagesDir = /\/pages\//i.test(window.location.pathname);
    giftLink.href = (inPagesDir ? '' : 'pages/') + 'gift-sets.html#gift-calculator';
    giftLink.className = 'btn btn-primary';
    giftLink.textContent = 'Gift & Shipping Calculator';
    giftLink.addEventListener('click', function () {
      const bagModal = document.getElementById('mz-bag-modal');
      closeModal(bagModal);
    });

    actions.appendChild(clearBtn);
    actions.appendChild(giftLink);
    body.appendChild(actions);
  }

  function ensureBagModal() {
    let overlay = document.getElementById('mz-bag-modal');
    if (overlay) return overlay;

    overlay = document.createElement('div');
    overlay.id = 'mz-bag-modal';
    overlay.className = 'modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'mz-bag-modal-title');
    overlay.setAttribute('aria-hidden', 'true');

    overlay.innerHTML =
      '<div class="modal-dialog">' +
      '  <button type="button" class="modal-close" data-modal-close aria-label="Close bag summary">&times;</button>' +
      '  <div id="mz-bag-modal-body" class="bag-modal-body"></div>' +
      '</div>';

    document.body.appendChild(overlay);

    overlay.addEventListener('click', function (event) {
      if (event.target === overlay || event.target.hasAttribute('data-modal-close')) {
        closeModal(overlay);
      }
    });

    return overlay;
  }

  /* --------------------------------------------------------------------------
     Mobile Hamburger Drawer & Sticky Header
     -------------------------------------------------------------------------- */
  function initHeaderAndDrawer() {
    const header = document.querySelector('.site-header');
    if (header) {
      window.addEventListener('scroll', function () {
        header.classList.toggle('is-scrolled', window.scrollY > 12);
      }, { passive: true });
    }

    const menuToggle = document.querySelector('[data-drawer-open]');
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    const closeBtn = document.querySelector('[data-drawer-close]');

    function openDrawer() {
      if (!drawer || !backdrop || !menuToggle) return;
      lastFocusedElement = document.activeElement;
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      menuToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }

    function closeDrawer() {
      if (!drawer || !backdrop || !menuToggle) return;
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
        lastFocusedElement = null;
      }
    }

    if (menuToggle) menuToggle.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    // Bag triggers
    const bagButtons = document.querySelectorAll('[data-open-bag]');
    bagButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const bagModal = ensureBagModal();
        renderBagModalContent();
        openModal(bagModal);
      });
    });

    // Global Escape key handler for drawer and open modals
    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;
      if (drawer && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
      document.querySelectorAll('.modal-overlay.is-open').forEach(function (modal) {
        closeModal(modal);
      });
    });
  }

  /* --------------------------------------------------------------------------
     Inline SVG Artwork Generators (Perfume Flacons & Gift Coffrets)
     -------------------------------------------------------------------------- */
  function escapeXml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function createPerfumeBottleSVG(product) {
    const liquidColor = product.liquidColor || '#D9BA82';
    const capColor = product.capColor || '#1A1714';
    const labelText = escapeXml(product.shortLabel || product.name);
    const concentration = escapeXml(product.concentrationShort || 'EXTRAIT · 100ML');

    return (
      '<svg width="160" height="205" viewBox="0 0 160 205" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' +
      escapeXml(product.name) + ' glass flacon">' +
      '<ellipse cx="80" cy="194" rx="46" ry="6" fill="rgba(26,23,20,0.12)"/>' +
      '<rect x="64" y="14" width="32" height="28" rx="3" fill="' + capColor + '" stroke="#C19A4F" stroke-width="1.4"/>' +
      '<rect x="64" y="21" width="32" height="3" fill="#C19A4F" opacity="0.85"/>' +
      '<rect x="69" y="42" width="22" height="14" rx="1" fill="#C19A4F"/>' +
      '<path d="M40 70 C40 60 52 56 69 56 H91 C108 56 120 60 120 70 V174 C120 183 113 188 104 188 H56 C47 188 40 183 40 174 V70 Z" fill="#FAF7F2" stroke="#1A1714" stroke-width="1.6"/>' +
      '<path d="M47 84 H113 V170 C113 176 109 180 103 180 H57 C51 180 47 176 47 170 V84 Z" fill="' + liquidColor + '" opacity="0.48"/>' +
      '<line x1="80" y1="56" x2="80" y2="174" stroke="#1A1714" stroke-opacity="0.2" stroke-width="1.2"/>' +
      '<rect x="52" y="96" width="56" height="64" rx="2" fill="#F8F6F2" stroke="#C19A4F" stroke-width="1.2"/>' +
      '<rect x="55" y="99" width="50" height="58" rx="1" fill="none" stroke="#1A1714" stroke-opacity="0.2" stroke-width="0.75"/>' +
      '<text x="80" y="114" text-anchor="middle" font-family="Outfit, sans-serif" font-size="6.2" letter-spacing="1.8" fill="#C19A4F" font-weight="600">MAISON ZAYN</text>' +
      '<text x="80" y="131" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-size="10.2" fill="#1A1714" font-weight="600">' + labelText + '</text>' +
      '<line x1="65" y1="138" x2="95" y2="138" stroke="#C19A4F" stroke-width="0.8"/>' +
      '<text x="80" y="149" text-anchor="middle" font-family="Outfit, sans-serif" font-size="5.4" letter-spacing="1.2" fill="#6A6055">' + concentration + '</text>' +
      '</svg>'
    );
  }

  function createGiftBoxSVG(gift) {
    const accent = gift.accentColor || '#C19A4F';
    const title = escapeXml(gift.shortLabel || gift.name);

    if (gift.variant === 'discovery') {
      return (
        '<svg width="210" height="190" viewBox="0 0 210 190" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' +
        escapeXml(gift.name) + ' discovery kit">' +
        '<ellipse cx="105" cy="176" rx="74" ry="7" fill="rgba(26,23,20,0.12)"/>' +
        '<rect x="26" y="42" width="158" height="126" rx="6" fill="#1A1714" stroke="' + accent + '" stroke-width="1.6"/>' +
        '<rect x="34" y="50" width="142" height="110" rx="4" fill="#2A231C"/>' +
        '<rect x="46" y="72" width="14" height="58" rx="2" fill="#D9BA82" stroke="#F8F6F2" stroke-width="0.9"/>' +
        '<rect x="66" y="72" width="14" height="58" rx="2" fill="#C9A87C" stroke="#F8F6F2" stroke-width="0.9"/>' +
        '<rect x="86" y="72" width="14" height="58" rx="2" fill="#DFB2B2" stroke="#F8F6F2" stroke-width="0.9"/>' +
        '<rect x="106" y="72" width="14" height="58" rx="2" fill="#EAE4D7" stroke="#F8F6F2" stroke-width="0.9"/>' +
        '<rect x="126" y="72" width="14" height="58" rx="2" fill="#B59E7A" stroke="#F8F6F2" stroke-width="0.9"/>' +
        '<rect x="146" y="72" width="14" height="58" rx="2" fill="#DDE6CE" stroke="#F8F6F2" stroke-width="0.9"/>' +
        '<rect x="46" y="64" width="14" height="8" rx="1" fill="' + accent + '"/>' +
        '<rect x="66" y="64" width="14" height="8" rx="1" fill="' + accent + '"/>' +
        '<rect x="86" y="64" width="14" height="8" rx="1" fill="' + accent + '"/>' +
        '<rect x="106" y="64" width="14" height="8" rx="1" fill="' + accent + '"/>' +
        '<rect x="126" y="64" width="14" height="8" rx="1" fill="' + accent + '"/>' +
        '<rect x="146" y="64" width="14" height="8" rx="1" fill="' + accent + '"/>' +
        '<text x="105" y="149" text-anchor="middle" font-family="Outfit, sans-serif" font-size="6.8" letter-spacing="1.8" fill="' + accent + '">MAISON ZAYN · 6 × 5ML</text>' +
        '</svg>'
      );
    }

    if (gift.variant === 'duo') {
      return (
        '<svg width="210" height="190" viewBox="0 0 210 190" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' +
        escapeXml(gift.name) + ' dual coffret">' +
        '<ellipse cx="105" cy="176" rx="74" ry="7" fill="rgba(26,23,20,0.12)"/>' +
        '<rect x="28" y="40" width="154" height="128" rx="6" fill="#F8F6F2" stroke="' + accent + '" stroke-width="1.8"/>' +
        '<rect x="36" y="48" width="138" height="112" rx="4" fill="#1A1714"/>' +
        '<rect x="54" y="64" width="42" height="78" rx="5" fill="#DFB2B2" opacity="0.88" stroke="#F8F6F2" stroke-width="1.2"/>' +
        '<rect x="65" y="52" width="20" height="12" rx="2" fill="' + accent + '"/>' +
        '<rect x="114" y="64" width="42" height="78" rx="5" fill="#C19A4F" opacity="0.82" stroke="#F8F6F2" stroke-width="1.2"/>' +
        '<rect x="125" y="52" width="20" height="12" rx="2" fill="' + accent + '"/>' +
        '<text x="105" y="153" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-size="10.5" fill="#F8F6F2">' + title + '</text>' +
        '</svg>'
      );
    }

    // Royale Trunk
    return (
      '<svg width="210" height="190" viewBox="0 0 210 190" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' +
      escapeXml(gift.name) + ' presentation trunk">' +
      '<ellipse cx="105" cy="178" rx="78" ry="7" fill="rgba(26,23,20,0.14)"/>' +
      '<rect x="24" y="34" width="162" height="136" rx="7" fill="#2A231C" stroke="' + accent + '" stroke-width="2"/>' +
      '<line x1="24" y1="68" x2="186" y2="68" stroke="' + accent + '" stroke-width="1.6"/>' +
      '<rect x="92" y="60" width="26" height="16" rx="2" fill="' + accent + '"/>' +
      '<rect x="44" y="84" width="32" height="66" rx="4" fill="#D4B06A" opacity="0.82" stroke="#F8F6F2" stroke-width="1.1"/>' +
      '<rect x="89" y="84" width="32" height="66" rx="4" fill="#DFB2B2" opacity="0.82" stroke="#F8F6F2" stroke-width="1.1"/>' +
      '<rect x="134" y="84" width="32" height="66" rx="4" fill="#C9A87C" opacity="0.82" stroke="#F8F6F2" stroke-width="1.1"/>' +
      '<rect x="52" y="75" width="16" height="9" rx="1" fill="' + accent + '"/>' +
      '<rect x="97" y="75" width="16" height="9" rx="1" fill="' + accent + '"/>' +
      '<rect x="142" y="75" width="16" height="9" rx="1" fill="' + accent + '"/>' +
      '<text x="105" y="54" text-anchor="middle" font-family="Outfit, sans-serif" font-size="6.8" letter-spacing="2" fill="#F8F6F2">MAISON ZAYN · COFFRET</text>' +
      '<text x="105" y="162" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-size="10" fill="' + accent + '">' + title + '</text>' +
      '</svg>'
    );
  }

  /* --------------------------------------------------------------------------
     Init & Export
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initHeaderAndDrawer();
    updateBagBadge();
  });

  window.MaisonZayn = {
    FREE_SHIPPING_THRESHOLD: FREE_SHIPPING_THRESHOLD,
    formatPKR: formatPKR,
    getCart: getCart,
    saveCart: saveCart,
    addToBag: addToBag,
    updateItemQty: updateItemQty,
    clearCart: clearCart,
    getCartCount: getCartCount,
    getCartSubtotal: getCartSubtotal,
    updateBagBadge: updateBagBadge,
    showToast: showToast,
    openModal: openModal,
    closeModal: closeModal,
    createPerfumeBottleSVG: createPerfumeBottleSVG,
    createGiftBoxSVG: createGiftBoxSVG
  };
})();
