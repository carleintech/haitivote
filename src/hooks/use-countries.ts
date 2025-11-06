/**
 * Hook for country data and location management
 */

'use client';

import { useMemo } from 'react';

export interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

// Major countries where Haitian diaspora lives
const COUNTRIES: Country[] = [
  { code: 'HT', name: 'Haiti', flag: '🇭🇹', dialCode: '+509' },
  { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '+1' },
  { code: 'DO', name: 'Dominican Republic', flag: '🇩🇴', dialCode: '+1' },
  { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', dialCode: '+55' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', dialCode: '+56' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', dialCode: '+52' },
  { code: 'BS', name: 'Bahamas', flag: '🇧🇸', dialCode: '+1' },
  { code: 'TC', name: 'Turks and Caicos', flag: '🇹🇨', dialCode: '+1' },
  { code: 'MQ', name: 'Martinique', flag: '🇲🇶', dialCode: '+596' },
  { code: 'GP', name: 'Guadeloupe', flag: '🇬🇵', dialCode: '+590' },
  { code: 'GF', name: 'French Guiana', flag: '🇬🇫', dialCode: '+594' },
];

export interface UseCountriesResult {
  countries: Country[];
  getCountryByCode: (code: string) => Country | undefined;
  getCountryByName: (name: string) => Country | undefined;
  searchCountries: (query: string) => Country[];
}

export function useCountries(): UseCountriesResult {
  const getCountryByCode = useMemo(
    () => (code: string) => {
      return COUNTRIES.find((c) => c.code === code);
    },
    []
  );

  const getCountryByName = useMemo(
    () => (name: string) => {
      return COUNTRIES.find(
        (c) => c.name.toLowerCase() === name.toLowerCase()
      );
    },
    []
  );

  const searchCountries = useMemo(
    () => (query: string) => {
      if (!query.trim()) {
        return COUNTRIES;
      }

      const lowerQuery = query.toLowerCase();
      return COUNTRIES.filter((country) =>
        country.name.toLowerCase().includes(lowerQuery)
      );
    },
    []
  );

  return {
    countries: COUNTRIES,
    getCountryByCode,
    getCountryByName,
    searchCountries,
  };
}
