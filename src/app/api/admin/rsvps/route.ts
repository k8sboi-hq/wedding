/**
 * Admin RSVP Management API
 * GET /api/admin/rsvps - List all RSVPs with filters
 * Requires authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAllRSVPs, getRSVPStats, type RSVP } from '@/lib/db/queries';
import { requireAuth } from '@/lib/auth/middleware';
import type { Party, RSVPStatus } from '@/lib/validation/rsvp';

async function handleGET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const party = searchParams.get('party') as Party | null;
    const status = searchParams.get('status') as RSVPStatus | null;
    const search = searchParams.get('search');

    // Build filters
    const filters: {
      party?: Party;
      status?: RSVPStatus;
      search?: string;
    } = {};

    if (party === '1' || party === '2') {
      filters.party = party;
    }

    if (status === 'yes' || status === 'no' || status === 'maybe') {
      filters.status = status;
    }

    if (search && search.trim().length > 0) {
      filters.search = search.trim();
    }

    // Get RSVPs and stats
    const [rsvps, stats] = await Promise.all([
      getAllRSVPs(filters),
      getRSVPStats(),
    ]);

    return NextResponse.json({
      success: true,
      rsvps: rsvps.map(formatRSVPResponse),
      stats,
    });
  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch RSVPs' },
      { status: 500 }
    );
  }
}

// Wrap handler with authentication
export const GET = requireAuth(handleGET);

// ============================================
// Helper Functions
// ============================================

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
