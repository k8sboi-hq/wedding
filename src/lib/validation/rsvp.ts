/**
 * RSVP Validation Utilities
 * Input validation for RSVP submissions
 */

export type RSVPStatus = 'yes' | 'no' | 'maybe';
export type Party = '1' | '2';

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate guest name
 */
export function validateGuestName(name: unknown): ValidationResult {
  if (typeof name !== 'string') {
    return { valid: false, error: 'Guest name must be a string' };
  }

  const trimmed = name.trim();

  if (trimmed.length === 0) {
    return { valid: false, error: 'Guest name is required' };
  }

  if (trimmed.length > 255) {
    return { valid: false, error: 'Guest name is too long (max 255 characters)' };
  }

  return { valid: true };
}

/**
 * Validate party value
 */
export function validateParty(party: unknown): ValidationResult {
  if (party !== '1' && party !== '2') {
    return { valid: false, error: 'Party must be "1" or "2"' };
  }

  return { valid: true };
}

/**
 * Validate RSVP status
 */
export function validateStatus(status: unknown): ValidationResult {
  if (status !== 'yes' && status !== 'no' && status !== 'maybe') {
    return { valid: false, error: 'Status must be "yes", "no", or "maybe"' };
  }

  return { valid: true };
}

/**
 * Validate notes (optional)
 */
export function validateNotes(notes: unknown): ValidationResult {
  if (notes === undefined || notes === null) {
    return { valid: true };
  }

  if (typeof notes !== 'string') {
    return { valid: false, error: 'Notes must be a string' };
  }

  if (notes.length > 1000) {
    return { valid: false, error: 'Notes are too long (max 1000 characters)' };
  }

  return { valid: true };
}

/**
 * Validate complete RSVP submission
 */
export function validateRSVPSubmission(data: {
  guestName: unknown;
  party: unknown;
  status: unknown;
  notes?: unknown;
}): ValidationResult {
  // Validate guest name
  const guestNameResult = validateGuestName(data.guestName);
  if (!guestNameResult.valid) {
    return guestNameResult;
  }

  // Validate party
  const partyResult = validateParty(data.party);
  if (!partyResult.valid) {
    return partyResult;
  }

  // Validate status
  const statusResult = validateStatus(data.status);
  if (!statusResult.valid) {
    return statusResult;
  }

  // Validate notes (optional)
  if (data.notes !== undefined) {
    const notesResult = validateNotes(data.notes);
    if (!notesResult.valid) {
      return notesResult;
    }
  }

  return { valid: true };
}
