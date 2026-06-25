const VinTravelTrack = {
  STORAGE_KEY: 'vintravel_events',

  log(eventName, properties = {}) {
    const entry = {
      event: eventName,
      properties: { ...properties },
      ts: new Date().toISOString(),
      session_id: this.sessionId(),
    };
    const list = this.all();
    list.push(entry);
    try {
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
    } catch (_) {}
    document.dispatchEvent(new CustomEvent('vintravel:track', { detail: entry }));
    return entry;
  },

  sessionId() {
    let id = sessionStorage.getItem('vintravel_session');
    if (!id) {
      id = `sess_${Date.now().toString(36)}`;
      sessionStorage.setItem('vintravel_session', id);
    }
    return id;
  },

  all() {
    try {
      return JSON.parse(sessionStorage.getItem(this.STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  },

  clear() {
    sessionStorage.removeItem(this.STORAGE_KEY);
  },
};

if (typeof module !== 'undefined') module.exports = VinTravelTrack;
