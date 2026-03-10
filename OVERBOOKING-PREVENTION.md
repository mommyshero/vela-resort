# 🛡️ Overbooking Prevention System

**Vela Resort Umphang - ระบบป้องกันการจองเกิน**

---

## 🎯 **วัตถุประสงค์**

ป้องกันไม่ให้มีการจองห้องเกินจำนวนที่มีจริง (Hytte: 5 ห้อง, Hus: 1 ห้อง)

---

## ⚙️ **การตั้งค่า**

### **Room Capacity:**
```javascript
{
  hytte: 5,  // 5 ห้อง
  hus: 1     // 1 ห้อง
}
```

### **Auto-Sync Interval:**
```javascript
30 นาที (1,800,000 milliseconds)
```

---

## 🔧 **วิธีใช้งาน**

### **1. ระบบจะทำงานอัตโนมัติเมื่อ:**

✅ **หน้าเว็บโหลด** → เริ่ม Auto-sync ทันที  
✅ **ทุก 30 นาที** → Sync ข้อมูลระหว่าง index.html และ boh.html  
✅ **ก่อนบันทึกการจอง** → ตรวจสอบ availability  

---

### **2. ฟังก์ชันหลัก:**

#### **checkRoomAvailability(roomType, checkIn, checkOut, qty)**

ตรวจสอบว่าห้องพอหรือไม่

**ตัวอย่าง:**
```javascript
const result = checkRoomAvailability('hytte', '2026-03-15', '2026-03-17', 2);

if (result.available) {
  console.log('✅ ห้องพอ:', result.message);
} else {
  console.log('❌ ห้องไม่พอ:', result.message);
  console.log('การจองที่ซ้อน:', result.conflictBookings);
}
```

**ผลลัพธ์:**
```javascript
{
  available: true/false,
  message: "✅ ห้องพอ! มีว่าง 3 ห้อง",
  conflictBookings: [], // ถ้ามีจะแสดงรายการที่ซ้อน
  availableRooms: 3,
  requestedRooms: 2
}
```

---

#### **validateBooking(booking)**

ตรวจสอบความถูกต้องของการจองทั้งหมด

**ตัวอย่าง:**
```javascript
const booking = {
  id: 'BK011',
  name: 'คุณสมชาย',
  checkIn: '2026-03-15',
  checkOut: '2026-03-17',
  room: 'hytte',
  qty: 2
};

const validation = validateBooking(booking);

if (validation.valid) {
  // บันทึกการจอง
} else {
  alert(validation.message);
}
```

---

#### **detectOverbooking()**

ตรวจหาการจองเกินที่มีอยู่แล้วในระบบ

**ตัวอย่าง:**
```javascript
const alerts = detectOverbooking();

if (alerts.length > 0) {
  console.warn('⚠️ พบ overbooking!', alerts);
} else {
  console.log('✅ ไม่มี overbooking');
}
```

---

#### **autoSyncData()**

Sync ข้อมูลระหว่าง index.html และ boh.html

**ทำงานอัตโนมัติทุก 30 นาที**

**Manual Call:**
```javascript
const result = autoSyncData();
console.log('Sync result:', result);
```

**ผลลัพธ์:**
```javascript
{
  success: true,
  message: 'Sync completed',
  bookingsCount: 15,
  overbookingAlerts: 0
}
```

---

## 📊 **Auto-Sync System**

### **Timeline:**

```
00:00 ──🔄 Sync (อัตโนมัติ)
  │
  ├── 00:30 ──🔄 Sync (อัตโนมัติ)
  │
  ├── 01:00 ──🔄 Sync (อัตโนมัติ)
  │
  └── 01:30 ──🔄 Sync (อัตโนมัติ)
```

### **สิ่งที่ Sync:**

| Data | Key | Format |
|------|-----|--------|
| **Bookings** | `vela_bookings` | Array |
| **Sync Status** | `vela_sync` | Object |
| **Overbooking Log** | `vela_overbooking_log` | Object |

---

## 🚨 **Overbooking Alerts**

### **Alert Types:**

| Type | Severity | Description |
|------|----------|-------------|
| **overbooking** | 🔴 Critical | จองเกินจำนวนห้อง |
| **fully_booked** | 🟡 Warning | ห้องเต็ม (ยังไม่เกิน) |

### **Alert Example:**

