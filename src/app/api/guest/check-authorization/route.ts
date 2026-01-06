/**
 * Public Guest Authorization Check API
 * GET /api/guest/check-authorization - Check if guest is authorized for RSVP
 * No authentication required
 */

import { NextRequest, NextResponse } from 'next/server';
import { isGuestAuthorized } from '@/lib/db/queries';
import { decodeGuestName } from '@/lib/guestUtils';
import type { Party } from '@/lib/validation/rsvp';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const guestParam = searchParams.get('guest');
    const partyParam = searchParams.get('party') as Party | null;

    // Decode guest name from base64
    const guestName = decodeGuestName(guestParam);

    if (!guestName) {
      return NextResponse.json(
        { success: false, error: 'Guest name is required' },
        { status: 400 }
      );
    }

    if (!partyParam || (partyParam !== '1' && partyParam !== '2')) {
      return NextResponse.json(
        { success: false, error: 'Valid party parameter (1 or 2) is required' },
        { status: 400 }
      );
    }

    // Check if guest is authorized
    const authorized = await isGuestAuthorized(guestName, partyParam);

    return NextResponse.json({
      success: true,
      authorized,
      guestName,
      party: partyParam,
    });
  } catch (error) {
    console.error('Error checking guest authorization:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to check authorization' },
      { status: 500 }
    );
  }
}
