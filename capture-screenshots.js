const puppeteer = require('puppeteer');

async function captureScreenshots() {
    const browser = await puppeteer.launch({ 
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    
    const devices = [
        { name: 'iPhone-SE', width: 320, height: 568 },
        { name: 'iPhone-12-13', width: 375, height: 812 },
        { name: 'iPhone-Plus-Max', width: 414, height: 896 },
        { name: 'Android', width: 480, height: 854 },
        { name: 'iPad', width: 768, height: 1024 }
    ];
    
    console.log('📸 Capturing mobile screenshots...\n');
    
    for (const device of devices) {
        console.log(`  Capturing ${device.name} (${device.width}x${device.height})...`);
        
        const page = await browser.newPage();
        await page.setViewport({ width: device.width, height: device.height });
        
        try {
            await page.goto('http://localhost:8888/index.html', { 
                waitUntil: 'domcontentloaded',
                timeout: 60000 
            });
            
            // Wait for content to load
            await page.waitForSelector('.hero', { timeout: 10000 });
            await new Promise(r => setTimeout(r, 2000)); // Extra wait for fonts
            
            const screenshotPath = `/Users/aporclay/Desktop/vela-resort/screenshots/${device.name}.png`;
            await page.screenshot({ path: screenshotPath, fullPage: true });
            console.log(`    ✅ Saved: ${screenshotPath}`);
        } catch (error) {
            console.log(`    ❌ Error: ${error.message}`);
        }
        
        await page.close();
    }
    
    await browser.close();
    console.log('\n✅ Screenshot capture complete!');
}

captureScreenshots().catch(console.error);
