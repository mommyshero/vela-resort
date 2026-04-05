# 🤖 Vela Resort Agent Automation System Design

**วันที่:** 9 มีนาคม 2026  
**ผู้จัดทำ:** คุณไค (CTO)  
**สถานะ:** ✅ เสร็จสมบูรณ์

---

## 📋 สรุปผู้บริหาร (Executive Summary)

หลังจากวิเคราะห์ความต้องการของ Vela Resort Umphang สำหรับระบบ Automation เพื่อจัดการ:
- ✅ Sync การจองจาก Booking.com, Agoda, Traveloka
- ✅ แจ้งเตือน LINE เมื่อมีการจองใหม่
- ✅ Peekaboo Auto-release (ปล่อยห้องที่ไม่ชำระเงินภายใน 24 ชม.)
- ✅ รายงานประจำวัน/สัปดาห์/เดือน
- ✅ Backup ข้อมูลอัตโนมัติ

**✅ คำแนะนำ: ใช้ OpenClaw Agents (ทางเลือก A)**

เหตุผลหลัก:
1. **ประหยัดค่าใช้จ่าย** - ไม่ต้องจ่ายค่า server/add-on รายเดือน
2. **ยืดหยุ่นสูง** - เขียน logic อะไรก็ได้ด้วย JavaScript/Python
3. **ใช้งาน hardware ที่มี** - ใช้ Mac mini ที่เปิดอยู่แล้ว
4. **Data Privacy** - ข้อมูลอยู่ภายใน ไม่ส่งออกนอก

---

## 🔍 เปรียบเทียบ 2 ทางเลือก

### ทางเลือก A: OpenClaw Agents (Sub-agents + Scheduled Tasks)

```
┌─────────────────────────────────────────────────────────┐
│              Vela Resort Mac mini (Local)               │
│  ┌─────────────────────────────────────────────────┐   │
│  │           OpenClaw Gateway (รัน 24/7)            │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────┐ │   │
│  │  │  Booking    │  │   Peekaboo  │  │ Report  │ │   │
│  │  │  Sync Agent │  │   Agent     │  │  Agent  │ │   │
│  │  └─────────────┘  └─────────────┘  └─────────┘ │   │
│  └─────────────────────────────────────────────────┘   │
│                     ↕️ localStorage                      │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Vela BOH (Web Browser)             │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

#### ✅ ข้อดี
| ด้าน | รายละเอียด |
|------|-----------|
| **ค่าใช้จ่าย** | 💰 **ฟรี** (ใช้ hardware ที่มี) |
| **ความยืดหยุ่น** | 🔧 สูงมาก - เขียน logic อะไรก็ได้ |
| **Data Privacy** | 🔒 ข้อมูลอยู่ภายใน machine |
| **Integration** | 🔌 เข้าถึง localStorage, ไฟล์, API ได้หมด |
| **Control** | 🎛️ ควบคุมได้ 100% |
| **Scalability** | 📈 เพิ่ม agent ได้ไม่จำกัด |

#### ❌ ข้อเสีย
| ด้าน | รายละเอียด |
|------|-----------|
| **ความซับซ้อน** | ⚙️ ต้องตั้งค่า OpenClaw และเขียน agent |
| **Dependency** | 🖥️ ต้องเปิด Mac mini ตลอด |
| **Maintenance** | 🔧 ต้องดูแลเอง (update, monitoring) |
| **Learning Curve** | 📚 ต้องเรียนรู้ OpenClaw API |

#### 💰 ค่าใช้จ่าย
| รายการ | ราคา |
|--------|------|
| OpenClaw | ฟรี (npm install) |
| Server/Cloud | ฟรี (ใช้ Mac mini ที่มี) |
| Electricity | ~฿200-500/เดือน (Mac mini) |
| **รวม** | **~฿200-500/เดือน** |

---

### ทางเลือก B: Embedded Bot (JavaScript Bot ในเว็บ)

```
┌─────────────────────────────────────────────────────────┐
│              Vela Resort Website                        │
│  ┌─────────────────────────────────────────────────┐   │
│  │         Embedded JavaScript Bot                  │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────┐ │   │
│  │  │  Auto-Sync  │  │  Auto-      │  │  Auto   │ │   │
│  │  │  (30s)      │  │  release    │  │  report │ │   │
│  │  └─────────────┘  └─────────────┘  └─────────┘ │   │
│  └─────────────────────────────────────────────────┘   │
│                     ↕️ localStorage                      │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Vela BOH (Same Page)               │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

