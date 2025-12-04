// Auth utility functions for Supabase integration

/**
 * Simple password hashing for demo purposes
 * In production, Supabase Auth handles password hashing automatically
 * This is only for backward compatibility with demo/test accounts
 */
export async function hashPassword(password: string): Promise<string> {
  // For demo purposes, we'll use a simple hash
  // In production, Supabase Auth handles this
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'sanjari_salt');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Verify password against hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (Indian format)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/[\s\-\+]/g, ''));
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 6) {
    return { valid: false, message: "Password must be at least 6 characters long" };
  }
  if (password.length > 50) {
    return { valid: false, message: "Password must be less than 50 characters" };
  }
  return { valid: true };
}

/**
 * Format phone number to Indian format
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/[\s\-\+]/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned}`;
  }
  return phone;
}

/**
 * Generate a random order number
 */
export function generateOrderNumber(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `ORD${timestamp}${random}`;
}

/**
 * Check if user has admin role
 */
export function isAdmin(role?: string): boolean {
  return role === 'admin';
}

/**
 * Check if user has staff role
 */
export function isStaff(role?: string): boolean {
  return role === 'staff' || role === 'admin';
}
