/* ==========================================================================
   MAISON ZAYN — Shared Catalog, Bottles, Cart, Modals, Quiz & Page Logic
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     1. Product Catalog
     ------------------------------------------------------------------------ */
  const PRODUCTS = [
    {
      id: "oudh-imperial",
      name: "Oudh Imperial",
      eyebrow: "OUDH • UNISEX",
      category: "unisex",
      categories: ["unisex", "oudh"],
      gender: "unisex",
      shortDesc: "Smoked Cambodian agarwood & Kashmiri saffron",
      notes: "Kashmiri Saffron, Damask Rose, Aged Cambodian Oudh",
      size: "30ml",
      price: 145,
      oldPrice: null,
      typeLabel: "EXTRAIT DE PARFUM",
      bottleStyle: "flacon",
      glassColor: "#4F3F29",
      strokeColor: "rgba(255,255,255,0.45)",
      capColor: "#C19A4F",
      sillage: "Intense",
      maceration: "90 days in Grasse oak casks",
      story: "Our flagship extrait pairs resinous twenty-year Cambodian agarwood with hand-harvested Kashmiri saffron threads and velvet Damask rose.",
      quizTags: ["oudh", "evening", "intense", "majlis"]
    },
    {
      id: "santal-de-grasse",
      name: "Santal de Grasse",
      eyebrow: "WOODY • MEN",
      category: "men",
      categories: ["men", "woody"],
      gender: "men",
      shortDesc: "Creamy Mysore sandalwood & iris butter",
      notes: "Guatemalan Cardamom, Florentine Iris, Mysore Sandalwood",
      size: "30ml",
      price: 115,
      oldPrice: null,
      typeLabel: "EAU DE PARFUM",
      bottleStyle: "flacon",
      glassColor: "#C9A55A",
      strokeColor: "rgba(26,23,20,0.14)",
      capColor: "#1A1714",
      sillage: "Moderate",
      maceration: "90 days in cold-filtered Grasse vats",
      story: "A sculptural balance of spiced green cardamom and cool Florentine iris butter resting over creamy heartwood sandalwood.",
      quizTags: ["woody", "day", "moderate", "atelier"]
    },
    {
      id: "rose-ispahan",
      name: "Rose Ispahan",
      eyebrow: "FLORAL • WOMEN",
      category: "women",
      categories: ["women", "floral"],
      gender: "women",
      shortDesc: "Dewy centifolia rose & white peach nectar",
      notes: "Lychee, Rose de Mai, Madagascar Vanilla",
      size: "30ml",
      price: 120,
      oldPrice: null,
      typeLabel: "EAU DE PARFUM",
      bottleStyle: "flacon",
      glassColor: "#D9B8B4",
      strokeColor: "rgba(26,23,20,0.14)",
      capColor: "#1A1714",
      sillage: "Moderate",
      maceration: "90 days botanical infusion",
      story: "Dawn-picked Centifolia roses from Grasse steeped alongside luminous lychee and warm, dark Madagascar vanilla pods.",
      quizTags: ["floral", "day", "moderate", "garden"]
    },
    {
      id: "musc-blanc",
      name: "Musc Blanc",
      eyebrow: "FRESH • UNISEX",
      category: "unisex",
      categories: ["unisex", "fresh"],
      gender: "unisex",
      shortDesc: "Second-skin molecular musk & white iris",
      notes: "Aldehydes, White Iris, Silk Musk",
      size: "30ml",
      price: 110,
      oldPrice: null,
      typeLabel: "EAU DE PARFUM",
      bottleStyle: "flacon",
      glassColor: "#F2EFEA",
      strokeColor: "rgba(26,23,20,0.16)",
      capColor: "#1A1714",
      sillage: "Intimate",
      maceration: "60 days slow maturation",
      story: "Linen-crisp aldehydes melt effortlessly into powdery white iris and clean, skin-hugging botanical musks.",
      quizTags: ["fresh", "day", "intimate", "coastal"]
    },
    {
      id: "vetiver-cuir",
      name: "Vétiver & Cuir",
      eyebrow: "WOODY • MEN",
      category: "men",
      categories: ["men", "woody", "sale"],
      gender: "men",
      shortDesc: "Smoky Haitian vetiver & saddle leather",
      notes: "Black Pepper, Smoked Leather, Haitian Vetiver",
      size: "30ml",
      price: 115,
      oldPrice: 135,
      typeLabel: "EAU DE PARFUM",
      bottleStyle: "flacon",
      glassColor: "#C5A888",
      strokeColor: "rgba(26,23,20,0.14)",
      capColor: "#1A1714",
      sillage: "Strong",
      maceration: "90 days in Grasse",
      story: "Earthy roots of wild Haitian vetiver ignited with Tellicherry black pepper and burnished equestrian leather.",
      quizTags: ["woody", "evening", "intense", "atelier"]
    },
    {
      id: "bergamote-sauvage",
      name: "Bergamote Sauvage",
      eyebrow: "FRESH • MEN",
      category: "men",
      categories: ["men", "fresh", "sale"],
      gender: "men",
      shortDesc: "Crisp Calabrian citrus & crushed basil",
      notes: "Calabrian Bergamot, Sweet Basil, Vetiver",
      size: "50ml",
      price: 100,
      oldPrice: 125,
      typeLabel: "EAU DE PARFUM",
      bottleStyle: "flacon",
      glassColor: "#755B40",
      strokeColor: "rgba(26,23,20,0.14)",
      capColor: "#C19A4F",
      sillage: "Moderate",
      maceration: "60 days cold maceration",
      story: "Sun-drenched Calabrian bergamot rind crushed together with garden basil leaf over dry mineral vetiver.",
      quizTags: ["fresh", "day", "moderate", "coastal"]
    },
    {
      id: "la-collection-royale-trunk",
      name: "La Collection Royale Trunk",
      eyebrow: "OUDH • UNISEX",
      category: "gift-sets",
      categories: ["gift-sets", "unisex", "oudh", "sale"],
      gender: "unisex",
      shortDesc: "Full-size Oudh Imperial + Pure Attar + Bakhoor",
      notes: "Oudh Imperial 100ml, Sultan's Ruh Oudh 6ml, Royal Majlis Bakhoor",
      size: "3-Piece Trunk",
      price: 336,
      oldPrice: 395,
      typeLabel: "EXTRAIT DE PARFUM",
      bottleStyle: "flacon",
      glassColor: "#EDE6DA",
      strokeColor: "rgba(26,23,20,0.16)",
      capColor: "#1A1714",
      sillage: "Intense",
      maceration: "Limited Archive Release",
      story: "An heirloom presentation trunk uniting our flagship Oudh Imperial 100ml, pure Sultan's Ruh Oudh oil, and hand-rolled Royal Majlis Bakhoor.",
      quizTags: ["oudh", "evening", "intense", "majlis"]
    }
  ];

  const NOTES_LIBRARY = [
    {
      id: "aged-cambodian-oudh",
      name: "Aged Cambodian Oudh",
      family: "woody",
      familyLabel: "WOODS & RESINS",
      origin: "Koh Kong, Cambodia",
      desc: "Deep, honeyed, subtly smoky heartwood resin matured in dark glass to reveal dried fig and warm leather facets.",
      pairings: "Oudh Imperial, La Collection Royale Trunk"
    },
    {
      id: "kashmiri-saffron",
      name: "Kashmiri Saffron",
      family: "spices",
      familyLabel: "SPICES & SAFFRON",
      origin: "Pampore Valley, Kashmir",
      desc: "Crimson stigmas harvested at dawn, lending dry suede, metallic warmth, and regal radiance to dark extraits.",
      pairings: "Oudh Imperial"
    },
    {
      id: "rose-de-mai",
      name: "Rose de Mai (Centifolia)",
      family: "floral",
      familyLabel: "FLORAL ABSOLUTES",
      origin: "Grasse, France",
      desc: "Hundreds of delicate hundred-petalled blooms distilled within hours of picking for dewy, honeyed petal clarity.",
      pairings: "Rose Ispahan, Oudh Imperial"
    },
    {
      id: "mysore-sandalwood",
      name: "Mysore Sandalwood",
      family: "woody",
      familyLabel: "WOODS & RESINS",
      origin: "Ethically Cultivated Reserve",
      desc: "Velvety, milky heartwood that anchors volatile top notes and creates a meditative, skin-warming drydown.",
      pairings: "Santal de Grasse"
    },
    {
      id: "calabrian-bergamot",
      name: "Calabrian Bergamot",
      family: "citrus",
      familyLabel: "CITRUS & AROMATICS",
      origin: "Reggio Calabria, Italy",
      desc: "Cold-pressed green citrus peel bursting with sparkling zest, bitter floral nuance, and coastal sunlight.",
      pairings: "Bergamote Sauvage"
    },
    {
      id: "florentine-iris",
      name: "Florentine Iris Pallida",
      family: "floral",
      familyLabel: "FLORAL ABSOLUTES",
      origin: "Tuscany, Italy",
      desc: "Rhizomes dried for three years before steam distillation into cool, silken orris butter.",
      pairings: "Santal de Grasse, Musc Blanc"
    },
    {
      id: "haitian-vetiver",
      name: "Haitian Vetiver",
      family: "woody",
      familyLabel: "WOODS & RESINS",
      origin: "Les Cayes, Haiti",
      desc: "Aromatic rootlets carrying damp earth, smoky driftwood, and crisp grapefruit undertones.",
      pairings: "Vétiver & Cuir, Bergamote Sauvage"
    },
    {
      id: "silk-musk",
      name: "Botanical Silk Musk",
      family: "resins",
      familyLabel: "MUSKS & INCENSE",
      origin: "Grasse Atelier Accord",
      desc: "Cruelty-free ambrette seed and clean molecular musks engineered to amplify natural skin warmth.",
      pairings: "Musc Blanc"
    }
  ];

  const QUIZ_QUESTIONS = [
    {
      step: 1,
      eyebrow: "QUESTION 01 OF 05 • ATMOSPHERE",
      question: "Which setting feels closest to your personal sanctuary?",
      options: [
        { value: "majlis", label: "Candlelit Majlis", sub: "Warm cedar, velvet cushions & drifting bakhoor" },
        { value: "atelier", label: "Parisian Atelier", sub: "Polished oak, linen drapes & quiet craftsmanship" },
        { value: "garden", label: "Dawn Rose Garden", sub: "Dew-soaked petals, peach orchards & morning mist" },
        { value: "coastal", label: "Mediterranean Terrace", sub: "Crisp citrus groves, white stone & sea breeze" }
      ]
    },
    {
      step: 2,
      eyebrow: "QUESTION 02 OF 05 • HOUR",
      question: "When will you wear this creation most?",
      options: [
        { value: "day", label: "Daylight & Solitude", sub: "Luminous, effortless presence from morning to dusk" },
        { value: "evening", label: "Evening & Ceremonies", sub: "Magnetic, resinous depth after nightfall" }
      ]
    },
    {
      step: 3,
      eyebrow: "QUESTION 03 OF 05 • OLFACTORY FAMILY",
      question: "Which raw botanical note draws you in first?",
      options: [
        { value: "oudh", label: "Aged Oudh & Saffron", sub: "Smoky agarwood, golden amber & royal spice" },
        { value: "woody", label: "Sandalwood & Vetiver", sub: "Creamy heartwood, leather & dry cardamom" },
        { value: "floral", label: "Rose & Nocturnal Jasmine", sub: "Velvet petals, lychee & dark vanilla" },
        { value: "fresh", label: "Bergamot & White Musk", sub: "Bright citrus peel, fig leaf & clean iris" }
      ]
    },
    {
      step: 4,
      eyebrow: "QUESTION 04 OF 05 • SILLAGE",
      question: "How far should your fragrance travel?",
      options: [
        { value: "intimate", label: "Close to Skin", sub: "A refined secret noticed only in an embrace" },
        { value: "moderate", label: "Tailored Aura", sub: "Balanced elegance that lingers politely in a room" },
        { value: "intense", label: "Unforgettable Trail", sub: "Commanding sillage that endures for 12+ hours" }
      ]
    },
    {
      step: 5,
      eyebrow: "QUESTION 05 OF 05 • EXPRESSION",
      question: "Which vessel ritual appeals to you?",
      options: [
        { value: "spray", label: "Grasse Extrait / EDP Spray", sub: "Classic fine-mist glass flacon" },
        { value: "attar", label: "Pure Alcohol-Free Attar Oil", sub: "Concentrated crystal roll-on applied to pulse points" }
      ]
    }
  ];

  /* ------------------------------------------------------------------------
     2. Inline SVG Bottle Renderer (matches ref3 & ref4)
     ------------------------------------------------------------------------ */
  function renderBottleSVG(product, options = {}) {
    const width = options.width || 120;
    const height = options.height || 210;
    const onDark = Boolean(options.onDark);
    const outerStroke = onDark ? "rgba(255,255,255,0.48)" : product.strokeColor;
    const glassFill = onDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.55)";

    if (product.bottleStyle === "attar") {
      return `
        <svg width="${width}" height="${height}" viewBox="0 0 120 210" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeHtml(product.name)} bottle">
          <!-- Gold spire cap -->
          <path d="M56 26 L60 12 L64 26 Z" fill="${product.capColor}"/>
          <rect x="50" y="26" width="20" height="14" rx="2" fill="${product.capColor}"/>
          <rect x="47" y="40" width="26" height="6" rx="1.5" fill="#1A1714"/>
          <!-- Outer tall vial glass -->
          <rect x="41" y="46" width="38" height="144" rx="15" fill="${glassFill}" stroke="${outerStroke}" stroke-width="1.5"/>
          <!-- Inner oil fill -->
          <rect x="44" y="54" width="32" height="128" rx="11" fill="${product.glassColor}"/>
          <!-- White label with gold hairline -->
          <rect x="42" y="84" width="36" height="62" rx="2" fill="#FAF8F4"/>
          <rect x="44.5" y="86.5" width="31" height="57" rx="1" fill="none" stroke="#C19A4F" stroke-width="0.7"/>
          <text x="60" y="99" text-anchor="middle" fill="#1A1714" font-family="Cormorant Garamond, Georgia, serif" font-size="5.6" font-weight="600" letter-spacing="0.9">MAISON ZAYN</text>
          <line x1="49" y1="103" x2="71" y2="103" stroke="#C19A4F" stroke-width="0.5"/>
          <text x="60" y="114" text-anchor="middle" fill="#1A1714" font-family="Outfit, sans-serif" font-size="4.4" font-weight="500" letter-spacing="0.4">${escapeHtml(truncateLabel(product.name.toUpperCase(), 15))}</text>
          <text x="60" y="128" text-anchor="middle" fill="#6B635A" font-family="Outfit, sans-serif" font-size="4" letter-spacing="0.5">${escapeHtml(product.typeLabel)}</text>
          <text x="60" y="138" text-anchor="middle" fill="#C19A4F" font-family="Outfit, sans-serif" font-size="3.4" letter-spacing="0.6">PARIS • ORIENT</text>
        </svg>
      `;
    }

    if (product.bottleStyle === "jar") {
      return `
        <svg width="${width}" height="${height}" viewBox="0 0 120 210" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeHtml(product.name)} vessel">
          <rect x="28" y="64" width="64" height="16" rx="4" fill="${product.capColor}"/>
          <rect x="20" y="80" width="80" height="96" rx="16" fill="${glassFill}" stroke="${outerStroke}" stroke-width="1.5"/>
          <rect x="25" y="86" width="70" height="82" rx="12" fill="${product.glassColor}"/>
          <rect x="30" y="102" width="60" height="52" rx="2" fill="#FAF8F4"/>
          <rect x="33" y="105" width="54" height="46" rx="1" fill="none" stroke="#C19A4F" stroke-width="0.7"/>
          <text x="60" y="118" text-anchor="middle" fill="#1A1714" font-family="Cormorant Garamond, Georgia, serif" font-size="6.4" font-weight="600" letter-spacing="1.1">MAISON ZAYN</text>
          <line x1="39" y1="122" x2="81" y2="122" stroke="#C19A4F" stroke-width="0.5"/>
          <text x="60" y="131" text-anchor="middle" fill="#1A1714" font-family="Outfit, sans-serif" font-size="4.6" font-weight="500" letter-spacing="0.5">${escapeHtml(truncateLabel(product.name.toUpperCase(), 18))}</text>
          <text x="60" y="140" text-anchor="middle" fill="#6B635A" font-family="Outfit, sans-serif" font-size="4" letter-spacing="0.6">${escapeHtml(product.typeLabel)}</text>
          <text x="60" y="147" text-anchor="middle" fill="#C19A4F" font-family="Outfit, sans-serif" font-size="3.6" letter-spacing="0.8">PARIS • ORIENT</text>
        </svg>
      `;
    }

    const upperName = product.name.toUpperCase();
    const isMultiLineName = upperName.length > 18;
    const nameWords = upperName.split(" ");
    const splitIdx = Math.ceil(nameWords.length / 2);
    const labelNameSvg = isMultiLineName
      ? `<text x="60" y="115" text-anchor="middle" fill="#1A1714" font-family="Outfit, sans-serif" font-size="4.3" font-weight="500" letter-spacing="0.4"><tspan x="60" dy="0">${escapeHtml(nameWords.slice(0, splitIdx).join(" "))} </tspan><tspan x="60" dy="5.8">${escapeHtml(nameWords.slice(splitIdx).join(" "))}</tspan></text>`
      : `<text x="60" y="118" text-anchor="middle" fill="#1A1714" font-family="Outfit, sans-serif" font-size="${upperName.length > 14 ? "4.1" : "4.8"}" font-weight="500" letter-spacing="0.45">${escapeHtml(upperName)}</text>`;

    // Standard Signature Flacon (ref3 & ref4)
    return `
      <svg width="${width}" height="${height}" viewBox="0 0 120 210" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeHtml(product.name)} bottle">
        <!-- Cube cap -->
        <rect x="44" y="24" width="32" height="26" rx="4" fill="${product.capColor}"/>
        <!-- Gold collar -->
        <rect x="49" y="50" width="22" height="9" fill="#C19A4F"/>
        <!-- Outer glass silhouette -->
        <rect x="21" y="59" width="78" height="122" rx="14" fill="${glassFill}" stroke="${outerStroke}" stroke-width="1.5"/>
        <!-- Inner fragrance liquid -->
        <rect x="26" y="66" width="68" height="104" rx="10" fill="${product.glassColor}"/>
        <!-- Subtle vertical glass highlight -->
        <rect x="29" y="70" width="4" height="94" rx="2" fill="rgba(255,255,255,0.16)"/>
        <!-- White label with inner gold hairline -->
        <rect x="31" y="84" width="58" height="66" rx="2" fill="#FAF8F4"/>
        <rect x="34" y="87" width="52" height="60" rx="1" fill="none" stroke="#C19A4F" stroke-width="0.75"/>
        <text x="60" y="102" text-anchor="middle" fill="#1A1714" font-family="Cormorant Garamond, Georgia, serif" font-size="7" font-weight="600" letter-spacing="1.1">MAISON ZAYN</text>
        <line x1="40" y1="107" x2="80" y2="107" stroke="#C19A4F" stroke-width="0.5"/>
        ${labelNameSvg}
        <text x="60" y="${isMultiLineName ? "132" : "130"}" text-anchor="middle" fill="#6B635A" font-family="Outfit, sans-serif" font-size="4" letter-spacing="0.6">${escapeHtml(product.typeLabel)}</text>
        <text x="60" y="${isMultiLineName ? "142" : "141"}" text-anchor="middle" fill="#C19A4F" font-family="Outfit, sans-serif" font-size="3.8" letter-spacing="0.9">PARIS • ORIENT</text>
      </svg>
    `;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ------------------------------------------------------------------------
     3. Product Card Template
     ------------------------------------------------------------------------ */
  function renderProductCard(product) {
    const priceHtml = product.oldPrice
      ? `<span class="product-card__price-old">$${product.oldPrice}</span><span class="product-card__price">$${product.price}</span>`
      : `<span class="product-card__price">$${product.price}</span>`;

    return `
      <article class="product-card" data-product-id="${escapeHtml(product.id)}">
        <div class="product-card__visual">
          ${renderBottleSVG(product, { width: 120, height: 210 })}
        </div>
        <span class="eyebrow product-card__eyebrow">${escapeHtml(product.eyebrow)}</span>
        <h3 class="product-card__title">${escapeHtml(product.name)}</h3>
        <p class="product-card__desc" title="${escapeHtml(product.shortDesc)}">${escapeHtml(product.shortDesc)}</p>
        <p class="product-card__notes"><strong>Notes:</strong> ${escapeHtml(product.notes)}</p>
        <hr class="product-card__divider">
        <div class="product-card__meta">
          <span class="product-card__size">${escapeHtml(product.size)}</span>
          <div class="product-card__price-wrap">${priceHtml}</div>
        </div>
        <div class="product-card__actions">
          <button type="button" class="btn btn--secondary btn--sm" data-action="details" data-id="${escapeHtml(product.id)}">Details</button>
          <button type="button" class="btn btn--dark btn--sm" data-action="add-to-bag" data-id="${escapeHtml(product.id)}">Add to Bag</button>
        </div>
      </article>
    `;
  }

  /* ------------------------------------------------------------------------
     4. Cart Management (localStorage)
     ------------------------------------------------------------------------ */
  const CART_KEY = "maison_zayn_cart_v1";
  const SAMPLE_KEY = "maison_zayn_sample_v1";

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
    updateCartBadge(true);
  }

  function addToCart(productId, qty = 1) {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    const cart = getCart();
    const existing = cart.find((item) => item.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id: productId, qty });
    }
    saveCart(cart);
    showToast("Added to your bag");
    if (document.getElementById("cart-items-container")) {
      renderCartPage();
    }
  }

  function updateCartBadge(bump = false) {
    const cart = getCart().filter((item) => PRODUCTS.some((p) => p.id === item.id));
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
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

  /* ------------------------------------------------------------------------
     5. Header Scroll, Mobile Drawer, Search Modal & Product Detail Modal
     ------------------------------------------------------------------------ */
  function initHeader() {
    const header = document.querySelector(".site-header");
    if (header) {
      const onScroll = () => {
        header.classList.toggle("is-scrolled", window.scrollY > 30);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    // Mobile drawer
    const openBtn = document.querySelector("[data-drawer-open]");
    const closeBtn = document.querySelector("[data-drawer-close]");
    const drawer = document.getElementById("mobile-drawer");
    const backdrop = document.getElementById("drawer-backdrop");

    function setDrawer(open) {
      if (!drawer || !backdrop) return;
      drawer.classList.toggle("is-open", open);
      backdrop.classList.toggle("is-open", open);
      drawer.setAttribute("aria-hidden", String(!open));
      if (openBtn) openBtn.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    }

    if (openBtn) openBtn.addEventListener("click", () => setDrawer(true));
    if (closeBtn) closeBtn.addEventListener("click", () => setDrawer(false));
    if (backdrop) backdrop.addEventListener("click", () => setDrawer(false));

    // Newsletter validation
    document.querySelectorAll("[data-newsletter-form]").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        const status = form.querySelector("[data-newsletter-status]");
        const email = (input?.value || "").trim();
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!status) return;
        if (!valid) {
          status.textContent = "Please enter a valid email address.";
          status.classList.add("is-error");
          return;
        }
        status.classList.remove("is-error");
        status.textContent = "Welcome to the Private Circle. Your atelier invitation is on its way.";
        input.value = "";
      });
    });
  }

  function ensureModals() {
    if (!document.getElementById("product-modal")) {
      const modal = document.createElement("div");
      modal.id = "product-modal";
      modal.className = "modal-backdrop";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.setAttribute("aria-labelledby", "product-modal-title");
      modal.innerHTML = `
        <div class="modal-dialog">
          <button type="button" class="modal-close" data-modal-close aria-label="Close product details">&times;</button>
          <div id="product-modal-body"></div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    if (!document.getElementById("search-modal")) {
      const searchModal = document.createElement("div");
      searchModal.id = "search-modal";
      searchModal.className = "modal-backdrop";
      searchModal.setAttribute("role", "dialog");
      searchModal.setAttribute("aria-modal", "true");
      searchModal.setAttribute("aria-labelledby", "search-modal-title");
      searchModal.innerHTML = `
        <div class="modal-dialog">
          <button type="button" class="modal-close" data-modal-close aria-label="Close search">&times;</button>
          <span class="eyebrow">ATELIER ARCHIVE SEARCH</span>
          <h2 id="search-modal-title" class="section-heading" style="font-size:34px;margin:8px 0 18px;">Search Creations &amp; Notes</h2>
          <input id="global-search-input" type="search" class="form-input" style="width:100%;" placeholder="Search Oudh, Rose Ispahan, Saffron, Attar…" aria-label="Search fragrances and notes">
          <div id="global-search-results" class="search-results"></div>
        </div>
      `;
      document.body.appendChild(searchModal);

      const input = document.getElementById("global-search-input");
      const resultsEl = document.getElementById("global-search-results");
      const renderResults = (query) => {
        const q = query.trim().toLowerCase();
        const matches = q
          ? PRODUCTS.filter((p) =>
              [p.name, p.eyebrow, p.shortDesc, p.notes].join(" ").toLowerCase().includes(q)
            ).slice(0, 6)
          : PRODUCTS.slice(0, 4);

        if (!matches.length) {
          resultsEl.innerHTML = `<p style="color:var(--color-text-muted);padding:12px 0;">No creations matched "${escapeHtml(query)}". Try "Oudh", "Sandalwood", or "Rose".</p>`;
          return;
        }
        resultsEl.innerHTML = matches
          .map(
            (p) => `
            <div class="search-result-row">
              <div>
                <span class="eyebrow" style="font-size:10.5px;">${escapeHtml(p.eyebrow)}</span>
                <strong style="font-family:var(--font-serif);font-size:22px;font-weight:500;">${escapeHtml(p.name)}</strong>
                <div style="font-size:13.5px;color:var(--color-text-muted);">${escapeHtml(p.size)} • $${p.price}</div>
              </div>
              <div style="display:flex;gap:8px;">
                <button type="button" class="btn btn--secondary btn--sm" data-action="details" data-id="${escapeHtml(p.id)}">Details</button>
                <button type="button" class="btn btn--dark btn--sm" data-action="add-to-bag" data-id="${escapeHtml(p.id)}">Add</button>
              </div>
            </div>
          `
          )
          .join("");
      };
      input.addEventListener("input", (e) => renderResults(e.target.value));
      renderResults("");
    }
  }

  function openProductModal(productId) {
    ensureModals();
    const product = PRODUCTS.find((p) => p.id === productId);
    const modal = document.getElementById("product-modal");
    const body = document.getElementById("product-modal-body");
    if (!product || !modal || !body) return;

    const priceHtml = product.oldPrice
      ? `<span class="product-card__price-old">$${product.oldPrice}</span> <span class="product-card__price">$${product.price}</span>`
      : `<span class="product-card__price">$${product.price}</span>`;

    body.innerHTML = `
      <div class="product-modal__grid">
        <div class="product-modal__visual">
          ${renderBottleSVG(product, { width: 132, height: 224 })}
        </div>
        <div>
          <span class="eyebrow">${escapeHtml(product.eyebrow)}</span>
          <h2 id="product-modal-title" class="section-heading" style="font-size:38px;margin:8px 0 12px;">${escapeHtml(product.name)}</h2>
          <p style="color:var(--color-text-muted);margin-bottom:16px;">${escapeHtml(product.story)}</p>
          <p style="font-size:15px;margin-bottom:10px;"><strong>Olfactory Notes:</strong> ${escapeHtml(product.notes)}</p>
          <p style="font-size:15px;margin-bottom:10px;"><strong>Concentration:</strong> ${escapeHtml(product.typeLabel)} (${escapeHtml(product.size)})</p>
          <p style="font-size:15px;margin-bottom:20px;"><strong>Maceration &amp; Sillage:</strong> ${escapeHtml(product.maceration)} • ${escapeHtml(product.sillage)}</p>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;padding-top:16px;border-top:1px solid var(--color-border);">
            <div>${priceHtml}</div>
            <button type="button" class="btn btn--dark" data-action="add-to-bag" data-id="${escapeHtml(product.id)}">Add to Bag</button>
          </div>
        </div>
      </div>
    `;

    closeAllModals();
    modal.classList.add("is-open");
  }

  function openSearchModal() {
    ensureModals();
    closeAllModals();
    const modal = document.getElementById("search-modal");
    modal.classList.add("is-open");
    setTimeout(() => document.getElementById("global-search-input")?.focus(), 80);
  }

  function closeAllModals() {
    document.querySelectorAll(".modal-backdrop.is-open").forEach((m) => m.classList.remove("is-open"));
  }

  function bindGlobalClicks() {
    document.addEventListener("click", (e) => {
      const addBtn = e.target.closest('[data-action="add-to-bag"]');
      if (addBtn) {
        addToCart(addBtn.dataset.id);
        return;
      }

      const detailBtn = e.target.closest('[data-action="details"]');
      if (detailBtn) {
        openProductModal(detailBtn.dataset.id);
        return;
      }

      if (e.target.closest("[data-search-open]")) {
        openSearchModal();
        return;
      }

      if (e.target.closest("[data-modal-close]") || e.target.classList.contains("modal-backdrop")) {
        closeAllModals();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeAllModals();
    });
  }

  /* ------------------------------------------------------------------------
     6. Scroll Reveal Observer
     ------------------------------------------------------------------------ */
  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------------------
     7. Page-Specific Hydration
     ------------------------------------------------------------------------ */
  function hydrateProductGrids() {
    // Static grids driven by data-product-ids="id1,id2,..."
    document.querySelectorAll("[data-product-ids]").forEach((grid) => {
      const ids = grid.dataset.productIds.split(",").map((s) => s.trim()).filter(Boolean);
      const list = ids.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);
      grid.innerHTML = list.map(renderProductCard).join("");
    });

    // Category bottle slots (ref4-categories)
    document.querySelectorAll("[data-bottle-id]").forEach((slot) => {
      const product = PRODUCTS.find((p) => p.id === slot.dataset.bottleId);
      if (!product) return;
      const w = Number(slot.dataset.bottleWidth || 108);
      const h = Number(slot.dataset.bottleHeight || 190);
      const onDark = slot.dataset.onDark === "true";
      slot.innerHTML = renderBottleSVG(product, { width: w, height: h, onDark });
    });
  }

  function initShopPage() {
    const grid = document.getElementById("shop-catalog-grid");
    if (!grid) return;

    const chips = document.querySelectorAll("[data-shop-filter]");
    const sortSelect = document.getElementById("shop-sort");
    const countEl = document.getElementById("shop-result-count");
    let activeFilter = "all";
    let activeSort = "featured";

    function render() {
      let items = PRODUCTS.filter((p) => {
        if (activeFilter === "all") return true;
        return p.categories.includes(activeFilter) || p.category === activeFilter;
      });

      if (activeSort === "price-asc") {
        items = [...items].sort((a, b) => a.price - b.price);
      } else if (activeSort === "price-desc") {
        items = [...items].sort((a, b) => b.price - a.price);
      } else if (activeSort === "name") {
        items = [...items].sort((a, b) => a.name.localeCompare(b.name));
      }

      grid.innerHTML = items.map(renderProductCard).join("");
      if (countEl) {
        countEl.textContent = `${items.length} Creation${items.length === 1 ? "" : "s"}`;
      }
    }

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chips.forEach((c) => c.classList.remove("is-active"));
        chip.classList.add("is-active");
        activeFilter = chip.dataset.shopFilter;
        render();
      });
    });

    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        activeSort = e.target.value;
        render();
      });
    }

    render();
  }

  function initNotesPage() {
    const grid = document.getElementById("notes-library-grid");
    if (!grid) return;

    const chips = document.querySelectorAll("[data-note-filter]");
    let activeFamily = "all";

    function render() {
      const list = NOTES_LIBRARY.filter((n) => activeFamily === "all" || n.family === activeFamily);
      grid.innerHTML = list
        .map(
          (n) => `
          <article class="note-card">
            <span class="eyebrow">${escapeHtml(n.familyLabel)}</span>
            <h3 class="note-card__title">${escapeHtml(n.name)}</h3>
            <span class="note-card__origin">Origin: ${escapeHtml(n.origin)}</span>
            <p class="note-card__desc">${escapeHtml(n.desc)}</p>
            <div class="note-card__pairings"><strong>Featured In:</strong> ${escapeHtml(n.pairings)}</div>
          </article>
        `
        )
        .join("");
    }

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chips.forEach((c) => c.classList.remove("is-active"));
        chip.classList.add("is-active");
        activeFamily = chip.dataset.noteFilter;
        render();
      });
    });

    render();
  }

  function initQuizPage() {
    const shell = document.getElementById("scent-quiz-shell");
    if (!shell) return;

    let currentIdx = 0;
    const answers = {};

    function renderQuestion() {
      const q = QUIZ_QUESTIONS[currentIdx];
      const pct = Math.round(((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100);
      const selectedVal = answers[q.step];

      shell.innerHTML = `
        <div class="quiz-progress">
          <span class="eyebrow" style="margin:0;">${escapeHtml(q.eyebrow)}</span>
          <div class="quiz-progress__track"><div class="quiz-progress__fill" style="width:${pct}%"></div></div>
        </div>
        <h2 class="quiz-question__title">${escapeHtml(q.question)}</h2>
        <div class="quiz-options">
          ${q.options
            .map(
              (opt) => `
              <button type="button" class="quiz-option ${selectedVal === opt.value ? "is-selected" : ""}" data-quiz-opt="${escapeHtml(opt.value)}">
                <span class="quiz-option__label">${escapeHtml(opt.label)}</span>
                <span class="quiz-option__sub">${escapeHtml(opt.sub)}</span>
              </button>
            `
            )
            .join("")}
        </div>
        <div class="quiz-nav">
          <button type="button" class="btn btn--secondary btn--sm" data-quiz-prev ${currentIdx === 0 ? "disabled style='opacity:0.4;cursor:not-allowed;'" : ""}>Previous</button>
          <button type="button" class="btn btn--primary btn--sm" data-quiz-next>${currentIdx === QUIZ_QUESTIONS.length - 1 ? "Reveal My Signature" : "Continue"}</button>
        </div>
      `;

      shell.querySelectorAll("[data-quiz-opt]").forEach((btn) => {
        btn.addEventListener("click", () => {
          answers[q.step] = btn.dataset.quizOpt;
          renderQuestion();
        });
      });

      shell.querySelector("[data-quiz-prev]")?.addEventListener("click", () => {
        if (currentIdx > 0) {
          currentIdx--;
          renderQuestion();
        }
      });

      shell.querySelector("[data-quiz-next]")?.addEventListener("click", () => {
        if (!answers[q.step]) {
          showToast("Please select an option to continue");
          return;
        }
        if (currentIdx < QUIZ_QUESTIONS.length - 1) {
          currentIdx++;
          renderQuestion();
        } else {
          renderResults();
        }
      });
    }

    function renderResults() {
      const wantedTags = [answers[1], answers[2], answers[3], answers[4]].filter(Boolean);
      const wantAttar = answers[5] === "attar";

      const scored = PRODUCTS.filter((p) => p.category !== "bath-body" && p.id !== "la-collection-royale-trunk")
        .map((p) => {
          let score = 0;
          wantedTags.forEach((tag) => {
            if (p.quizTags.includes(tag)) score += 2;
          });
          if (wantAttar && p.bottleStyle === "attar") score += 3;
          if (!wantAttar && p.bottleStyle === "flacon") score += 1;
          return { product: p, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map((x) => x.product);

      shell.innerHTML = `
        <div style="text-align:center;margin-bottom:36px;">
          <span class="eyebrow">BESPOKE CONSULTATION COMPLETE</span>
          <h2 class="section-heading" style="margin:10px 0 12px;">Your Curated Olfactory Triad</h2>
          <p class="section-subtitle" style="margin:0 auto;">Selected by our diagnostic profile from our Grasse &amp; Eastern reserves.</p>
        </div>
        <div class="product-grid product-grid--3">
          ${scored.map(renderProductCard).join("")}
        </div>
        <div style="text-align:center;margin-top:36px;">
          <button type="button" class="btn btn--secondary" id="quiz-restart">Retake Scent Diagnostic</button>
        </div>
      `;

      document.getElementById("quiz-restart")?.addEventListener("click", () => {
        currentIdx = 0;
        Object.keys(answers).forEach((k) => delete answers[k]);
        renderQuestion();
      });
    }

    renderQuestion();
  }

  function renderCartPage() {
    const itemsContainer = document.getElementById("cart-items-container");
    const subtotalEl = document.getElementById("cart-subtotal");
    const shippingEl = document.getElementById("cart-shipping");
    const totalEl = document.getElementById("cart-total");
    const shippingBanner = document.getElementById("shipping-progress-note");
    const sampleSelect = document.getElementById("sample-select");
    if (!itemsContainer) return;

    const cart = getCart();
    if (sampleSelect) {
      sampleSelect.value = localStorage.getItem(SAMPLE_KEY) || "Oudh Imperial (2ml)";
      sampleSelect.onchange = () => localStorage.setItem(SAMPLE_KEY, sampleSelect.value);
    }

    if (!cart.length) {
      itemsContainer.innerHTML = `
        <div class="form-card" style="text-align:center;">
          <span class="eyebrow">YOUR SHOPPING BAG</span>
          <h2 class="section-heading" style="font-size:34px;margin:10px 0 12px;">Your Bag Is Currently Empty</h2>
          <p style="color:var(--color-text-muted);margin-bottom:24px;">Explore our Grasse extraits and pure alcohol-free attars to begin your curation.</p>
          <a href="shop.html" class="btn btn--primary">Explore Collection</a>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = "$0";
      if (shippingEl) shippingEl.textContent = "$0";
      if (totalEl) totalEl.textContent = "$0";
      if (shippingBanner) shippingBanner.textContent = "Complimentary express shipping on orders over $150.";
      return;
    }

    let subtotal = 0;
    itemsContainer.innerHTML = cart
      .map((entry) => {
        const product = PRODUCTS.find((p) => p.id === entry.id);
        if (!product) return "";
        subtotal += product.price * entry.qty;
        return `
          <div class="cart-item" data-cart-row="${escapeHtml(product.id)}">
            <div>${renderBottleSVG(product, { width: 64, height: 112 })}</div>
            <div>
              <span class="eyebrow" style="font-size:10.5px;">${escapeHtml(product.eyebrow)}</span>
              <h3 class="cart-item__title">${escapeHtml(product.name)}</h3>
              <p class="cart-item__meta">${escapeHtml(product.size)} • $${product.price} each</p>
              <button type="button" style="font-size:12.5px;color:var(--color-text-muted);text-decoration:underline;margin-top:8px;" data-cart-remove="${escapeHtml(product.id)}">Remove</button>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:10px;">
              <div class="qty-control">
                <button type="button" aria-label="Decrease quantity" data-cart-dec="${escapeHtml(product.id)}">−</button>
                <span>${entry.qty}</span>
                <button type="button" aria-label="Increase quantity" data-cart-inc="${escapeHtml(product.id)}">+</button>
              </div>
              <strong style="font-size:20px;">$${product.price * entry.qty}</strong>
            </div>
          </div>
        `;
      })
      .join("");

    const qualifiesFreeShipping = subtotal >= 150;
    const shippingFee = qualifiesFreeShipping ? 0 : 18;
    const total = subtotal + shippingFee;

    if (subtotalEl) subtotalEl.textContent = `$${subtotal}`;
    if (shippingEl) shippingEl.textContent = qualifiesFreeShipping ? "Complimentary" : `$${shippingFee}`;
    if (totalEl) totalEl.textContent = `$${total}`;
    if (shippingBanner) {
      shippingBanner.textContent = qualifiesFreeShipping
        ? "Your order qualifies for Complimentary Express Shipping & a 2ml Artisanal Sample."
        : `Add $${150 - subtotal} more to unlock Complimentary Express Shipping (over $150).`;
    }

    itemsContainer.querySelectorAll("[data-cart-inc]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const c = getCart();
        const item = c.find((i) => i.id === btn.dataset.cartInc);
        if (item) item.qty += 1;
        saveCart(c);
        renderCartPage();
      });
    });

    itemsContainer.querySelectorAll("[data-cart-dec]").forEach((btn) => {
      btn.addEventListener("click", () => {
        let c = getCart();
        const item = c.find((i) => i.id === btn.dataset.cartDec);
        if (item) {
          item.qty -= 1;
          if (item.qty <= 0) c = c.filter((i) => i.id !== item.id);
        }
        saveCart(c);
        renderCartPage();
      });
    });

    itemsContainer.querySelectorAll("[data-cart-remove]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const c = getCart().filter((i) => i.id !== btn.dataset.cartRemove);
        saveCart(c);
        renderCartPage();
      });
    });
  }

  function initFormsAndFaq() {
    // FAQ Accordion
    document.querySelectorAll(".faq-trigger").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const item = trigger.closest(".faq-item");
        const panel = item.querySelector(".faq-panel");
        const isOpen = item.classList.contains("is-open");
        item.classList.toggle("is-open", !isOpen);
        trigger.setAttribute("aria-expanded", String(!isOpen));
        panel.style.maxHeight = !isOpen ? `${panel.scrollHeight}px` : "0";
      });
    });

    // Checkout form
    const checkoutForm = document.getElementById("checkout-form");
    if (checkoutForm) {
      checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const cart = getCart();
        const feedback = document.getElementById("checkout-feedback");
        if (!cart.length) {
          showToast("Your bag is empty");
          return;
        }
        const chosenSample = document.getElementById("sample-select")?.value || "Oudh Imperial (2ml)";
        saveCart([]);
        renderCartPage();
        checkoutForm.reset();
        if (feedback) {
          feedback.textContent = `Thank you. Your Maison Zayn order is confirmed with your complimentary ${chosenSample} vial. A dispatch dossier has been sent to your email.`;
          feedback.classList.add("is-visible");
        }
      });
    }

    // Contact & Consultation Forms
    document.querySelectorAll("[data-concierge-form]").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const targetId = form.dataset.conciergeForm;
        const feedback = document.getElementById(targetId);
        form.reset();
        if (feedback) {
          feedback.classList.add("is-visible");
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     8. Boot
     ------------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    updateCartBadge(false);
    initHeader();
    bindGlobalClicks();
    hydrateProductGrids();
    initShopPage();
    initNotesPage();
    initQuizPage();
    renderCartPage();
    initFormsAndFaq();
    initReveal();
  });
})();

