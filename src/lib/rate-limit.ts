/**
 * Rate Limiting
 * Uses Upstash Redis for distributed rate limiting
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Create Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

/**
 * Rate limiters for different operations
 */

// OTP send: 5 requests per hour per phone number
export const otpSendLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 h'),
  analytics: true,
  prefix: 'ratelimit:otp:send',
});

// OTP verify: 10 attempts per hour per phone number
export const otpVerifyLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 h'),
  analytics: true,
  prefix: 'ratelimit:otp:verify',
});

// Submit vote: 3 requests per minute per IP
export const submitVoteLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 m'),
  analytics: true,
  prefix: 'ratelimit:vote:submit',
});

// API general: 100 requests per minute per IP
export const apiGeneralLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1 m'),
  analytics: true,
  prefix: 'ratelimit:api:general',
});

/**
 * Check rate limit
 */
export async function checkRateLimit(
  limiter: Ratelimit,
  identifier: string
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}> {
  const result = await limiter.limit(identifier);
  
  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  };
}

/**
 * Helper to format rate limit response
 */
export function formatRateLimitError(result: {
  limit: number;
  remaining: number;
  reset: number;
}): string {
  const resetDate = new Date(result.reset);
  const minutesUntilReset = Math.ceil((resetDate.getTime() - Date.now()) / 60000);
  
  return `Twòp tantativ. Eseye ankò nan ${minutesUntilReset} minit.`;
}
