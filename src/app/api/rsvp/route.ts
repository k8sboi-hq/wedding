/**
 * Public RSVP API Endpoints
 * Handles guest RSVP submissions and retrieval
 * No authentication required - guest name in URL is the "secret"
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  getRSVPByGuestAndParty,
  upsertRSVP,
  type RSVP,
} from '@/lib/db/queries';
import { decodeGuestName } from '@/lib/guestUtils';
import {
  validateRSVPSubmission,
  type RSVPStatus,
  type Party,
} from '@/lib/validation/rsvp';

// ============================================
// GET /api/rsvp - Get existing RSVP
// ============================================

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

    // Get RSVP from database
    const rsvp = await getRSVPByGuestAndParty(guestName, partyParam);

    return NextResponse.json({
      success: true,
      rsvp: rsvp ? formatRSVPResponse(rsvp) : null,
    });
  } catch (error) {
    console.error('Error getting RSVP:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve RSVP' },
      { status: 500 }
    );
  }
}

// ============================================
// POST /api/rsvp - Create or update RSVP
// ============================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { guestName, party, status, notes } = body;

    // Validate input
    const validation = validateRSVPSubmission({
      guestName,
      party,
      status,
      notes,
    });

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // Upsert RSVP in database
    const rsvp = await upsertRSVP(
      guestName,
      party as Party,
      status as RSVPStatus,
      notes
    );

    return NextResponse.json({
      success: true,
      rsvp: formatRSVPResponse(rsvp),
    });
  } catch (error) {
    console.error('Error creating/updating RSVP:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save RSVP' },
      { status: 500 }
    );
  }
}

// ============================================
// Helper Functions
// ============================================

/**
 * Format RSVP for API response (camelCase, formatted dates)
 */
function formatRSVPResponse(rsvp: RSVP) {
  return {
    id: rsvp.id,
    guestName: rsvp.guest_name,
    party: rsvp.party,
    status: rsvp.status,
    notes: rsvp.notes,
    createdAt: rsvp.created_at.toISOString(),
    updatedAt: rsvp.updated_at.toISOString(),
  };
}
