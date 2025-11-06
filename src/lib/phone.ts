/**
 * Phone Number Utilities
 */

import { parsePhoneNumber, CountryCode } from 'libphonenumber-js';

export interface ParsedPhoneNumber {
  valid: boolean;
  e164?: string;
  country?: string;
  nationalNumber?: string;
  error?: string;
}

/**
 * Parse and validate phone number
 */
export function parseAndValidatePhone(
  phoneInput: string,
  defaultCountry?: CountryCode
): ParsedPhoneNumber {
  try {
    const phoneNumber = parsePhoneNumber(phoneInput, defaultCountry);
    
    if (!phoneNumber) {
      return {
        valid: false,
        error: 'Invalid phone number format',
      };
    }
    
    if (!phoneNumber.isValid()) {
      return {
        valid: false,
        error: 'Phone number is not valid',
      };
    }
    
    return {
      valid: true,
      e164: phoneNumber.number,
      country: phoneNumber.country,
      nationalNumber: phoneNumber.nationalNumber,
    };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Failed to parse phone number',
    };
  }
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(
  phoneNumber: string,
  format: 'INTERNATIONAL' | 'NATIONAL' | 'E.164' = 'INTERNATIONAL'
): string {
  try {
    const parsed = parsePhoneNumber(phoneNumber);
    
    if (!parsed) {
      return phoneNumber;
    }
    
    return parsed.format(format);
  } catch {
    return phoneNumber;
  }
}

/**
 * Get country from phone number
 */
export function getCountryFromPhone(phoneNumber: string): string | null {
  try {
    const parsed = parsePhoneNumber(phoneNumber);
    return parsed?.country || null;
  } catch {
    return null;
  }
}

/**
 * Check if phone number is mobile
 */
export function isMobilePhone(phoneNumber: string): boolean {
  try {
    const parsed = parsePhoneNumber(phoneNumber);
    return parsed?.getType() === 'MOBILE';
  } catch {
    return false;
  }
}
