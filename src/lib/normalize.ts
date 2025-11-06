/**
 * Name Normalization Utilities
 * Ensures consistent storage and comparison of names
 */

/**
 * Normalize a person's name for duplicate detection
 * - Removes accents/diacritics
 * - Converts to uppercase
 * - Removes special characters
 * - Normalizes whitespace
 */
export function normalizeName(name: string): string {
  return name
    .normalize('NFD') // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-zA-Z\s'-]/g, '') // Keep only letters, spaces, hyphens, apostrophes
    .trim()
    .replace(/\s+/g, ' ') // Normalize multiple spaces to single
    .toUpperCase();
}

/**
 * Normalize date of birth to YYYY-MM-DD format
 */
export function normalizeDateOfBirth(dob: string): string {
  // Already in YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
    return dob;
  }
  
  // Try to parse other formats
  const date = new Date(dob);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format');
  }
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

/**
 * Validate date of birth
 * - Must be at least 18 years old
 * - Must be born after 1900
 * - Cannot be in the future
 */
export function validateDateOfBirth(dob: string): { valid: boolean; error?: string } {
  const date = new Date(dob);
  const now = new Date();
  
  if (isNaN(date.getTime())) {
    return { valid: false, error: 'Invalid date format' };
  }
  
  // Must be born after 1900
  if (date.getFullYear() < 1900) {
    return { valid: false, error: 'Date must be after 1900' };
  }
  
  // Cannot be in the future
  if (date > now) {
    return { valid: false, error: 'Date cannot be in the future' };
  }
  
  // Must be at least 18 years old
  const age = now.getFullYear() - date.getFullYear();
  const monthDiff = now.getMonth() - date.getMonth();
  const dayDiff = now.getDate() - date.getDate();
  
  const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
  
  if (actualAge < 18) {
    return { valid: false, error: 'Must be at least 18 years old' };
  }
  
  return { valid: true };
}

/**
 * Calculate age from date of birth
 */
export function calculateAge(dob: string): number {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}
