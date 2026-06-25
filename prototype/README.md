# VinTravel — AI Travel Planner

Prototype web cho trợ lý lập lịch trình du lịch Việt Nam. Người dùng mô tả chuyến đi, nhận vài phương án lịch theo ngày, chỉnh sửa và chốt bản nháp trước khi chuyển sang đặt phòng — **không** thanh toán hay đặt vé thay người dùng.

Xây dựng bằng HTML, CSS và JavaScript thuần, dữ liệu và phản hồi AI được mock cục bộ (không cần backend).

## Vấn đề & use case

**Use case chính:** tự lập lịch chuyến đi tự túc (ví dụ 4 ngày Đà Nẵng – Hội An), không phải chat khám phá chung.

Người dùng mục tiêu: cặp đôi / nhóm bạn 25–35 tuổi, ít kinh nghiệm tự túc miền Trung — cần lịch **đáng tin, sửa được** để bớt stress trước chuyến đi.

## Luồng sản phẩm

| Bước | Trang | Mô tả |
|------|-------|--------|
| 1 | [`index.html`](index.html) | Trang chủ — nhập ý tưởng chuyến đi hoặc chọn gợi ý nhanh |
| 2 | [`pages/onboarding.html`](pages/onboarding.html) | Giới thiệu nhanh (1 màn hình, tối ưu Day 20) |
| 3 | [`pages/plan-trip.html`](pages/plan-trip.html) | Thu thập thông tin & tạo lịch trình |
| 4 | [`pages/itineraries.html`](pages/itineraries.html) | So sánh và chọn phương án |
| 5 | [`pages/review.html`](pages/review.html) | Xem lịch theo ngày, chỉnh sửa, chốt bản nháp |
| 6 | [`pages/booking.html`](pages/booking.html) | Chuẩn bị đặt phòng (chuyển sang đối tác) |

**Core action:** chọn phương án lịch trình → xem bản nháp chi tiết trên Review.

**Trang phụ:** [`pages/chat.html`](pages/chat.html) (trợ lý AI hỏi đáp), [`pages/onboarding-day18.html`](pages/onboarding-day18.html) (onboarding 3 bước — tham chiếu Before/After).

## Tính năng nổi bật

- Gợi ý lịch theo ngày cho các điểm đến Việt Nam (mock)
- Nhiều phương án lịch để so sánh trước khi chọn
- Chỉnh sửa nhẹ trên Review; trạng thái **Bản nháp** cho đến khi user **Chốt lịch trình**
- Onboarding rút gọn (Day 20) và đường tắt “Xem phương án ngay”
- Mock tracking sự kiện (`sessionStorage`) cho lab retention

## Cấu trúc thư mục

```
├── index.html              # Trang chủ
├── pages/                  # Các màn hình luồng chính & lab
├── assets/
│   ├── css/                # tokens, layout, components, report
│   ├── js/                 # state, mock AI/data, UI, tracking
│   └── img/                # Hình ảnh báo cáo (nếu có)
├── report.html             # Báo cáo lab Day 18
├── report-day20.html       # Báo cáo lab Day 20
├── report-day21.html       # Báo cáo lab Day 21 — Scenario Dataset
├── data/day21/             # CSV combinations, v0/v1 datasets, generation log
└── docs/                   # PDF lab (không commit nếu trong .gitignore)
```

## Chạy local

Cần [Node.js](https://nodejs.org/) (để dùng `npx`).

```bash
npx serve .
```

Mở http://localhost:3000 — bắt đầu từ [`index.html`](index.html).

Có thể host tĩnh trên GitHub Pages hoặc bất kỳ static host nào.

## Báo cáo & tài liệu lab

### Day 18 — Prototype & tương tác AI

- [Báo cáo Day 18](report.html) — vòng đời, luồng màn hình, Act/Ask/Don't Act, feedback 2×2
- Trang lab: [Feedback](pages/feedback.html) · [Rationale](pages/rationale.html) · [Recovery](pages/recovery.html)

### Day 20 — Retention & habit loop

- [Báo cáo Day 20](report-day20.html) — use case, core action, onboarding, NSM, tracking
- [Event map / tracking mock](pages/tracking-spec.html)
- [Onboarding Before (Day 18)](pages/onboarding-day18.html) — so sánh với luồng hiện tại

### Day 21 — Scenario Dataset cho AI evals

- [Báo cáo Day 21](report-day21.html) — quality question, input grid, combinations, v0/v1 datasets
- [Dataset v1 (CSV)](data/day21/scenario-dataset-v1.csv) · [v0](data/day21/scenario-dataset-v0.csv) · [Generation log](data/day21/generation-log.md)

## Giới hạn prototype

- Dữ liệu địa điểm, giá và giờ mở cửa là **minh họa**, chưa phản ánh thực tế
- AI và đặt phòng được **giả lập** — phù hợp demo và bài lab, chưa phải sản phẩm production

## License

Dự án học thuật / prototype cho track AI Product (VinUni).
