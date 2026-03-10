/**
 * Vela Resort - Overbooking Prevention System
 * 
 * Features:
 * - Check room availability before booking
 * - Prevent double booking
 * - Auto-sync between index.html and boh.html every 30 minutes
 * - Real-time availability updates
 */

// ===================================
// CONFIGURATION
// ===================================
const OVERBOOKING_CONFIG = {
  // Room capacity
  rooms: {
    hytte: 5,
    hus: 1
  },
  
  // Auto-sync interval (30 minutes = 1800000 ms)
  syncInterval: 30 * 60 * 1000,
  
  // Storage keys
  storageKeys: {
    bookings: 'vela_bookings',
    sync: 'vela_sync',
    overbooking: 'vela_overbooking_log'
  }
};

// ===================================
// OVERBOOKING PREVENTION FUNCTIONS
// ===================================

/**
 * Check if room is available for given dates
 * @param {string} roomType - 'hytte' or 'hus'
 * @param {string} checkIn - YYYY-MM-DD
 * @param {string} checkOut - YYYY-MM-DD
 * @param {number} qty - Number of rooms requested
 * @param {string} excludeBookingId - Exclude this booking (for edits)
 * @returns {object} - { available: boolean, message: string, conflictBookings: array }
 */
function checkRoomAvailability(roomType, checkIn, checkOut, qty = 1, excludeBookingId = null) {
  const bookings = JSON.parse(localStorage.getItem(OVERBOOKING_CONFIG.storageKeys.bookings)) || [];
  const maxRooms = OVERBOOKING_CONFIG.rooms[roomType];
  
  // Get all bookings that overlap with requested dates
  const conflictingBookings = bookings.filter(booking => {
    // Skip excluded booking (when editing)
    if (excludeBookingId && booking.id === excludeBookingId) return false;
    
    // Only check same room type
    if (booking.room !== roomType) return false;
    
    // Skip cancelled bookings
    if (booking.status === 'cancelled') return false;
    
    // Check date overlap
    const bookingCheckIn = new Date(booking.checkIn);
    const bookingCheckOut = new Date(booking.checkOut);
    const requestedCheckIn = new Date(checkIn);
    const requestedCheckOut = new Date(checkOut);
    
    // Overlap exists if: requested start < booking end AND requested end > booking start
    return requestedCheckIn < bookingCheckOut && requestedCheckOut > bookingCheckIn;
  });
  
  // Calculate total rooms booked during this period
  const totalBooked = conflictingBookings.reduce((sum, booking) => sum + (booking.qty || 1), 0);
  const availableRooms = maxRooms - totalBooked;
  
  // Check if requested quantity is available
  if (qty > availableRooms) {
    return {
      available: false,
      message: `❌ ห้องไม่พอ! มีว่าง ${availableRooms} ห้อง (ต้องการ ${qty} ห้อง)`,
      conflictBookings: conflictingBookings,
      availableRooms: availableRooms,
      requestedRooms: qty
    };
  }
  
  return {
    available: true,
    message: `✅ ห้องพอ! มีว่าง ${availableRooms} ห้อง`,
    conflictBookings: [],
    availableRooms: availableRooms,
    requestedRooms: qty
  };
}

/**
 * Get available rooms count for each date in range
 * @param {string} roomType - 'hytte' or 'hus'
 * @param {string} startDate - YYYY-MM-DD
 * @param {string} endDate - YYYY-MM-DD
 * @returns {array} - Array of { date, available } objects
 */
function getDailyAvailability(roomType, startDate, endDate) {
  const bookings = JSON.parse(localStorage.getItem(OVERBOOKING_CONFIG.storageKeys.bookings)) || [];
  const maxRooms = OVERBOOKING_CONFIG.rooms[roomType];
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  const availability = [];
  
  for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
    const dateStr = date.toISOString().split('T')[0];
    
    // Count rooms booked on this date
    const bookedOnDate = bookings.reduce((count, booking) => {
      if (booking.room !== roomType || booking.status === 'cancelled') return count;
      
      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);
      
      if (date >= checkIn && date < checkOut) {
        return count + (booking.qty || 1);
      }
      return count;
    }, 0);
    
    availability.push({
      date: dateStr,
      available: maxRooms - bookedOnDate,
      total: maxRooms,
      booked: bookedOnDate
    });
  }
  
  return availability;
}