```javascript
{
  type: 'overbooking',
  roomType: 'hytte',
  date: '2026-03-15',
  maxRooms: 5,
  bookedRooms: 7,
  overbookedBy: 2,
  severity: 'critical'
}
```

---

## 🧪 **Testing**

### **Test Case 1: Booking Available Room**

```javascript
// Should pass
const result = checkRoomAvailability('hytte', '2026-12-01', '2026-12-03', 1);
console.assert(result.available === true);
```

### **Test Case 2: Booking Unavailable Room**

```javascript
// Book all 5 Hytte rooms
for (let i = 1; i <= 5; i++) {
  bookings.push({
    id: `BK${i}`,
    room: 'hytte',
    checkIn: '2026-12-01',
    checkOut: '2026-12-03',
    qty: 1,
    status: 'confirmed'
  });
}

// Try to book 6th room - should fail
const result = checkRoomAvailability('hytte', '2026-12-01', '2026-12-03', 1);
console.assert(result.available === false);
console.log('✅ Overbooking prevention works!');
```

### **Test Case 3: Auto-Sync**

```javascript
// Wait 30 minutes or call manually
const result = autoSyncData();
console.assert(result.success === true);
console.log('✅ Auto-sync works!');
```

---

## 📋 **Integration Guide**

### **For index.html (Customer Website):**

```html
<!-- Add before closing body tag -->
<script src="overbooking-prevention.js"></script>
<script>
  // In booking form submission
  function submitBooking() {
    const booking = {
      checkIn: document.getElementById('checkIn').value,
      checkOut: document.getElementById('checkOut').value,
      room: document.getElementById('roomType').value,
      qty: parseInt(document.getElementById('qty').value)
    };

    const validation = validateBooking(booking);
    
    if (!validation.valid) {
      alert(validation.message);
      return;
    }

    // Proceed with booking
    saveBooking(booking);
  }
</script>
```

### **For boh.html (Staff System):**

```html
<!-- Add before closing body tag -->
<script src="overbooking-prevention.js"></script>
<script>
  // In booking form submission (already integrated)
  function handleBookingSubmit(event) {
    event.preventDefault();
    
    const booking = { ... };
    const validation = validateBooking(booking);
    
    if (!validation.valid) {
      alert(validation.message);
      return;
    }
    
    saveBookings();
  }
</script>
```

---

## 🔍 **Debugging**

### **Check Console Logs:**

```javascript
// Open Browser Console (F12)
// Look for:

🛡️ Overbooking Prevention System initialized
🔄 [2026-03-09T12:30:00.000Z] Auto-sync started...
✅ [2026-03-09T12:30:00.000Z] No overbooking detected
✅ [2026-03-09T12:30:00.000Z] Auto-sync completed successfully
```

### **Check localStorage:**

```javascript
// Open Browser Console (F12)

// Check bookings
JSON.parse(localStorage.getItem('vela_bookings'))

// Check last sync
JSON.parse(localStorage.getItem('vela_sync'))

// Check overbooking log
JSON.parse(localStorage.getItem('vela_overbooking_log'))
```

---

## ⚠️ **Important Notes**

1. **Auto-sync requires browser to be open** - If browser is closed, sync stops
2. **localStorage is browser-specific** - Different browsers = different data
3. **30-minute interval is minimum** - Can increase but not recommended
4. **Overbooking check is real-time** - Runs before every booking save

---

## 🆘 **Troubleshooting**

### **Problem: Overbooking not detected**

**Solution:**
```javascript
// Check if script is loaded
console.log(typeof validateBooking); // Should be "function"

// Check if auto-sync is running
console.log(window.autoSyncInterval); // Should be a number
```

### **Problem: Auto-sync not working**

**Solution:**
```javascript
// Restart auto-sync
startAutoSync();

// Or call manually
autoSyncData();
```

### **Problem: Conflicts between index.html and boh.html**

**Solution:**
```javascript
// Force sync
autoSyncData();

// Check both files have same script version
// Check localStorage keys match
```

---

## 📞 **Support**

**Contact:** Kimi (AI Assistant)  
**Documentation:** `/Users/aporclay/.openclaw/workspace/vela-resort/OVERBOOKING-PREVENTION.md`  
**Script:** `/Users/aporclay/.openclaw/workspace/vela-resort/overbooking-prevention.js`

---

**Last Updated:** March 9, 2026, 12:30 PM  
**Version:** 1.0  
**Status:** ✅ Production Ready
