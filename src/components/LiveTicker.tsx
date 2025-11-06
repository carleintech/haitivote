/**
 * Live Ticker Component
 * Scrolling ticker showing recent votes
 */

'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';

interface TickerItem {
  id: string;
  candidateName: string;
  country: string | null;
  timestamp: string;
}

interface LiveTickerProps {
  items: TickerItem[];
}

export function LiveTicker({ items }: LiveTickerProps) {
  const [isPaused, setIsPaused] = React.useState(false);

  // Duplicate items for seamless loop
  const tickerItems = [...items, ...items];

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-techklein-purple via-techklein-blue to-techklein-cyan py-3">
      <div
        className={`flex gap-8 ${isPaused ? '' : 'animate-scroll'}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{
          width: 'max-content',
        }}
      >
        {tickerItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex items-center gap-2 text-white whitespace-nowrap"
          >
            <TrendingUp className="h-4 w-4" />
            <span className="font-semibold">{item.candidateName}</span>
            {item.country && (
              <>
                <span className="opacity-70">•</span>
                <span className="opacity-90">{item.country}</span>
              </>
            )}
            <span className="opacity-70">•</span>
            <span className="opacity-70 text-sm">
              {new Date(item.timestamp).toLocaleTimeString('fr-HT', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        ))}
      </div>

      {/* Gradient overlays for fade effect */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-techklein-purple to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-techklein-cyan to-transparent pointer-events-none" />
    </div>
  );
}
