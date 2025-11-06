#!/usr/bin/env node

/**
 * TECHKLEIN VOTELIVE - Admin Password Hash Generator
 * 
 * Usage: node scripts/generate-admin-hash.js <password>
 * Example: node scripts/generate-admin-hash.js YourStrongAdminPassword123!
 */

const bcrypt = require('bcryptjs');

function generateHash() {
  const password = process.argv[2];

  if (!password) {
    console.error('❌ Error: Password argument required');
    console.log('\n📖 Usage: node scripts/generate-admin-hash.js <password>');
    console.log('Example: node scripts/generate-admin-hash.js YourStrongAdminPassword123!\n');
    process.exit(1);
  }

  if (password.length < 12) {
    console.warn('⚠️  Warning: Password should be at least 12 characters long\n');
  }

  console.log('🔐 Generating bcrypt hash (12 rounds)...\n');
  
  const hash = bcrypt.hashSync(password, 12);

  console.log('✅ Hash generated successfully!\n');
  console.log('📋 Copy this value to your .env.local file:\n');
  console.log(`ADMIN_PASSWORD_HASH="${hash}"\n`);
  console.log('⚠️  Keep this hash secure and never commit it to version control!\n');

  return hash;
}

generateHash();
