/**
 * Utility functions for handling guest names in URL parameters
 * Guest names are base64-encoded to safely handle Vietnamese characters and spaces
 */

/**
 * Encode a guest name to base64 for URL usage
 * @param name - The guest name to encode
 * @returns Base64-encoded string safe for URLs
 */
export function encodeGuestName(name: string): string {
  if (!name || name.trim() === '') {
    return '';
  }

  try {
    // Use Buffer in Node.js environment, btoa in browser
    if (typeof window === 'undefined') {
      // Server-side (Node.js)
      return Buffer.from(name, 'utf-8').toString('base64');
    } else {
      // Client-side (browser)
      return btoa(unescape(encodeURIComponent(name)));
    }
  } catch (error) {
    console.error('Failed to encode guest name:', error);
    return '';
  }
}

/**
 * Decode a base64-encoded guest name from URL parameter
 * @param encoded - The base64-encoded guest name
 * @returns Decoded guest name, or null if invalid/empty
 */
export function decodeGuestName(encoded: string | null | undefined): string | null {
  if (!encoded || encoded.trim() === '') {
    return null;
  }

  // Basic validation: base64 should only contain A-Z, a-z, 0-9, +, /, and = for padding
  const base64Regex = /^[A-Za-z0-9+/]+=*$/;
  if (!base64Regex.test(encoded)) {
    console.warn('Invalid base64 format, treating as no guest:', encoded);
    return null;
  }

  try {
    let decoded: string;

    // Use Buffer in Node.js environment, atob in browser
    if (typeof window === 'undefined') {
      // Server-side (Node.js)
      decoded = Buffer.from(encoded, 'base64').toString('utf-8');
    } else {
      // Client-side (browser)
      decoded = decodeURIComponent(escape(atob(encoded)));
    }

    // Additional validation: decoded string should have printable characters
    // and not be empty after trimming
    if (!decoded || decoded.trim() === '' || decoded.includes('\x00')) {
      console.warn('Decoded guest name is invalid, treating as no guest');
      return null;
    }

    return decoded;
  } catch (error) {
    // Silently fail and return null for invalid base64
    console.warn('Failed to decode guest name, treating as no guest:', error);
    return null;
  }
}

/**
 * Validate if a string is valid base64
 * @param str - String to validate
 * @returns True if valid base64
 */
export function isValidBase64(str: string): boolean {
  if (!str || str.trim() === '') {
    return false;
  }

  try {
    // Try to decode and re-encode to verify
    const decoded = decodeGuestName(str);
    if (!decoded) return false;

    const reencoded = encodeGuestName(decoded);
    return reencoded === str;
  } catch {
    return false;
  }
}