/* ===== PAGE: LOGIN ===== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const panel = document.getElementById("login-panel");
    if (!panel) return;

    const USER_STORAGE_KEY = "maisonzayn_user";
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const screens = {
      login: document.getElementById("screen-login"),
      signup: document.getElementById("screen-signup"),
      forgot: document.getElementById("screen-forgot"),
      success: document.getElementById("screen-success")
    };

    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const forgotForm = document.getElementById("forgot-form");

    const loginStatus = document.getElementById("login-status-box");
    const signupStatus = document.getElementById("signup-status-box");
    const forgotStatus = document.getElementById("forgot-status-box");

    let signupRedirectTimer = null;

    function clearFieldError(inputId, errorId) {
      const input = document.getElementById(inputId);
      const errorEl = document.getElementById(errorId);
      if (input) {
        input.classList.remove("is-invalid");
        input.removeAttribute("aria-invalid");
      }
      if (errorEl) {
        errorEl.textContent = "";
      }
    }

    function setFieldError(inputId, errorId, message) {
      const input = document.getElementById(inputId);
      const errorEl = document.getElementById(errorId);
      if (input) {
        input.classList.add("is-invalid");
        input.setAttribute("aria-invalid", "true");
      }
      if (errorEl) {
        errorEl.textContent = message;
      }
    }

    function clearAllErrors() {
      panel.querySelectorAll(".login-input").forEach((input) => {
        input.classList.remove("is-invalid");
        input.removeAttribute("aria-invalid");
      });
      panel.querySelectorAll(".login-error").forEach((err) => {
        err.textContent = "";
      });
    }

    function showScreen(name, options = {}) {
      if (signupRedirectTimer) {
        clearTimeout(signupRedirectTimer);
        signupRedirectTimer = null;
      }

      Object.entries(screens).forEach(([key, el]) => {
        if (!el) return;
        el.hidden = key !== name;
      });

      clearAllErrors();

      if (!options.preserveLoginStatus && loginStatus) {
        loginStatus.hidden = true;
        loginStatus.textContent = "";
      }
      if (signupStatus) {
        signupStatus.hidden = true;
        signupStatus.textContent = "";
      }
      if (forgotStatus) {
        forgotStatus.hidden = true;
        forgotStatus.textContent = "";
      }

      const activeScreen = screens[name];
      if (activeScreen) {
        const focusTarget =
          activeScreen.querySelector("input") ||
          activeScreen.querySelector("a, button");
        if (focusTarget && !options.skipFocus) {
          focusTarget.focus();
        }
      }
    }

    // Tab and navigation switches
    panel.querySelectorAll("[data-switch-screen]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.switchScreen;
        if (target && screens[target]) {
          showScreen(target);
        }
      });
    });

    // Password show/hide toggles
    panel.querySelectorAll("[data-toggle-password]").forEach((toggleBtn) => {
      toggleBtn.addEventListener("click", () => {
        const targetId = toggleBtn.dataset.togglePassword;
        const input = document.getElementById(targetId);
        if (!input) return;
        const isHidden = input.type === "password";
        input.type = isHidden ? "text" : "password";
        toggleBtn.setAttribute("aria-pressed", String(isHidden));
        toggleBtn.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
        const eyeOpen = toggleBtn.querySelector("[data-eye-open]");
        const eyeClosed = toggleBtn.querySelector("[data-eye-closed]");
        if (eyeOpen && eyeClosed) {
          eyeOpen.hidden = isHidden;
          eyeClosed.hidden = !isHidden;
        }
      });
    });

    // Clear errors as user types
    const fieldBindings = [
      ["login-email", "login-email-error"],
      ["login-password", "login-password-error"],
      ["signup-name", "signup-name-error"],
      ["signup-email", "signup-email-error"],
      ["signup-password", "signup-password-error"],
      ["signup-confirm", "signup-confirm-error"],
      ["forgot-email", "forgot-email-error"]
    ];
    fieldBindings.forEach(([inputId, errorId]) => {
      const el = document.getElementById(inputId);
      if (el) {
        el.addEventListener("input", () => clearFieldError(inputId, errorId));
      }
    });

    // Screen 1: Login submit
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const emailVal = (document.getElementById("login-email")?.value || "").trim();
        const pwVal = document.getElementById("login-password")?.value || "";
        let valid = true;

        clearFieldError("login-email", "login-email-error");
        clearFieldError("login-password", "login-password-error");

        if (!emailVal) {
          setFieldError("login-email", "login-email-error", "Please enter your email address.");
          valid = false;
        } else if (!EMAIL_REGEX.test(emailVal)) {
          setFieldError("login-email", "login-email-error", "Please enter a valid email address.");
          valid = false;
        }

        if (!pwVal) {
          setFieldError("login-password", "login-password-error", "Please enter your password.");
          valid = false;
        } else if (pwVal.length < 6) {
          setFieldError("login-password", "login-password-error", "Password must be at least 6 characters.");
          valid = false;
        }

        if (!valid) return;

        // Demo-only flag; never store passwords
        try {
          localStorage.setItem(
            USER_STORAGE_KEY,
            JSON.stringify({ signedIn: true, email: emailVal })
          );
        } catch {
          // Ignore storage quota / privacy-mode errors
        }

        showScreen("success");
      });
    }

    // Screen 2: Sign Up submit
    if (signupForm) {
      signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nameVal = (document.getElementById("signup-name")?.value || "").trim();
        const emailVal = (document.getElementById("signup-email")?.value || "").trim();
        const pwVal = document.getElementById("signup-password")?.value || "";
        const confirmVal = document.getElementById("signup-confirm")?.value || "";
        let valid = true;

        clearFieldError("signup-name", "signup-name-error");
        clearFieldError("signup-email", "signup-email-error");
        clearFieldError("signup-password", "signup-password-error");
        clearFieldError("signup-confirm", "signup-confirm-error");

        if (!nameVal) {
          setFieldError("signup-name", "signup-name-error", "Please enter your full name.");
          valid = false;
        }

        if (!emailVal) {
          setFieldError("signup-email", "signup-email-error", "Please enter your email address.");
          valid = false;
        } else if (!EMAIL_REGEX.test(emailVal)) {
          setFieldError("signup-email", "signup-email-error", "Please enter a valid email address.");
          valid = false;
        }

        if (!pwVal) {
          setFieldError("signup-password", "signup-password-error", "Please create a password.");
          valid = false;
        } else if (pwVal.length < 6) {
          setFieldError("signup-password", "signup-password-error", "Password must be at least 6 characters.");
          valid = false;
        }

        if (!confirmVal) {
          setFieldError("signup-confirm", "signup-confirm-error", "Please confirm your password.");
          valid = false;
        } else if (confirmVal !== pwVal) {
          setFieldError("signup-confirm", "signup-confirm-error", "Passwords do not match.");
          valid = false;
        }

        if (!valid) return;

        if (signupStatus) {
          signupStatus.textContent = "Account created! Returning to login…";
          signupStatus.hidden = false;
        }

        const loginEmailInput = document.getElementById("login-email");
        if (loginEmailInput) loginEmailInput.value = emailVal;
        signupForm.reset();

        signupRedirectTimer = setTimeout(() => {
          if (loginStatus) {
            loginStatus.textContent = "Account created. Please login with your email.";
            loginStatus.hidden = false;
          }
          showScreen("login", { preserveLoginStatus: true });
        }, 1200);
      });
    }

    // Screen 3: Forgot Password submit
    if (forgotForm) {
      forgotForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const emailVal = (document.getElementById("forgot-email")?.value || "").trim();

        clearFieldError("forgot-email", "forgot-email-error");

        if (!emailVal) {
          setFieldError("forgot-email", "forgot-email-error", "Please enter your email address.");
          return;
        }
        if (!EMAIL_REGEX.test(emailVal)) {
          setFieldError("forgot-email", "forgot-email-error", "Please enter a valid email address.");
          return;
        }

        if (forgotStatus) {
          forgotStatus.textContent = "Link sent! Check your email";
          forgotStatus.hidden = false;
        }
      });
    }

    showScreen("login", { skipFocus: true });
  });
})();
/* ===== END PAGE: LOGIN ===== */

