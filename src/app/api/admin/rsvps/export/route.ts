/**
 * Admin RSVP Export API
 * GET /api/admin/rsvps/export - Export all RSVPs as CSV
 * Requires authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAllRSVPs } from '@/lib/db/queries';
import { rsvpsToCSV, generateCSVFilename } from '@/lib/utils/csv-export';
import { requireAuth } from '@/lib/auth/middleware';

async function handleGET(request: NextRequest) {
  try {
    // Get all RSVPs (no filters for export)
    const rsvps = await getAllRSVPs();

    // Convert to CSV
    const csv = rsvpsToCSV(rsvps);
    const filename = generateCSVFilename();

    // Return CSV file
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Error exporting RSVPs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to export RSVPs' },
      { status: 500 }
    );
  }
}

// Wrap handler with authentication
export const GET = requireAuth(handleGET);
