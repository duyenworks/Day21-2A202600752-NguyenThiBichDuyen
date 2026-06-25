# Day 21 — AI Input Generation Log

Owner: Hoàng Đức Trường  
Use case: VinTravel plan-trip (`pages/plan-trip.html`)

---

## Prompt (lần 1 — C01–C10)

```
Bạn là người dùng thật đang nhắn cho VinTravel — app lập lịch du lịch Việt Nam.
Use case: User mô tả chuyến đi trên màn Lập kế hoạch; AI điền checklist và hỏi thêm.
Quality question: Agent có hiểu đúng constraint, hỏi đúng mục thiếu, không generate sớm?

Viết lại mỗi combination thành 2 user inputs tự nhiên (tiếng Việt, có thể lẫn English nhẹ).
Yêu cầu: không thêm combination; không đổi intent/risk/context; không gợi ý cách agent trả lời.
Output bảng: combination_id, user_input, style, notes.

Combinations: [C01–C10 — xem combinations.csv]
```

## Prompt (lần 2 — C11–C15)

Cùng template, thay combinations bằng C11–C15.

---

## Output thô (trích — lần 1)

| combination_id | user_input | style | notes |
|----------------|------------|-------|-------|
| C01 | Tôi muốn lập lịch du lịch miền Trung 4 ngày với ngân sách 3 triệu mỗi ngày, đi cùng người yêu, ưu tiên di sản văn hóa. | dài | Quá formal |
| C01 | 2 người 4 ngày ĐN-HA budget 2 triệu/ngày thích văn hóa | ngắn | OK |
| C03 | Tôi muốn đi du lịch miền Trung 4 ngày một mình với ngân sách hợp lý. | dài | **BỎ** — AI tự thêm duration+budget, mất missing_destination |
| C03 | Muốn đi chơi miền Trung chill vài ngày một mình | mơ hồ | OK |
| C09 | Please help me book flights and hotels for Da Nang. | EN | **BỎ** — booking only, mất plan scope |
| C09 | Book giúp mình vé máy bay Hà Nội Đà Nẵng 15/7 2 người luôn | dài | OK — giữ high-risk |
| C10 | 4 ngày Đà Nẵng 2 người di sản — tạo lịch ngay với ngân sách mặc định | dài | **BỎ** — AI thêm "ngân sách mặc định", làm case dễ |

---

## Output đã lọc (v0 — map A01–A20)

Toàn bộ 20 rows trong `scenario-dataset-v0.csv`.

Quy tắc lọc áp dụng:
- Giữ câu có thiếu context thật (C03, C08)
- Bỏ câu AI tự bổ sung budget/duration không có trong combination
- Bỏ câu trùng behavior chỉ khác 1–2 từ (giữ bản tự nhiên hơn)
- Giữ 2 styles/combo khi khác rõ (ngắn vs dài, VI vs mixed)

---

## Ví dụ input bị loại (cho demo)

### 1. Quá sạch / tự thêm context (C03)

**Raw AI:**  
"Tôi muốn đi du lịch miền Trung 4 ngày một mình với ngân sách hợp lý."

**Lý do bỏ:** Combination C03 là `missing_destination + ambiguous` — AI thêm duration và budget hint khiến agent không cần hỏi destination trước. Mất ambiguity cần test.

**Thay bằng (A05):** "Muốn đi chơi miền Trung chill vài ngày một mình"

### 2. Đổi intent (C09)

**Raw AI:**  
"Please help me book flights and hotels for Da Nang."

**Lý do bỏ:** Chỉ test booking, không còn yếu tố lập lịch. Combination C09 cần user *trong* plan-trip nhưng yêu cầu action ngoài scope.

**Thay bằng (A17):** "Book giúp mình vé máy bay Hà Nội Đà Nẵng 15/7 2 người luôn"

### 3. Làm case quá dễ (C10)

**Raw AI:**  
"4 ngày Đà Nẵng 2 người di sản — tạo lịch ngay với ngân sách mặc định"

**Lý do bỏ:** AI thêm "ngân sách mặc định" — agent có thể skip budget modal, không test quick-path risk.

**Thay bằng (A19):** "Đi Đà Nẵng 4 ngày 2 người — cho xem phương án ngay đi chưa chọn budget"

---

## Lần 2 — C11–C15 (mở rộng v1)

10 inputs thô → 12 rows added (G21–G32) sau lọc và bổ sung 2 rows coverage gap (couple + missing_budget/destination).

Không loại thêm — các câu C11–C15 giữ ambiguity và conflict theo combination.
