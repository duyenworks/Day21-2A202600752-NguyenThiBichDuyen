const VinTravelState = {
  STORAGE_KEY: 'vintravel_trip',

  default() {
    return {
      destination: '',
      duration: '',
      companions: '',
      budget: '',
      style: '',
      checklistProgress: 0,
      selectedVariant: null,
      draftItinerary: null,
      onboardingDone: false,
      recoveryApplied: false,
      poiReported: false,
      confirmed: false,
      customItinerary: null,
      removedActivityKeys: [],
      history: [],
    };
  },

  load() {
    try {
      const raw = sessionStorage.getItem(this.STORAGE_KEY);
      return raw ? { ...this.default(), ...JSON.parse(raw) } : this.default();
    } catch {
      return this.default();
    }
  },

  save(partial) {
    const current = this.load();
    const next = { ...current, ...partial };
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(next));
    return next;
  },

  reset() {
    sessionStorage.removeItem(this.STORAGE_KEY);
  },

  getChecklistItems() {
    const t = this.load();
    const hints = {
      destination: 'Chưa chọn điểm đến',
      duration: 'Thêm số ngày đi',
      companions: 'Ai đi cùng bạn?',
      budget: 'Ngân sách mỗi ngày',
      style: 'Ưu tiên chuyến đi',
    };
    return [
      { key: 'destination', label: 'ĐI ĐÂU', value: t.destination, hint: hints.destination },
      { key: 'duration', label: 'BAO LÂU', value: t.duration, hint: hints.duration },
      { key: 'companions', label: 'ĐI CÙNG AI', value: t.companions, hint: hints.companions },
      { key: 'budget', label: 'NGÂN SÁCH', value: t.budget, hint: hints.budget },
      { key: 'style', label: 'PHONG CÁCH', value: t.style, hint: hints.style },
    ];
  },

  countFilled() {
    return this.getChecklistItems().filter((i) => i.value).length;
  },

  pushHistory(label) {
    const current = this.load();
    const snapshot = {
      label: label || 'Thay đổi',
      at: Date.now(),
      selectedVariant: current.selectedVariant,
      customItinerary: current.customItinerary ? JSON.parse(JSON.stringify(current.customItinerary)) : null,
      customPoi: current.customPoi ? JSON.parse(JSON.stringify(current.customPoi)) : null,
      removedActivityKeys: [...(current.removedActivityKeys || [])],
      recoveryApplied: current.recoveryApplied,
      poiReported: current.poiReported,
      confirmed: current.confirmed,
    };
    const history = [...(current.history || []), snapshot].slice(-10);
    return this.save({ history });
  },

  undo() {
    const current = this.load();
    const history = [...(current.history || [])];
    if (!history.length) return null;
    const prev = history.pop();
    return this.save({
      history,
      selectedVariant: prev.selectedVariant,
      customItinerary: prev.customItinerary,
      customPoi: prev.customPoi,
      removedActivityKeys: prev.removedActivityKeys,
      recoveryApplied: prev.recoveryApplied,
      poiReported: prev.poiReported,
      confirmed: prev.confirmed,
    });
  },

  canUndo() {
    return (this.load().history || []).length > 0;
  },
};

if (typeof module !== 'undefined') module.exports = VinTravelState;
