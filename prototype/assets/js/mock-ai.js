const VinTravelAI = {
    delay: 900,
  
    async simulate(action) {
      return new Promise((resolve) => setTimeout(resolve, this.delay)).then(action);
    },
  
    parseUserInput(text) {
      const t = text.toLowerCase();
      const updates = {};
      if (t.includes('đà nẵng') || t.includes('hội an')) {
        updates.destination = 'Đà Nẵng – Hội An';
      }
      if (t.includes('quảng bình') || t.includes('phong nha')) {
        updates.destination = 'Quảng Bình – Phong Nha';
      }
      if (t.includes('quảng trị') || t.includes('dmz')) {
        updates.destination = updates.destination
          ? updates.destination + ' – Quảng Trị'
          : 'Quảng Trị – DMZ';
      }
      if (t.includes('huế')) {
        updates.destination = updates.destination || 'Huế';
      }
      const dayMatch = t.match(/(\d+)\s*ngày/);
      if (dayMatch) updates.duration = `${dayMatch[1]} ngày`;
      if (t.includes('4 ngày')) updates.duration = '4 ngày';
      if (t.includes('5 ngày') || t.includes('5–6')) updates.duration = '5–6 ngày';
      if (t.includes('gia đình') || t.includes('con nhỏ') || t.includes('trẻ em')) {
        updates.companions = 'Gia đình có trẻ nhỏ';
      }
      if (t.includes('2 người') || t.includes('đôi') || t.includes('vợ chồng')) {
        updates.companions = '2 người (cặp đôi)';
      }
      if (t.includes('bạn bè') || t.includes('nhóm')) updates.companions = 'Nhóm bạn (3–4 người)';
      if (t.includes('một mình') || t.includes('solo') || t.includes('cá nhân') || t.includes('đi một mình')) {
        updates.companions = 'Một mình (solo)';
      }
      const budgetMatch = t.match(/(\d+)\s*triệu/);
      if (budgetMatch) updates.budget = `~${budgetMatch[1]} triệu/ngày`;
      if (t.includes('tiết kiệm')) updates.budget = '~1.5 triệu/ngày';
      if (t.includes('văn hóa') || t.includes('di sản') || t.includes('phố cổ')) {
        updates.style = 'Văn hóa & di sản';
      }
      if (t.includes('biển') || t.includes('núi') || t.includes('bà nà')) {
        updates.style = 'Biển & thiên nhiên';
      }
      if (t.includes('ăn') || t.includes('ẩm thực') || t.includes('food')) {
        updates.style = 'Ẩm thực đường phố';
      }
      return updates;
    },
  
    getNextQuestion(state) {
      if (!state.destination) {
        return {
          text: 'Bạn muốn đi đâu ở Việt Nam? Có thể gợi ý một vùng hoặc vài thành phố.',
          chips: ['Đà Nẵng – Hội An', 'Quảng Bình – Phong Nha', 'Huế – Đà Nẵng'],
        };
      }
      if (!state.duration) {
        return { text: 'Bạn dự định đi bao nhiêu ngày?', chips: ['3 ngày', '4 ngày', '5–6 ngày'] };
      }
      if (!state.companions) {
        return {
          text: 'Bạn đi cùng ai?',
          chips: ['2 người (cặp đôi)', 'Gia đình có trẻ nhỏ', 'Nhóm bạn', 'Đi một mình (solo)'],
        };
      }
      if (!state.budget) {
        return {
          text: 'Ngân sách ước tính mỗi ngày (ăn uống, tham quan, chưa gồm khách sạn)?',
          chips: ['~2 triệu/ngày', '~3 triệu/ngày', '~5 triệu/ngày'],
        };
      }
      if (!state.style) {
        return {
          text: 'Bạn muốn ưu tiên điều gì nhất trong chuyến đi?',
          chips: ['Văn hóa & di sản', 'Biển & thiên nhiên', 'Ẩm thực đường phố'],
        };
      }
      return null;
    },
  
    acknowledgment(field, value) {
      const msgs = {
        destination: `Tuyệt — ${value} là lựa chọn phổ biến, đặc biệt vào tháng 3–8.`,
        duration: `${value} là khoảng thời gian vừa đủ để khám phá mà không quá vội.`,
        companions: value === 'Đi một mình (solo)'
          ? 'Đã ghi nhận — mình sẽ gợi ý lịch linh hoạt, phù hợp đi một mình (solo).'
          : 'Đã ghi nhận — mình sẽ ưu tiên địa điểm phù hợp với nhóm của bạn.',
        budget: `Ok, mình sẽ gợi ý trong mức ${value}.`,
        style: 'Hiểu rồi — mình sẽ xếp lịch theo hướng này.',
      };
      return msgs[field] || 'Đã cập nhật.';
    },
  
    /** Gợi ý chip nhanh khi chỉnh lịch trên trang Review */
    getItineraryEditChips(trip) {
      const variantId = trip.selectedVariant || 'heritage';
      const days = VinTravelUI.getItineraryDays(variantId, trip);
      const chips = [];
      const overloaded = days.find((d) => d.overloaded && !trip.recoveryApplied);
      if (overloaded) chips.push('Lịch nhẹ hơn ngày 2');
      const removable = VinTravelUI.getRemovableForVariant(variantId);
      removable.slice(0, 2).forEach((r) => chips.push(`Bỏ ${r.name}`));
      if (!chips.length) {
        const busiest = [...days].sort((a, b) => b.activities.length - a.activities.length)[0];
        if (busiest?.activities.length > 2) {
          const last = busiest.activities[busiest.activities.length - 1];
          chips.push(`Bỏ ${last.name}`);
        }
      }
      chips.push('Đổi sang ẩm thực', 'Đổi sang thiên nhiên', 'Hoàn tác');
      return chips.slice(0, 5);
    },
  
    findActivityInItinerary(text, trip) {
      const variantId = trip.selectedVariant || 'heritage';
      const days = VinTravelUI.getItineraryDays(variantId, trip);
      const removed = new Set(trip.removedActivityKeys || []);
      const t = text.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
  
      const aliases = {
        'lang gom': 'Làng gốm Thanh Hà',
        'thanh ha': 'Làng gốm Thanh Hà',
        'an bang': 'Biển An Bàng',
        'my son': 'Thánh địa Mỹ Sơn',
        'chu cau': 'Chùa Cầu & phố cổ',
        'banh mi': 'Bánh mì Phượng',
        'ba na': 'Cáp treo Bà Nà Hills',
        'red bridge': 'Lớp nấu ăn Red Bridge',
      };
  
      for (const day of days) {
        for (const act of day.activities) {
          const key = VinTravelUI.activityKey(day.day, act.name);
          if (removed.has(key)) continue;
          const nameNorm = act.name.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
          if (t.includes(nameNorm) || nameNorm.split(/[\s&,–]+/).some((w) => w.length > 3 && t.includes(w))) {
            return { day: day.day, name: act.name, dayTitle: day.title };
          }
        }
      }
      for (const [alias, fullName] of Object.entries(aliases)) {
        if (t.includes(alias)) {
          for (const day of days) {
            const act = day.activities.find((a) => a.name === fullName);
            if (act && !removed.has(VinTravelUI.activityKey(day.day, act.name))) {
              return { day: day.day, name: act.name, dayTitle: day.title };
            }
          }
        }
      }
      return null;
    },
  
    /**
     * Xử lý tin nhắn chỉnh lịch trình — trả về { reply, chips, needsHistory, statePatch }
     */
    handleItineraryEdit(text, trip) {
      const t = text.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
      const result = { reply: '', chips: null, needsHistory: false, statePatch: {} };
  
      if (t.includes('hoan tac') || t === 'undo') {
        if (VinTravelState.canUndo()) {
          result.reply = 'Đã hoàn tác lần chỉnh sửa gần nhất.';
          result.doUndo = true;
        } else {
          result.reply = 'Chưa có thay đổi nào để hoàn tác.';
        }
        result.chips = this.getItineraryEditChips(trip);
        return result;
      }
  
      if (
        t.includes('nhe hon') || t.includes('qua day') || t.includes('qua tai')
        || t.includes('met') || t.includes('rut gon') || t.includes('bot di')
        || t.includes('lich nhe')
      ) {
        const variantId = trip.selectedVariant || 'heritage';
        const removable = VinTravelUI.getRemovableForVariant(variantId);
        if (removable.length) {
          const keys = removable.map((r) => VinTravelUI.activityKey(r.day, r.name));
          const prev = trip.removedActivityKeys || [];
          result.needsHistory = true;
          result.statePatch = {
            recoveryApplied: true,
            confirmed: false,
            removedActivityKeys: [...new Set([...prev, ...keys])],
          };
          result.reply = `Đã rút gọn lịch — bỏ ${removable.map((r) => r.name).join(' và ')}. Xem cập nhật bên dưới.`;
        } else {
          const days = VinTravelUI.getItineraryDays(variantId, trip);
          const busiest = [...days].sort((a, b) => b.activities.length - a.activities.length)[0];
          const active = busiest.activities.filter(
            (a) => !(trip.removedActivityKeys || []).includes(VinTravelUI.activityKey(busiest.day, a.name))
          );
          if (active.length > 2) {
            const toRemove = active.slice(-2);
            const keys = toRemove.map((a) => VinTravelUI.activityKey(busiest.day, a.name));
            result.needsHistory = true;
            result.statePatch = {
              recoveryApplied: true,
              confirmed: false,
              removedActivityKeys: [...new Set([...(trip.removedActivityKeys || []), ...keys])],
            };
            result.reply = `Ngày ${busiest.day} hơi dày — mình đã bỏ ${toRemove.map((a) => a.name).join(' và ')}.`;
          } else {
            result.reply = 'Lịch hiện tại đã khá nhẹ rồi. Bạn muốn bỏ điểm cụ thể nào?';
          }
        }
        result.chips = this.getItineraryEditChips({ ...trip, ...result.statePatch });
        return result;
      }
  
      const removeMatch = t.match(/(?:bo|xoa|bỏ|xóa|khong di|không đi|skip)\s+(.+)/i)
        || (t.includes('bo ') ? { 1: text.replace(/^.*bo\s+/i, '') } : null);
      if (removeMatch) {
        const query = (removeMatch[1] || text).trim();
        const found = this.findActivityInItinerary(query, trip);
        if (found) {
          const key = VinTravelUI.activityKey(found.day, found.name);
          if ((trip.removedActivityKeys || []).includes(key)) {
            result.reply = `"${found.name}" đã được bỏ khỏi lịch rồi.`;
          } else {
            result.needsHistory = true;
            result.statePatch = {
              confirmed: false,
              removedActivityKeys: [...(trip.removedActivityKeys || []), key],
              recoveryApplied: true,
            };
            result.reply = `Đã bỏ "${found.name}" (${found.dayTitle}). Lịch trình cập nhật bên dưới.`;
          }
        } else {
          result.reply = 'Mình chưa tìm thấy hoạt động đó trong lịch. Thử gõ tên địa điểm cụ thể, ví dụ "Bỏ Làng gốm Thanh Hà".';
          result.chips = this.getItineraryEditChips(trip);
        }
        return result;
      }
  
      const styleMap = {
        'an uong': { style: 'Ẩm thực đường phố', variant: 'food' },
        'am thuc': { style: 'Ẩm thực đường phố', variant: 'food' },
        'thien nhien': { style: 'Biển & thiên nhiên', variant: 'nature' },
        'bien': { style: 'Biển & thiên nhiên', variant: 'nature' },
        'di san': { style: 'Văn hóa & di sản', variant: 'heritage' },
        'van hoa': { style: 'Văn hóa & di sản', variant: 'heritage' },
        'phong nha': { style: '', variant: 'qbqt' },
        'dmz': { style: '', variant: 'qbqt' },
      };
      if (t.includes('doi sang') || t.includes('đổi sang') || t.includes('chuyen sang')) {
        for (const [key, cfg] of Object.entries(styleMap)) {
          if (t.includes(key)) {
            result.needsHistory = true;
            result.statePatch = {
              selectedVariant: cfg.variant,
              draftItinerary: cfg.variant,
              style: cfg.style || trip.style,
              customItinerary: null,
              customPoi: null,
              poiReported: false,
              removedActivityKeys: [],
              recoveryApplied: false,
              confirmed: false,
            };
            const v = MOCK_DATA.variants.find((x) => x.id === cfg.variant);
            result.reply = `Đã chuyển sang phương án "${v?.title || cfg.variant}". Lịch trình mới hiển thị bên dưới.`;
            result.chips = this.getItineraryEditChips({ ...trip, ...result.statePatch });
            return result;
          }
        }
      }
  
      const meta = this.parseUserInput(text);
      if (Object.keys(meta).length) {
        result.needsHistory = true;
        result.statePatch = { ...meta, confirmed: false };
        const field = Object.keys(meta)[0];
        result.reply = this.acknowledgment(field, meta[field]) + ' Thông tin chuyến đi đã cập nhật.';
        if (meta.style) {
          const rec = VinTravelUI.getRecommendedVariantId({ ...trip, ...meta });
          result.statePatch.selectedVariant = rec;
          result.statePatch.draftItinerary = rec;
          result.statePatch.customItinerary = null;
          result.statePatch.customPoi = null;
          result.statePatch.removedActivityKeys = [];
          result.reply += ` Mình cũng gợi ý phương án "${MOCK_DATA.variants.find((v) => v.id === rec)?.title || rec}".`;
        }
        result.chips = this.getItineraryEditChips({ ...trip, ...result.statePatch });
        return result;
      }
  
      if (t.includes('them') || t.includes('thêm')) {
        result.reply = 'Thêm điểm mới cần xác nhận thời gian — hiện mình có thể bỏ hoạt động, làm nhẹ lịch, hoặc đổi phương án. Bạn muốn thử cách nào?';
        result.chips = this.getItineraryEditChips(trip);
        return result;
      }
  
      result.reply = 'Mình có thể: <strong>bỏ</strong> một điểm (VD: "Bỏ Làng gốm"), <strong>làm nhẹ lịch</strong>, hoặc <strong>đổi phương án</strong> (VD: "Đổi sang ẩm thực"). Bạn muốn chỉnh gì?';
      result.chips = this.getItineraryEditChips(trip);
      return result;
    },
  };
  
  if (typeof module !== 'undefined') module.exports = VinTravelAI;
  