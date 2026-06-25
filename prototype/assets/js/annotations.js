// Chỉ dùng trên trang lab (demo / feedback / rationale) — không inject vào sản phẩm.
const VinTravelAnnotations = {
  init() {
    if (document.getElementById('rationale-toggle')) return;
    const btn = document.createElement('button');
    btn.id = 'rationale-toggle';
    btn.className = 'btn btn-secondary btn-sm rationale-toggle';
    btn.textContent = 'Hiện giải thích thiết kế';
    btn.type = 'button';
    btn.addEventListener('click', () => {
      document.body.classList.toggle('show-rationale');
      btn.textContent = document.body.classList.contains('show-rationale')
        ? 'Ẩn giải thích thiết kế'
        : 'Hiện giải thích thiết kế';
    });
    document.body.appendChild(btn);
  },
};

if (typeof module !== 'undefined') module.exports = VinTravelAnnotations;
