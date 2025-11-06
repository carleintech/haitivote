/**
 * Authentication & Session Management
 * Using iron-session for secure, encrypted cookies
 */

import { getIronSession, IronSession, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

// Session data interface
export interface SessionData {
  isAdmin: boolean;
  username: string;
  loginAt: number;
}

// Session configuration
export const sessionOptions: SessionOptions = {
  password: process.env.IRON_SESSION_PASSWORD!,
  cookieName: 'techklein_votelive_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  },
};

/**
 * Get session from cookies
 */
export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

/**
 * Verify admin credentials
 */
export async function verifyAdminCredentials(
  username: string,
  password: string
): Promise<{ valid: boolean; error?: string }> {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedUsername || !expectedPasswordHash) {
    return {
      valid: false,
      error: 'Admin credentials not configured',
    };
  }

  if (username !== expectedUsername) {
    return {
      valid: false,
      error: 'Invalid credentials',
    };
  }

  try {
    const isValid = await bcrypt.compare(password, expectedPasswordHash);
    
    if (!isValid) {
      return {
        valid: false,
        error: 'Invalid credentials',
      };
    }

    return { valid: true };
  } catch (error) {
    console.error('Password verification error:', error);
    return {
      valid: false,
      error: 'Authentication failed',
    };
  }
}

/**
 * Create admin session
 */
export async function createAdminSession(username: string): Promise<void> {
  const session = await getSession();
  
  session.isAdmin = true;
  session.username = username;
  session.loginAt = Date.now();
  
  await session.save();
}

/**
 * Destroy session (logout)
 */
export async function destroySession(): Promise<void> {
  const session = await getSession();
  session.destroy();
}

/**
 * Check if user is authenticated admin
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  
  if (!session.isAdmin || !session.username) {
    return false;
  }
  
  // Check session age (24 hours)
  const sessionAge = Date.now() - (session.loginAt || 0);
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours
  
  if (sessionAge > maxAge) {
    await destroySession();
    return false;
  }
  
  return true;
}

/**
 * Require admin authentication (middleware helper)
 */
export async function requireAdmin(): Promise<{
  authenticated: boolean;
  response?: NextResponse;
}> {
  const authenticated = await isAuthenticated();
  
  if (!authenticated) {
    return {
      authenticated: false,
      response: NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      ),
    };
  }
  
  return { authenticated: true };
}

/**
 * Hash password (for generating admin password)
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}
