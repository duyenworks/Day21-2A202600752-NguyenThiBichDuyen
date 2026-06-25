const VinTravelRouter = {
  getHash() {
    return window.location.hash.slice(1) || '';
  },

  getParams() {
    const hash = this.getHash();
    const [path, query] = hash.split('?');
    const params = {};
    if (query) {
      query.split('&').forEach((pair) => {
        const [k, v] = pair.split('=');
        params[k] = decodeURIComponent(v || '');
      });
    }
    return { path, params };
  },

  navigate(path, params = {}) {
    const qs = Object.entries(params)
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join('&');
    window.location.hash = qs ? `${path}?${qs}` : path;
  },

  relative(href) {
    const depth = (window.location.pathname.match(/\//g) || []).length - 1;
    const prefix = depth > 1 ? '../' : '';
    return prefix + href;
  },
};

if (typeof module !== 'undefined') module.exports = VinTravelRouter;
