// Sample Data for Vela Resort BOH System
// Run this in browser console to populate sample bookings and expenses

const sampleBookings = [
    // Past bookings (completed)
    {
        id: 'BK001',
        guestName: 'คุณสมชาย ใจดี',
        phone: '081-234-5678',
        room: 'hytte',
        roomQuantity: 1,
        checkin: '2026-02-28',
        checkout: '2026-03-01',
        nights: 1,
        totalPrice: 950,
        status: 'checked_out',
        paymentStatus: 'paid',
        tours: [],
        createdAt: '2026-02-25T10:30:00'
    },
    {
        id: 'BK002',
        guestName: 'คุณวิไล รักธรรมชาติ',
        phone: '082-345-6789',
        room: 'hus',
        roomQuantity: 1,
        checkin: '2026-03-01',
        checkout: '2026-03-03',
        nights: 2,
        totalPrice: 4200,
        status: 'checked_out',
        paymentStatus: 'paid',
        tours: ['VIP Thilosu'],
        createdAt: '2026-02-26T14:15:00'
    },
    {
        id: 'BK003',
        guestName: 'คุณประเสริฐ สุขใจ',
        phone: '083-456-7890',
        room: 'hytte',
        roomQuantity: 2,
        checkin: '2026-03-02',
        checkout: '2026-03-04',
        nights: 2,
        totalPrice: 3800,
        status: 'checked_out',
        paymentStatus: 'paid',
        tours: ['4x4 Onsen'],
        createdAt: '2026-02-27T09:00:00'
    },
    {
        id: 'BK004',
        guestName: 'คุณมานี มีเงิน',
        phone: '084-567-8901',
        room: 'hytte',
        roomQuantity: 1,
        checkin: '2026-03-04',
        checkout: '2026-03-06',
        nights: 2,
        totalPrice: 1900,
        status: 'checked_out',
        paymentStatus: 'paid',
        tours: [],
        createdAt: '2026-03-01T11:20:00'
    },
    {
        id: 'BK005',
        guestName: 'คุณวิชัย เที่ยวไทย',
        phone: '085-678-9012',
        room: 'hus',
        roomQuantity: 1,
        checkin: '2026-03-05',
        checkout: '2026-03-07',
        nights: 2,
        totalPrice: 4600,
        status: 'checked_out',
        paymentStatus: 'paid',
        tours: ['VIP Thilosu-Kota'],
        createdAt: '2026-03-02T16:45:00'
    },
    // Current bookings
    {
        id: 'BK006',
        guestName: 'คุณสุชาติ พักผ่อน',
        phone: '086-789-0123',
        room: 'hytte',
        roomQuantity: 1,
        checkin: '2026-03-06',
        checkout: '2026-03-08',
        nights: 2,
        totalPrice: 1500,
        status: 'checked_in',
        paymentStatus: 'paid',
        tours: [],
        createdAt: '2026-03-03T10:00:00'
    },
    {
        id: 'BK007',
        guestName: 'คุณรัชนี ชมวิว',
        phone: '087-890-1234',
        room: 'hytte',
        roomQuantity: 2,
        checkin: '2026-03-07',
        checkout: '2026-03-09',
        nights: 2,
        totalPrice: 3800,
        status: 'confirmed',
        paymentStatus: 'paid',
        tours: ['4x4 Thilosu'],
        createdAt: '2026-03-04T13:30:00'
    },
    {
        id: 'BK008',
        guestName: 'คุณสมพงษ์ ล่องแก่ง',
        phone: '088-901-2345',
        room: 'hus',
        roomQuantity: 1,
        checkin: '2026-03-08',
        checkout: '2026-03-10',
        nights: 2,
        totalPrice: 5000,
        status: 'confirmed',
        paymentStatus: 'waiting_payment',
        tours: ['VIP Thilosu', '4x4 Onsen'],
        createdAt: '2026-03-05T15:00:00'
    },
    // Future bookings
    {
        id: 'BK009',
        guestName: 'คุณนริศรา วันหยุด',
        phone: '089-012-3456',
        room: 'hytte',
        roomQuantity: 1,
        checkin: '2026-03-14',
        checkout: '2026-03-16',
        nights: 2,
        totalPrice: 1900,
        status: 'pending',
        paymentStatus: 'waiting_payment',
        tours: [],
        createdAt: '2026-03-06T09:00:00'
    },
    {
        id: 'BK010',
        guestName: 'คุณกิตติศักดิ์ ครอบครัวสุข',
        phone: '090-123-4567',
        room: 'hytte',
        roomQuantity: 3,
        checkin: '2026-03-20',
        checkout: '2026-03-22',
        nights: 2,
        totalPrice: 5700,
        status: 'pending',
        paymentStatus: 'waiting_payment',
        tours: ['VIP Thilosu-Kota', '4x4 Thilosu'],
        createdAt: '2026-03-06T10:30:00'
    }
];

