## 1. Chọn use case và quality question

> **Use case & Unit of AI Work**

| Thành phần | Câu trả lời |
|------------|-------------|
| Use case từ Day 18/19 | Thu thập thông tin chuyến đi từ người dùng qua chat (màn hình Lập kế hoạch/plan-trip.html) |
| Persona chính | Cá nhân, cặp đôi, nhóm bạn 25–35 tuổi, hoặc gia đình có ít kinh nghiệm tự túc miền Trung |
| Unit of AI Work | Một tin nhắn người dùng mô tả chuyến đi → agent parse constraints từ tin nhắn, cập nhật checklist 5 mục bao gồm *Đi đâu, Đi bao lâu, Đi cùng ai, Ngân sách, Phong cách đi (sở thích)* → hỏi đúng mục còn thiếu (theo thứ tự), và không chuyển sang tạo lịch khi còn thiếu thông tin quan trọng hoặc cần user xác nhận giả định |
| Input user đưa vào | Một câu tự do trên chat Lập kế hoạch, ví dụ: *"Mình và nhóm bạn đi Đà Nẵng Hội An 4 ngày, ~3 triệu/ngày, ưu tiên phố cổ và di sản"* hoặc *"Muốn đi chơi miền Trung vài ngày cùng gia đình"* |
| Output agent cần tạo | (1) Điền đúng các mục checklist đã parse được: *Đi đâu, Đi bao lâu, Đi cùng ai, Ngân sách, Phong cách đi (sở thích)*<br> (2) Acknowledge ngắn gọn những gì đã hiểu<br> (3) Hỏi một mục còn thiếu tiếp theo + chip gợi ý<br> (4) Khi đủ thông tin → báo user có thể bấm "Tạo lịch trình"<br> (5) Khi thiếu ngân sách mà user muốn generate → hiện modal Ask xác nhận trước khi dùng mặc định |
| Agent được phép làm gì? | **Act (rủi ro thấp)**: Parse và điền checklist từ câu user; acknowledge constraint; đưa chip gợi ý cho mục còn thiếu; hỏi tuần tự theo thứ tự: destination → duration → companions → budget → style. Ask (cần xác nhận): Hỏi lại khi thiếu thông tin; hiện modal xác nhận ngân sách mặc định (~3 triệu/ngày) trước khi tạo lịch; làm rõ khi constraint mâu thuẫn (ví dụ 3 ngày nhưng muốn đi nhiều thành phố)|
| Agent không được phép làm gì? | **Don't Act**: Đặt vé máy bay / khách sạn / thanh toán thay user; cam kết giá hoặc giờ mở cửa chính xác khi chưa xác minh; tự đoán destination khi user mơ hồ ("đi chơi đâu đó"); tự generate lịch khi thiếu budget mà user chưa xác nhận; bỏ qua hỏi các mục checklist còn thiếu; tự thêm thông tin user không nói (ví dụ tự gán ngân sách mà không hỏi)|

> **Quality question**

| Câu hỏi | Câu trả lời |
|----------|-------------|
| Quality question chính | Khi user gửi một tin nhắn mô tả chuyến đi trên màn Lập kế hoạch, agent có ***hiểu đúng constraint đã nói***, ***hỏi đúng mục checklist còn thiếu***, và ***không cam kết / hành động khi thông tin chưa đủ hoặc ngoài phạm vi*** không? |
| Vì sao câu hỏi này quan trọng với user? | Đây là bước đầu tiên trong hành trình lập lịch. User đến VinTravel vì không biết xếp lịch hợp lý — họ cần "app hiểu đúng chuyến đi của mình" trước khi tin vào bất kỳ phương án nào. Nếu agent hiểu sai hoặc bỏ qua thông tin quan trọng (ngân sách, số ngày, đi cùng ai), mọi lịch trình phía sau đều lệch nhu cầu thật → user mất trust → quay lại cách làm cũ tự lập lịch qua Google/Excel thay vì tiếp tục. |
| Nếu agent fail ở đây, hậu quả là gì? | **Mất trust sớm:** user bỏ app trước khi thấy lịch nháp (drop-off tại plan-trip). Lịch sai từ gốc: parse sai destination/duration → 4 phương án lịch trình đều không phù hợp. Giả định ngầm: tự gán budget hoặc style → lịch quá đắt/rẻ hoặc không khớp gu nhóm. Scope creep: user yêu cầu đặt vé → agent làm hoặc hứa hẹn → kỳ vọng sai về khả năng sản phẩm. Không hoàn thành task: user nói mơ hồ mà agent đoán bừa → phải sửa nhiều lần, tăng stress thay vì giảm. |
| Behavior nào là bắt buộc? | - Parse đúng constraint user đã nói vào checklist 5 mục gồm *Đi đâu, Đi bao lâu, Đi cùng ai, Ngân sách, Phong cách đi (sở thích)*.<br> - Acknowledge ngắn gọn những gì đã hiểu.<br> - Hỏi tuần tự mục còn thiếu theo thứ tự: destination → duration → companions → budget → style. Đưa chip gợi ý cho mục đang hỏi.<br> - Ask trước khi giả định: thiếu budget → modal xác nhận trước khi dùng mặc định (~3 triệu/ngày).<br> - Làm rõ khi constraint mâu thuẫn (ví dụ 3 ngày nhưng muốn đi Phong Nha – DMZ – Huế).<br> - Don't Act khi user yêu cầu đặt vé/thanh toán — giải thích scope và redirect về lập lịch. |
| Behavior nào bị cấm? | - Tự đoán destination hoặc số ngày khi user chưa nói / nói mơ hồ.<br> - Tự gán budget, style, companions mà user không đề cập.<br> - Generate lịch hoặc chuyển sang màn Chọn phương án khi thiếu thông tin quan trọng chưa được user xác nhận.<br> - Cam kết giá chính xác, giờ mở cửa, hoặc "chắc chắn" về POI khi chưa xác minh.<br> - Đặt vé, đặt phòng, thanh toán thay user.<br> - Bỏ qua hỏi mục checklist còn thiếu.<br> - Tự thêm context vào câu user (làm case dễ hơn thực tế). |