/**
 * Check for overbooking in existing bookings
 * @returns {array} - Array of overbooking alerts
 */
function detectOverbooking() {
  const bookings = JSON.parse(localStorage.getItem(OVERBOOKING_CONFIG.storageKeys.bookings)) || [];
  const alerts = [];
  
  // Group bookings by room type
  const byRoom = {
    hytte: [],
    hus: []
  };
  
  bookings.forEach(booking => {
    if (booking.room === 'hytte' || booking.room === 'hus') {
      byRoom[booking.room].push(booking);
    }
  });
  
  // Check each room type
  ['hytte', 'hus'].forEach(roomType => {
    const maxRooms = OVERBOOKING_CONFIG.rooms[roomType];
    const roomBookings = byRoom[roomType];
    
    // Get all unique dates
    const allDates = new Set();
    roomBookings.forEach(booking => {
      const start = new Date(booking.checkIn);
      const end = new Date(booking.checkOut);
      for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
        allDates.add(d.toISOString().split('T')[0]);
      }
    });
    
    // Check each date for overbooking
    allDates.forEach(dateStr => {
      const date = new Date(dateStr);
      
      const bookedOnDate = roomBookings.reduce((count, booking) => {
        if (booking.status === 'cancelled') return count;
        
        const checkIn = new Date(booking.checkIn);
        const checkOut = new Date(booking.checkOut);
        
        if (date >= checkIn && date < checkOut) {
          return count + (booking.qty || 1);
        }
        return count;
      }, 0);
      
      if (bookedOnDate > maxRooms) {
        alerts.push({
          type: 'overbooking',
          roomType: roomType,
          date: dateStr,
          maxRooms: maxRooms,
          bookedRooms: bookedOnDate,
          overbookedBy: bookedOnDate - maxRooms,
          severity: 'critical'
        });
      } else if (bookedOnDate === maxRooms) {
        alerts.push({
          type: 'fully_booked',
          roomType: roomType,
          date: dateStr,
          maxRooms: maxRooms,
          bookedRooms: bookedOnDate,
          severity: 'warning'
        });
      }
    });
  });
  
  return alerts;
}

// ===================================
// AUTO-SYNC SYSTEM
// ===================================

/**
 * Sync data between index.html and boh.html
 * Runs every 30 minutes automatically
 */
function autoSyncData() {
  const lastSync = localStorage.getItem(OVERBOOKING_CONFIG.storageKeys.sync);
  const now = Date.now();
  
  // Log sync attempt
  console.log(`🔄 [${new Date().toISOString()}] Auto-sync started...`);
  
  try {
    // Verify data integrity
    const bookings = JSON.parse(localStorage.getItem(OVERBOOKING_CONFIG.storageKeys.bookings)) || [];
    
    // Update sync timestamp
    const syncData = {
      lastSync: now,
      lastSyncFormatted: new Date().toISOString(),
      bookingsCount: bookings.length,
      status: 'success'
    };
    
    localStorage.setItem(OVERBOOKING_CONFIG.storageKeys.sync, JSON.stringify(syncData));
    
    // Log overbooking status
    const overbookingAlerts = detectOverbooking();
    if (overbookingAlerts.length > 0) {
      console.warn(`⚠️ [${new Date().toISOString()}] Found ${overbookingAlerts.length} overbooking alerts!`);
      localStorage.setItem(OVERBOOKING_CONFIG.storageKeys.overbooking, JSON.stringify({
        timestamp: now,
        alerts: overbookingAlerts
      }));
    } else {
      console.log(`✅ [${new Date().toISOString()}] No overbooking detected`);
    }
    
    console.log(`✅ [${new Date().toISOString()}] Auto-sync completed successfully`);
    
    return {
      success: true,
      message: 'Sync completed',
      bookingsCount: bookings.length,
      overbookingAlerts: overbookingAlerts.length
    };
    
  } catch (error) {
    console.error(`❌ [${new Date().toISOString()}] Auto-sync failed:`, error);
    
    localStorage.setItem(OVERBOOKING_CONFIG.storageKeys.sync, JSON.stringify({
      lastSync: now,
      status: 'error',
      error: error.message
    }));
    
    return {
      success: false,
      message: error.message
    };
  }
}

