# Combined Booking System - Implementation Complete ✅

## Summary
Implemented combined room + tour booking system for Vela Resort as specified.

## Changes Made

### 1. Room Selection Layout (Side-by-Side)
**CSS Added:**
- `.room-selection-row` - Flexbox container for side-by-side layout
- `.room-type-card` - Card styling with hover effects and selected state

**HTML Updated:**
- Changed from grid-based `booking-type-selector` to flex-based `room-selection-row`
- Hytte and Hus now displayed left-right in a single row
- Each card shows: Name, Description, and "เลือก" button

### 2. Tour Addon Checkbox
**Location:** Room booking modal, after the date selection form

**Features:**
- Checkbox with label "🗺️ จองทัวร์พร้อมห้องพัก"
- Yellow/gold gradient background for visibility
- Toggles tour selection section visibility

### 3. Tour Selection Section
**Elements:**
- Dropdown (`#combinedTourSelect`) with 5 tour options:
  1. VIP ทีลอซู 1 วัน (฿5,800 / 1-6 คน)
  2. VIP ทีลอซู-โคทะ 1 วัน (฿8,300)
  3. รถ 4x4 ทีลอซู (฿2,500 / 1-10 คน)
  4. รถ 4x4 ออนเซ็น (฿1,850 / 1-5 คน)
  5. ดอยหัวหมด (฿1,000 / 1-5 คน)
- Number input (`#combinedTourPeople`) for tour participants (1-10)

### 4. Combined Price Calculation
**Function:** `calculateCombinedPrice()`

**Features:**
- Calculates room price + tour price
- Tour price adjusts based on number of people
- Shows price breakdown:
  - ค่าห้องพัก (Room price)
  - ค่าทัวร์ (Tour price)
  - รวมทั้งหมด (Total)
- Updates in real-time when tour or people count changes

### 5. Combined Booking Save
**Function:** `saveCombinedBooking()`

**Booking Object Structure:**
```javascript
{
    id: Date.now(),
    type: 'combined',
    roomType: selectedRoomType,
    tourId: tourId,
    tourName: tourName,
    tourPeople: tourPeople,
    name: name,
    phone: phone,
    email: email,
    checkIn: checkIn,
    checkOut: checkOut,
    rooms: rooms,
    roomPrice: roomPrice,
    tourPrice: tourPrice,
    totalPrice: totalPrice,
    createdAt: new Date().toISOString()
}
```

**Success Message Shows:**
- Room type and count
- Check-in/check-out dates
- Tour name and participants
- Price breakdown (room + tour = total)

## JavaScript Functions Added/Modified

1. `toggleTourSelection()` - Shows/hides tour section
2. `calculateCombinedPrice()` - Calculates room + tour total
3. `saveCombinedBooking()` - Saves combined booking to localStorage
4. `calculatePrice()` - Modified to store `window.roomPrice` for combined calculation
5. `confirmRoomBooking()` - Modified to handle combined bookings
6. `selectRoomType()` - Updated to work with new room-type-card elements
7. `openBookingModal()` - Updated to reset tour addon state

## CSS Classes Added

```css
.room-selection-row { 
    display: flex; 
    gap: 1.5rem; 
    margin-bottom: 1.5rem; 
}

.room-type-card { 
    flex: 1; 
    padding: 1.5rem; 
    border: 2px solid var(--light-gray); 
    border-radius: 16px; 
    text-align: center; 
    cursor: pointer; 
    transition: all 0.3s; 
}

.room-type-card:hover { 
    border-color: var(--yellow); 
    transform: translateY(-4px); 
}

.room-type-card.selected { 
    border-color: var(--yellow); 
    background: var(--yellow-light); 
}
```

## Testing Checklist

- [x] Room selection displays Hytte/Hus side-by-side
- [x] Checkbox toggles tour selection visibility
- [x] Tour dropdown shows all 5 tour options
- [x] Tour price calculates based on people count
- [x] Combined price shows room + tour breakdown
- [x] Combined booking saves to localStorage with type 'combined'
- [x] Success message shows complete booking details

## Files Modified

- `/Users/aporclay/.openclaw/workspace/vela-resort/index.html` (154KB, 2480 lines)

## Implementation Date
March 8, 2026