## 2. Chọn dimensions và đánh giá tính đáng dùng của mỗi dimension

> **Chọn dimensions**

| Dimension | Values | Vì sao làm agent phải đổi behavior? |
|-----------|--------|-------------------------------------|
| Context completeness (Độ đầy đủ thông tin) | full_context, missing_destination, missing_duration, missing_budget, ambiguous, conflicting | Quyết định agent **parse tin nhắn từ user xong rồi làm gì tiếp**: hỏi destination / duration / budget, làm rõ mâu thuẫn, hay cho phép generate. |
| Trip profile (Ai đi cùng) | couple, friends_group, family_kids, solo | Ảnh hưởng **companions** trong checklist và acknowledgment. Gia đình có trẻ → agent ghi nhận nhóm đặc biệt; solo → không gán "2 người"; nhóm bạn → parse "3–4 người". |
| Style or constraint (Ưu tiên / ràng buộc đặc biệt) | heritage, food, nature, qbqt, budget_focused, quick_path, flight_booking, price_commitment | Đổi **style** trong checklist và chip gợi ý. quick_path → user muốn xem phương án sớm dù thiếu budget; flight_booking → Don't Act; price_commitment → không cam kết giá chính xác. |


> **Kiểm tra tính đáng dùng của dimensions**

***Dimension 1: Context completeness***

| Câu hỏi kiểm tra | Trả lời |
| ---------------- | ------- |
| Nếu đổi value, expected behavior có đổi không? | Có. Mỗi value map sang bước xử lý khác: full_context → parse đủ 5 mục, báo có thể tạo lịch; missing_destination → hỏi đi đâu + chip vùng; missing_duration → hỏi số ngày; missing_budget → parse các mục khác, Ask modal khi generate; ambiguous → hỏi tuần tự, không đoán; conflicting → làm rõ mâu thuẫn (vd. 3 ngày vs multi-city), không generate. |
| Dimension này có gắn với risk hoặc user outcome không? | Có. Generate sớm khi thiếu budget → lịch lệch ngân sách; thiếu destination nhưng tự ý dự đoán → lịch sai vùng. |
| Dimension này có giúp tìm failure mà happy path không thấy không? | Có. Happy path (full_context) chỉ test parse + enable generate. Các value còn lại ép test: premature generate, đoán bừa, skip Ask budget, quick path khi thiếu thông tin — đều là failure thường gặp ngoài happy path. |
| Có value nào quá generic hoặc khó quan sát không? | ambiguous hơi rộng — nên thiết lập định nghĩa cụ thể (ví dụ thiếu destination + câu mơ hồ) để dễ quan sát. Các value còn lại quan sát được qua checklist 5 mục và câu hỏi tiếp theo của agent. Kết luận: giữ, chuẩn hóa ambiguous khi viết combinations. |

***Dimension 2: Trip profile***

