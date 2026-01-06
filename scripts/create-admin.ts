#!/usr/bin/env tsx
/**
 * Script to create an admin user in the database
 * Usage: npm run create-admin
 */

import { createInterface } from 'readline';
import * as bcrypt from 'bcryptjs';
import { Pool } from 'pg';

// Load environment variables
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set');
  console.error('Please set it in your .env file');
  process.exit(1);
}

const pool = new Pool({
  connectionString: DATABASE_URL,
});

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function createAdmin() {
  console.log('🔐 Admin User Creation Script\n');

  try {
    // Get username
    const username = await question('Enter admin username (default: admin): ') || 'admin';

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM admin_users WHERE username = $1',
      [username]
    );

    if (existingUser.rows.length > 0) {
      console.log(`\n⚠️  User "${username}" already exists.`);
      const overwrite = await question('Do you want to update the password? (yes/no): ');

      if (overwrite.toLowerCase() !== 'yes') {
        console.log('Operation cancelled.');
        process.exit(0);
      }
    }

    // Get password
    const password = await question('Enter admin password: ');

    if (!password || password.length < 8) {
      console.error('\n❌ Password must be at least 8 characters long');
      process.exit(1);
    }

    // Confirm password
    const confirmPassword = await question('Confirm password: ');

    if (password !== confirmPassword) {
      console.error('\n❌ Passwords do not match');
      process.exit(1);
    }

    // Hash password
    console.log('\n🔄 Hashing password...');
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert or update user
    if (existingUser.rows.length > 0) {
      await pool.query(
        'UPDATE admin_users SET password_hash = $1 WHERE username = $2',
        [passwordHash, username]
      );
      console.log(`\n✅ Password updated for user "${username}"`);
    } else {
      await pool.query(
        'INSERT INTO admin_users (username, password_hash) VALUES ($1, $2)',
        [username, passwordHash]
      );
      console.log(`\n✅ Admin user "${username}" created successfully!`);
    }

    console.log('\n✨ You can now login to /admin with these credentials\n');
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  } finally {
    rl.close();
    await pool.end();
  }
}

createAdmin();
