/**
 * Admin Guest Links API
 * GET /api/admin/guest-links - List all guest links
 * POST /api/admin/guest-links - Create a new guest link
 * Requires authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAllGuestLinks, upsertGuestLink, authorizeGuest } from '@/lib/db/queries';
import { requireAuth } from '@/lib/auth/middleware';
import type { Party } from '@/lib/validation/rsvp';

async function handleGET(request: NextRequest) {
  try {
    const guestLinks = await getAllGuestLinks();

    return NextResponse.json({
      success: true,
      guestLinks: guestLinks.map((link) => ({
        id: link.id,
        guestName: link.guest_name,
        party: link.party,
        link: link.link,
        sent: link.sent,
        createdAt: link.created_at.toISOString(),
        updatedAt: link.updated_at.toISOString(),
      })),
    });
  } catch (error) {
    console.error('Error fetching guest links:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch guest links' },
      { status: 500 }
    );
  }
}

async function handlePOST(request: NextRequest) {
  try {
    const body = await request.json();
    const { guestName, party, link } = body;

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

    if (!link || typeof link !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Link is required' },
        { status: 400 }
      );
    }

    // Create guest link
    const guestLink = await upsertGuestLink(
      guestName.trim(),
      party as Party,
      link,
      false
    );

    // Also authorize guest for RSVP access
    await authorizeGuest(guestName.trim(), party as Party);

    return NextResponse.json({
      success: true,
      guestLink: {
        id: guestLink.id,
        guestName: guestLink.guest_name,
        party: guestLink.party,
        link: guestLink.link,
        sent: guestLink.sent,
        createdAt: guestLink.created_at.toISOString(),
        updatedAt: guestLink.updated_at.toISOString(),
      },
    });
  } catch (error) {
    console.error('Error creating guest link:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create guest link' },
      { status: 500 }
    );
  }
}

// Wrap handlers with authentication
export const GET = requireAuth(handleGET);
export const POST = requireAuth(handlePOST);
