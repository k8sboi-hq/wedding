/**
 * Admin RSVP Delete API
 * DELETE /api/admin/rsvps/[id] - Delete specific RSVP
 * Requires authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { deleteRSVP } from '@/lib/db/queries';
import { requireAuth } from '@/lib/auth/middleware';

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
    const rsvpId = parseInt(id, 10);

    if (isNaN(rsvpId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid RSVP ID' },
        { status: 400 }
      );
    }

    const deleted = await deleteRSVP(rsvpId);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'RSVP not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'RSVP deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting RSVP:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete RSVP' },
      { status: 500 }
    );
  }
}

// Wrap handler with authentication
export const DELETE = requireAuth<{ params: Promise<{ id: string }> }>(
  handleDELETE
);
