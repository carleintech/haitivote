/**
 * Hook for Supabase Realtime subscriptions
 */

'use client';

import { useEffect, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';
import type { RealtimeChannel } from '@supabase/supabase-js';

export interface UseRealtimeOptions {
  table: string;
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  schema?: string;
  filter?: string;
  onInsert?: (payload: any) => void;
  onUpdate?: (payload: any) => void;
  onDelete?: (payload: any) => void;
  onChange?: (payload: any) => void;
}

export function useRealtime(options: UseRealtimeOptions) {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabaseClient();
    let channel: RealtimeChannel;

    const setupSubscription = async () => {
      try {
        const channelName = `${options.table}_${options.event || 'all'}_${Date.now()}`;
        
        channel = supabase.channel(channelName);

        // Subscribe to changes
        channel.on(
          'postgres_changes' as any,
          {
            event: options.event || '*',
            schema: options.schema || 'public',
            table: options.table,
            filter: options.filter,
          },
          (payload: any) => {
            // Call specific handler based on event type
            if (payload.eventType === 'INSERT' && options.onInsert) {
              options.onInsert(payload);
            } else if (payload.eventType === 'UPDATE' && options.onUpdate) {
              options.onUpdate(payload);
            } else if (payload.eventType === 'DELETE' && options.onDelete) {
              options.onDelete(payload);
            }

            // Call general change handler
            if (options.onChange) {
              options.onChange(payload);
            }
          }
        );

        // Subscribe and handle status
        channel.subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            setIsConnected(true);
            setError(null);
          } else if (status === 'CHANNEL_ERROR') {
            setError('Failed to connect to realtime channel');
            setIsConnected(false);
          } else if (status === 'TIMED_OUT') {
            setError('Connection timed out');
            setIsConnected(false);
          } else if (status === 'CLOSED') {
            setIsConnected(false);
          }
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Realtime error';
        setError(errorMessage);
        console.error('Realtime setup error:', err);
      }
    };

    setupSubscription();

    // Cleanup
    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [options.table, options.event, options.schema, options.filter]);

  return { isConnected, error };
}
