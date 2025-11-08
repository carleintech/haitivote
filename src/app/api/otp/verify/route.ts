/**
 * POST /api/otp/verify
 * Verify OTP code
 */

import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/admin';
import { parseAndValidatePhone } from '@/lib/phone';
import { hashOtpCode } from '@/lib/otp';
import { getClientIp } from '@/lib/utils';
import { otpVerifyLimiter } from '@/lib/rate-limit';

interface VerifyOtpRequest {
  phone?: string;
  email?: string;
  code: string;
}

export async function POST(request: Request) {
  try {
    const body: VerifyOtpRequest = await request.json();
    const { phone, email, code } = body;

    // Validate required fields
    if ((!phone && !email) || !code) {
      return NextResponse.json(
        { error: 'Phone number or email and code are required' },
        { status: 400 }
      );
    }

    // Determine verification method
    const verificationMethod = email ? 'email' : 'phone';
    const identifier = email ? email.toLowerCase() : phone!;

    // Get client info
    const clientIp = getClientIp(request);

    // Rate limiting per phone number (if enabled)
    if (otpVerifyLimiter) {
      const rateLimitKey = `otp:verify:${phone}`;
      const { success: rateLimitOk, reset } = await otpVerifyLimiter.limit(rateLimitKey);

      if (!rateLimitOk) {
        return NextResponse.json(
          { 
            error: 'Too many verification attempts. Please try again later.',
            resetAt: new Date(reset).toISOString(),
          },
          { status: 429 }
        );
      }
    }

    // Normalize identifier based on method
    let normalizedIdentifier: string;
    if (verificationMethod === 'phone') {
      const phoneResult = parseAndValidatePhone(phone!);
      if (!phoneResult.valid || !phoneResult.e164) {
        return NextResponse.json(
          { error: 'Invalid phone number format' },
          { status: 400 }
        );
      }
      normalizedIdentifier = phoneResult.e164;
    } else {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(identifier)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        );
      }
      normalizedIdentifier = identifier;
    }

    // Hash the provided code
    const otpHash = hashOtpCode(code);

    console.log('🔍 Verifying OTP:', {
      method: verificationMethod,
      identifier: normalizedIdentifier,
      codeLength: code.length,
      hashGenerated: !!otpHash,
    });

    // Find matching OTP based on verification method
    const admin = getAdminClient();
    let query = (admin as any)
      .from('private_otps')
      .select('*')
      .eq('otp_hash', otpHash)
      .eq('is_verified', false)
      .eq('is_used', false)
      .order('created_at', { ascending: false })
      .limit(1);

    // Add appropriate filter based on method
    if (verificationMethod === 'email') {
      query = query.eq('email', normalizedIdentifier);
    } else {
      query = query.eq('phone', normalizedIdentifier);
    }

    const { data: otpRecord, error: otpError } = await query.maybeSingle();

    console.log('🔍 OTP lookup result:', {
      found: !!otpRecord,
      error: otpError?.message,
      method: verificationMethod,
      identifier: normalizedIdentifier,
    });

    if (otpError || !otpRecord) {
      // Log failed attempt
      let updateQuery = (admin as any)
        .from('private_otps')
        .update({ 
          attempts: (admin as any).rpc('increment_attempts'),
        })
        .eq('is_verified', false);

      if (verificationMethod === 'email') {
        updateQuery = updateQuery.eq('email', normalizedIdentifier);
      } else {
        updateQuery = updateQuery.eq('phone', normalizedIdentifier);
      }

      await updateQuery;

      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      );
    }

    // Check if OTP has expired
    const expiresAt = new Date(otpRecord.expires_at).getTime();
    const now = Date.now();

    if (now > expiresAt) {
      return NextResponse.json(
        { error: 'Verification code has expired. Please request a new code.' },
        { status: 400 }
      );
    }

    // Check if too many attempts (max 5)
    if (otpRecord.attempts >= 5) {
      return NextResponse.json(
        { error: 'Too many failed attempts. Please request a new code.' },
        { status: 400 }
      );
    }

    // Mark OTP as verified
    const { error: updateError } = await (admin as any)
      .from('private_otps')
      .update({ 
        is_verified: true,
        verified_at: new Date().toISOString(),
        verified_ip: clientIp,
      })
      .eq('id', otpRecord.id);

    if (updateError) {
      console.error('Error updating OTP:', updateError);
      return NextResponse.json(
        { error: 'Failed to verify code. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: verificationMethod === 'email' ? 'Email verified successfully' : 'Phone number verified successfully',
      otpHash, // Return hash for use in vote submission
      verificationMethod,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 min to submit vote
    });

  } catch (error) {
    console.error('Unexpected error in POST /api/otp/verify:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
