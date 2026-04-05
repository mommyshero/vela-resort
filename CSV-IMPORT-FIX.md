# ✅ แก้ไขปัญหา CSV Import - Booking.com Format

## 📋 **ปัญหาที่พบ:**

หลังจาก Import CSV จาก Booking.com แล้วแสดง:
- ❌ ชื่อลูกค้า: `Unknown` (ไม่ใช่ชื่อจริง)
- ❌ เช็คอิน/เช็คเอาท์: `-` (ไม่ใช่วันที่)
- ❌ เดือน: `undefined 555` (เดือนผิด)

## 🔍 **สาเหตุ:**

ไฟล์ CSV จาก Booking.com (`reservation_statements_overview_*.csv`) ใช้ header format:
- `"Guest name"` (มีช่องว่าง) → โค้ดเดิมค้นหา `GuestName` ไม่มีช่องว่าง
- `"Booker name"` (มีช่องว่าง)
- `"Arrival"` และ `"Departure"` → ถูกต้อง แต่เป็น ISO datetime (`2026-02-10T09:54:18`)
- `"Reservation number"` → ต้อง map เป็น booking ID
- `"Final amount"` → ต้อง map เป็น total
- `"Status"` → Booking.com ใช้ `"OK"` สำหรับ confirmed

## ✅ **การแก้ไข:**

### 1. **ปรับปรุง CSV Parser**
- เพิ่มการ parse แบบรองรับ quoted values ที่มี comma ภายใน
- ลบ quote (`"`) จาก header และ values
- เพิ่ม debug logging สำหรับ 3 แถวแรก

### 2. **แก้ไข Column Mapping**
```javascript
// ชื่อลูกค้า - ให้ความสำคัญกับ "Guest name" (Booking.com format)
guestName: row['Guest name'] || row['GuestName'] || ... || 'Unknown'

// วันที่เช็คอิน - ให้ความสำคัญกับ "Arrival" (Booking.com format)
checkIn: formatDate(row['Arrival'] || row['Departure'] || ...)

// วันที่เช็คเอาท์ - ให้ความสำคัญกับ "Departure"
checkOut: formatDate(row['Departure'] || ...)

// ราคา - ใช้ "Final amount" จาก Booking.com
total: parseFloat(row['Final amount'] || row['Original amount'] || ...)

// ช่องทาง - default เป็น Booking.com
channel: '🏨 Booking.com'
```

### 3. **แก้ไข formatDate()**
- รองรับ ISO datetime format (`2026-02-10T09:54:18`)
- แยกเฉพาะส่วนวันที่ (`2026-02-10`)
- เพิ่ม error logging

### 4. **แก้ไข formatMonthName()**
- เพิ่ม validation สำหรับ monthStr
- แสดง "ไม่ระบุเดือน" แทน `undefined`
- เพิ่ม error logging

### 5. **แก้ไข renderBookingsByMonth()**
- ตรวจสอบ `checkIn` ก่อนใช้
- Log warning ถ้า checkIn ไม่ถูกต้อง

## 🧪 **วิธีทดสอบ:**

1. **เปิด boh.html v17:**
   ```
   http://localhost:8083/boh.html?v=17
   ```

2. **Login:**
   - Username: `Boss`
   - Password: `5281`

3. **Import CSV:**
   - คลิก "📥 Import CSV"
   - เลือกไฟล์: `/Users/aporclay/Downloads/reservation_statements_overview_2026-03.csv`

4. **ตรวจสอบ Console Log (F12):**
   ```
   📋 CSV Headers: [...]
   📝 Row 1:
     All columns: [...]
     Guest name: Thirukumaran Superamaniam
     Arrival: 2026-02-17
     Departure: 2026-02-18
   ```

5. **ตรวจสอบผลลัพธ์:**
   - ✅ ชื่อลูกค้าแสดงถูกต้อง (ไม่ใช่ Unknown)
   - ✅ วันที่เช็คอินแสดงถูกต้อง (ไม่ใช่ -)
   - ✅ วันที่เช็คเอาท์แสดงถูกต้อง (ไม่ใช่ -)
   - ✅ เดือนแสดงถูกต้อง (ไม่ใช่ undefined)
   - ✅ จำนวนคืนคำนวณถูกต้อง (ไม่ใช่ NaN)
   - ✅ ราคารวมแสดงถูกต้อง (ไม่ใช่ ฿0)

## 📊 **CSV Columns ที่รองรับ:**

### Booking.com Format:
```
Reservation number, Invoice number, Booked on, Arrival, Departure,
Booker name, Guest name, Rooms, Persons, Room nights,
Commission %, Original amount, Final amount, Commission amount,
Payment fee, Status, Guest request, Currency, Hotel id,
Property name, City, Country
```

### Generic Format:
```
BookingID, GuestName, BookerName, Phone, Email,
CheckIn, CheckOut, Room, Qty, Guests, Total,
Channel, Status, Notes
```

## 🚀 **พร้อมใช้งาน!**

ไฟล์ที่แก้ไข: `/Users/aporclay/Documents/Nodrama Company/vela-resort/boh.html` (v17)

---
**แก้ไขโดย:** คุณน้ำ (CFO)  
**วันที่:** 2026-03-11  
**เวลาแก้ไข:** 21:45
