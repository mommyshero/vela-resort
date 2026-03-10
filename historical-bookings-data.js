// Historical Booking Data - Vela Resort Umphang
// Period: February 28 - March 22, 2026
// Total: 10 bookings (5 Hytte + 5 Hus)
// Total Revenue: ฿33,350
// Generated: March 6, 2026

const historicalBookings = [
  {
    id: 'BK001',
    bookingNo: '1',
    guestName: 'คุณสมชาย ใจดี',
    phone: '081-234-5678',
    room: 'hytte',
    roomQuantity: 1,
    adults: 2,
    children: 0,
    checkin: '2026-02-28',
    checkout: '2026-03-01',
    nights: 1,
    totalPrice: 950,
    status: 'checked_out',
    paymentStatus: 'paid',
    tours: [],
    createdAt: '2026-02-25T10:30:00.000Z'
  },
  {
    id: 'BK002',
    bookingNo: '2',
    guestName: 'คุณวิไล รักธรรมชาติ',
    phone: '082-345-6789',
    room: 'hytte',
    roomQuantity: 1,
    adults: 2,
    children: 0,
    checkin: '2026-03-01',
    checkout: '2026-03-03',
    nights: 2,
    totalPrice: 4200,
    status: 'checked_out',
    paymentStatus: 'paid',
    tours: ['VIP ทีลอซู 1 วัน'],
    createdAt: '2026-02-26T14:15:00.000Z'
  },
  {
    id: 'BK003',
    bookingNo: '3',
    guestName: 'คุณประเสริฐ สุขใจ',
    phone: '083-456-7890',
    room: 'hytte',
    roomQuantity: 1,
    adults: 2,
    children: 1,
    checkin: '2026-03-02',
    checkout: '2026-03-04',
    nights: 2,
    totalPrice: 3800,
    status: 'checked_out',
    paymentStatus: 'paid',
    tours: ['รถ 4x4 ออนเซ็น'],
    createdAt: '2026-02-27T09:45:00.000Z'
  },
  {
    id: 'BK004',
    bookingNo: '4',
    guestName: 'คุณมานี มีเงิน',
    phone: '084-567-8901',
    room: 'hytte',
    roomQuantity: 1,
    adults: 2,
    children: 0,
    checkin: '2026-03-04',
    checkout: '2026-03-06',
    nights: 2,
    totalPrice: 1900,
    status: 'checked_out',
    paymentStatus: 'paid',
    tours: [],
    createdAt: '2026-03-01T11:20:00.000Z'
  },
  {
    id: 'BK005',
    bookingNo: '5',
    guestName: 'คุณวิชัย เที่ยวไทย',
    phone: '085-678-9012',
    room: 'hytte',
    roomQuantity: 1,
    adults: 2,
    children: 0,
    checkin: '2026-03-05',
    checkout: '2026-03-07',
    nights: 2,
    totalPrice: 4600,
    status: 'checked_out',
    paymentStatus: 'paid',
    tours: ['VIP ทีลอซู-โคทะ 1 วัน'],
    createdAt: '2026-03-02T16:00:00.000Z'
  },
  {
    id: 'BK006',
    bookingNo: '6',
    guestName: 'คุณสุชาติ พักผ่อน',
    phone: '086-789-0123',
    room: 'hus',
    roomQuantity: 1,
    adults: 2,
    children: 0,
    checkin: '2026-03-06',
    checkout: '2026-03-08',
    nights: 2,
    totalPrice: 1500,
    status: 'checked_in',
    paymentStatus: 'paid',
    tours: [],
    createdAt: '2026-03-03T08:30:00.000Z'
  },
  {
    id: 'BK007',
    bookingNo: '7',
    guestName: 'คุณรัชนี ชมวิว',
    phone: '087-890-1234',
    room: 'hus',
    roomQuantity: 1,
    adults: 2,
    children: 0,
    checkin: '2026-03-07',
    checkout: '2026-03-09',
    nights: 2,
    totalPrice: 1900,
    status: 'confirmed',
    paymentStatus: 'paid',
    tours: ['รถ 4x4 ทีลอซู'],
    createdAt: '2026-03-04T13:45:00.000Z'
  },
  {
    id: 'BK008',
    bookingNo: '8',
    guestName: 'คุณสมพงษ์ ล่องแก่ง',
    phone: '088-901-2345',
    room: 'hus',
    roomQuantity: 1,
    adults: 2,
    children: 0,
    checkin: '2026-03-08',
    checkout: '2026-03-10',
    nights: 2,
    totalPrice: 5000,
    status: 'confirmed',
    paymentStatus: 'waiting_payment',
    tours: ['VIP ทีลอซู 1 วัน', 'รถ 4x4 ออนเซ็น'],
    createdAt: '2026-03-05T10:00:00.000Z'
  },
  {
    id: 'BK009',
    bookingNo: '9',
    guestName: 'คุณนริศรา วันหยุด',
    phone: '089-012-3456',
    room: 'hus',
    roomQuantity: 1,
    adults: 2,
    children: 0,
    checkin: '2026-03-14',
    checkout: '2026-03-16',
    nights: 2,
    totalPrice: 1900,
    status: 'pending',
    paymentStatus: 'waiting_payment',
    tours: [],
    createdAt: '2026-03-06T09:15:00.000Z'
  },
  {
    id: 'BK010',
    bookingNo: '10',
    guestName: 'คุณกิตติศักดิ์ ครอบครัวสุข',
    phone: '090-123-4567',
    room: 'hus',
    roomQuantity: 1,
    adults: 4,
    children: 2,
    checkin: '2026-03-20',
    checkout: '2026-03-22',
    nights: 2,
    totalPrice: 5700,
    status: 'pending',
    paymentStatus: 'waiting_payment',
    tours: ['VIP ทีลอซู-โคทะ 1 วัน', 'รถ 4x4 ทีลอซู'],
    createdAt: '2026-03-06T11:30:00.000Z'
  }
];

// Summary:
// Hytte: 5 bookings = ฿15,450
// Hus: 5 bookings = ฿17,900
// Total: 10 bookings = ฿33,350

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = historicalBookings;
}

// Auto-import function for browser
if (typeof window !== 'undefined') {
  window.historicalBookings = historicalBookings;
}
