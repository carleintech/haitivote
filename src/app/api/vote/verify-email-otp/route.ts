/**
 * API Route: Verify Email OTP
 * Verifies the OTP code sent to email
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/admin';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, code } = body;

    // Validate inputs
    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email and code are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Hash the provided code
    const codeHash = crypto.createHash('sha256').update(code).digest('hex');
    const supabase = getAdminClient();

    // Find matching OTP
    const { data: otpRecord, error: otpError } = await (supabase as any)
      .from('private_otps')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('otp_hash', codeHash)
      .eq('verification_method', 'email')
      .gte('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (otpError) {
      console.error('OTP lookup error:', otpError);
      return NextResponse.json(
        { error: 'Failed to verify code' },
        { status: 500 }
      );
    }

    if (!otpRecord) {
      return NextResponse.json(
        { error: 'Invalid or expired verification code' },
        { status: 400 }
      );
    }

    // Check if already used
    if (otpRecord.used_at) {
      return NextResponse.json(
        { error: 'This code has already been used' },
        { status: 400 }
      );
    }

    // Mark OTP as used
    const { error: updateError } = await (supabase as any)
      .from('private_otps')
      .update({ used_at: new Date().toISOString() })
      .eq('id', otpRecord.id);

    if (updateError) {
      console.error('OTP update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to mark code as used' },
        { status: 500 }
      );
    }

    // Return success with the hash for vote submission
    return NextResponse.json({
      success: true,
      otpHash: codeHash,
      email: email.toLowerCase(),
    });

  } catch (error) {
    console.error('Email OTP verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
