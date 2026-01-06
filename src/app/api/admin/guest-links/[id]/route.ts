/**
 * Admin Guest Link Management API
 * PATCH /api/admin/guest-links/[id] - Update guest link sent status
 * DELETE /api/admin/guest-links/[id] - Delete guest link
 * Requires authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { updateGuestLinkSent, deleteGuestLink } from '@/lib/db/queries';
import { requireAuth } from '@/lib/auth/middleware';

async function handlePATCH(
  request: NextRequest,
  context?: { params: Promise<{ id: string }> }
) {
  try {
    if (!context?.params) {
      return NextResponse.json(
        { success: false, error: 'Missing route parameters' },
        { status: 400 }
      );
    }

    const { id } = await context.params;
    const linkId = parseInt(id, 10);

    if (isNaN(linkId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid link ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { sent } = body;

    if (typeof sent !== 'boolean') {
      return NextResponse.json(
        { success: false, error: 'Sent status must be a boolean' },
        { status: 400 }
      );
    }

    const updated = await updateGuestLinkSent(linkId, sent);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Guest link not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      guestLink: {
        id: updated.id,
        guestName: updated.guest_name,
        party: updated.party,
        link: updated.link,
        sent: updated.sent,
        createdAt: updated.created_at.toISOString(),
        updatedAt: updated.updated_at.toISOString(),
      },
    });
  } catch (error) {
    console.error('Error updating guest link:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update guest link' },
      { status: 500 }
    );
  }
}

async function handleDELETE(
  request: NextRequest,
  context?: { params: Promise<{ id: string }> }
) {
  try {
    if (!context?.params) {
      return NextResponse.json(
        { success: false, error: 'Missing route parameters' },
        { status: 400 }
      );
    }

    const { id } = await context.params;
    const linkId = parseInt(id, 10);

    if (isNaN(linkId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid link ID' },
        { status: 400 }
      );
    }

    const deleted = await deleteGuestLink(linkId);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Guest link not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Guest link deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting guest link:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete guest link' },
      { status: 500 }
    );
  }
}

// Wrap handlers with authentication
export const PATCH = requireAuth<{ params: Promise<{ id: string }> }>(
  handlePATCH
);
export const DELETE = requireAuth<{ params: Promise<{ id: string }> }>(
  handleDELETE
);