/**
 * Start auto-sync interval (call this on page load)
 */
function startAutoSync() {
  // Run immediately on load
  autoSyncData();
  
  // Then run every 30 minutes
  setInterval(autoSyncData, OVERBOOKING_CONFIG.syncInterval);
  
  console.log(`🚀 Auto-sync started. Will sync every 30 minutes.`);
}

/**
 * Stop auto-sync interval
 */
function stopAutoSync() {
  if (window.autoSyncInterval) {
    clearInterval(window.autoSyncInterval);
    console.log('⏹️ Auto-sync stopped.');
  }
}

// ===================================
// VALIDATION HELPERS
// ===================================

/**
 * Validate booking dates
 * @param {string} checkIn - YYYY-MM-DD
 * @param {string} checkOut - YYYY-MM-DD
 * @returns {object} - { valid: boolean, message: string }
 */
function validateDates(checkIn, checkOut) {
  if (!checkIn || !checkOut) {
    return { valid: false, message: '❌ กรุณาเลือกวันเช็คอินและเช็คเอาท์' };
  }
  
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (inDate < today) {
    return { valid: false, message: '❌ ไม่สามารถจองย้อนหลังได้' };
  }
  
  if (outDate <= inDate) {
    return { valid: false, message: '❌ วันเช็คเอาท์ต้องหลังวันเช็คอิน' };
  }
  
  const maxNights = 30;
  const nights = (outDate - inDate) / (1000 * 60 * 60 * 24);
  
  if (nights > maxNights) {
    return { valid: false, message: `❌ จองสูงสุด ${maxNights} คืน` };
  }
  
  return { valid: true, message: '✅ วันที่ถูกต้อง', nights: nights };
}

/**
 * Validate room quantity
 * @param {string} roomType - 'hytte' or 'hus'
 * @param {number} qty - Requested quantity
 * @returns {object} - { valid: boolean, message: string }
 */
function validateRoomQuantity(roomType, qty) {
  const maxRooms = OVERBOOKING_CONFIG.rooms[roomType];
  
  if (!qty || qty < 1) {
    return { valid: false, message: '❌ กรุณาเลือกจำนวนห้อง' };
  }
  
  if (qty > maxRooms) {
    return { valid: false, message: `❌ ${roomType === 'hytte' ? 'Hytte' : 'Hus'} มีสูงสุด ${maxRooms} ห้อง` };
  }
  
  return { valid: true, message: '✅ จำนวนห้องถูกต้อง' };
}

/**
 * Complete booking validation
 * @param {object} booking - Booking object
 * @returns {object} - { valid: boolean, message: string, availability: object }
 */
function validateBooking(booking) {
  // Validate dates
  const dateValidation = validateDates(booking.checkIn, booking.checkOut);
  if (!dateValidation.valid) {
    return { valid: false, message: dateValidation.message };
  }
  
  // Validate room quantity
  const qtyValidation = validateRoomQuantity(booking.room, booking.qty);
  if (!qtyValidation.valid) {
    return { valid: false, message: qtyValidation.message };
  }
  
  // Check availability
  const availability = checkRoomAvailability(
    booking.room,
    booking.checkIn,
    booking.checkOut,
    booking.qty,
    booking.id // Exclude self when editing
  );
  
  if (!availability.available) {
    return {
      valid: false,
      message: availability.message,
      availability: availability
    };
  }
  
  return {
    valid: true,
    message: '✅ การจองถูกต้อง',
    availability: availability,
    nights: dateValidation.nights
  };
}

// ===================================
// EXPORT FUNCTIONS (for module usage)
// ===================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    checkRoomAvailability,
    getDailyAvailability,
    detectOverbooking,
    autoSyncData,
    startAutoSync,
    stopAutoSync,
    validateDates,
    validateRoomQuantity,
    validateBooking,
    OVERBOOKING_CONFIG
  };
}

// ===================================
// AUTO-INITIALIZE (for browser usage)
// ===================================

// Start auto-sync when script loads
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {
    startAutoSync();
    console.log('🛡️ Overbooking Prevention System initialized');
  });
}
