/**
 * Authentication Middleware
 * Protects admin routes by validating session tokens
 */

import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromCookie, validateSession } from './session';

/**
 * Check if a request is authenticated
 * @param request Next.js request object
 * @returns True if authenticated, false otherwise
 */
export async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const cookieHeader = request.headers.get('cookie');
  const token = getTokenFromCookie(cookieHeader);

  if (!token) {
    return false;
  }

  return await validateSession(token);
}

/**
 * Require authentication for a route
 * Returns 401 Unauthorized if not authenticated
 * @param handler Route handler function
 * @returns Wrapped handler with auth check
 */
export function requireAuth(
  handler: (request: NextRequest) => Promise<NextResponse> | NextResponse
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const authenticated = await isAuthenticated(request);

    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return handler(request);
  };
}
