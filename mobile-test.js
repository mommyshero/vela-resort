const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const testDevices = [
    { name: 'iPhone SE', width: 320, height: 568 },
    { name: 'iPhone 12/13', width: 375, height: 812 },
    { name: 'iPhone Plus/Max', width: 414, height: 896 },
    { name: 'Android', width: 480, height: 854 },
    { name: 'iPad', width: 768, height: 1024 }
];

const testFeatures = [
    'Navigation (Hamburger menu)',
    'Hero section (รูปไม่ล้น)',
    'Rooms (จองได้)',
    'Gallery (รูปแสดงครบ)',
    'Tours (dropdown ทำงาน)',
    'Contact (เบอร์โทรคลิกได้)',
    'Booking modal (ไม่ล้นจอ)',
    'Language switcher (TH/EN)'
];

const checks = [
    'ไม่มี horizontal scroll',
    'ทุกปุ่มกดได้',
    'ข้อความอ่านง่าย',
    'รูปไม่แตก',
    'โหลดเร็ว'
];

async function runTests() {
    const browser = await puppeteer.launch({ headless: 'new' });
    const results = {
        bugs: [],
        passed: [],
        testedDevices: [],
        testedFeatures: []
    };

    const testUrl = 'http://localhost:8888/index.html';
    
    console.log('🔍 Starting Mobile QA Testing for Vela Resort\n');
    console.log('Test URL:', testUrl);
    console.log('='.repeat(60));

    for (const device of testDevices) {
        console.log(`\n📱 Testing: ${device.name} (${device.width}x${device.height})`);
        results.testedDevices.push(device.name);
        
        const page = await browser.newPage();
        await page.setViewport({ width: device.width, height: device.height });
        await page.goto(testUrl, { waitUntil: 'networkidle0', timeout: 30000 });
        
        // Check for horizontal scroll
        const hasHorizontalScroll = await page.evaluate(() => {
            return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });
        
        if (hasHorizontalScroll) {
            results.bugs.push({
                severity: 'สูง',
                device: device.name,
                feature: 'Layout',
                issue: 'มี horizontal scroll',
                steps: `เปิดบน ${device.name} (${device.width}px) จะเห็น horizontal scroll bar`
            });
            console.log(`  ❌ Horizontal scroll detected!`);
        } else {
            console.log(`  ✅ No horizontal scroll`);
        }

        // Check navigation
        const navVisible = await page.evaluate(() => {
            const nav = document.querySelector('nav#navbar');
            const hamburger = document.querySelector('.hamburger');
            return nav && (window.innerWidth > 768 || hamburger);
        });
        
        if (navVisible) {
            console.log(`  ✅ Navigation visible`);
        } else {
            results.bugs.push({
                severity: 'สูง',
                device: device.name,
                feature: 'Navigation',
                issue: 'Navigation ไม่แสดง',
                steps: `เปิดบน ${device.name} แล้วไม่พบ navigation`
            });
            console.log(`  ❌ Navigation issue!`);
        }

        // Check hero section
        const heroOverflow = await page.evaluate(() => {
            const hero = document.querySelector('.hero');
            if (!hero) return true;
            const heroContent = document.querySelector('.hero-content');
            return heroContent && heroContent.offsetWidth <= hero.offsetWidth;
        });
        
        if (heroOverflow) {
            console.log(`  ✅ Hero section OK`);
        } else {
            results.bugs.push({
                severity: 'กลาง',
                device: device.name,
                feature: 'Hero Section',
                issue: 'Hero content ล้นหน้าจอ',
                steps: `เปิดบน ${device.name} Hero content ล้นขอบ`
            });
            console.log(`  ❌ Hero overflow!`);
        }

        // Check language switcher
        const langSwitcher = await page.evaluate(() => {
            const switcher = document.querySelector('.lang-switch');
            return switcher && switcher.offsetParent !== null;
        });
        
        if (langSwitcher) {
            console.log(`  ✅ Language switcher visible`);
        } else {
            results.bugs.push({
                severity: 'ต่ำ',
                device: device.name,
                feature: 'Language Switcher',
                issue: 'Language switcher ไม่แสดง',
                steps: `เปิดบน ${device.name} แล้วไม่พบ language switcher`
            });
            console.log(`  ❌ Language switcher issue!`);
        }

        // Check buttons are clickable
        const buttonsClickable = await page.evaluate(() => {
            const buttons = document.querySelectorAll('button, .btn, .btn-primary');
            return Array.from(buttons).every(btn => {
                const style = window.getComputedStyle(btn);
                return style.pointerEvents !== 'none' && style.display !== 'none';
            });
        });
        
        if (buttonsClickable) {
            console.log(`  ✅ All buttons clickable`);
        } else {
            results.bugs.push({
                severity: 'สูง',
                device: device.name,
                feature: 'Buttons',
                issue: 'มีปุ่มที่กดไม่ได้',
                steps: `เปิดบน ${device.name} มีปุ่มบางปุ่มกดไม่ได้`
            });
            console.log(`  ❌ Some buttons not clickable!`);
        }

        // Check text readability
        const textReadable = await page.evaluate(() => {
            const elements = document.querySelectorAll('h1, h2, h3, p, span, label');
            return Array.from(elements).every(el => {
                const style = window.getComputedStyle(el);
                const fontSize = parseFloat(style.fontSize);
                return fontSize >= 12; // Minimum readable size
            });
        });
        
        if (textReadable) {
            console.log(`  ✅ Text readable (font >= 12px)`);
        } else {
            results.bugs.push({
                severity: 'กลาง',
                device: device.name,
                feature: 'Typography',
                issue: 'ข้อความเล็กเกินไป อ่านยาก',
                steps: `เปิดบน ${device.name} พบข้อความขนาดเล็กกว่า 12px`
            });
            console.log(`  ❌ Text too small!`);
        }

        // Take screenshot
        const screenshotPath = `/Users/aporclay/Desktop/vela-resort/screenshots/${device.name.replace(/\s+/g, '-')}.png`;
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`  📸 Screenshot saved: ${screenshotPath}`);

        await page.close();
    }

    // Test specific features
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Testing Specific Features\n');
    
    const page = await browser.newPage();
    await page.setViewport({ width: 375, height: 812 }); // iPhone 12/13
    await page.goto(testUrl, { waitUntil: 'networkidle0', timeout: 30000 });

    // Test hamburger menu
    const hamburgerWorks = await page.evaluate(() => {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        if (!hamburger || !navLinks) return false;
        hamburger.click();
        return navLinks.classList.contains('active');
    });
    
    if (hamburgerWorks) {
        console.log('  ✅ Hamburger menu works');
        results.passed.push('Hamburger menu');
    } else {
        results.bugs.push({
            severity: 'สูง',
            device: 'iPhone 12/13',
            feature: 'Hamburger Menu',
            issue: 'Hamburger menu ไม่ทำงาน',
            steps: 'คลิก hamburger icon แล้ว menu ไม่เปิด'
        });
        console.log('  ❌ Hamburger menu not working!');
    }

    // Test booking modal
    const modalWorks = await page.evaluate(() => {
        const btn = document.querySelector('button[onclick*="openBookingModal"]');
        const modal = document.querySelector('.modal-overlay');
        if (!btn || !modal) return false;
        btn.click();
        return modal.classList.contains('active');
    });
    
    if (modalWorks) {
        console.log('  ✅ Booking modal opens');
        results.passed.push('Booking modal');
        
        // Check modal doesn't overflow
        const modalFits = await page.evaluate(() => {
            const modal = document.querySelector('.modal-container');
            if (!modal) return false;
            return modal.offsetWidth <= window.innerWidth && modal.offsetHeight <= window.innerHeight;
        });
        
        if (modalFits) {
            console.log('  ✅ Booking modal fits screen');
            results.passed.push('Booking modal fits');
        } else {
            results.bugs.push({
                severity: 'สูง',
                device: 'iPhone 12/13',
                feature: 'Booking Modal',
                issue: 'Modal ล้นหน้าจอ',
                steps: 'เปิด booking modal แล้ว modal ล้นขอบจอ'
            });
            console.log('  ❌ Booking modal overflows!');
        }
    } else {
        results.bugs.push({
            severity: 'สูง',
            device: 'iPhone 12/13',
            feature: 'Booking Modal',
            issue: 'Booking modal ไม่เปิด',
            steps: 'คลิกปุ่ม "จองห้องนี้" แล้ว modal ไม่เปิด'
        });
        console.log('  ❌ Booking modal not opening!');
    }

    // Test gallery
    const galleryWorks = await page.evaluate(() => {
        const items = document.querySelectorAll('.gallery-item');
        return items.length > 0;
    });
    
    if (galleryWorks) {
        console.log('  ✅ Gallery images present');
        results.passed.push('Gallery');
    } else {
        results.bugs.push({
            severity: 'กลาง',
            device: 'iPhone 12/13',
            feature: 'Gallery',
            issue: 'Gallery ไม่มีรูปภาพ',
            steps: 'เลื่อนไปที่ Gallery section แล้วไม่พบรูปภาพ'
        });
        console.log('  ❌ Gallery empty!');
    }

    // Test language switcher links
    const langSwitcherWorks = await page.evaluate(() => {
        const links = document.querySelectorAll('.lang-switch a');
        return links.length === 2;
    });
    
    if (langSwitcherWorks) {
        console.log('  ✅ Language switcher has TH/EN');
        results.passed.push('Language switcher');
    } else {
        results.bugs.push({
            severity: 'ต่ำ',
            device: 'iPhone 12/13',
            feature: 'Language Switcher',
            issue: 'Language switcher ไม่ครบ TH/EN',
            steps: 'ตรวจสอบ language switcher แล้วไม่พบทั้ง TH และ EN'
        });
        console.log('  ❌ Language switcher incomplete!');
    }

    // Test rooms section
    const roomsBookable = await page.evaluate(() => {
        const roomCards = document.querySelectorAll('.room-card');
        const bookButtons = document.querySelectorAll('button[onclick*="openBookingModal"]');
        return roomCards.length > 0 && bookButtons.length > 0;
    });
    
    if (roomsBookable) {
        console.log('  ✅ Rooms section with booking buttons');
        results.passed.push('Rooms booking');
    } else {
        results.bugs.push({
            severity: 'สูง',
            device: 'iPhone 12/13',
            feature: 'Rooms',
            issue: 'Rooms section ไม่สมบูรณ์',
            steps: 'เลื่อนไปที่ Rooms section แล้วไม่พบห้องหรือปุ่มจอง'
        });
        console.log('  ❌ Rooms section issue!');
    }

    // Test tours dropdown
    const toursDropdown = await page.evaluate(() => {
        const tourCards = document.querySelectorAll('.tour-card');
        const peopleSelects = document.querySelectorAll('select[id*="people"]');
        return tourCards.length > 0 && peopleSelects.length > 0;
    });
    
    if (toursDropdown) {
        console.log('  ✅ Tours section with dropdowns');
        results.passed.push('Tours dropdown');
    } else {
        results.bugs.push({
            severity: 'กลาง',
            device: 'iPhone 12/13',
            feature: 'Tours',
            issue: 'Tours dropdown ไม่ทำงาน',
            steps: 'ตรวจสอบ Tours section แล้วไม่พบ dropdown เลือกจำนวนคน'
        });
        console.log('  ❌ Tours dropdown issue!');
    }

    // Test contact section
    const contactClickable = await page.evaluate(() => {
        const contactLink = document.querySelector('a[href*="contact"]');
        const navDesc = document.querySelector('.nav-desc');
        return navDesc && navDesc.textContent.includes('098');
    });
    
    if (contactClickable) {
        console.log('  ✅ Contact phone number visible');
        results.passed.push('Contact');
    } else {
        results.bugs.push({
            severity: 'ต่ำ',
            device: 'iPhone 12/13',
            feature: 'Contact',
            issue: 'เบอร์โทรติดต่อไม่แสดง',
            steps: 'ตรวจสอบ navigation แล้วไม่พบเบอร์โทร 098-908-4356'
        });
        console.log('  ❌ Contact info issue!');
    }

    await page.close();
    await browser.close();

    // Generate report
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST SUMMARY\n');
    
    console.log('✅ สิ่งที่ทดสอบผ่าน:');
    results.passed.forEach(item => console.log(`  • ${item}`));
    
    console.log('\n❌ Bugs Found:');
    if (results.bugs.length === 0) {
        console.log('  🎉 ไม่มี bugs!');
    } else {
        results.bugs.forEach((bug, i) => {
            console.log(`\n  Bug #${i + 1}:`);
            console.log(`    ความรุนแรง: ${bug.severity}`);
            console.log(`    Device: ${bug.device}`);
            console.log(`    Feature: ${bug.feature}`);
            console.log(`    Issue: ${bug.issue}`);
            console.log(`    Steps: ${bug.steps}`);
        });
    }

    // Save report
    const reportPath = '/Users/aporclay/Desktop/vela-resort/mobile-qa-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`\n💾 Report saved to: ${reportPath}`);

    return results;
}

runTests().catch(console.error);
