/**
 * API Route: Admin Login
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyAdminCredentials, createAdminSession } from '@/lib/auth';
import { getClientIp } from '@/lib/utils';

const loginSchema = z.object({
  username: z.string().min(1, 'Username required'),
  password: z.string().min(1, 'Password required'),
});

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request);

  try {
    const body = await request.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 400 }
      );
    }

    const { username, password } = validation.data;

    // Verify credentials
    const result = await verifyAdminCredentials(username, password);

    if (!result.valid) {
      console.warn(`Failed login attempt from ${clientIp} for user: ${username}`);
      
      return NextResponse.json(
        { error: result.error || 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create session
    await createAdminSession(username);

    console.log(`Successful admin login from ${clientIp}: ${username}`);

    return NextResponse.json(
      {
        success: true,
        username,
        message: 'Login successful',
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Admin login error:', error);
    
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
