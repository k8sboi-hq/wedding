/**
 * Session Management Utilities
 * Handles admin session creation, validation, and cleanup
 */

import { randomBytes } from 'crypto';
import {
  createSession,
  getSessionByToken,
  deleteSession,
} from '../db/queries';

// Session configuration
const SESSION_EXPIRY_HOURS =
  parseInt(process.env.SESSION_EXPIRY_HOURS || '24', 10) || 24;

/**
 * Generate a cryptographically secure random token
 */
function generateToken(): string {
  return randomBytes(32).toString('hex');
}

/**
 * Create a new admin session
 * @returns Session token
 */
export async function createAdminSession(): Promise<string> {
  const token = generateToken();
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + SESSION_EXPIRY_HOURS);

  await createSession(token, expiresAt);

  return token;
}

/**
 * Validate a session token
 * @param token Session token to validate
 * @returns True if session is valid, false otherwise
 */
export async function validateSession(token: string): Promise<boolean> {
  if (!token) {
    return false;
  }

  const session = await getSessionByToken(token);
  return session !== null;
}

/**
 * Delete a session (logout)
 * @param token Session token to delete
 */
export async function deleteAdminSession(token: string): Promise<void> {
  await deleteSession(token);
}

/**
 * Get session token from cookie string
 * @param cookieHeader Cookie header string
 * @returns Session token or null
 */
export function getTokenFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(';').map((c) => c.trim());
  const sessionCookie = cookies.find((c) => c.startsWith('session_token='));

  if (!sessionCookie) {
    return null;
  }

  return sessionCookie.split('=')[1];
}

/**
 * Create a Set-Cookie header for the session token
 * @param token Session token
 * @returns Set-Cookie header value
 */
export function createSessionCookie(token: string): string {
  const maxAge = SESSION_EXPIRY_HOURS * 60 * 60; // Convert hours to seconds
  const isProduction = process.env.NODE_ENV === 'production';

  const cookieAttributes = [
    `session_token=${token}`,
    'HttpOnly',
    'SameSite=Strict',
    'Path=/',
    `Max-Age=${maxAge}`,
  ];

  // Only add Secure flag in production (requires HTTPS)
  if (isProduction) {
    cookieAttributes.splice(2, 0, 'Secure');
  }

  return cookieAttributes.join('; ');
}

/**
 * Create a Set-Cookie header to clear the session cookie
 */
export function clearSessionCookie(): string {
  return [
    'session_token=',
    'HttpOnly',
    'Secure',
    'SameSite=Strict',
    'Path=/',
    'Max-Age=0',
  ].join('; ');
}