const samplePettyEntries = [
    // Income
    {
        id: 'INC001',
        type: 'income',
        category: 'room_rental',
        description: 'ค่าห้องพัก คุณสมชาย (Hytte 1 คืน)',
        amount: 950,
        date: '2026-02-28',
        slip: null
    },
    {
        id: 'INC002',
        type: 'income',
        category: 'room_rental',
        description: 'ค่าห้องพัก คุณวิไล (Hus 2 คืน)',
        amount: 3600,
        date: '2026-03-01',
        slip: 'slip-001.jpg'
    },
    {
        id: 'INC003',
        type: 'income',
        category: 'tour',
        description: 'ค่าทัวร์ VIP ทีลอซู คุณวิไล',
        amount: 5800,
        date: '2026-03-02',
        slip: 'slip-002.jpg'
    },
    {
        id: 'INC004',
        type: 'income',
        category: 'room_rental',
        description: 'ค่าห้องพัก คุณประเสริฐ (Hytte 2 ห้อง 2 คืน)',
        amount: 3000,
        date: '2026-03-02',
        slip: 'slip-003.jpg'
    },
    {
        id: 'INC005',
        type: 'income',
        category: 'tour',
        description: 'ค่าทัวร์ 4x4 ออนเซ็น คุณประเสริฐ',
        amount: 1850,
        date: '2026-03-03',
        slip: 'slip-004.jpg'
    },
    {
        id: 'INC006',
        type: 'income',
        category: 'room_rental',
        description: 'ค่าห้องพัก คุณมานี (Hytte 2 คืน)',
        amount: 1500,
        date: '2026-03-04',
        slip: 'slip-005.jpg'
    },
    {
        id: 'INC007',
        type: 'income',
        category: 'room_rental',
        description: 'ค่าห้องพัก คุณวิชัย (Hus 2 คืน)',
        amount: 4200,
        date: '2026-03-05',
        slip: 'slip-006.jpg'
    },
    {
        id: 'INC008',
        type: 'income',
        category: 'tour',
        description: 'ค่าทัวร์ VIP ทีลอซู-โคทะ คุณวิชัย',
        amount: 8300,
        date: '2026-03-05',
        slip: 'slip-007.jpg'
    },
    {
        id: 'INC009',
        type: 'income',
        category: 'room_rental',
        description: 'ค่าห้องพัก คุณสุชาติ (Hytte 2 คืน)',
        amount: 1500,
        date: '2026-03-06',
        slip: 'slip-008.jpg'
    },
    // Expenses
    {
        id: 'EXP001',
        type: 'expense',
        category: 'utilities',
        description: 'ค่าไฟฟ้า เดือนกุมภาพันธ์',
        amount: 2500,
        date: '2026-02-28',
        slip: 'electric-feb.jpg'
    },
    {
        id: 'EXP002',
        type: 'expense',
        category: 'utilities',
        description: 'ค่าน้ำประปา เดือนกุมภาพันธ์',
        amount: 800,
        date: '2026-02-28',
        slip: 'water-feb.jpg'
    },
    {
        id: 'EXP003',
        type: 'expense',
        category: 'supplies',
        description: 'ซื้ออุปกรณ์ทำความสะอาด',
        amount: 1200,
        date: '2026-03-01',
        slip: 'cleaning-supplies.jpg'
    },
    {
        id: 'EXP004',
        type: 'expense',
        category: 'maintenance',
        description: 'ซ่อมแอร์ Hytte 3',
        amount: 1500,
        date: '2026-03-02',
        slip: 'ac-repair.jpg'
    },
    {
        id: 'EXP005',
        type: 'expense',
        category: 'salary',
        description: 'เงินเดือนพนักงาน (คุณสมศักดิ์)',
        amount: 9000,
        date: '2026-03-05',
        slip: 'salary-mar.jpg'
    },
    {
        id: 'EXP006',
        type: 'expense',
        category: 'food',
        description: 'ซื้อวัตถุดิบอาหารเช้า',
        amount: 1800,
        date: '2026-03-05',
        slip: 'breakfast-supplies.jpg'
    },
    {
        id: 'EXP007',
        type: 'expense',
        category: 'maintenance',
        description: 'ซ่อมท่อน้ำ Hus',
        amount: 800,
        date: '2026-03-06',
        slip: 'pipe-repair.jpg'
    },
    {
        id: 'EXP008',
        type: 'expense',
        category: 'supplies',
        description: 'ซื้อสบู่ แชมพู ผ้าเช็ดตัว',
        amount: 2200,
        date: '2026-03-06',
        slip: 'amenities.jpg'
    }
];

// Save to localStorage
console.log('📊 Saving sample bookings...');
localStorage.setItem('vela_bookings', JSON.stringify(sampleBookings));
console.log(`✅ Saved ${sampleBookings.length} bookings`);

console.log('💰 Saving sample petty cash entries...');
localStorage.setItem('vela_petty', JSON.stringify(samplePettyEntries));
console.log(`✅ Saved ${samplePettyEntries.length} entries`);

// Calculate totals
const totalIncome = samplePettyEntries
    .filter(e => e.type === 'income')
    .reduce((sum, e) => sum + e.amount, 0);
const totalExpense = samplePettyEntries
    .filter(e => e.type === 'expense')
    .reduce((sum, e) => sum + e.amount, 0);

console.log('\n📈 Summary:');
console.log(`   Total Income: ฿${totalIncome.toLocaleString()}`);
console.log(`   Total Expense: ฿${totalExpense.toLocaleString()}`);
console.log(`   Net Balance: ฿${(totalIncome - totalExpense).toLocaleString()}`);
console.log(`\n🎉 Sample data loaded successfully! Refresh BOH page to see data.`);
