/**
 * Admin Login API
 * POST /api/admin/login
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAdminByUsername } from '@/lib/db/queries';
import { verifyPassword } from '@/lib/auth/password';
import { createAdminSession, createSessionCookie } from '@/lib/auth/session';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Get admin user
    const admin = await getAdminByUsername(username);

    if (!admin) {
      // Don't reveal whether user exists
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const valid = await verifyPassword(password, admin.password_hash);

    if (!valid) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create session
    const sessionToken = await createAdminSession();

    // Create response with session cookie
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
    });

    response.headers.set('Set-Cookie', createSessionCookie(sessionToken));

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    );
  }
}