#### ✅ ข้อดี
| ด้าน | รายละเอียด |
|------|-----------|
| **ความง่าย** | 🎯 ติดตั้งง่าย - แค่เพิ่ม JS ในเว็บ |
| **No Extra Software** | 📦 ไม่ต้องติดตั้งอะไรเพิ่ม |
| **Always On (เมื่อเปิดเว็บ)** | 🌐 รันเมื่อมีคนเปิดเว็บ |
| **Familiar** | 💡 ใช้ JavaScript ที่คุ้นเคย |

#### ❌ ข้อเสีย
| ด้าน | รายละเอียด |
|------|-----------|
| **Dependency** | 🌐 **ต้องเปิดเว็บตลอด** (ไม่ practical) |
| **Browser Limitations** | 🚫 ไม่สามารถรัน background ได้ |
| **No True Scheduling** | ⏰ setInterval หายเมื่อปิดแท็บ |
| **Multiple Tabs** | 🔄 ซ้ำซ้อนถ้าเปิดหลายแท็บ |
| **Mobile** | 📱 ไม่รันบนมือถือ (ประหยัดแบต) |
| **Reliability** | ⚠️ ไม่เชื่อถือได้สำหรับ critical tasks |

#### 💰 ค่าใช้จ่าย
| รายการ | ราคา |
|--------|------|
| Development | ฟรี (ทำเอง) |
| Server/Cloud | ฟรี (client-side) |
| **รวม** | **ฟรี** (แต่ไม่ทำงานจริง) |

---

## 📊 ตารางเปรียบเทียบ

| เกณฑ์ | OpenClaw Agents (A) | Embedded Bot (B) |
|-------|---------------------|------------------|
| **ค่าใช้จ่าย** | ~฿200-500/เดือน | ฟรี (แต่ไม่ทำงาน) |
| **ความเชื่อถือได้** | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| **ความยืดหยุ่น** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **ความง่าย** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Background Execution** | ✅ ใช่ | ❌ ไม่ |
| **Scheduling** | ✅ Cron-like | ❌ setInterval เท่านั้น |
| **API Access** | ✅ ทั้งหมด | ❌ จำกัด (browser sandbox) |
| **File System** | ✅ เข้าถึงได้ | ❌ ไม่ |
| **Multiple Platforms** | ✅ Booking.com, Agoda, etc. | ❌ จำกัด |
| **LINE Notify** | ✅ ได้ | ⚠️ ได้ (แต่ต้องเปิดเว็บ) |
| **Maintenance** | ปานกลาง | ต่ำ (แต่ไม่ทำงาน) |
| **Scalability** | ✅ สูง | ❌ ต่ำ |
| **Data Privacy** | ✅ ข้อมูลอยู่ภายใน | ✅ ข้อมูลอยู่ภายใน |

---

## 🎯 คำแนะนำ: ใช้ OpenClaw Agents (ทางเลือก A)

### เหตุผลหลัก

1. **ทำงานได้จริง 24/7**
   - Embedded Bot ต้องการให้เปิดเว็บตลอด → ไม่ practical
   - OpenClaw รันเป็น background process → ทำงานได้จริง

2. **ประหยัดกว่าในระยะยาว**
   - ไม่ต้องจ่ายค่า server/add-on รายเดือน
   - ใช้ hardware ที่มีอยู่แล้ว (Mac mini)

3. **ยืดหยุ่นสูง**
   - เขียน agent ใหม่ได้ง่าย
   - เข้าถึง API ภายนอกได้ (Booking.com, Agoda, LINE Notify)
   - อ่าน/เขียน localStorage ของเว็บได้

4. **เชื่อถือได้**
   - มีระบบ monitoring และ logging
   - Restart อัตโนมัติถ้า crash
   - แจ้งเตือนเมื่อมีปัญหา

---

## 🏗️ สถาปัตยกรรมที่แนะนำ

