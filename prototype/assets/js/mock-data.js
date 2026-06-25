const MOCK_DATA = {
  regions: {
    north: ['Hà Nội', 'Sa Pa', 'Ninh Bình'],
    central: ['Huế', 'Đà Nẵng', 'Hội An', 'Quảng Bình', 'Quảng Trị'],
    south: ['Phú Quốc', 'TP.HCM', 'Cần Thơ'],
  },

  discoveryByContext: {
    default: [
      { name: 'Phố cổ Hội An', rating: 4.8, category: 'Di sản UNESCO', img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400' },
      { name: 'Bà Nà Hills', rating: 4.5, category: 'Cáp treo & cảnh núi', img: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400' },
      { name: 'Ngũ Hành Sơn', rating: 4.6, category: 'Hang động & chùa', img: 'https://images.unsplash.com/photo-1583417319070-4a1b3a5e4c3e?w=400' },
      { name: 'Thánh địa Mỹ Sơn', rating: 4.4, category: 'Di sản Chăm', img: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99f5e?w=400' },
    ],
    'quảng bình': [
      { name: 'Hang Én', rating: 4.9, category: 'Trekking 2 ngày', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' },
      { name: 'Suối Moọc', rating: 4.7, category: 'Bơi & picnic', img: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400' },
      { name: 'Động Phong Nha', rating: 4.8, category: 'Tour thuyền', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' },
      { name: 'Biển Nhật Lệ', rating: 4.3, category: 'Bãi cát trắng', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400' },
    ],
    'quảng trị': [
      { name: 'Địa đạo Vịnh Mốc', rating: 4.7, category: 'Tour DMZ', img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400' },
      { name: 'Cầu Hiền Lương', rating: 4.5, category: 'Di tích lịch sử', img: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400' },
      { name: 'Thành cổ Quảng Trị', rating: 4.6, category: 'Di tích', img: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99f5e?w=400' },
      { name: 'Cửa Tùng', rating: 4.4, category: 'Biển & hoàng hôn', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400' },
    ],
  },

  variants: [
    {
      id: 'heritage',
      title: 'Di sản & phố cổ',
      subtitle: '4 ngày 3 đêm · Đà Nẵng → Hội An',
      criteria: ['Ưu tiên di sản UNESCO & làng nghề', 'Di chuyển ngắn trong ngày', 'Phù hợp lần đầu đến miền Trung'],
      days: [
        'Ngày 1: Ngũ Hành Sơn, mì Quảng, Cầu Rồng (Đà Nẵng)',
        'Ngày 2: Phố cổ Hội An, Chùa Cầu, đèn lồng buổi tối',
        'Ngày 3: Thánh địa Mỹ Sơn buổi sáng, thư giãn phố cổ',
        'Ngày 4: Làng gốm Thanh Hà, mua sắm & về',
      ],
      color: 'culture',
    },
    {
      id: 'nature',
      title: 'Biển & núi Bà Nà',
      subtitle: '4 ngày 3 đêm · Đà Nẵng → Hội An',
      criteria: ['Ưu tiên cảnh thiên nhiên & hoạt động ngoài trời', '1 ngày nghỉ nhẹ', 'Phù hợp đi cặp đôi / bạn bè'],
      days: [
        'Ngày 1: Bà Nà Hills (cáp treo, Cầu Vàng)',
        'Ngày 2: Bán đảo Sơn Trà, bãi biển Mỹ Khê',
        'Ngày 3: Tour Cù Lao Chàm hoặc An Bàng',
        'Ngày 4: Cà phê view sông Hội An, khởi hành',
      ],
      color: 'nature',
    },
    {
      id: 'food',
      title: 'Ẩm thực miền Trung',
      subtitle: '4 ngày 3 đêm · Đà Nẵng → Hội An',
      criteria: ['Ưu tiên quán địa phương được đánh giá cao', 'Nhịp độ chậm, nhiều thời gian ăn uống', 'Có chợ đêm & lớp nấu ăn'],
      days: [
        'Ngày 1: Mì Quảng, bún chả cá Đà Nẵng',
        'Ngày 2: Cao lầu, bánh bao, chợ đêm Hội An',
        'Ngày 3: Lớp nấu ăn Hội An, cơm vừa',
        'Ngày 4: Bánh mì Phượng, cà phê phố cổ',
      ],
      color: 'food',
    },
    {
      id: 'qbqt',
      title: 'Phong Nha — DMZ — Huế',
      subtitle: '6 ngày 5 đêm · Quảng Bình → Quảng Trị → Huế',
      criteria: ['Ưu tiên thiên nhiên & di tích lịch sử', 'Nhiều ngày di chuyển xe', 'Nên đi tháng 3–8 (tránh mưa lớn QB)'],
      days: [
        'Ngày 1–2: Động Phong Nha, Suối Moọc',
        'Ngày 3: Vịnh Mốc, Cầu Hiền Lương',
        'Ngày 4–5: Cố đô Huế, Lăng Khải Định, sông Hương',
        'Ngày 6: Chợ Đông Ba, về / nối chuyến Đà Nẵng',
      ],
      color: 'history',
    },
  ],

  itinerariesByVariant: {
    heritage: [
      {
        day: 1,
        title: 'Ngày 1 — Đà Nẵng',
        overloaded: false,
        activities: [
          { time: '08:30', name: 'Ngũ Hành Sơn & chùa Linh Ứng', type: 'Tham quan · ~2h', note: 'Nên mang giày thoải mái' },
          { time: '11:30', name: 'Mì Quảng Bà Mua', type: 'Ăn trưa · ~1h' },
          { time: '14:30', name: 'Bảo tàng Điêu khắc Chăm', type: 'Văn hóa · ~1.5h' },
          { time: '19:30', name: 'Cầu Rồng phun lửa (cuối tuần)', type: 'Buổi tối' },
        ],
      },
      {
        day: 2,
        title: 'Ngày 2 — Hội An',
        overloaded: true,
        travelHours: 5.5,
        activities: [
          { time: '07:30', name: 'Làng rau Trà Quế (đạp xe)', type: 'Trải nghiệm · ~1.5h' },
          { time: '09:30', name: 'Chùa Cầu & phố cổ', type: 'Di sản · ~1.5h' },
          { time: '11:00', name: 'Hội quán Phúc Kiến', type: 'Tham quan · ~45 phút' },
          { time: '12:15', name: 'Cao lầu Thanh', type: 'Ăn trưa' },
          { time: '14:00', name: 'Làng gốm Thanh Hà', type: 'Làng nghề · ~1.5h · cách 3km' },
          { time: '16:00', name: 'Biển An Bàng', type: 'Thư giãn · ~2h · cách 5km' },
          { time: '18:30', name: 'Phố đi bộ & thả đèn hoa đăng', type: 'Buổi tối' },
        ],
      },
      {
        day: 3,
        title: 'Ngày 3 — Mỹ Sơn & Hội An',
        overloaded: false,
        activities: [
          { time: '07:00', name: 'Thánh địa Mỹ Sơn', type: 'Di sản · ~3h · xe ~1h' },
          { time: '13:00', name: 'Nghỉ trưa tại Hội An', type: 'Nghỉ ngơi' },
          { time: '16:00', name: 'Lớp nấu ăn Red Bridge', type: 'Ẩm thực · ~3h' },
        ],
      },
      {
        day: 4,
        title: 'Ngày 4 — Rời Hội An',
        overloaded: false,
        activities: [
          { time: '08:00', name: 'Bánh mì Phượng', type: 'Ăn sáng' },
          { time: '09:30', name: 'Chợ Hội An & đặc sản', type: 'Mua sắm · ~1.5h' },
          { time: '11:30', name: 'Ra sân bay / ga Đà Nẵng', type: 'Di chuyển' },
        ],
      },
    ],
    nature: [
      {
        day: 1,
        title: 'Ngày 1 — Bà Nà Hills',
        overloaded: false,
        activities: [
          { time: '08:00', name: 'Cáp treo Bà Nà Hills', type: 'Tham quan · ~4h' },
          { time: '12:30', name: 'Buffet trên đỉnh', type: 'Ăn trưa' },
          { time: '15:00', name: 'Cầu Vàng & vườn hoa', type: 'Chụp ảnh · ~2h' },
        ],
      },
      {
        day: 2,
        title: 'Ngày 2 — Sơn Trà & biển',
        overloaded: false,
        activities: [
          { time: '06:30', name: 'Chùa Linh Ứng Sơn Trà', type: 'Tham quan · ~1.5h' },
          { time: '09:00', name: 'Bãi biển Mỹ Khê', type: 'Thư giãn · ~3h' },
          { time: '13:00', name: 'Hải sản Bé Mặn', type: 'Ăn trưa' },
          { time: '17:00', name: 'Cà phê view biển', type: 'Nghỉ ngơi' },
        ],
      },
      {
        day: 3,
        title: 'Ngày 3 — Cù Lao Chàm',
        overloaded: false,
        activities: [
          { time: '07:30', name: 'Tàu cao tốc Cửa Đại', type: 'Di chuyển · ~30 phút' },
          { time: '09:00', name: 'Lặn ngắm san hô', type: 'Hoạt động · ~2h' },
          { time: '12:00', name: 'Ăn trưa trên đảo', type: 'Ẩm thực' },
          { time: '15:00', name: 'Về Đà Nẵng', type: 'Di chuyển' },
        ],
      },
      {
        day: 4,
        title: 'Ngày 4 — Hội An nhẹ nhàng',
        overloaded: false,
        activities: [
          { time: '09:00', name: 'An Bàng Beach', type: 'Thư giãn · ~2h' },
          { time: '12:00', name: 'Cà phê Reaching Out', type: 'Ẩm thực' },
          { time: '14:00', name: 'Khởi hành', type: 'Di chuyển' },
        ],
      },
    ],
    food: [
      {
        day: 1,
        title: 'Ngày 1 — Đà Nẵng ăn uống',
        overloaded: false,
        activities: [
          { time: '08:00', name: 'Bún chả cá Bà Lữ', type: 'Ăn sáng' },
          { time: '11:30', name: 'Mì Quảng 1A', type: 'Ăn trưa' },
          { time: '17:00', name: 'Chợ Cồn buổi tối', type: 'Street food · ~2h' },
        ],
      },
      {
        day: 2,
        title: 'Ngày 2 — Hội An ẩm thực',
        overloaded: false,
        activities: [
          { time: '08:30', name: 'Bánh mì Madam Khánh', type: 'Ăn sáng' },
          { time: '11:00', name: 'Cao lầu Thanh', type: 'Ăn trưa' },
          { time: '15:00', name: 'Lớp nấu ăn Red Bridge', type: 'Trải nghiệm · ~3h' },
          { time: '19:00', name: 'Chợ đêm Hội An', type: 'Ẩm thực' },
        ],
      },
      {
        day: 3,
        title: 'Ngày 3 — Đặc sản & cà phê',
        overloaded: false,
        activities: [
          { time: '09:00', name: 'Bánh bao Bà Tý', type: 'Ăn sáng' },
          { time: '12:00', name: 'Cơm vừa Hội An', type: 'Ăn trưa' },
          { time: '16:00', name: 'Cà phê phố cổ', type: 'Nghỉ ngơi' },
        ],
      },
      {
        day: 4,
        title: 'Ngày 4 — Kết thúc',
        overloaded: false,
        activities: [
          { time: '08:00', name: 'Bánh mì Phượng', type: 'Ăn sáng' },
          { time: '10:00', name: 'Mua đặc sản mang về', type: 'Mua sắm' },
          { time: '12:00', name: 'Khởi hành', type: 'Di chuyển' },
        ],
      },
    ],
    qbqt: [
      {
        day: 1,
        title: 'Ngày 1 — Phong Nha',
        overloaded: false,
        activities: [
          { time: '08:00', name: 'Động Phong Nha (tour thuyền)', type: 'Tham quan · ~3h' },
          { time: '13:00', name: 'Ăn trưa Phong Nha', type: 'Ẩm thực' },
          { time: '15:00', name: 'Suối Moọc', type: 'Thiên nhiên · ~2h' },
        ],
      },
      {
        day: 2,
        title: 'Ngày 2 — Quảng Bình',
        overloaded: false,
        activities: [
          { time: '07:00', name: 'Hang Én (nửa ngày)', type: 'Trekking · tùy chọn' },
          { time: '14:00', name: 'Biển Nhật Lệ', type: 'Thư giãn' },
        ],
      },
      {
        day: 3,
        title: 'Ngày 3 — DMZ Quảng Trị',
        overloaded: false,
        activities: [
          { time: '08:00', name: 'Địa đạo Vịnh Mốc', type: 'Lịch sử · ~2h' },
          { time: '11:30', name: 'Cầu Hiền Lương', type: 'Di tích' },
          { time: '14:00', name: 'Di chuyển về Huế', type: 'Xe ~2h' },
        ],
      },
      {
        day: 4,
        title: 'Ngày 4 — Huế',
        overloaded: false,
        activities: [
          { time: '08:30', name: 'Đại Nội Huế', type: 'Di sản · ~3h' },
          { time: '13:00', name: 'Cơm niêu Hoàng Ty', type: 'Ăn trưa' },
          { time: '16:00', name: 'Lăng Khải Định', type: 'Tham quan · ~1.5h' },
        ],
      },
      {
        day: 5,
        title: 'Ngày 5 — Sông Hương',
        overloaded: false,
        activities: [
          { time: '07:00', name: 'Thuyền rồng sông Hương', type: 'Trải nghiệm · ~1h' },
          { time: '10:00', name: 'Chợ Đông Ba', type: 'Mua sắm' },
          { time: '14:00', name: 'Nối chuyến / về', type: 'Di chuyển' },
        ],
      },
    ],
  },

  poiByVariant: {
    heritage: {
      name: 'Bánh mì Phượng',
      location: 'Hội An',
      hours: '06:30 – 19:00',
      address: '2B Phan Châu Trinh, Hội An',
      rating: 4.5,
      category: 'Bánh mì',
      description: 'Quán bánh mì nổi tiếng ở Hội An — thường đông vào buổi trưa. Nên đến sớm hoặc sau 14h.',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600',
      alternatives: [
        { name: 'Bánh mì Madam Khánh', note: 'Cách 200m, thường mở đến 21:00' },
        { name: 'Bánh mì Queen', note: 'Gần Chùa Cầu, đánh giá 4.6' },
      ],
    },
    nature: {
      name: 'Hải sản Bé Mặn',
      location: 'Đà Nẵng',
      hours: '10:00 – 22:00',
      address: '216 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng',
      rating: 4.4,
      category: 'Hải sản',
      description: 'Quán hải sản view biển Mỹ Khê — nên đặt bàn cuối tuần.',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600',
      alternatives: [
        { name: 'Hải sản Năm Đảnh', note: 'Gần cầu Rồng, mở đến 23h' },
        { name: 'Mì Quảng Bà Mua', note: 'Phù hợp nếu muốn đổi sang món địa phương' },
      ],
    },
    food: {
      name: 'Cao lầu Thanh',
      location: 'Hội An',
      hours: '07:00 – 21:00',
      address: '26 Thái Phiên, Hội An',
      rating: 4.6,
      category: 'Món địa phương',
      description: 'Quán cao lầu lâu đời — thường hết sớm vào cuối tuần.',
      image: 'https://images.unsplash.com/photo-1604908176997-43162e0bc0e0?w=600',
      alternatives: [
        { name: 'Cao lầu Bà Bé', note: 'Ít đông hơn, gần phố cổ' },
        { name: 'Morning Glory', note: 'Nhà hàng ẩm thực Hội An, đặt bàn được' },
      ],
    },
    qbqt: {
      name: 'Cơm niêu Hoàng Ty',
      location: 'Huế',
      hours: '10:00 – 21:00',
      address: '27 Đinh Tiên Hoàng, Huế',
      rating: 4.3,
      category: 'Cơm niêu',
      description: 'Cơm niêu kiểu Huế — giờ mở cửa có thể thay đổi theo mùa du lịch.',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600',
      alternatives: [
        { name: 'Cơm Niêu 3 Cá Bống', note: 'Gần sông Hương, mở đến 22h' },
        { name: 'Han Cookery', note: 'Ẩm thực cung đình, cần đặt trước' },
      ],
    },
  },

  categoryFilters: [
    { id: 'culture', label: '🏛 Văn hóa', variantIds: ['heritage'] },
    { id: 'nature', label: '🌿 Thiên nhiên', variantIds: ['nature'] },
    { id: 'food', label: '🍜 Ẩm thực', variantIds: ['food'] },
    { id: 'history', label: '📜 Lịch sử', variantIds: ['qbqt', 'heritage'] },
  ],

  overloadedRemovableByVariant: {
    heritage: [
      { id: 'r1', day: 2, name: 'Làng gốm Thanh Hà', reason: 'Có thể ghé ngày khác hoặc bỏ nếu muốn ít di chuyển hơn' },
      { id: 'r2', day: 2, name: 'Biển An Bàng', reason: 'Buổi chiều khá dài — có thể nghỉ tại phố cổ thay thế' },
    ],
    nature: [],
    food: [],
    qbqt: [],
  },

  itineraryDays: [
    {
      day: 1,
      title: 'Ngày 1 — Đà Nẵng',
      overloaded: false,
      activities: [
        { time: '08:30', name: 'Ngũ Hành Sơn & chùa Linh Ứng', type: 'Tham quan · ~2h', note: 'Nên mang giày thoải mái' },
        { time: '11:30', name: 'Mì Quảng Bà Mua', type: 'Ăn trưa · ~1h' },
        { time: '14:30', name: 'Bảo tàng Điêu khắc Chăm', type: 'Văn hóa · ~1.5h' },
        { time: '19:30', name: 'Cầu Rồng phun lửa (cuối tuần)', type: 'Buổi tối' },
      ],
    },
    {
      day: 2,
      title: 'Ngày 2 — Hội An',
      overloaded: true,
      travelHours: 5.5,
      activities: [
        { time: '07:30', name: 'Làng rau Trà Quế (đạp xe)', type: 'Trải nghiệm · ~1.5h' },
        { time: '09:30', name: 'Chùa Cầu & phố cổ', type: 'Di sản · ~1.5h' },
        { time: '11:00', name: 'Hội quán Phúc Kiến', type: 'Tham quan · ~45 phút' },
        { time: '12:15', name: 'Cao lầu Thanh', type: 'Ăn trưa' },
        { time: '14:00', name: 'Làng gốm Thanh Hà', type: 'Làng nghề · ~1.5h · cách 3km' },
        { time: '16:00', name: 'Biển An Bàng', type: 'Thư giãn · ~2h · cách 5km' },
        { time: '18:30', name: 'Phố đi bộ & thả đèn hoa đăng', type: 'Buổi tối' },
      ],
    },
    {
      day: 3,
      title: 'Ngày 3 — Mỹ Sơn & Hội An',
      overloaded: false,
      activities: [
        { time: '07:00', name: 'Thánh địa Mỹ Sơn', type: 'Di sản · ~3h · xe ~1h' },
        { time: '13:00', name: 'Nghỉ trưa tại Hội An', type: 'Nghỉ ngơi' },
        { time: '16:00', name: 'Lớp nấu ăn Red Bridge', type: 'Ẩm thực · ~3h' },
      ],
    },
    {
      day: 4,
      title: 'Ngày 4 — Rời Hội An',
      overloaded: false,
      activities: [
        { time: '08:00', name: 'Bánh mì Phượng', type: 'Ăn sáng' },
        { time: '09:30', name: 'Chợ Hội An & đặc sản', type: 'Mua sắm · ~1.5h' },
        { time: '11:30', name: 'Ra sân bay / ga Đà Nẵng', type: 'Di chuyển' },
      ],
    },
  ],

  overloadedRemovable: [
    { id: 'r1', day: 2, name: 'Làng gốm Thanh Hà', reason: 'Có thể ghé ngày khác hoặc bỏ nếu muốn ít di chuyển hơn' },
    { id: 'r2', day: 2, name: 'Biển An Bàng', reason: 'Buổi chiều khá dài — có thể nghỉ tại phố cổ thay thế' },
  ],

  outdatedPoi: {
    name: 'Bánh mì Phượng',
    location: 'Hội An',
    hours: '06:30 – 19:00',
    hoursStatus: 'open',
    address: '2B Phan Châu Trinh, Hội An',
    website: null,
    lastUpdated: '03/2025',
    confidence: 'Trung bình',
    source: 'Google Maps',
    alternatives: [
      { name: 'Bánh mì Madam Khánh', note: 'Cách 200m, thường mở đến 21:00' },
      { name: 'Bánh mì Queen', note: 'Gần Chùa Cầu, đánh giá 4.6' },
    ],
  },

  bookingSummary: {
    hotel: 'Little Riverside Hội An',
    room: 'Phòng Deluxe view sông',
    nights: 3,
    checkIn: '15/07/2026',
    checkOut: '18/07/2026',
    pricePerNight: '1.650.000đ',
    taxes: '330.000đ',
    total: '5.280.000đ',
    travelers: 2,
  },
};

if (typeof module !== 'undefined') module.exports = MOCK_DATA;
