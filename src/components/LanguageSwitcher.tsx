/**
 * Language Switcher Component
 */

'use client';

import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Globe } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const languages = [
  { code: 'ht', name: 'Kreyòl', flag: '🇭🇹' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();
  
  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <Select value={language} onValueChange={(value: any) => setLanguage(value)}>
      <SelectTrigger className="w-[160px] bg-white border-2 border-gray-200 hover:border-[#006CFF] transition-colors shadow-sm font-medium">
        <Globe className="h-4 w-4 mr-2 text-[#006CFF]" />
        <SelectValue>
          <span className="mr-2">{currentLang.flag}</span>
          {currentLang.name}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-white border-2 border-gray-200 shadow-xl z-[100]">
        {languages.map((lang) => (
          <SelectItem 
            key={lang.code} 
            value={lang.code}
            className="cursor-pointer hover:bg-blue-50 focus:bg-blue-100 text-base py-3 font-medium"
          >
            <span className="mr-2 text-xl">{lang.flag}</span>
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
