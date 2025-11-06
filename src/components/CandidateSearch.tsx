/**
 * Candidate Search Component
 * Search bar with debounced input
 */

'use client';

import * as React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/use-debounce';

interface CandidateSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function CandidateSearch({
  value,
  onChange,
  placeholder = 'Rechèch kandida...',
}: CandidateSearchProps) {
  const [localValue, setLocalValue] = React.useState(value);
  const debouncedValue = useDebounce(localValue, 300);

  // Update parent when debounced value changes
  React.useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  // Sync with external value changes
  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      
      <Input
        type="text"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="pl-9 pr-9"
      />

      {localValue && (
        <Button
          size="sm"
          variant="ghost"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Efase</span>
        </Button>
      )}
    </div>
  );
}
