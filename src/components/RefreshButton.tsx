/**
 * Refresh Button Component
 * Manual refresh for live data
 */

'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface RefreshButtonProps {
  onRefresh: () => Promise<void>;
  loading?: boolean;
}

export function RefreshButton({ onRefresh, loading = false }: RefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleRefresh}
      disabled={loading || isRefreshing}
    >
      <RefreshCw
        className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`}
      />
      Aktyalize
    </Button>
  );
}
