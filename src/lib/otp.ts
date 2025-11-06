/**
 * OTP (One-Time Password) Utilities
 */

import { randomInt } from 'crypto';
import { sha256 } from 'js-sha256';

/**
 * Generate a 6-digit OTP code
 */
export function generateOtpCode(): string {
  const code = randomInt(0, 1000000);
  return String(code).padStart(6, '0');
}

/**
 * Hash an OTP code using SHA-256
 * Never store plain OTP codes in database
 */
export function hashOtpCode(code: string): string {
  return sha256(code);
}

/**
 * Verify an OTP code against a hash
 */
export function verifyOtpCode(code: string, hash: string): boolean {
  return hashOtpCode(code) === hash;
}

/**
 * Calculate expiry timestamp for OTP
 */
export function getOtpExpiryTime(ttlSeconds: number = 600): Date {
  return new Date(Date.now() + ttlSeconds * 1000);
}

/**
 * Check if OTP has expired
 */
export function isOtpExpired(expiryTime: string | Date): boolean {
  const expiry = typeof expiryTime === 'string' ? new Date(expiryTime) : expiryTime;
  return expiry.getTime() < Date.now();
}

/**
 * Format OTP code for SMS (with spaces for readability)
 */
export function formatOtpForSms(code: string): string {
  return code.match(/.{1,3}/g)?.join(' ') || code;
}

/**
 * Generate OTP message in multiple languages
 */
export function generateOtpMessage(
  code: string,
  language: 'ht' | 'fr' | 'en' | 'es' = 'ht',
  ttlMinutes: number = 10
): string {
  const formattedCode = formatOtpForSms(code);
  
  const messages = {
    ht: `Kod verifikasyon ou: ${formattedCode}. Li ap ekspire nan ${ttlMinutes} minit. TechKlein VoteLive`,
    fr: `Votre code de vérification: ${formattedCode}. Expire dans ${ttlMinutes} minutes. TechKlein VoteLive`,
    en: `Your verification code: ${formattedCode}. Expires in ${ttlMinutes} minutes. TechKlein VoteLive`,
    es: `Tu código de verificación: ${formattedCode}. Expira en ${ttlMinutes} minutos. TechKlein VoteLive`,
  };
  
  return messages[language];
}
