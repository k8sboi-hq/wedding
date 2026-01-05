/**
 * Database Query Functions
 * Organized query functions for RSVP and admin operations
 */

import { query } from './connection';

// ============================================
// Type Definitions
// ============================================

export interface RSVP {
  id: number;
  guest_name: string;
  party: '1' | '2';
  status: 'yes' | 'no' | 'maybe';
  notes: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface AdminUser {
  id: number;
  username: string;
  password_hash: string;
  created_at: Date;
}

export interface AdminSession {
  id: string;
  session_token: string;
  expires_at: Date;
  created_at: Date;
}

export interface RSVPStats {
  total: number;
  yes: number;
  no: number;
  maybe: number;
  party1: number;
  party2: number;
}

// ============================================
// RSVP Queries
// ============================================

/**
 * Get RSVP by guest name and party
 */
export async function getRSVPByGuestAndParty(
  guestName: string,
  party: '1' | '2'
): Promise<RSVP | null> {
  const result = await query<RSVP>(
    'SELECT * FROM rsvps WHERE guest_name = $1 AND party = $2',
    [guestName, party]
  );

  return result.rows[0] || null;
}

/**
 * Create or update RSVP (upsert)
 */
export async function upsertRSVP(
  guestName: string,
  party: '1' | '2',
  status: 'yes' | 'no' | 'maybe',
  notes?: string
): Promise<RSVP> {
  const result = await query<RSVP>(
    `INSERT INTO rsvps (guest_name, party, status, notes)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (guest_name, party)
     DO UPDATE SET
       status = EXCLUDED.status,
       notes = EXCLUDED.notes,
       updated_at = NOW()
     RETURNING *`,
    [guestName, party, status, notes || null]
  );

  return result.rows[0];
}

/**
 * Get all RSVPs with optional filters
 */
export async function getAllRSVPs(filters?: {
  party?: '1' | '2';
  status?: 'yes' | 'no' | 'maybe';
  search?: string;
}): Promise<RSVP[]> {
  let queryText = 'SELECT * FROM rsvps WHERE 1=1';
  const params: any[] = [];
  let paramIndex = 1;

  if (filters?.party) {
    queryText += ` AND party = $${paramIndex}`;
    params.push(filters.party);
    paramIndex++;
  }

  if (filters?.status) {
    queryText += ` AND status = $${paramIndex}`;
    params.push(filters.status);
    paramIndex++;
  }

  if (filters?.search) {
    queryText += ` AND guest_name ILIKE $${paramIndex}`;
    params.push(`%${filters.search}%`);
    paramIndex++;
  }

  queryText += ' ORDER BY created_at DESC';

  const result = await query<RSVP>(queryText, params);
  return result.rows;
}

/**
 * Delete RSVP by ID
 */
export async function deleteRSVP(id: number): Promise<boolean> {
  const result = await query('DELETE FROM rsvps WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
}

/**
 * Get RSVP statistics
 */
export async function getRSVPStats(): Promise<RSVPStats> {
  const result = await query<{
    total: string;
    yes: string;
    no: string;
    maybe: string;
    party1: string;
    party2: string;
  }>(`
    SELECT
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE status = 'yes') as yes,
      COUNT(*) FILTER (WHERE status = 'no') as no,
      COUNT(*) FILTER (WHERE status = 'maybe') as maybe,
      COUNT(*) FILTER (WHERE party = '1') as party1,
      COUNT(*) FILTER (WHERE party = '2') as party2
    FROM rsvps
  `);

  const row = result.rows[0];
  return {
    total: parseInt(row.total),
    yes: parseInt(row.yes),
    no: parseInt(row.no),
    maybe: parseInt(row.maybe),
    party1: parseInt(row.party1),
    party2: parseInt(row.party2),
  };
}

// ============================================
// Admin User Queries
// ============================================

/**
 * Get admin user by username
 */
export async function getAdminByUsername(
  username: string
): Promise<AdminUser | null> {
  const result = await query<AdminUser>(
    'SELECT * FROM admin_users WHERE username = $1',
    [username]
  );

  return result.rows[0] || null;
}

/**
 * Create admin user
 */
export async function createAdminUser(
  username: string,
  passwordHash: string
): Promise<AdminUser> {
  const result = await query<AdminUser>(
    'INSERT INTO admin_users (username, password_hash) VALUES ($1, $2) RETURNING *',
    [username, passwordHash]
  );

  return result.rows[0];
}

// ============================================
// Session Queries
// ============================================

/**
 * Create a new session
 */
export async function createSession(
  sessionToken: string,
  expiresAt: Date
): Promise<AdminSession> {
  const result = await query<AdminSession>(
    'INSERT INTO admin_sessions (session_token, expires_at) VALUES ($1, $2) RETURNING *',
    [sessionToken, expiresAt]
  );

  return result.rows[0];
}

/**
 * Get session by token
 */
export async function getSessionByToken(
  sessionToken: string
): Promise<AdminSession | null> {
  const result = await query<AdminSession>(
    'SELECT * FROM admin_sessions WHERE session_token = $1 AND expires_at > NOW()',
    [sessionToken]
  );

  return result.rows[0] || null;
}

/**
 * Delete session by token
 */
export async function deleteSession(sessionToken: string): Promise<boolean> {
  const result = await query(
    'DELETE FROM admin_sessions WHERE session_token = $1',
    [sessionToken]
  );

  return (result.rowCount ?? 0) > 0;
}

/**
 * Delete all expired sessions
 */
export async function cleanupExpiredSessions(): Promise<number> {
  const result = await query('SELECT cleanup_expired_sessions()');
  return result.rows[0].cleanup_expired_sessions;
}
