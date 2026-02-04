/**
 * Live Indicator Component
 * Shows real-time connection status
 */

'use client';

import * as React from 'react';

interface LiveIndicatorProps {
  isLive: boolean;
}

export function LiveIndicator({ isLive }: LiveIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div
          className={`h-3 w-3 rounded-full ${
            isLive ? 'bg-green-500' : 'bg-red-500'
          }`}
        />
        {isLive && (
          <div className="absolute inset-0 h-3 w-3 rounded-full bg-green-500 animate-ping" />
        )}
      </div>
      <span className="text-sm font-bold text-white">
        {isLive ? 'LIVE' : 'Pa konekte'}
      </span>
    </div>
  );
}
