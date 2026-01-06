/**
 * Admin Authorized Guests API
 * POST /api/admin/authorized-guests - Authorize a guest for RSVP
 * No authentication required - called from /admin which has its own password
 */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeGuest } from '@/lib/db/queries';
import type { Party } from '@/lib/validation/rsvp';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { guestName, party } = body;

    // Validate input
    if (!guestName || typeof guestName !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Guest name is required' },
        { status: 400 }
      );
    }

    if (party !== '1' && party !== '2') {
      return NextResponse.json(
        { success: false, error: 'Valid party (1 or 2) is required' },
        { status: 400 }
      );
    }

    // Authorize guest
    const authorizedGuest = await authorizeGuest(guestName.trim(), party as Party);

    return NextResponse.json({
      success: true,
      authorizedGuest: {
        id: authorizedGuest.id,
        guestName: authorizedGuest.guest_name,
        party: authorizedGuest.party,
        createdAt: authorizedGuest.created_at.toISOString(),
      },
    });
  } catch (error) {
    console.error('Error authorizing guest:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to authorize guest' },
      { status: 500 }
    );
  }
}