```
┌─────────────────────────────────────────────────────────────────┐
│                    Vela Resort Mac mini                         │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              OpenClaw Gateway (Port 8080)                │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │   │
│  │  │   Morning    │  │    Booking   │  │   Peekaboo   │  │   │
│  │  │   Report     │  │    Sync      │  │   Auto-      │  │   │
│  │  │   Agent      │  │    Agent     │  │   release    │  │   │
│  │  │   (8:00 AM)  │  │  (ทุก 30 วิ)  │  │  (ทุก 1 ชม.)  │  │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │   │
│  │  │   Weekly     │  │    Monthly   │  │   Low Balance│  │   │
│  │  │   Summary    │  │    Report    │  │   Alert      │  │   │
│  │  │  (จันทร์ 9 โมง)│  │  (1 ของเดือน) │  │  (ทุก 6 ชม.)  │  │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              ↕️                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Vela BOH (Browser - localhost)              │   │
│  │                   localStorage                           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              ↕️                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  LINE Notify │  │  Booking.com │  │    Agoda     │         │
│  │    (API)     │  │   (Extranet) │  │  (YCS API)   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📝 Agent ที่แนะนำ (6 Agents)

### 1. 🔄 Booking Sync Agent
**หน้าที่:** ดึงการจองจาก Booking.com, Agoda, Traveloka ทุก 30 วินาที

```javascript
// Agent Script (booking-sync-agent.js)
module.exports = async function() {
    // 1. เชื่อมต่อ Booking.com Extranet API
    const newBookings = await fetchBookingComBookings();
    
    // 2. เชื่อมต่อ Agoda YCS API
    const agodaBookings = await fetchAgodaBookings();
    
    // 3. เชื่อมต่อ Traveloka Partner API
    const travelokaBookings = await fetchTravelokaBookings();
    
    // 4. รวมและกรองข้อมูลซ้ำ
    const allBookings = [...newBookings, ...agodaBookings, ...travelokaBookings];
    
    // 5. อัพเดท localStorage ของ Vela BOH
    await updateBohBookings(allBookings);
    
    // 6. แจ้ง LINE เมื่อมีการจองใหม่
    const newCount = await countNewBookings(allBookings);
    if (newCount > 0) {
        await sendLineNotify(`📝 มีการจองใหม่ ${newCount} รายการ`);
    }
    
    return { success: true, synced: allBookings.length, new: newCount };
};
```

**Schedule:** ทุก 30 วินาที  
**Priority:** สูง  
**Estimated Time:** 2-5 วินาที/รัน

---

### 2. 👁️ Peekaboo Auto-release Agent
**หน้าที่:** ปล่อยห้องที่ไม่ชำระเงินภายใน 24 ชม.

```javascript
// Agent Script (peekaboo-agent.js)
module.exports = async function() {
    // 1. โหลดการจองทั้งหมดจาก BOH
    const bookings = await loadBohBookings();
    
    // 2. หาการจองที่ status = 'pending' และเกิน 24 ชม.
    const now = new Date();
    const toRelease = bookings.filter(b => {
        const bookingTime = new Date(b.createdAt);
        const hoursDiff = (now - bookingTime) / (1000 * 60 * 60);
        return b.status === 'pending' && hoursDiff > 24;
    });
    
    // 3. อัพเดท status เป็น 'cancelled'
    toRelease.forEach(b => {
        b.status = 'cancelled';
        b.cancelledReason = 'Auto-release: ไม่ชำระเงินภายใน 24 ชม.';
    });
    
    // 4. บันทึก
    await saveBohBookings(bookings);
    
    // 5. แจ้ง LINE
    if (toRelease.length > 0) {
        await sendLineNotify(`👁️ Peekaboo: ปล่อยห้อง ${toRelease.length} ห้อง`);
    }
    
    return { success: true, released: toRelease.length };
};
```

**Schedule:** ทุก 1 ชั่วโมง  
**Priority:** ปานกลาง  
**Estimated Time:** 1-2 วินาที/รัน

---

### 3. 🌅 Morning Report Agent
**หน้าที่:** ส่งรายงานประจำวันทุก 8:00 โมงเช้า

```javascript
// Agent Script (morning-report-agent.js)
module.exports = async function() {
    const today = new Date().toISOString().split('T')[0];
    
    // 1. โหลดข้อมูล
    const bookings = await loadBohBookings();
    const pettyCash = await loadPettyCash();
    
    // 2. คำนวณสถิติ
    const todayBookings = bookings.filter(b => b.checkIn === today);
    const todayRevenue = todayBookings.reduce((sum, b) => sum + b.total, 0);
    const occupancyRate = calculateOccupancyRate(today);
    const cashBalance = calculateCashBalance(pettyCash);
    
    // 3. สร้างรายงาน
    const report = `
🌅 รายงานประจำวันที่ ${formatDateThai(today)}

📊 การจองวันนี้
• เช็คอิน: ${todayBookings.length} รายการ
• รายได้: ฿${todayRevenue.toLocaleString()}
• อัตราการเข้าพัก: ${occupancyRate}%

💰 Petty Cash
• ยอดคงเหลือ: ฿${cashBalance.toLocaleString()}

🏠 ห้องว่างวันนี้
• Hytte: ${await getAvailableRooms('hytte')} / 5
• Hus: ${await getAvailableRooms('hus')} / 1
    `.trim();
    
    // 4. ส่ง LINE
    await sendLineNotify(report);
    
    return { success: true, report };
};
```

**Schedule:** ทุกวัน 8:00 AM  
**Priority:** สูง  
**Estimated Time:** 3-5 วินาที/รัน

---

### 4. 📊 Weekly Summary Agent
**หน้าที่:** ส่งรายงานสรุปทุกเช้าวันจันทร์ 9:00 AM

```javascript
// Agent Script (weekly-summary-agent.js)
module.exports = async function() {
    const lastWeek = getPreviousWeek();
    
    // 1. โหลดข้อมูลสัปดาห์ที่แล้ว
    const bookings = await loadBohBookingsForPeriod(lastWeek.start, lastWeek.end);
    const pettyCash = await loadPettyCashForPeriod(lastWeek.start, lastWeek.end);
    
    // 2. คำนวณ
    const totalRevenue = bookings.reduce((sum, b) => sum + b.total, 0);
    const totalBookings = bookings.length;
    const avgOccupancy = calculateAvgOccupancy(lastWeek);
    const topChannel = getTopBookingChannel(bookings);
    
    // 3. สร้างรายงาน
    const report = `
📊 รายงานสรุปสัปดาห์ (${formatDateThai(lastWeek.start)} - ${formatDateThai(lastWeek.end)})

💰 รายได้
• รวม: ฿${totalRevenue.toLocaleString()}
• เฉลี่ย/วัน: ฿${(totalRevenue / 7).toLocaleString()}

📝 การจอง
• ทั้งหมด: ${totalBookings} รายการ
• ช่องทางหลัก: ${topChannel}

🏨 อัตราการเข้าพัก
• เฉลี่ย: ${avgOccupancy}%

🔮 Forecast สัปดาห์นี้
• การจองล่วงหน้า: ${await getForwardBookings()} รายการ
    `.trim();
    
    // 4. ส่ง LINE
    await sendLineNotify(report);
    
    return { success: true, report };
};
```

**Schedule:** ทุกวันจันทร์ 9:00 AM  
**Priority:** ปานกลาง  
**Estimated Time:** 5-8 วินาที/รัน

---

### 5. 📈 Monthly Report Agent
**หน้าที่:** ส่งรายงานสรุปเดือนแรกทุกเดือน

```javascript
// Agent Script (monthly-report-agent.js)
module.exports = async function() {
    const lastMonth = getPreviousMonth();
    
    // 1. โหลดข้อมูลเดือนที่แล้ว
    const bookings = await loadBohBookingsForPeriod(lastMonth.start, lastMonth.end);
    const pettyCash = await loadPettyCashForPeriod(lastMonth.start, lastMonth.end);
    
    // 2. คำนวณ
    const totalRevenue = bookings.reduce((sum, b) => sum + b.total, 0);
    const totalBookings = bookings.length;
    const avgOccupancy = calculateAvgOccupancy(lastMonth);
    const revenueByChannel = groupByChannel(bookings);
    const totalExpense = pettyCash.filter(p => p.type === 'expense').reduce((sum, p) => sum + p.amount, 0);
    const profit = totalRevenue - totalExpense;
    
    // 3. สร้างรายงาน
    const report = `
📈 รายงานประจำเดือน ${formatMonthThai(lastMonth.start)}

💰 รายได้
• รวม: ฿${totalRevenue.toLocaleString()}
• เฉลี่ย/วัน: ฿${(totalRevenue / getDaysInMonth(lastMonth)).toLocaleString()}

📝 การจอง
• ทั้งหมด: ${totalBookings} รายการ
• คืนรวม: ${calculateTotalNights(bookings)} คืน

🏨 อัตราการเข้าพัก
• เฉลี่ย: ${avgOccupancy}%

📊 แยกตามช่องทาง
${Object.entries(revenueByChannel).map(([channel, amount]) => 
    `• ${channel}: ฿${amount.toLocaleString()}`
).join('\n')}

💸 ค่าใช้จ่าย
• รวม: ฿${totalExpense.toLocaleString()}

🎯 กำไร
• ฿${profit.toLocaleString()}
    `.trim();
    
    // 4. ส่ง LINE (พร้อมไฟล์ PDF/Excel)
    await sendLineNotify(report);
    await sendLineFile(generateMonthlyReportPDF(lastMonth));
    
    return { success: true, report };
};
```

**Schedule:** วันที่ 1 ของทุกเดือน 9:00 AM  
**Priority:** ต่ำ  
**Estimated Time:** 10-15 วินาที/รัน

---

### 6. ⚠️ Low Balance Alert Agent
**หน้าที่:** แจ้งเตือนเมื่อ Petty Cash ต่ำ

```javascript
// Agent Script (low-balance-alert-agent.js)
module.exports = async function() {
    const THRESHOLD = 200; // บาท
    
    // 1. โหลด Petty Cash
    const pettyCash = await loadPettyCash();
    
    // 2. คำนวณยอดคงเหลือ
    const opening = 5000;
    const income = pettyCash.filter(p => p.type === 'income').reduce((sum, p) => sum + p.amount, 0);
    const expense = pettyCash.filter(p => p.type === 'expense').reduce((sum, p) => sum + p.amount, 0);
    const balance = opening + income - expense;
    
    // 3. ตรวจสอบ
    if (balance <= THRESHOLD) {
        const message = `
⚠️ แจ้งเตือน: Petty Cash ต่ำ!

💰 ยอดคงเหลือ: ฿${balance.toLocaleString()}
🚨 เกณฑ์: ฿${THRESHOLD}

กรุณาเติมเงินด่วน!
        `.trim();
        
        await sendLineNotify(message);
        return { success: true, alerted: true, balance };
    }
    
    return { success: true, alerted: false, balance };
};
```

**Schedule:** ทุก 6 ชั่วโมง  
**Priority:** สูง (เมื่อ alert)  
**Estimated Time:** 1-2 วินาที/รัน

---

## 🛠️ การติดตั้ง (Implementation Guide)

### ขั้นตอนที่ 1: ติดตั้ง OpenClaw

```bash
# 1. ติดตั้ง Node.js (ถ้ายังไม่มี)
# ดาวน์โหลดจาก: https://nodejs.org/

