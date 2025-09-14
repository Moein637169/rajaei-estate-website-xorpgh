
#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 شروع فرآیند ساخت نسخه وب...\n');

try {
  // Build the web version
  console.log('📦 در حال ساخت فایل‌های وب...');
  execSync('npm run build:web', { stdio: 'inherit' });
  
  // Check if dist folder exists
  const distPath = path.join(process.cwd(), 'dist');
  if (!fs.existsSync(distPath)) {
    throw new Error('پوشه dist ایجاد نشد!');
  }
  
  console.log('\n✅ فایل‌های وب با موفقیت ساخته شدند!');
  console.log('📁 فایل‌ها در پوشه "dist" قرار دارند');
  
  console.log('\n📋 مراحل بعدی:');
  console.log('1. محتویات پوشه "dist" را فشرده کنید');
  console.log('2. به netlify.com بروید و فایل zip را آپلود کنید');
  console.log('3. یا از سایر سرویس‌های میزبانی استفاده کنید');
  
  console.log('\n🌐 برای تست محلی: npm run web');
  
} catch (error) {
  console.error('\n❌ خطا در ساخت نسخه وب:', error.message);
  process.exit(1);
}
