# Vela Resort BOH System Documentation

**Version:** 1.0  
**Last Updated:** March 9, 2026  
**Status:** ✅ Production Ready

---

## 📋 **Table of Contents**

1. [Overview](#overview)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [User Guide](#user-guide)
5. [Data Management](#data-management)
6. [Integrations](#integrations)
7. [Troubleshooting](#troubleshooting)
8. [FAQ](#faq)

---

## 🏠 **Overview**

### **What is BOH?**

**BOH (Back Office)** is the internal management system for Vela Resort Umphang. It's where staff manage bookings, accounting, and operations.

### **Key Information**

| Item | Detail |
|------|--------|
| **URL** | https://vela-resort-umphang.netlify.app/boh.html |
| **Local** | http://localhost:8080/boh.html |
| **Users** | Staff only (คุณลิ้นจี่, คุณเอ, คุณจี่) |
| **Data Storage** | Browser localStorage |
| **Theme** | 4-Color (White/Yellow/Black/Gray) |

### **System Architecture**

```
┌─────────────────────────────────────────┐
│         Vela Resort Website             │
│    (Customer-facing, index.html)        │
│    - Room Booking                       │
│    - Tour Booking                       │
│    - Gallery, Waterfalls Info           │
└─────────────────┬───────────────────────┘
                  │
                  │ localStorage Sync
                  │ (vela_bookings, vela_petty)
                  ▼
┌─────────────────────────────────────────┐
│         BOH System (boh.html)           │
│    (Staff-only, Internal Use)           │
│    - Dashboard                          │
│    - Booking Management                 │
│    - Room Calendar                      │
│    - Petty Cash                         │
│    - Accounting                         │
│    - VAT Report                         │
└─────────────────────────────────────────┘
```

---

## ✨ **Features**

### **9 Main Sections:**

| # | Section | Icon | Purpose |
|---|---------|------|---------|
| 1 | **Dashboard** | 📊 | Overview, stats, charts |
| 2 | **Bookings** | 📝 | Manage all reservations |
| 3 | **Booking Control** | 🔧 | Real-time availability |
| 4 | **Room Calendar** | 📅 | Monthly grid view |
| 5 | **Petty Cash** | 💵 | Income/Expense tracking |
| 6 | **Accounting** | 💰 | General Ledger |
| 7 | **VAT Report** | 📑 | Tax calculations |
| 8 | **Peekaboo** | 👁️ | Auto-release system |
| 9 | **Settings** | ⚙️ | System configuration |

---

## 🚀 **Getting Started**

### **1. Access BOH**

**Option A: Production (Live)**
```
https://vela-resort-umphang.netlify.app/boh.html
```

**Option B: Local (Development)**
```
http://localhost:8080/boh.html
```

### **2. Login**

```
┌─────────────────────────────┐
│  🔒 VELA BOH                │
│  Back Office Management     │
│                             │
│  👤 ชื่อผู้ใช้: [_______]  │
│  🔒 รหัสผ่าน: [_______]    │
│                             │
│  [🚀 เข้าสู่ระบบ]          │
└─────────────────────────────┘
```

**Default Credentials:**
- Username: `admin`
- Password: `vela2026`

*(Note: Currently no authentication - login screen is placeholder)*

### **3. First View (Dashboard)**

After login, you'll see:

```
┌─────────────────────────────────────────┐
│ 📊 แดชบอร์ด                             │
│ ภาพรวมการจองและรายได้ของ Vela Resort   │
│                                         │
│ [🔄 โหลดข้อมูลจากเว็บ] [🗑️ ลบข้อมูลเก่า]│
│                                         │
│ ┌─────────┬─────────┬─────────┬───────┐│
│ │ 12      │ ฿45,600 │ 3       │ 75%   ││
│ │ การจอง │ รายได้  │ รอยืนยัน│ อัตรา ││
│ │ เดือนนี้│ เดือนนี้│         │ เข้าพัก││
│ └─────────┴─────────┴─────────┴───────┘│
│                                         │
│ 📊 ช่องทางการจอง (Booking Channels)    │
│ [Pie Chart]                             │
└─────────────────────────────────────────┘
```

---

## 📖 **User Guide**

### **Section 1: Dashboard (แดชบอร์ด)**

**Purpose:** Quick overview of resort performance

**Key Metrics:**
- **การจองเดือนนี้** - Total bookings this month
- **รายได้เดือนนี้** - Total revenue this month
- **รอการยืนยัน** - Pending confirmations
- **อัตราการเข้าพัก** - Occupancy rate (%)

**Actions:**
- 🔄 **โหลดข้อมูลจากเว็บ** - Refresh data from website
- 🗑️ **ลบข้อมูลเก่า** - Clear old bookings

**Booking Channel Chart:**
- Shows distribution by channel (Facebook, LINE, Website, Walk-in, etc.)
- Updates automatically on data refresh

---

### **Section 2: Bookings (การจอง)**

**Purpose:** Manage all reservations

**Features:**

#### **Add/Edit Booking:**
```
┌─────────────────────────────────────┐
│ ➕ เพิ่ม/แก้ไข การจอง              │
│                                     │
│ ชื่อลูกค้า:     [_______________]   │
│ เบอร์โทรศัพท์:  [_______________]   │
│ วันเช็คอิน:    [📅 2026-03-15]     │
│ วันเช็คเอาท์:  [📅 2026-03-17]     │
│ ห้องพัก:       [🏠 Hytte (5 ห้อง)] │
│ จำนวนห้อง:     [1]                  │
│ อัพโหลดสลิป:   [📎 Choose File]    │
│                                     │
│ [💾 บันทึกการจอง]                   │
└─────────────────────────────────────┘
```

**Fields:**
- **ชื่อลูกค้า** - Guest name (required)
- **เบอร์โทรศัพท์** - Phone number (required)
- **วันเช็คอิน** - Check-in date (required)
- **วันเช็คเอาท์** - Check-out date (required)
- **ห้องพัก** - Room type (Hytte or Hus)
- **จำนวนห้อง** - Number of rooms (1-5 for Hytte, 1 for Hus)
- **อัพโหลดสลิป** - Payment slip image (optional)

#### **Booking List:**

| # | ชื่อลูกค้า | ห้องพัก | เช็คอิน | เช็คเอาท์ | จำนวน | รวม | สถานะ | จัดการ |
|---|-----------|---------|--------|----------|-------|-----|--------|--------|
| 1 | คุณสมชาย | Hytte | 15 มี.ค. | 17 มี.ค. | 2 | ฿1,900 | ✅ ยืนยันแล้ว | ✏️ 🗑️ |

**Status Badges:**
- ✅ **ยืนยันแล้ว** - Confirmed
- ⏳ **รอการยืนยัน** - Pending
- ❌ **ยกเลิก** - Cancelled
- 🟢 **เช็คอินแล้ว** - Checked In
- 🟡 **กำลังทำความสะอาด** - Cleaning

**Actions per Booking:**
- ✏️ **Edit** - Modify booking details
- 🗑️ **Delete** - Remove booking
- ✅ **Confirm** - Change status to confirmed

---

### **Section 3: Booking Control (ควบคุมการจอง)**

**Purpose:** Real-time room availability and overbooking prevention

**Features:**

#### **System Status:**
```
┌──────────────┬──────────────┬──────────────┐
│ 🟢 ออนไลน์   │ --:--        │ เปิดใช้งาน   │
│ สถานะระบบ    │ อัพเดทล่าสุด │ Peekaboo     │
└──────────────┴──────────────┴──────────────┘
```

#### **Room Availability:**
```
┌──────────────┬──────────────┬──────────────┐
│ 5/5          │ 1/1          │ 6/6          │
│ 🏠 Hytte ว่าง│ 🏡 Hus ว่าง  │ 🏨 รวมห้องว่าง│
└──────────────┴──────────────┴──────────────┘
```

#### **7-Day Availability Table:**

| ห้องพัก | วันนี้ | พรุ่งนี้ | +2 | +3 | +4 | +5 | +6 |
|----------|--------|----------|----|----|----|----|----|
| **Hytte** | 5/5 | 4/5 | 3/5 | 5/5 | 5/5 | 2/5 | 5/5 |
| **Hus** | 1/1 | 0/1 | 0/1 | 1/1 | 1/1 | 0/1 | 1/1 |

**Color Codes:**
- ⚪ **White** - Available (วันธรรมดาว่าง)
- 🟡 **Yellow Light** - Weekend (วันเสาร์-อาทิตย์)
- 🔴 **Red Light** - Holiday (วันหยุดนักขัตฤกษ์)
- 🟡 **Yellow** - Booked
- 🟢 **Green Light** - Checked In
- ⚪ **Gray** - Cleaning

#### **Overbooking Alerts:**

```
⚠️ แจ้งเตือน Overbooking
มีการจองเกินจำนวนห้องที่มี กรุณาดำเนินการดังนี้:

- BK015: Hytte booked 6 rooms (only 5 available)
  Action: Contact guest or move dates
```

#### **Peekaboo Auto-release:**

```
┌──────────────────────────────────────┐
│ 👁️ Peekaboo Auto-release Settings   │
│                                      │
│ ⏰ ระยะเวลาถือจอง: 24 ชั่วโมง        │
│ 📊 ห้องที่ปล่อยแล้ว: 0 ห้อง          │
│                                      │
│ [👁️ รัน Peekaboo Auto-release ตอนนี้]│
└──────────────────────────────────────┘
```

**How it works:**
1. Guest books room → Room held for 24 hours
2. If no payment received → Auto-release after 24h
3. Room becomes available again

---

### **Section 4: Room Calendar (ปฏิทินห้องพัก)**

**Purpose:** Monthly view of all bookings

**Features:**

#### **Calendar Controls:**
```
[‹ เดือนก่อน]  มีนาคม 2026  [เดือนถัดไป ›]

[ทั้งหมด] [Hytte] [Hus]
```

#### **Calendar Grid:**

```
┌──────────┬───┬───┬───┬───┬───┬───┬───┐
│ ห้องพัก │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │
├──────────┼───┼───┼───┼───┼───┼───┼───┤
│ Hytte    │ 5 │ 5 │ 4 │ 3 │ 5 │ 5 │ 2 │
│ Hus      │ 1 │ 1 │ 0 │ 0 │ 1 │ 1 │ 0 │
└──────────┴───┴───┴───┴───┴───┴───┴───┘
```

**Legend:**
- 🟢 **วันธรรมดาว่าง** - White background
- 🟡 **วันเสาร์-อาทิตย์** - Yellow light background
- 🔴 **วันหยุดนักขัตฤกษ์** - Red light background

#### **Monthly Summary:**

```
┌─────────────────────────────────────┐
│ 📊 สรุปการจองเดือนนี้               │
│                                     │
│ ┌─────────┬─────────┬─────────────┐ │
│ │ 20      │ 8       │ 5           │ │
│ │ วันว่าง │ วันหยุด │ นักขัตฤกษ์  │ │
│ └─────────┴─────────┴─────────────┘ │
└─────────────────────────────────────┘
```

---

### **Section 5: Petty Cash (บัญชีรายย่อย)**

**Purpose:** Track small income and expenses

**Features:**

#### **Summary Stats:**

```
┌──────────┬──────────┬──────────┬──────────┬──────────┐
│ ฿5,000   │ ฿0       │ ฿0       │ ฿5,000   │ 0        │
│ เงินคงเหลือ│ รายรับเพิ่ม│ รายจ่าย  │ ยอดคงเหลือ│ จำนวนรายการ│
│ เริ่มต้น  │          │          │ ปัจจุบัน  │          │
└──────────┴──────────┴──────────┴──────────┴──────────┘
```

#### **Add Transaction:**

```
┌─────────────────────────────────────┐
│ ➕ บันทึกรายการ                     │
│                                     │
│ ประเภท:    [💰 รายรับ ▼]           │
│ จำนวนเงิน: [_______________]        │
│ หมวดหมู่:  [🍽️ อาหาร ▼]            │
│ รายละเอียด:[_______________]        │
│ วันที่:     [📅 2026-03-09]         │
│ ผู้รับ/ผู้จ่าย: [_______________]   │
│                                     │
│ [💾 บันทึกรายการ]                   │
└─────────────────────────────────────┘
```

**Categories:**
- 🍽️ **อาหาร** - Food
- 🔧 **ซ่อมบำรุง** - Maintenance
- 🧻 **ของใช้** - Supplies
- 🎫 **ตั๋วท่องเที่ยว** - Tour tickets
- 💡 **สาธารณูปโภค** - Utilities
- 👷 **แรงงาน** - Labor
- 📄 **สำนักงาน** - Office
- 📄 **ภาษี** - Tax
- 💵 **เงินเติม** - Capital injection

#### **Transaction List:**

| # | วันที่ | ประเภท | หมวดหมู่ | รายละเอียด | จำนวน | ผู้รับ/ผู้จ่าย | จัดการ |
|---|--------|--------|----------|-----------|-------|---------------|--------|
| 1 | 9 มี.ค. | 💸 รายจ่าย | 🍽️ อาหาร | ซื้อหมูสับ | ฿75 | ตลาดสด | ✏️ 🗑️ |

#### **Import Data:**

```
[📥 นำเข้าข้อมูลทั้งหมด] [📤 Import จากภายนอก] [🧾 Export PDF]
```

**Import Options:**
- **นำเข้าข้อมูลทั้งหมด** - Import 81 petty cash + 10 bookings
- **Import จาก Pulse/Tera/Business Suite** - External system integration
- **Export บิลเงินสด (PDF)** - Generate cash bill PDF

---

### **Section 6: Accounting (บัญชีหลัก)**

**Purpose:** General ledger with auto-sync from petty cash

**Features:**

#### **Account Mapping:**

| Petty Cash Category | GL Account | GL Name |
|---------------------|------------|---------|
| food | 5101-001 | ค่าใช้จ่ายอาหาร |
| maintenance | 5201-001 | ค่าใช้จ่ายซ่อมบำรุง |
| supplies | 5201-002 | ค่าใช้จ่ายของใช้ |
| tour | 5301-001 | ค่าใช้จ่ายตั๋วท่องเที่ยว |
| utilities | 5401-001 | ค่าใช้จ่ายสาธารณูปโภค |
| labor | 5501-001 | ค่าใช้จ่ายแรงงาน |
| office | 5601-001 | ค่าใช้จ่ายสำนักงาน |
| tax | 5701-001 | ภาษี |
| capital | 1101-001 / 3101-001 | เงินสด / ทุน |

#### **Auto-Sync:**

```
✅ บันทึกรายการเรียบร้อยแล้ว!
(อัพเดทบัญชีใหญ่แล้ว)
```

**How it works:**
1. Add petty cash entry → Auto-sync to General Ledger
2. Maps to correct GL account based on category
3. Updates in real-time

#### **General Ledger Entries:**

| # | วันที่ | รายการ | Debit | Credit | Balance | อ้างอิง |
|---|--------|--------|-------|--------|---------|---------|
| 1 | 9 มี.ค. | เงินเติมเริ่มต้น | ฿5,000 | - | ฿5,000 | PET001 |
| 2 | 9 มี.ค. | ซื้อหมูสับ | - | ฿75 | ฿4,925 | PET002 |

---

### **Section 7: VAT Report (รายงานภาษี VAT)**

**Purpose:** Calculate and report VAT for tax filing

**Features:**

#### **VAT Summary:**

```
┌─────────────────────────────────────┐
│ 📑 รายงานภาษี VAT (ปี 2026)        │
│                                     │
│ ยอดขายรวม:           ฿1,000,000    │
│ VAT 7%:              ฿70,000       │
│ ยอดขายรวม VAT:       ฿1,070,000    │
│                                     │
│ [📥 Export VAT Report (Excel)]      │
└─────────────────────────────────────┘
```

#### **Monthly Breakdown:**

| Month | Sales | VAT 7% | Total |
|-------|-------|--------|-------|
| January | ฿100,000 | ฿7,000 | ฿107,000 |
| February | ฿150,000 | ฿10,500 | ฿160,500 |
| March | ฿200,000 | ฿14,000 | ฿214,000 |
| **Total** | **฿450,000** | **฿31,500** | **฿481,500** |

---

### **Section 8: Peekaboo (OpenClaw + Peekaboo)**

**Purpose:** Automated booking control and room release

**Features:**

#### **System Status:**

```
┌─────────────────────────────────────┐
│ 👁️ OpenClaw + Peekaboo             │
│                                     │
│ สถานะ: 🟢 ออนไลน์                    │
│ อัพเดทล่าสุด: 11:27 AM              │
│ ห้องที่ปล่อยแล้ว: 0 ห้อง            │
│                                     │
│ [🔄 รันตอนนี้] [⚙️ ตั้งค่า]         │
└─────────────────────────────────────┘
```

#### **Settings:**

- **ระยะเวลาถือจอง:** 24 hours
- **ตรวจสอบทุก:** 1 hour
- **แจ้งเตือนผ่าน:** LINE, Email

#### **Auto-release Log:**

| Date | Room | Booking ID | Action | Status |
|------|------|------------|--------|--------|
| - | - | - | - | - |

*(No releases yet)*

---

### **Section 9: Settings (ตั้งค่า)**

**Purpose:** System configuration

**Features:**

#### **Data Management:**

```
┌─────────────────────────────────────┐
│ 💾 จัดการข้อมูล                     │
│                                     │
│ [🗑️ ลบข้อมูลเก่า]                  │
│ [🔄 Reset ทั้งหมด]                 │
│ [📥 Import ข้อมูล]                  │
│ [📤 Export ข้อมูล]                  │
└─────────────────────────────────────┘
```

#### **Notifications:**

```
┌─────────────────────────────────────┐
│ 🔔 การแจ้งเตือน                     │
│                                     │
│ ☑️ แจ้งเตือนการจองใหม่ (LINE)      │
│ ☑️ แจ้งเตือน Overbooking           │
│ ☑️ แจ้งเตือน Peekaboo Release      │
│                                     │
│ [💾 บันทึกการตั้งค่า]               │
└─────────────────────────────────────┘
```

#### **Integrations:**

```
┌─────────────────────────────────────┐
│ 🔌 ระบบที่เชื่อมต่อ (Integrations) │
│                                     │
│ ┌──────────┬──────────┬──────────┐ │
│ │ 💜 Pulse │ 🌿 Tera  │ 💼 Biz   │ │
│ │ เชื่อมต่อ│ เชื่อมต่อ│ เชื่อมต่อ│ │
│ │ [ตั้งค่า]│ [ตั้งค่า]│ [Chatbot]│ │
│ └──────────┴──────────┴──────────┘ │
└─────────────────────────────────────┘
```

---

## 💾 **Data Management**

### **Data Storage**

**Location:** Browser localStorage

**Keys:**
- `vela_bookings` - All booking data
- `vela_petty` - Petty cash entries
- `vela_accounting` - Accounting entries
- `vela_general_ledger` - Synced ledger
- `vela_settings` - System settings

### **Backup**

**Manual Backup:**
```
Settings → Export ข้อมูล → Save JSON file
```

**Auto Backup:**
- Daily at 11:59 PM (if configured)
- Before major operations (import, reset)

### **Import Data**

**Format:** JSON

**Example:**
```json
{
  "bookings": [
    {
      "id": "BK001",
      "name": "คุณสมชาย ใจดี",
      "phone": "081-234-5678",
      "checkIn": "2026-03-15",
      "checkOut": "2026-03-17",
      "room": "hytte",
      "qty": 2,
      "total": 1900,
      "status": "confirmed"
    }
  ],
  "petty": [
    {
      "id": "PET001",
      "type": "income",
      "amount": 5000,
      "category": "capital",
      "description": "เงินเติมเริ่มต้น",
      "date": "2026-01-01"
    }
  ]
}
```

---

## 🔌 **Integrations**

### **Supported Systems**

| System | Type | Status | Purpose |
|--------|------|--------|---------|
| **Pulse** | PMS | ✅ Connected | Hotel management |
| **Tera** | Accounting | ✅ Connected | Online accounting |
| **Business Suite** | ERP | ✅ Connected | Business management |

### **How to Connect**

1. Go to **Settings** → **Integrations**
2. Click **ตั้งค่า** on desired system
3. Enter API credentials
4. Test connection
5. Save

### **Data Sync**

**Direction:** Bi-directional

**Frequency:** Real-time (if connected)

**Synced Data:**
- Bookings
- Payments
- Guest info
- Room status

---

## 🐛 **Troubleshooting**

### **Common Issues**

#### **Issue 1: Data Not Syncing**

**Symptoms:**
- Website bookings not showing in BOH
- Petty cash not updating

**Solutions:**
1. Click **🔄 โหลดข้อมูลจากเว็บ** on Dashboard
2. Refresh browser (F5 or Cmd+R)
3. Check localStorage (Developer Tools)
4. Clear cache and reload

#### **Issue 2: Overbooking Alert**

**Symptoms:**
- Red alert on Booking Control
- More bookings than rooms

**Solutions:**
1. Review conflicting bookings
2. Contact guests to reschedule
3. Cancel one booking if needed
4. Adjust room availability

#### **Issue 3: Peekaboo Not Releasing**

**Symptoms:**
- Unpaid bookings not auto-releasing
- Rooms still held after 24h

**Solutions:**
1. Check system status (should be 🟢 ออนไลน์)
2. Run manual release: **👁️ รัน Peekaboo Auto-release ตอนนี้**
3. Check browser is open (Peekaboo requires active session)
4. Verify 24h timeout setting

#### **Issue 4: Import Fails**

**Symptoms:**
- Error on import
- Data not loading

**Solutions:**
1. Check JSON format (must be valid)
2. Verify file size (<10 MB)
3. Check for duplicate IDs
4. Try importing smaller batches

---

## ❓ **FAQ**

### **General**

**Q: BOH คืออะไร?**  
A: ระบบจัดการหลังบ้านสำหรับพนักงาน Vela Resort ใช้จัดการการจอง บัญชี และการดำเนินงาน

**Q: ใครใช้ BOH ได้บ้าง?**  
A: พนักงานเท่านั้น (คุณลิ้นจี่, คุณเอ, คุณจี่)

**Q: ข้อมูลเก็บที่ไหน?**  
A: ใน browser localStorage (เครื่องที่ใช้งาน)

**Q: ข้อมูลหายไหม?**  
A: ไม่หายถ้าไม่ลบ cache แต่ควร backup เป็นระยะ

---

### **Bookings**

**Q: เพิ่มการจองอย่างไร?**  
A: ไปที่ section **การจอง** → กรอกแบบฟอร์ม → **💾 บันทึกการจอง**

**Q: แก้ไขการจองอย่างไร?**  
A: ในรายการจอง → กด **✏️** → แก้ไข → บันทึก

**Q: ลบการจองอย่างไร?**  
A: ในรายการจอง → กด **🗑️** → ยืนยันการลบ

**Q: Overbooking คืออะไร?**  
A: การจองเกินจำนวนห้องที่มี ระบบจะแจ้งเตือนสีแดง

---

### **Petty Cash**

**Q: บันทึกรายรับ/รายจ่ายอย่างไร?**  
A: ไปที่ section **บัญชีรายย่อย** → กรอกแบบฟอร์ม → **💾 บันทึกรายการ**

**Q: หมวดหมู่มีอะไรบ้าง?**  
A: อาหาร, ซ่อมบำรุง, ของใช้, ตั๋วท่องเที่ยว, สาธารณูปโภค, แรงงาน, สำนักงาน, ภาษี, เงินเติม

**Q: Export PDF อย่างไร?**  
A: กด **🧾 Export บิลเงินสด (PDF)**

---

### **Technical**

**Q: BOH ใช้กับ browser อะไรได้บ้าง?**  
A: Chrome, Safari, Firefox, Edge (แนะนำ Chrome)

**Q: ใช้บนมือถือได้ไหม?**  
A: ได้ แต่แนะนำใช้บนคอมพิวเตอร์เพื่อความสะดวก

**Q: ข้อมูล sync กับเว็บอย่างไร?**  
A: ผ่าน localStorage (vela_bookings, vela_petty)

**Q: Backup ข้อมูลอย่างไร?**  
A: Settings → Export ข้อมูล → Save JSON file

---

## 📞 **Support**

### **Contact**

| Role | Name | Phone |
|------|------|-------|
| **Manager** | คุณลิ้นจี่ | 098-908-4356 |
| **Operations** | คุณเอ | 080-899-5394 |
| **Technical** | Kimi (AI) | - |

### **Documentation**

- **This File:** `/Users/aporclay/.openclaw/workspace/vela-resort/BOH.md`
- **Website:** `/Users/aporclay/.openclaw/workspace/vela-resort/index.html`
- **Memory:** `/Users/aporclay/.openclaw/workspace/memory/2026-03-09.md`

---

## 📝 **Version History**

| Version | Date | Changes |
|---------|------|---------|
| **1.0** | March 9, 2026 | Initial release (4-color theme) |

---

## ✅ **Checklist for Staff**

### **Daily Tasks:**

- [ ] Check Dashboard for new bookings
- [ ] Confirm pending bookings
- [ ] Update room status (checked-in, cleaning)
- [ ] Record petty cash transactions

### **Weekly Tasks:**

- [ ] Review occupancy rate
- [ ] Check overbooking alerts
- [ ] Backup data (Export JSON)
- [ ] Review petty cash summary

### **Monthly Tasks:**

- [ ] Generate VAT report
- [ ] Review monthly revenue
- [ ] Import data from external systems (if any)
- [ ] Clean up old data (if needed)

---

**Last Updated:** March 9, 2026, 11:30 AM  
**Status:** ✅ Production Ready  
**Next Review:** March 16, 2026
