/**
 * Admin Session Verification API
 * GET /api/admin/verify
 */

import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromCookie, validateSession } from '@/lib/auth/session';

export async function GET(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get('cookie');
    const token = getTokenFromCookie(cookieHeader);

    if (!token) {
      return NextResponse.json({
        success: false,
        authenticated: false,
      });
    }

    const valid = await validateSession(token);

    return NextResponse.json({
      success: true,
      authenticated: valid,
    });
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json(
      { success: false, error: 'Verification failed' },
      { status: 500 }
    );
  }
}
