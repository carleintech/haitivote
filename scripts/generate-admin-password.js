/**
 * Generate Admin Password Hash
 * Run: node scripts/generate-admin-password.js YOUR_PASSWORD
 */

const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.error('Usage: node scripts/generate-admin-password.js YOUR_PASSWORD');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);

console.log('\n✅ Password hash generated!\n');
console.log('Add these to your .env.local file:\n');
console.log('ADMIN_USERNAME=admin');
console.log(`ADMIN_PASSWORD_HASH=${hash}`);
console.log('\n');