/* ===== PAGE: NEW-SALE ===== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const toolbar = document.getElementById("new-sale-toolbar");
    const newArrivalsSection = document.getElementById("new-arrivals-section");
    const archiveSaleSection = document.getElementById("archive-sale-section");
    const newArrivalsGrid = document.getElementById("new-arrivals-grid");
    const archiveSaleGrid = document.getElementById("archive-sale-grid");
    const sortSelect = document.getElementById("new-sale-sort");
    if (!toolbar || !newArrivalsGrid || !archiveSaleGrid) return;

    const filterChips = toolbar.querySelectorAll("[data-new-sale-filter]");
    let activeFilter = "all";
    let activeSort = "featured";

    function stampCards(grid) {
      Array.from(grid.children).forEach((card, idx) => {
        if (!card.dataset.featuredOrder) {
          card.dataset.featuredOrder = String(idx);
        }
        const priceEl = card.querySelector(".product-card__price");
        if (priceEl && !card.dataset.priceValue) {
          const num = parseFloat(priceEl.textContent.replace(/[^0-9.]/g, "")) || 0;
          card.dataset.priceValue = String(num);
        }
      });
    }

    function sortGrid(grid) {
      stampCards(grid);
      const cards = Array.from(grid.children);
      cards.sort((a, b) => {
        if (activeSort === "price-asc") {
          return Number(a.dataset.priceValue) - Number(b.dataset.priceValue);
        }
        if (activeSort === "price-desc") {
          return Number(b.dataset.priceValue) - Number(a.dataset.priceValue);
        }
        return Number(a.dataset.featuredOrder) - Number(b.dataset.featuredOrder);
      });
      cards.forEach((card) => grid.appendChild(card));
    }

    function applyFilterAndSort() {
      const showNew = activeFilter === "all" || activeFilter === "new";
      const showSale = activeFilter === "all" || activeFilter === "sale";

      if (newArrivalsSection) {
        newArrivalsSection.hidden = !showNew;
        if (showNew) newArrivalsSection.classList.add("is-visible");
      }
      if (archiveSaleSection) {
        archiveSaleSection.hidden = !showSale;
        if (showSale) archiveSaleSection.classList.add("is-visible");
      }

      sortGrid(newArrivalsGrid);
      sortGrid(archiveSaleGrid);
    }

    filterChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        filterChips.forEach((c) => {
          c.classList.remove("is-active");
          c.setAttribute("aria-pressed", "false");
        });
        chip.classList.add("is-active");
        chip.setAttribute("aria-pressed", "true");
        activeFilter = chip.dataset.newSaleFilter || "all";
        applyFilterAndSort();
      });
    });

    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        activeSort = e.target.value;
        applyFilterAndSort();
      });
    }

    stampCards(newArrivalsGrid);
    stampCards(archiveSaleGrid);
  });
})();
/* ===== END PAGE: NEW-SALE ===== */

/* ===== PAGE: FAQ-SHIPPING ===== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const accordion = document.getElementById("shipping-faq-list");
    if (!accordion) return;

    const triggers = Array.from(accordion.querySelectorAll(".faq-trigger"));

    function syncOpenPanels() {
      accordion.querySelectorAll(".faq-item.is-open .faq-panel").forEach((panel) => {
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      });
    }

    syncOpenPanels();
    window.addEventListener("resize", syncOpenPanels);

    triggers.forEach((trigger, index) => {
      trigger.addEventListener("keydown", (e) => {
        let nextIdx = null;
        if (e.key === "ArrowDown") {
          nextIdx = (index + 1) % triggers.length;
        } else if (e.key === "ArrowUp") {
          nextIdx = (index - 1 + triggers.length) % triggers.length;
        } else if (e.key === "Home") {
          nextIdx = 0;
        } else if (e.key === "End") {
          nextIdx = triggers.length - 1;
        }
        if (nextIdx !== null) {
          e.preventDefault();
          triggers[nextIdx].focus();
        }
      });
    });
  });
})();
/* ===== END PAGE: FAQ-SHIPPING ===== */