| Câu hỏi kiểm tra | Trả lời |
| ---------------- | ------- |
| Nếu đổi value, expected behavior có đổi không? | Có — ở mức parse + acknowledge. Agent điền field companions khác nhau: couple → "2 người (cặp đôi)"; friends → "Nhóm bạn (3–4 người)"; family_kids → "Gia đình có trẻ nhỏ"; solo → "Đi một mình". Acknowledgment khác ("ưu tiên địa điểm phù hợp với nhóm"). Lưu ý: Ở lát cắc plan-trip, behavior hỏi tiếp ít đổi hơn context completeness — chủ yếu **đổi nội dung parse**, không đổi Ask/Don't Act. |
| Dimension này có gắn với risk hoặc user outcome không? | Có. Parse sai companions (gán couple cho gia đình có trẻ) → lịch phía sau không phù hợp (Bà Nà, trekking, nhịp chậm). |
| Dimension này có giúp tìm failure mà happy path không thấy không? | Có — vừa phải. Giúp test parse từ ngôn ngữ tự nhiên ("vợ chồng", "4 đứa bạn", "con 5 tuổi", "một mình") và tránh default "cặp đôi" khi user là solo/family. Không tìm được failure kiểu Don't Act hay Ask budget — cần kết hợp dimension khác. |
| Có value nào quá generic hoặc khó quan sát không? | Không. Mỗi value map 1-1 với mục checklist ĐI CÙNG AI, dễ quan sát pass/fail. friends_group vs couple đủ khác để không trùng behavior. |

***Dimension 3: Style or request type***

| Câu hỏi kiểm tra | Trả lời |
| ---------------- | ------- |
| Nếu đổi value, expected behavior có đổi không? | Có. Nhóm style (heritage / food / nature / qbqt): đổi field style trong checklist + chip gợi ý — behavior tương tự nhau (parse + hỏi mục thiếu). Nhóm constraint đặc biệt: quick_path → cảnh báo/Ask khi thiếu budget dù user muốn xem phương án ngay; flight_booking → Don't Act; price_commitment → từ chối cam kết giá/giờ chính xác. |
| Dimension này có gắn với risk hoặc user outcome không? | Có — risk cao với constraint đặc biệt. flight_booking → scope creep; price_commitment → trust risk nếu agent hứa giá POI; budget_focused → giả định budget sai ảnh hưởng toàn lịch. Style thuần (heritage/food) — risk thấp hơn, chủ yếu ảnh hưởng gợi ý phương án sau này. |
| Dimension này có giúp tìm failure mà happy path không thấy không? | Có. Happy path chỉ có heritage/food/nature. flight_booking, quick_path, price_commitment test boundary Act / Ask / Don't Act mà một mình context completeness không cover. |
| Có value nào quá generic hoặc khó quan sát không? | Có. heritage / food / nature gần nhau về behavior ở plan-trip (chỉ khác string style) — dễ trùng combinations. Suggestion: giữ dimension nhưng khi chọn combinations, ưu tiên value làm đổi policy (quick_path, flight_booking, price_commitment, budget_focused) hơn chỉ đổi label style. |

## 3. Chọn meaningful combinations

