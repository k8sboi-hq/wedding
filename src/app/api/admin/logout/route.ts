/**
 * Admin Logout API
 * POST /api/admin/logout
 */

import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromCookie, deleteAdminSession, clearSessionCookie } from '@/lib/auth/session';

export async function POST(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get('cookie');
    const token = getTokenFromCookie(cookieHeader);

    if (token) {
      // Delete session from database
      await deleteAdminSession(token);
    }

    // Create response with cleared cookie
    const response = NextResponse.json({
      success: true,
      message: 'Logout successful',
    });

    response.headers.set('Set-Cookie', clearSessionCookie());

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Logout failed' },
      { status: 500 }
    );
  }
}
