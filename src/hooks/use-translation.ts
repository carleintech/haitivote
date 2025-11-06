/**
 * Translation hook
 */

'use client';

import { translations, Language } from '@/lib/i18n/translations';
import { useLocalStorage } from './use-local-storage';

export function useTranslation() {
  const [language, setLanguage] = useLocalStorage<Language>('language', 'ht');

  const t = (section: string, key: string): string => {
    try {
      const translation = translations[language];
      // @ts-ignore
      return translation[section]?.[key] || translations.ht[section]?.[key] || key;
    } catch (error) {
      return key;
    }
  };

  return {
    language,
    setLanguage,
    t,
  };
}
