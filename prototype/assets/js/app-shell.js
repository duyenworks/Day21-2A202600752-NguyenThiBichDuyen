const VinTravelAppShell = {
  pages: [
    { id: 'plan', label: 'Lập kế hoạch', href: 'plan-trip.html', icon: '✨', mobile: true },
    { id: 'itineraries', label: 'Lịch trình', href: 'itineraries.html', icon: '🧭', mobile: true },
    { id: 'review', label: 'Chuyến đi của tôi', href: 'review.html', icon: '📅', mobile: false },
    { id: 'chat', label: 'Trợ lý AI', href: 'chat.html', icon: '💬', mobile: false },
    { id: 'notifications', label: 'Thông báo', href: '#coming-soon', icon: '🔔', mobile: false },
    { id: 'favorites', label: 'Yêu thích', href: '#coming-soon', icon: '♥', mobile: false },
  ],

  homeHref() {
    return window.location.pathname.includes('/pages/') ? '../index.html' : 'index.html';
  },

  renderSidebar(activePage) {
    const items = this.pages
      .map(
        (p) =>
          `<a class="nav-item ${p.id === activePage ? 'active' : ''}" href="${p.href}" data-nav="${p.id}">${p.icon} ${p.label}</a>`
      )
      .join('');
    return `
      <aside class="app-sidebar">
        <a href="${this.homeHref()}" class="logo" style="text-decoration:none;">Vin<span>Travel</span></a>
        ${items}
        <a class="nav-item nav-create" href="plan-trip.html" data-nav="create">+ Tạo chuyến đi</a>
        <div class="user-profile">
          <div class="user-avatar">VT</div>
          <div><strong>Khách du lịch</strong><br><small style="color:var(--color-gray-400)">Tài khoản của bạn</small></div>
        </div>
      </aside>`;
  },

  renderBottomNav(activePage) {
    const mobileItems = this.pages.filter((p) => p.mobile);
    mobileItems.unshift({ id: 'home', label: 'Trang chủ', href: this.homeHref(), icon: '🏠', mobile: true });
    return `
      <nav class="bottom-nav" aria-label="Điều hướng chính">
        ${mobileItems.map((p) => `
          <a href="${p.href}" class="bottom-nav-item ${p.id === activePage ? 'active' : ''}" data-nav="${p.id}">
            <span class="bottom-nav-icon">${p.icon}</span>
            <span>${p.label}</span>
          </a>`).join('')}
        <button type="button" class="bottom-nav-item" data-nav="account" id="bottom-account">
          <span class="bottom-nav-icon">👤</span>
          <span>Tài khoản</span>
        </button>
      </nav>`;
  },

  renderDiscovery(context = 'default', clickable = true) {
    const key = Object.keys(MOCK_DATA.discoveryByContext).find((k) =>
      context.toLowerCase().includes(k)
    ) || 'default';
    const items = MOCK_DATA.discoveryByContext[key] || MOCK_DATA.discoveryByContext.default;
    const cards = items
      .map(
        (d) => `
        <div class="discovery-card${clickable ? '' : ''}" data-discovery="${d.name}" role="button" tabindex="0">
          <img src="${d.img}" alt="${d.name}" loading="lazy">
          <div class="info">
            <div>${d.name}</div>
            <div class="rating">★ ${d.rating} · ${d.category}</div>
          </div>
        </div>`
      )
      .join('');
    return `
      <aside class="app-discovery">
        <div class="discovery-featured">
          <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600" alt="Du lịch khác đi">
          <div class="overlay">Du lịch khác đi</div>
        </div>
        <h4 style="margin-bottom:0.75rem;font-size:0.9rem;">Điểm nên đến</h4>
        <div class="discovery-grid">${cards}</div>
      </aside>`;
  },

  bindNavHandlers(root) {
    root.querySelectorAll('[href="#coming-soon"], [data-nav="account"]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const label = el.dataset.nav === 'account' ? 'Tài khoản' : el.textContent.trim();
        if (typeof VinTravelUI !== 'undefined') VinTravelUI.showComingSoon(label);
      });
    });
  },

  bindDiscoveryCards(root) {
    root.querySelectorAll('.discovery-card[data-discovery]').forEach((card) => {
      const activate = () => {
        const name = card.dataset.discovery;
        if (typeof VinTravelUI !== 'undefined') {
          VinTravelUI.showToast(`Đã thêm "${name}" vào gợi ý — hỏi trợ lý để đưa vào lịch trình.`);
        }
      };
      card.addEventListener('click', activate);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate();
        }
      });
    });
  },

  updateDiscovery(containerId, context = 'default') {
    const el = document.getElementById(containerId);
    const discovery = el?.querySelector('.app-discovery');
    if (discovery) {
      discovery.outerHTML = this.renderDiscovery(context);
      this.bindDiscoveryCards(el);
    }
  },

  mount(containerId, { activePage = 'chat', discoveryContext = 'default', showDiscovery = true } = {}) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.className = `app-shell${showDiscovery ? '' : ' no-discovery'}`;
    const mainSlot = el.querySelector('[data-main]');
    const mainHtml = mainSlot ? mainSlot.outerHTML : '<main class="app-main" data-main></main>';
    el.innerHTML =
      this.renderSidebar(activePage) +
      mainHtml.replace('data-main', 'data-main') +
      (showDiscovery ? this.renderDiscovery(discoveryContext) : '') +
      this.renderBottomNav(activePage);
    this.bindNavHandlers(el);
    if (showDiscovery) this.bindDiscoveryCards(el);
  },
};

if (typeof module !== 'undefined') module.exports = VinTravelAppShell;
