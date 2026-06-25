## 1. Chọn use case và quality question

| Thành phần | Câu trả lời |
|------------|-------------|
| Use case từ Day 18/19 | Thu thập thông tin chuyến đi từ người dùng qua chat (màn hình Lập kế hoạch/plan-trip.html) |
| Persona chính | Cá nhân, cặp đôi, nhóm bạn 25–35 tuổi, hoặc gia đình có ít kinh nghiệm tự túc miền Trung |
| Unit of AI Work | Một tin nhắn người dùng mô tả chuyến đi → agent parse constraints từ tin nhắn, cập nhật checklist 5 mục bao gồm *Đi đâu, Đi bao lâu, Đi cùng ai, Ngân sách, Phong cách đi (sở thích)* → hỏi đúng mục còn thiếu (theo thứ tự), và không chuyển sang tạo lịch khi còn thiếu thông tin quan trọng hoặc cần user xác nhận giả định |
| Input user đưa vào | Một câu tự do trên chat Lập kế hoạch, ví dụ: *"Mình và nhóm bạn đi Đà Nẵng Hội An 4 ngày, ~3 triệu/ngày, ưu tiên phố cổ và di sản"* hoặc *"Muốn đi chơi miền Trung vài ngày cùng gia đình"* |
| Output agent cần tạo | (1) Điền đúng các mục checklist đã parse được: *Đi đâu, Đi bao lâu, Đi cùng ai, Ngân sách, Phong cách đi (sở thích)*<br> (2) Acknowledge ngắn gọn những gì đã hiểu<br> (3) Hỏi một mục còn thiếu tiếp theo + chip gợi ý<br> (4) Khi đủ thông tin → báo user có thể bấm "Tạo lịch trình"<br> (5) Khi thiếu ngân sách mà user muốn generate → hiện modal Ask xác nhận trước khi dùng mặc định |
| Agent được phép làm gì? | **Act (rủi ro thấp)**: Parse và điền checklist từ câu user; acknowledge constraint; đưa chip gợi ý cho mục còn thiếu; hỏi tuần tự theo thứ tự: destination → duration → companions → budget → style. Ask (cần xác nhận): Hỏi lại khi thiếu thông tin; hiện modal xác nhận ngân sách mặc định (~3 triệu/ngày) trước khi tạo lịch; làm rõ khi constraint mâu thuẫn (ví dụ 3 ngày nhưng muốn đi nhiều thành phố)|
| Agent không được phép làm gì? | **Don't Act**: Đặt vé máy bay / khách sạn / thanh toán thay user; cam kết giá hoặc giờ mở cửa chính xác khi chưa xác minh; tự đoán destination khi user mơ hồ ("đi chơi đâu đó"); tự generate lịch khi thiếu budget mà user chưa xác nhận; bỏ qua hỏi các mục checklist còn thiếu; tự thêm thông tin user không nói (ví dụ tự gán ngân sách mà không hỏi)|