# 2. ติดตั้ง OpenClaw
npm install -g openclaw

# 3. เริ่มต้น OpenClaw
openclaw gateway start

# 4. ตรวจสอบสถานะ
openclaw gateway status
```

### ขั้นตอนที่ 2: สร้าง Agent Scripts

สร้างโฟลเดอร์ `/Users/aporclay/.openclaw/workspace/vela-agents/`

```bash
mkdir -p ~/.openclaw/workspace/vela-agents
cd ~/.openclaw/workspace/vela-agents
```

สร้างไฟล์ agent แต่ละตัวตาม script ด้านบน

### ขั้นตอนที่ 3: ตั้งค่า Schedule

สร้างไฟล์ `agents-config.json`:

```json
{
  "agents": [
    {
      "name": "booking-sync",
      "script": "booking-sync-agent.js",
      "schedule": "*/30 * * * * *",
      "enabled": true
    },
    {
      "name": "peekaboo",
      "script": "peekaboo-agent.js",
      "schedule": "0 * * * *",
      "enabled": true
    },
    {
      "name": "morning-report",
      "script": "morning-report-agent.js",
      "schedule": "0 8 * * *",
      "enabled": true
    },
    {
      "name": "weekly-summary",
      "script": "weekly-summary-agent.js",
      "schedule": "0 9 * * 1",
      "enabled": true
    },
    {
      "name": "monthly-report",
      "script": "monthly-report-agent.js",
      "schedule": "0 9 1 * *",
      "enabled": true
    },
    {
      "name": "low-balance-alert",
      "script": "low-balance-alert-agent.js",
      "schedule": "0 */6 * * *",
      "enabled": true
    }
  ]
}
```

### ขั้นตอนที่ 4: ตั้งค่า LINE Notify

1. เข้า https://notify-bot.line.me/
2. Login ด้วย LINE
3. สร้าง Token ใหม่
4. บันทึก token ในไฟล์ `.env`:

```bash
LINE_NOTIFY_TOKEN=your_token_here
```

### ขั้นตอนที่ 5: เริ่ม Agents

```bash
# เริ่ม agent ทั้งหมด
openclaw agent start --config agents-config.json