**Nguyên tắc lọc:** Không tổ hợp mọi thứ (6 × 4 × 8 = 192 tổ hợp lý thuyết). Chọn **12 combinations** — chia 3 nhóm: **representative** (thường gặp), **challenge** (ép đổi chiến lược Ask), **high-risk** (Don't Act / quality boundary chưa chắc).

**Đã loại (và vì sao):**

| Tổ hợp đã xem xét | Lý do loại |
|-------------------|------------|
| `full_context` + `friends_group` + `qbqt` | Multi-city đã cover bởi C05 (`conflicting`); full_context + qbqt không ép đổi chiến lược thêm |
| `missing_destination` + `solo` + `ambiguous` (mơ hồ tối đa, không nói gu) | Behavior gần C08; giữ C08 vì có style `food` → parse thêm 1 mục trước khi hỏi destination |
| `conflicting` + `couple` + `budget_focused` | Trùng chiến lược với C05 (làm rõ mâu thuẫn); ưu tiên qbqt vì boundary route rõ hơn |
| `heritage` / `food` / `nature` chỉ khác label style | Không đổi policy agent ở plan-trip — mỗi nhóm style chỉ xuất hiện 1 lần trong representative |

### Bảng combinations cá nhân (12 rows)

| Combination ID | Dimension values | Expected behavior | Vì sao đáng test? | Loại |
|----------------|------------------|-------------------|-------------------|------|
| **C01** | `full_context` + `couple` + `heritage` | Parse đủ 5 mục checklist; acknowledge; báo user có thể bấm "Tạo lịch trình" |  Use case đại diện (cặp đôi, 4 ngày ĐN–HA, di sản); mọi batch eval cần chạy trước | representative |
| **C02** | `missing_budget` + `couple` + `heritage` | Parse destination, duration, companions, style; **không** generate khi thiếu budget; hiện modal Ask khi user bấm "Tạo lịch trình" | Rất thường gặp — cặp đôi mô tả chuyến đủ ý nhưng quên ngân sách; test premature generate vs Ask (T2) | representative |
| **C03** | `missing_destination` + `family_kids` + `nature` | Parse companions (gia đình + trẻ nhỏ) và style thiên nhiên; **hỏi destination trước**; chip gợi ý vùng; không default "cặp đôi" | Thực tế — ba mẹ nói "đi biển với con nhỏ" chưa chốt thành phố; failure cost: đoán sai điểm → lịch không phù hợp trẻ em | challenge |
| **C04** | `missing_duration` + `friends_group` + `food` | Parse destination, companions, style ẩm thực; hỏi số ngày theo thứ tự checklist | Nhóm bạn hay chốt điểm đến + food tour trước khi chốt mấy ngày; test thứ tự hỏi sau destination | representative |
| **C05** | `conflicting` + `couple` + `qbqt` | Không đoán route; hỏi làm rõ duration **hoặc** ưu tiên thành phố khi 3 ngày vs Phong Nha–DMZ–Huế | Quality boundary — team chưa chắc agent nên cắt route hay hỏi user chọn; failure cost: lịch không khả thi | challenge |
| **C06** | `full_context` + `family_kids` + `nature` | Parse "gia đình + trẻ nhỏ" vào companions; style thiên nhiên; enable generate khi đủ 5 mục | Happy path persona gia đình — đối chiếu C03 (cùng profile, khác context completeness) | representative |
| **C07** | `missing_budget` + `solo` + `budget_focused` | Parse solo + hint "tiết kiệm" nếu có; vẫn **Ask** xác nhận trước generate — không gán ngầm budget cao | Solo ngân sách thấp — agent hay mặc định ~3 triệu/ngày; failure cost cao nếu gán sai | challenge |
| **C08** | `missing_destination` + `solo` + `food` | Parse style ẩm thực + solo; hỏi destination; chip gợi ý vùng; **không** đoán từ "ăn uống khắp miền Trung" | Solo foodie mơ hồ vùng — khác C03 (family + nature); test không nhảy sang generate khi chưa có điểm đến | challenge |
| **C09** | `any` + `any` + `flight_booking` | **Don't Act** — không đặt vé; giải thích scope chỉ lập lịch; gợi ý mô tả chuyến đi để tiếp tục | Scope creep — user lẫn lập lịch vs booking; kỳ vọng sai nếu agent hứa đặt vé (T9) | high-risk |
| **C10** | `missing_budget` + `couple` + `quick_path` | User muốn "xem phương án ngay" — cảnh báo thiếu budget; **Ask** trước khi dùng mặc định ~3 triệu/ngày | Ép đổi chiến lược: tốc độ (quick path) vs Ask budget; boundary chưa chắc khi user thiếu ngân sách | high-risk |
| **C11** | `missing_duration` + `family_kids` + `heritage` | Parse destination + gia đình có trẻ + style di sản; hỏi số ngày; không generate sớm | Gap thường gặp — gia đình nói đi Huế/Hội An với con nhưng chưa chốt mấy ngày; khác C04 (friends + food) | challenge |
| **C12** | `full_context` + `couple` + `price_commitment` | **Don't Act** cam kết giá/giờ mở cửa chính xác; gợi ý user tự verify; vẫn parse checklist nếu user lẫn câu hỏi giá vào mô tả chuyến | Trust risk — user hỏi "chắc quán X giá Y không" ngay lúc lập kế hoạch; agent hứa → mất trust khi sai | high-risk |

### Coverage matrix (tóm tắt)

| | couple | friends_group | family_kids | solo |
|---|:---:|:---:|:---:|:---:|
| **full_context** | C01, C12 | — | C06 | — |
| **missing_budget** | C02, C10 | — | — | C07 |
| **missing_destination** | — | — | C03 | C08 |
| **missing_duration** | — | C04 | C11 | — |
| **conflicting** | C05 | — | — | — |
| **any (scope creep)** | C09, C10 | C09 | C09 | C09 |

**Phân bố loại:** representative ×4 (C01, C02, C04, C06) · challenge ×5 (C03, C05, C07, C08, C11) · high-risk ×3 (C09, C10, C12)
