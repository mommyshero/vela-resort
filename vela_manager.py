#!/usr/bin/env python3
"""
Vela Resort - ระบบจัดการการจองและบัญชี
ใช้งาน: python3 vela_manager.py [command]

คำสั่ง:
  - list-bookings  : แสดงการจองทั้งหมด
  - add-booking    : เพิ่มการจองใหม่
  - update-price   : อัปเดตราคาห้องพัก
  - monthly-report : สร้างรายงานประจำเดือน
  - fix-seasons    : แก้ไขข้อความ ฤดูเขียว → ฤดูร้อน/ฤดูฝน
"""

import json
import sys
from datetime import datetime, timedelta
from pathlib import Path

# โหลดการตั้งค่า
CONFIG_FILE = Path(__file__).parent / "config.json"
BOOKINGS_FILE = Path(__file__).parent / "bookings.json"
ACCOUNTING_FILE = Path(__file__).parent / "accounting.json"

def load_config():
    with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def load_bookings():
    if BOOKINGS_FILE.exists():
        with open(BOOKINGS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def save_bookings(bookings):
    with open(BOOKINGS_FILE, 'w', encoding='utf-8') as f:
        json.dump(bookings, f, ensure_ascii=False, indent=2)

def get_season(month):
    """กำหนดฤดูกาลจากเดือน"""
    if month in [3, 4, 5]:
        return "summer"
    elif month in [6, 7, 8, 9, 10]:
        return "rainy"
    else:
        return "winter"

def get_season_name_th(season):
    """ชื่อฤดูกาลภาษาไทย"""
    names = {
        "summer": "ฤดูร้อน",
        "rainy": "ฤดูฝน",
        "winter": "ฤดูหนาว"
    }
    return names.get(season, season)

def list_bookings():
    """แสดงการจองทั้งหมด"""
    bookings = load_bookings()
    config = load_config()
    
    print(f"\n{'='*60}")
    print(f"📅 Vela Resort - รายการจองทั้งหมด")
    print(f"{'='*60}\n")
    
    if not bookings:
        print("ยังไม่มีรายการจอง")
        return
    
    for i, booking in enumerate(bookings, 1):
        check_in = booking.get('check_in', 'N/A')
        check_out = booking.get('check_out', 'N/A')
        room_type = booking.get('room_type', 'N/A')
        guest_name = booking.get('guest_name', 'N/A')
        status = booking.get('status', 'pending')
        total = booking.get('total', 0)
        
        status_icon = {"confirmed": "✅", "pending": "⏳", "cancelled": "❌"}.get(status, "❓")
        
        print(f"{i}. {status_icon} {guest_name}")
        print(f"   ห้อง: {room_type}")
        print(f"   เช็คอิน: {check_in} | เช็คเอาท์: {check_out}")
        print(f"   รวม: {total:,.0f} ฿")
        print()

def add_booking():
    """เพิ่มการจองใหม่"""
    config = load_config()
    bookings = load_bookings()
    
    print(f"\n{'='*60}")
    print(f"📝 Vela Resort - เพิ่มการจองใหม่")
    print(f"{'='*60}\n")
    
    # รับข้อมูล
    guest_name = input("ชื่อผู้จอง: ")
    check_in = input("วันที่เช็คอิน (YYYY-MM-DD): ")
    check_out = input("วันที่เช็คเอาท์ (YYYY-MM-DD): ")
    
    print("\nประเภทห้อง:")
    for i, room in enumerate(config['rooms'], 1):
        season = get_season(datetime.now().month)
        price = room['prices'][season]
        print(f"  {i}. {room['name_th']} ({room['name_en']}) - {price:,.0f} ฿/คืน")
    
    room_choice = int(input("\nเลือกห้อง (1-3): ")) - 1
    room = config['rooms'][room_choice]
    
    # คำนวณราคา
    check_in_date = datetime.strptime(check_in, '%Y-%m-%d')
    check_out_date = datetime.strptime(check_out, '%Y-%m-%d')
    nights = (check_out_date - check_in_date).days
    season = get_season(check_in_date.month)
    price_per_night = room['prices'][season]
    total = price_per_night * nights
    
    print(f"\n{'='*60}")
    print(f"📋 สรุปการจอง")
    print(f"{'='*60}")
    print(f"ผู้จอง: {guest_name}")
    print(f"ห้อง: {room['name_th']}")
    print(f"เช็คอิน: {check_in} | เช็คเอาท์: {check_out}")
    print(f"จำนวนคืน: {nights} คืน")
    print(f"ราคา/คืน: {price_per_night:,.0f} ฿ ({get_season_name_th(season)})")
    print(f"รวม: {total:,.0f} ฿")
    print(f"{'='*60}\n")
    
    confirm = input("ยืนยันการจอง? (y/n): ")
    if confirm.lower() == 'y':
        booking = {
            "id": f"BK{len(bookings) + 1:04d}",
            "guest_name": guest_name,
            "check_in": check_in,
            "check_out": check_out,
            "room_type": room['id'],
            "room_name": room['name_th'],
            "nights": nights,
            "price_per_night": price_per_night,
            "season": season,
            "total": total,
            "status": "confirmed",
            "created_at": datetime.now().isoformat()
        }
        
        bookings.append(booking)
        save_bookings(bookings)
        
        print(f"\n✅ จองสำเร็จ! รหัสการจอง: {booking['id']}\n")
        
        # บันทึกบัญชี
        record_income(booking)

def record_income(booking):
    """บันทึกรายรับ"""
    accounting = []
    if ACCOUNTING_FILE.exists():
        with open(ACCOUNTING_FILE, 'r', encoding='utf-8') as f:
            accounting = json.load(f)
    
    record = {
        "id": f"INC{len(accounting) + 1:04d}",
        "type": "income",
        "category": "booking",
        "description": f"จองห้อง {booking['room_name']} - {booking['guest_name']}",
        "amount": booking['total'],
        "booking_id": booking['id'],
        "date": booking['created_at']
    }
    
    accounting.append(record)
    with open(ACCOUNTING_FILE, 'w', encoding='utf-8') as f:
        json.dump(accounting, f, ensure_ascii=False, indent=2)
    
    print(f"💰 บันทึกรายรับแล้ว: {booking['total']:,.0f} ฿")

def monthly_report(year=None, month=None):
    """สร้างรายงานประจำเดือน"""
    if year is None:
        year = datetime.now().year
    if month is None:
        month = datetime.now().month
    
    bookings = load_bookings()
    
    print(f"\n{'='*60}")
    print(f"📊 Vela Resort - รายงานประจำเดือน {month}/{year}")
    print(f"{'='*60}\n")
    
    # กรองการจองในเดือนนี้
    monthly_bookings = []
    for booking in bookings:
        booking_date = datetime.fromisoformat(booking['created_at'])
        if booking_date.year == year and booking_date.month == month:
            monthly_bookings.append(booking)
    
    # สรุป
    total_bookings = len(monthly_bookings)
    total_revenue = sum(b['total'] for b in monthly_bookings)
    
    # แยกตามประเภทห้อง
    room_stats = {}
    for booking in monthly_bookings:
        room_type = booking['room_name']
        if room_type not in room_stats:
            room_stats[room_type] = {"count": 0, "revenue": 0}
        room_stats[room_type]["count"] += 1
        room_stats[room_type]["revenue"] += booking['total']
    
    print(f"📈 สรุปการจอง")
    print(f"   จำนวนการจอง: {total_bookings} รายการ")
    print(f"   รายได้รวม: {total_revenue:,.0f} ฿")
    print()
    
    print(f"📊 แยกตามประเภทห้อง:")
    for room_type, stats in room_stats.items():
        print(f"   {room_type}: {stats['count']} การจอง = {stats['revenue']:,.0f} ฿")
    
    print(f"\n{'='*60}\n")

def fix_seasons_text():
    """แนะนำการแก้ไขข้อความ ฤดูเขียว → ฤดูร้อน/ฤดูฝน"""
    print(f"\n{'='*60}")
    print(f"🔄 การแก้ไขข้อความ 'ฤดูเขียว' → 'ฤดูร้อน/ฤดูฝน'")
    print(f"{'='*60}\n")
    
    print("""
วิธีที่ 1: แก้ผ่าน WordPress Admin
──────────────────────────────────
1. เข้า https://vela-resort.com/wp-admin
2. Username: boh | Password: 1234
3. ไปที่ Pages → เลือกหน้าที่มีข้อความ
4. คลิก Edit → แก้ไข:
   - "ฤดูเขียว" → "ฤดูร้อน" (มี.ค.-พ.ค.)
   - "ฤดูเขียว" → "ฤดูฝน" (มิ.ย.-ต.ค.)
5. คลิก Update

วิธีที่ 2: แก้ผ่าน Database (MySQL)
────────────────────────────────────
รันคำสั่ง SQL นี้ใน phpMyAdmin:

UPDATE wp_posts 
SET post_content = REPLACE(post_content, 'ฤดูเขียว', 'ฤดูร้อน') 
WHERE post_content LIKE '%ฤดูเขียว%';

วิธีที่ 3: ใช้ SSH (ถ้ามี access)
─────────────────────────────────
cd /path/to/wordpress
grep -r "ฤดูเขียว" wp-content/

จากนั้นแก้ไขไฟล์ที่พบด้วย text editor

──────────────────────────────────
✅ แนะนำ: ใช้วิธีที่ 1 ง่ายและปลอดภัยที่สุด
""")

def main():
    if len(sys.argv) < 2:
        print(__doc__)
        return
    
    command = sys.argv[1]
    
    if command == "list-bookings":
        list_bookings()
    elif command == "add-booking":
        add_booking()
    elif command == "monthly-report":
        if len(sys.argv) > 3:
            monthly_report(int(sys.argv[2]), int(sys.argv[3]))
        else:
            monthly_report()
    elif command == "fix-seasons":
        fix_seasons_text()
    elif command == "update-price":
        print("⚠️ ฟีเจอร์นี้กำลังพัฒนา")
    else:
        print(f"❌ คำสั่งไม่รู้จัก: {command}")
        print(__doc__)

if __name__ == "__main__":
    main()