# หรือเริ่มทีละตัว
openclaw agent start booking-sync
openclaw agent start peekaboo
# ...
```

---

## 📊 Timeline การพัฒนา

| สัปดาห์ | งาน | ผลลัพธ์ |
|--------|-----|---------|
| **สัปดาห์ 1** | ติดตั้ง OpenClaw + Setup Environment | ✅ OpenClaw พร้อมใช้งาน |
| **สัปดาห์ 2** | พัฒนา Booking Sync Agent | ✅ Sync จาก Booking.com ได้ |
| **สัปดาห์ 3** | พัฒนา Peekaboo + Alert Agents | ✅ Auto-release + แจ้งเตือน |
| **สัปดาห์ 4** | พัฒนา Report Agents | ✅ รายงานประจำวัน/สัปดาห์/เดือน |
| **สัปดาห์ 5** | Testing + Optimization | ✅ ระบบเสถียร |
| **สัปดาห์ 6** | Documentation + Training | ✅ คู่มือการใช้งาน |

**รวม:** 6 สัปดาห์ (1.5 เดือน)

---

## 💰 Budget Summary

| รายการ | ค่าใช้จ่าย |
|--------|-----------|
| **Development** | ฟรี (ทำเอง) |
| **OpenClaw** | ฟรี |
| **Server** | ฟรี (ใช้ Mac mini ที่มี) |
| **Electricity** | ~฿200-500/เดือน |
| **LINE Notify** | ฟรี |
| **รวม (เดือนแรก)** | **~฿200-500** |
| **รวม (เดือนถัดไป)** | **~฿200-500/เดือน** |

---

## ⚠️ ความเสี่ยงและแผนสำรอง

### ความเสี่ยง 1: Mac mini ปิด/Restart
**ผลกระทบ:** Agents ไม่รัน  
**แผนสำรอง:**
- ตั้งค่า Mac mini ให้เปิดอัตโนมัติเมื่อไฟกลับ
- ใช้ cron job เป็น backup
- แจ้งเตือนเมื่อ Mac offline เกิน 1 ชม.

### ความเสี่ยง 2: API เปลี่ยนแปลง
**ผลกระทบ:** Sync ไม่ทำงาน  
**แผนสำรอง:**
- Monitoring และ alert เมื่อ API fail
- มี fallback manual import
- อัพเดท agent เมื่อ API เปลี่ยน

### ความเสี่ยง 3: ข้อมูลเสียหาย
**ผลกระทบ:** การจองหาย  
**แผนสำรอง:**
- Backup localStorage ทุกวัน
- Export ข้อมูลอัตโนมัติ
- มีระบบ restore

---

## ✅ สรุป

| เกณฑ์ | ผลลัพธ์ |
|-------|---------|
| **ทางเลือกที่แนะนำ** | ✅ OpenClaw Agents (A) |
| **เหตุผลหลัก** | ทำงานได้จริง 24/7, ประหยัด, ยืดหยุ่น |
| **จำนวน Agents** | 6 agents |
| **Timeline** | 6 สัปดาห์ |
| **Budget** | ~฿200-500/เดือน |
| **ROI** | ประหยัดเวลา ~10-20 ชม./เดือน |

---

## 📞 ติดต่อ

หากมีคำถามหรือต้องการความช่วยเหลือ:
- **คุณไค (CTO)** - Technical Implementation
- **กระจู๋ (Coordinator)** - Project Management
- **ท่านกระป๋อง (Decision Maker)** - Approval

---

**เอกสารนี้สร้างโดย:** คุณไค (CTO)  
**วันที่:** 9 มีนาคม 2026  
**เวอร์ชัน:** 1.0  
**สถานะ:** ✅ พร้อมดำเนินการ
