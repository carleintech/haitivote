/**
 * Twilio SMS Integration
 */

import twilio from 'twilio';

// Validate Twilio configuration
if (!process.env.TWILIO_ACCOUNT_SID) {
  throw new Error('Missing TWILIO_ACCOUNT_SID environment variable');
}

if (!process.env.TWILIO_AUTH_TOKEN) {
  throw new Error('Missing TWILIO_AUTH_TOKEN environment variable');
}

if (!process.env.TWILIO_FROM_NUMBER) {
  throw new Error('Missing TWILIO_FROM_NUMBER environment variable');
}

// Create Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export interface SendSmsParams {
  to: string;
  body: string;
}

export interface SendSmsResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send SMS via Twilio
 */
export async function sendSms(params: SendSmsParams): Promise<SendSmsResult> {
  try {
    const message = await twilioClient.messages.create({
      to: params.to,
      from: process.env.TWILIO_FROM_NUMBER!,
      body: params.body,
    });

    return {
      success: true,
      messageId: message.sid,
    };
  } catch (error) {
    console.error('Twilio SMS error:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send SMS',
    };
  }
}

/**
 * Send OTP SMS
 */
export async function sendOtpSms(
  phoneNumber: string,
  code: string,
  language: 'ht' | 'fr' | 'en' | 'es' = 'ht'
): Promise<SendSmsResult> {
  const { generateOtpMessage } = await import('./otp');
  const ttlMinutes = Math.floor(Number(process.env.OTP_TTL_SECONDS || 600) / 60);
  
  const body = generateOtpMessage(code, language, ttlMinutes);
  
  return sendSms({
    to: phoneNumber,
    body,
  });
}

/**
 * Validate phone number format (E.164)
 */
export function isValidPhoneNumber(phoneNumber: string): boolean {
  // E.164 format: +[country code][number]
  const e164Regex = /^\+[1-9]\d{1,14}$/;
  return e164Regex.test(phoneNumber);
}
