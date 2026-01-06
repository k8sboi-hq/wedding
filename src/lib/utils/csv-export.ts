/**
 * CSV Export Utility
 * Generate CSV files from RSVP data
 */

import { RSVP } from '../db/queries';

/**
 * Escape CSV field values
 */
function escapeCSVField(field: any): string {
  if (field === null || field === undefined) {
    return '';
  }

  const str = String(field);

  // If field contains comma, quote, or newline, wrap in quotes and escape quotes
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }

  return str;
}

/**
 * Convert RSVPs to CSV format
 */
export function rsvpsToCSV(rsvps: RSVP[]): string {
  // CSV Header
  const headers = [
    'ID',
    'Guest Name',
    'Party',
    'Status',
    'Notes',
    'Created At',
    'Updated At',
  ];

  const csvRows: string[] = [headers.join(',')];

  // CSV Data Rows
  for (const rsvp of rsvps) {
    const partyLabel = rsvp.party === '1' ? 'Party 1 (Bride)' : 'Party 2 (Groom)';
    const statusLabel =
      rsvp.status === 'yes' ? 'Yes' : rsvp.status === 'no' ? 'No' : 'Maybe';

    const row = [
      escapeCSVField(rsvp.id),
      escapeCSVField(rsvp.guest_name),
      escapeCSVField(partyLabel),
      escapeCSVField(statusLabel),
      escapeCSVField(rsvp.notes),
      escapeCSVField(rsvp.created_at.toISOString()),
      escapeCSVField(rsvp.updated_at.toISOString()),
    ];

    csvRows.push(row.join(','));
  }

  return csvRows.join('\n');
}

/**
 * Generate CSV filename with timestamp
 */
export function generateCSVFilename(): string {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
  return `wedding-rsvps-${dateStr}.csv`;
}
