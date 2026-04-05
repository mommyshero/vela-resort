# 🤖 Vela Resort Self-Improving Agent

## Agent Identity

**Name:** Vela Agent  
**Version:** 1.0.0  
**Purpose:** Automated management and improvement of Vela Resort website and booking system  
**Model:** Qwen 7B (Ollama)  

---

## 🎯 Core Capabilities

### 1. Website Management
- Update room pricing and availability
- Modify tour packages and pricing
- Fix HTML/CSS/JavaScript issues
- Optimize mobile responsiveness
- Update seasonal promotions

### 2. Booking System
- Monitor new bookings
- Validate booking data
- Check room availability conflicts
- Sync bookings across platforms (website, BOH, localStorage)

### 3. Back Office (BOH) Support
- Manage petty cash entries
- Track accounting categories
- Generate financial reports
- Sync petty cash with general ledger

### 4. Database Management
- Manage localStorage data structure
- Import/export booking data
- Backup and restore data
- Data validation and cleanup

### 5. Self-Improvement
- Learn from user corrections
- Track common issues and solutions
- Optimize responses over time
- Maintain knowledge base

---

## 📚 Knowledge Base

### Room Types
```json
{
  "hytte": {
    "name_th": "Hytte",
    "name_en": "Hytte",
    "quantity": 5,
    "type": "Riverside Cabin",
    "capacity": 2,
    "features": ["TV", "Hair Dryer", "Refrigerator", "Hot Water", "AC", "Balcony", "WiFi", "Breakfast"]
  },
  "hus": {
    "name_th": "Hus",
    "name_en": "Hus",
    "quantity": 1,
    "type": "Family Cabin",
    "capacity": 4,
    "features": ["TV", "Hair Dryer", "Refrigerator", "Hot Water", "AC", "Balcony", "WiFi", "Breakfast"]
  }
}
```

### Pricing Structure
```json
{
  "seasons": {
    "summer_rainy": {
      "name_th": "ฤดูร้อนและฤดูฝน",
      "name_en": "Summer & Rainy Season",
      "months": "March - September"
    },
    "high_season": {
      "name_th": "High Season",
      "name_en": "High Season (Winter)",
      "months": "October - February"
    }
  },
  "hytte": {
    "summer_rainy": { "weekday": 750, "weekend": 950 },
    "high_season": { "weekday": 1250, "weekend": 1500 }
  },
  "hus": {
    "summer_rainy": { "weekday": 1200, "weekend": 1800 },
    "high_season": { "weekday": 2100, "weekend": 2500 }
  }
}
```

### Tour Packages (6 Tours)
```json
[
  {
    "id": 1,
    "name_th": "VIP ทีลอซู 1 วัน",
    "name_en": "VIP Thi Lo Su 1 Day",
    "pricing": { "1-6": 5800, "7-10": 8300, "11-12": 10800, "13-15": 13800 }
  },
  {
    "id": 2,
    "name_th": "VIP ทีลอซู-โคะทะ 1 วัน",
    "name_en": "VIP Thi Lo Su-Khota 1 Day",
    "pricing": { "1-6": 7500, "7-10": 10000, "11-12": 12500, "13-15": 15500 }
  },
  {
    "id": 3,
    "name_th": "VIP ทีลอซู - Join Trip",
    "name_en": "VIP Thi Lo Su - Join Trip",
    "pricing": { "per_person": 2100 }
  },
  {
    "id": 4,
    "name_th": "รถ 4x4 ทีลอซู",
    "name_en": "4x4 Vehicle Thi Lo Su",
    "pricing": { "1-10": 2500 }
  },
  {
    "id": 5,
    "name_th": "รถ 4x4 ออนเซ็น",
    "name_en": "4x4 Vehicle Onsen",
    "pricing": { "1-5": 1850, "6-10": 2500 }
  },
  {
    "id": 6,
    "name_th": "ดอยหัวหมด",
    "name_en": "Doi Hua Mot",
    "pricing": { "1-5": 1000, "6-10": 1500 }
  }
]
```

### Petty Cash Categories (BOH)
```json
[
  { "id": "food", "name": "🍽️ อาหาร" },
  { "id": "maintenance", "name": "🔧 ซ่อมบำรุง" },
  { "id": "supplies", "name": "🧻 ของใช้" },
  { "id": "tour", "name": "🎫 ตั๋วท่องเที่ยว" },
  { "id": "utilities", "name": "💡 สาธารณูปโภค" },
  { "id": "labor", "name": "👷 แรงงาน" },
  { "id": "office", "name": "📄 สำนักงาน" },
  { "id": "tax", "name": "📄 ภาษี" },
  { "id": "capital", "name": "💵 เงินเติม" },
  { "id": "petty_cash_topup", "name": "💰 เติม Petty Cash (จาก Budget)" }
]
```

---

## 🔧 File Structure

```
vela-resort/
├── index.html              # Main website (Thai)
├── index-en.html           # Main website (English)
├── boh.html                # Back Office System
├── update-database.js      # Database update script
├── update-db.html          # Database update UI
├── VELA-AGENT.md           # This file - Agent knowledge base
├── config.json             # Configuration
└── memory/
    └── agent-memory.json   # Agent learning memory
```

---

## 🧠 Self-Improvement Mechanism

### Learning Loop
1. **Observe** - Monitor user requests and corrections
2. **Analyze** - Identify patterns and common issues
3. **Update** - Modify knowledge base and responses
4. **Validate** - Confirm changes with user
5. **Store** - Save learnings to memory file

### Memory Structure
```json
{
  "learnings": [],
  "common_issues": [],
  "user_preferences": {},
  "last_updated": "2026-03-17T00:00:00+08:00",
  "version": "1.0.0"
}
```

---

## 📋 Standard Operating Procedures

### SOP-001: Update Tour Pricing
1. Locate tour dropdown in index.html and index-en.html
2. Update `<option>` elements with new prices
3. Update `tourPricing` JavaScript object
4. Validate changes with user
5. Test in browser

### SOP-002: Add New Room Type
1. Add room card HTML to rooms section
2. Add pricing structure to JavaScript
3. Update availability checking logic
4. Add to booking modal options
5. Test booking flow

### SOP-003: Fix BOH Category
1. Locate petty cash category dropdown
2. Add/modify category option
3. Update accounting sync logic if needed
4. Test in BOH interface

### SOP-004: Database Backup
1. Export localStorage data
2. Save to backup file with timestamp
3. Verify backup integrity
4. Store in backup location

---

## 🚀 Commands

### Agent Commands (for Ollama)
```
/vela status          - Show current system status
/vela tours           - List all tour packages
/vela rooms           - List room types and pricing
/vela backup          - Create database backup
/vela update [file]   - Update specific file
/vela learn [topic]   - Add new knowledge
/vela fix [issue]     - Fix reported issue
```

---

## 📞 Contact & Support

**Resort:** Vela Resort Umphang  
**Location:** Umphang District, Tak Province, Thailand  
**Phone:** 098-908-4356  
**Email:** vela.umphang@gmail.com  
**Website:** https://vela-resort.com  

---

## 📝 Change Log

| Date | Version | Change |
|------|---------|--------|
| 2026-03-17 | 1.0.0 | Initial agent creation |
| 2026-03-17 | 1.0.1 | Added VIP Thi Lo Su-Khota tour |
| 2026-03-17 | 1.0.2 | Added petty cash topup category |

---

*This agent is designed to be self-improving. Update this file as the agent learns and evolves.*
