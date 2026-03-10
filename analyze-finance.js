// Analyze Vela Resort Financial Data
const fs = require('fs');

// Load Petty Cash Data
const pettyCashContent = fs.readFileSync('petty-cash-data.js', 'utf8');
const pettyCashMatch = pettyCashContent.match(/const pettyCashData = (\[[\s\S]*?\]);/);
const pettyCashData = pettyCashMatch ? eval(pettyCashMatch[1]) : [];

// Load Excel Bookings Raw
const excelBookingsRaw = JSON.parse(fs.readFileSync('excel-bookings-raw.json', 'utf8'));

// Load Excel Bookings
const excelBookingsContent = fs.readFileSync('excel-bookings-data.js', 'utf8');
const excelBookingsMatch = excelBookingsContent.match(/const excelBookings = (\[[\s\S]*?\]);/);
const excelBookings = excelBookingsMatch ? eval(excelBookingsMatch[1]) : [];

console.log('=== 📊 VELA RESORT FINANCIAL REPORT ===\n');

// Petty Cash Analysis
console.log('💵 PETTY CASH ANALYSIS');
console.log('─'.repeat(50));
const pcIncome = pettyCashData.filter(x => x.type === 'income');
const pcExpense = pettyCashData.filter(x => x.type === 'expense');
const totalIncome = pcIncome.reduce((sum, x) => sum + x.amount, 0);
const totalExpense = pcExpense.reduce((sum, x) => sum + x.amount, 0);
const balance = totalIncome - totalExpense;

console.log(`Total Items: ${pettyCashData.length}`);
console.log(`Income Items: ${pcIncome.length}`);
console.log(`Expense Items: ${pcExpense.length}`);
console.log(`Total Income: ฿${totalIncome.toLocaleString()}`);
console.log(`Total Expense: ฿${totalExpense.toLocaleString()}`);
console.log(`Balance: ฿${balance.toLocaleString()}`);
console.log('');

// Excel Bookings Raw Analysis
console.log('📝 BOOKINGS (excel-bookings-raw.json)');
console.log('─'.repeat(50));
console.log(`Total Records: ${excelBookingsRaw.length}`);

// Calculate revenue from col_12 (total price)
const bookingsWithRevenue = excelBookingsRaw.filter(x => x.col_12 && x.col_12 > 0);
const totalBookingRevenue = bookingsWithRevenue.reduce((sum, x) => sum + (x.col_12 || 0), 0);
console.log(`Bookings with Revenue: ${bookingsWithRevenue.length}`);
console.log(`Total Revenue: ฿${totalBookingRevenue.toLocaleString()}`);
console.log('');

// Excel Bookings Data Analysis
console.log('📋 EXCEL BOOKINGS DATA (47 items)');
console.log('─'.repeat(50));
console.log(`Total Items: ${excelBookings.length}`);

const roomRevenue = excelBookings.reduce((sum, x) => sum + (x.roomPrice || 0), 0);
const tourRevenue = excelBookings.reduce((sum, x) => sum + (x.tourPrice || 0), 0);
const mattressRevenue = excelBookings.reduce((sum, x) => sum + (x.mattress || 0), 0);
const tourCost = excelBookings.reduce((sum, x) => sum + (x.tourCost || 0), 0);
const totalRevenue = roomRevenue + tourRevenue + mattressRevenue;
const tourProfit = tourRevenue - tourCost;

console.log(`Room Revenue: ฿${roomRevenue.toLocaleString()}`);
console.log(`Tour Revenue: ฿${tourRevenue.toLocaleString()}`);
console.log(`Mattress Revenue: ฿${mattressRevenue.toLocaleString()}`);
console.log(`Tour Cost: ฿${tourCost.toLocaleString()}`);
console.log(`Total Revenue: ฿${totalRevenue.toLocaleString()}`);
console.log(`Tour Profit: ฿${tourProfit.toLocaleString()}`);
console.log('');

// Summary
console.log('📊 SUMMARY');
console.log('─'.repeat(50));
console.log(`Petty Cash Balance: ฿${balance.toLocaleString()}`);
console.log(`Bookings Revenue: ฿${totalRevenue.toLocaleString()}`);
console.log(`Tour Profit: ฿${tourProfit.toLocaleString()}`);
console.log('');
console.log('✅ Data analysis complete!');
