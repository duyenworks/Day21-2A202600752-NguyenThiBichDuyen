const VinTravelUI = {
  STEPS: [
    { id: 'plan', label: 'Lập kế hoạch', href: 'plan-trip.html' },
    { id: 'variants', label: 'Chọn phương án', href: 'itineraries.html' },
    { id: 'review', label: 'Xem lịch trình', href: 'review.html' },
    { id: 'booking', label: 'Đặt phòng', href: 'booking.html' },
  ],

  pathPrefix() {
    return window.location.pathname.includes('/pages/') ? '../' : '';
  },

  pagesPrefix() {
    return window.location.pathname.includes('/pages/') ? '' : 'pages/';
  },

  renderStepper(activeId, containerId = 'trip-stepper') {
    const el = document.getElementById(containerId);
    if (!el) return;
    const prefix = this.pagesPrefix();
    el.innerHTML = this.STEPS.map((step, i) => {
      const active = step.id === activeId;
      const done = this.STEPS.findIndex((s) => s.id === activeId) > i;
      const cls = ['flow-stepper-item', active ? 'active' : '', done ? 'done' : ''].filter(Boolean).join(' ');
      return `<a href="${prefix}${step.href}" class="${cls}"><span class="flow-stepper-num">${i + 1}</span>${step.label}</a>`;
    }).join('');
  },

  formatTripMeta(trip) {
    const parts = [];
    if (trip.duration) parts.push(trip.duration);
    if (trip.companions) parts.push(trip.companions);
    if (trip.budget) parts.push(trip.budget);
    return parts.length ? parts.join(' · ') : 'Đang cập nhật thông tin chuyến đi';
  },

  getTripTitle(trip) {
    if (trip.destination) return trip.destination;
    const v = MOCK_DATA.variants.find((x) => x.id === trip.selectedVariant);
    return v ? v.subtitle.split('·').pop().trim() : 'Chuyến đi của bạn';
  },

  getRecommendedVariantId(trip) {
    const styleMap = {
      'Văn hóa & di sản': 'heritage',
      'Biển & thiên nhiên': 'nature',
      'Ẩm thực đường phố': 'food',
    };
    const dest = (trip.destination || '').toLowerCase();
    if (dest.includes('quảng bình') || dest.includes('quảng trị') || dest.includes('phong nha') || dest.includes('dmz')) {
      return 'qbqt';
    }
    if (trip.style && styleMap[trip.style]) return styleMap[trip.style];
    return 'heritage';
  },

  variantDurationMismatch(variant, trip) {
    const d = (trip.duration || '').match(/(\d+)/);
    const userDays = d ? parseInt(d[1], 10) : 4;
    if (variant.id === 'qbqt' && userDays < 5) {
      return `Lịch trình này kéo dài 5–6 ngày — bạn đang lên kế hoạch ${trip.duration || '4 ngày'}.`;
    }
    return null;
  },

  getItineraryDays(variantId, trip) {
    if (trip.customItinerary) return trip.customItinerary;
    const data = MOCK_DATA.itinerariesByVariant[variantId] || MOCK_DATA.itinerariesByVariant.heritage;
    return JSON.parse(JSON.stringify(data));
  },

  applyRemovedActivities(days, removedKeys) {
    if (!removedKeys?.length) return days;
    return days.map((day) => ({
      ...day,
      activities: day.activities.filter((a) => !removedKeys.includes(`${day.day}-${a.name}`)),
    }));
  },

  getRemovableForVariant(variantId) {
    return MOCK_DATA.overloadedRemovableByVariant[variantId]
      || MOCK_DATA.overloadedRemovableByVariant.heritage
      || [];
  },

  activityKey(day, name) {
    return `${day}-${name}`;
  },

  getPoi(variantId) {
    return MOCK_DATA.poiByVariant[variantId] || MOCK_DATA.poiByVariant.heritage;
  },

  renderTripHeader(trip) {
    const titleEl = document.getElementById('trip-title');
    const metaEl = document.getElementById('trip-meta');
    const badgeEl = document.getElementById('status-badge');
    if (titleEl) titleEl.textContent = this.getTripTitle(trip);
    if (metaEl) metaEl.textContent = this.formatTripMeta(trip);
    if (badgeEl) {
      badgeEl.textContent = trip.confirmed ? 'Đã chốt' : 'Bản nháp';
      badgeEl.className = trip.confirmed ? 'badge badge-confirmed' : 'badge badge-draft';
    }
  },

  renderItineraryAccordion(containerId, trip) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const variantId = trip.selectedVariant || 'heritage';
    const days = this.getItineraryDays(variantId, trip);
    const removedKeys = trip.removedActivityKeys || [];

    el.innerHTML = '';
    days.forEach((day) => {
      const item = document.createElement('div');
      const overloaded = day.overloaded && !trip.recoveryApplied;
      item.className = `accordion-item${overloaded ? ' overloaded' : ''}${overloaded ? ' open' : ''}`;
      item.innerHTML = `
        <div class="accordion-header" role="button" aria-expanded="${overloaded}">
          <span>${day.title}${overloaded ? ' <span class="badge badge-warning">Khá dày · ~5h30 di chuyển</span>' : ''}</span>
          <span class="accordion-chevron">▼</span>
        </div>
        <div class="accordion-body">
          ${day.activities.map((a) => {
            const key = this.activityKey(day.day, a.name);
            const removed = removedKeys.includes(key);
            return `
            <div class="activity-item${removed ? ' activity-removed activity-highlight-removed' : ''}">
              <span class="activity-time">${a.time}</span>
              <div><strong>${a.name}</strong>${removed ? ' <small>(đã bỏ)</small>' : ''}<br><small>${a.type}${a.note ? ' · ' + a.note : ''}</small></div>
            </div>`;
          }).join('')}
        </div>`;
      const header = item.querySelector('.accordion-header');
      header.addEventListener('click', () => {
        const open = item.classList.toggle('open');
        header.setAttribute('aria-expanded', open);
      });
      el.appendChild(item);
    });
  },

  renderPoiSection(trip) {
    const variantId = trip.selectedVariant || 'heritage';
    const poi = trip.customPoi || this.getPoi(variantId);
    const set = (id, text) => { const e = document.getElementById(id); if (e) e.textContent = text; };
    set('poi-name', poi.name);
    set('poi-address', poi.address);
    set('poi-hours', poi.hours);
    const ratingEl = document.getElementById('poi-rating-line');
    if (ratingEl) ratingEl.textContent = `★ ${poi.rating} · ${poi.category} · ${poi.location}`;
    set('poi-desc', poi.description);
    const sectionTitle = document.getElementById('poi-section-title');
    if (sectionTitle) sectionTitle.textContent = `Gợi ý ăn uống · ${poi.location}`;
    const main = document.getElementById('poi-gallery-main');
    if (main && poi.image) main.style.backgroundImage = `url('${poi.image}')`;
    return poi;
  },

  showToast(message, duration = 3500) {
    let toast = document.getElementById('vt-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'vt-toast';
      toast.className = 'vt-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => toast.classList.remove('visible'), duration);
  },

  showComingSoon(feature) {
    this.showToast(`${feature} — sắp ra mắt`);
  },

  scrollChatToBottom(containerId = 'chat-messages') {
    const el = document.getElementById(containerId);
    if (el) requestAnimationFrame(() => { el.scrollTop = el.scrollHeight; });
  },

  renderChips(container, chips, onSelect) {
    if (!container) return;
    container.innerHTML = chips.map((c) => `<button type="button" class="chip" data-chip="${c}">${c}</button>`).join('');
    container.querySelectorAll('.chip').forEach((chip) => {
      chip.addEventListener('click', () => onSelect(chip.dataset.chip));
    });
  },

  updateUndoButton(btnId = 'undo-btn') {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const can = VinTravelState.canUndo();
    btn.disabled = !can;
    btn.title = can ? 'Hoàn tác lần sửa gần nhất' : 'Chưa có thay đổi để hoàn tác';
  },

  startPlanningFromHero(text) {
    if (text) {
      const updates = VinTravelAI.parseUserInput(text);
      if (!updates.destination && text) updates.destination = text.split(',')[0].trim();
      VinTravelState.save(updates);
      if (typeof VinTravelTrack !== 'undefined') {
        VinTravelTrack.log('destination_set', { region: updates.destination, source: 'hero' });
      }
    }
    const prefix = this.pagesPrefix();
    window.location.href = `${prefix}plan-trip.html`;
  },

  goToPlanning() {
    const prefix = this.pagesPrefix();
    window.location.href = `${prefix}plan-trip.html`;
  },

  quickPathToVariants() {
    const trip = VinTravelState.load();
    const recommended = this.getRecommendedVariantId(trip);
    VinTravelState.save({
      destination: trip.destination || 'Đà Nẵng – Hội An',
      duration: trip.duration || '4 ngày',
      companions: trip.companions || '2 người (cặp đôi)',
      budget: trip.budget || '~3 triệu/ngày',
      style: trip.style || 'Văn hóa & di sản',
      checklistProgress: 5,
      draftItinerary: recommended,
      selectedVariant: recommended,
      onboardingDone: true,
    });
    if (typeof VinTravelTrack !== 'undefined') {
      VinTravelTrack.log('itineraries_generated', { variant_count: 4, path: 'quick' });
    }
    const prefix = this.pagesPrefix();
    window.location.href = `${prefix}itineraries.html`;
  },

  mountItineraryChat(options = {}) {
    const {
      messagesId = 'review-chat-messages',
      chipsId = 'review-chat-chips',
      inputId = 'review-chat-input',
      sendId = 'review-chat-send',
      loadingId = 'review-chat-loading',
      onUpdate = () => {},
    } = options;

    const msgs = document.getElementById(messagesId);
    const chipsEl = document.getElementById(chipsId);
    const input = document.getElementById(inputId);
    const sendBtn = document.getElementById(sendId);
    const loading = document.getElementById(loadingId);
    if (!msgs || !sendBtn) return;

    let trip = VinTravelState.load();

    const renderChips = () => {
      if (!chipsEl) return;
      const chips = VinTravelAI.getItineraryEditChips(trip);
      this.renderChips(chipsEl, chips, handleMessage);
    };

    const appendAi = (html) => {
      msgs.innerHTML += `<div class="message ai"><div class="ai-label">VinTravel</div>${html}</div>`;
      this.scrollChatToBottom(messagesId);
    };

    const initMsg = () => {
      const title = this.getTripTitle(trip);
      msgs.innerHTML = `<div class="message ai">
        <div class="ai-label">VinTravel</div>
        <p>Đây là lịch trình <strong>${title}</strong>. Bạn có thể nhắn để bỏ điểm, làm nhẹ lịch, hoặc đổi phương án — mình cập nhật ngay bên dưới.</p>
      </div>`;
      renderChips();
      this.scrollChatToBottom(messagesId);
    };

    async function handleMessage(text) {
      msgs.innerHTML += `<div class="message user">${text}</div>`;
      VinTravelUI.scrollChatToBottom(messagesId);
      if (loading) loading.classList.add('visible');
      await VinTravelAI.simulate();
      if (loading) loading.classList.remove('visible');

      trip = VinTravelState.load();
      const edit = VinTravelAI.handleItineraryEdit(text, trip);

      if (edit.doUndo) {
        VinTravelState.undo();
      } else if (edit.needsHistory) {
        VinTravelState.pushHistory('Chỉnh qua chat');
        VinTravelState.save(edit.statePatch);
      } else if (Object.keys(edit.statePatch || {}).length) {
        VinTravelState.save(edit.statePatch);
      }

      trip = VinTravelState.load();
      appendAi(`<p>${edit.reply}</p>`);
      if (edit.chips && chipsEl) {
        VinTravelUI.renderChips(chipsEl, edit.chips, handleMessage);
      } else {
        renderChips();
      }
      onUpdate(trip);
    }

    sendBtn.addEventListener('click', () => {
      const val = input?.value.trim();
      if (!val) return;
      handleMessage(val);
      if (input) input.value = '';
    });
    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendBtn.click();
    });

    initMsg();
  },
};

if (typeof module !== 'undefined') module.exports = VinTravelUI;
