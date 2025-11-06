/**
 * Validation schemas for admin operations
 */

import { z } from 'zod';

/**
 * Admin login schema
 */
export const adminLoginSchema = z.object({
  username: z.string().min(1, 'Username required'),
  password: z.string().min(1, 'Password required'),
});

/**
 * Export filters schema
 */
export const exportFiltersSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  country: z.string().optional(),
  candidateId: z.string().optional(),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
export type ExportFiltersInput = z.infer<typeof exportFiltersSchema>;
