/**
 * Main Voting Form Component
 * Handles user details and vote submission
 */

'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { voteSubmissionSchema, type VoteSubmissionInput } from '@/lib/validations/vote';
import { useCountries } from '@/hooks/use-countries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Lock } from 'lucide-react';

interface VotingFormProps {
  candidateId: number;
  candidateName: string;
  onSubmit: (data: VoteSubmissionInput) => Promise<void>;
  loading: boolean;
}

export function VotingForm({
  candidateId,
  candidateName,
  onSubmit,
  loading,
}: VotingFormProps) {
  const { countries } = useCountries();
  
  type FormData = Omit<VoteSubmissionInput, 'language'> & { language?: 'ht' | 'fr' | 'en' | 'es'; email?: string };
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(voteSubmissionSchema) as any,
    defaultValues: {
      candidateId,
      country: 'Haiti',
      language: 'ht',
    },
  });

  const selectedCountry = watch('country');

  const handleFormSubmit = async (data: FormData) => {
    await onSubmit({
      ...data,
      language: data.language || 'ht',
      verificationMethod: 'email',
    } as VoteSubmissionInput & { verificationMethod: 'email' });
  };

  return (
    <Card className="bg-slate-900/50 border-2 border-white/10 backdrop-blur-2xl shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b-2 border-white/10">
        <CardTitle className="text-2xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Ranpli Enfòmasyon Ou
        </CardTitle>
        <CardDescription className="text-base text-blue-200">
          Ou ap vote pou: <span className="font-bold text-white">{candidateName}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
          {/* First Name and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-base font-semibold text-white">
                Prenon <span className="text-red-400">*</span>
              </Label>
              <Input
                id="firstName"
                {...register('firstName')}
                placeholder="Prenon"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                disabled={loading}
                className="h-12 text-base bg-slate-800/50 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-base font-semibold text-white">
                Siyati <span className="text-red-400">*</span>
              </Label>
              <Input
                id="lastName"
                {...register('lastName')}
                placeholder="Siyati"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                disabled={loading}
                className="h-12 text-base bg-slate-800/50 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label htmlFor="dob" className="text-base font-semibold text-white">
              Dat Nesans <span className="text-red-400">*</span>
            </Label>
            <Input
              id="dob"
              type="date"
              {...register('dob')}
              error={!!errors.dob}
              helperText={errors.dob?.message}
              disabled={loading}
              max={new Date().toISOString().split('T')[0]}
              className="h-12 text-base bg-slate-800/50 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
            />
          </div>

          {/* Country */}
          <div className="space-y-2">
            <Label htmlFor="country" className="text-base font-semibold text-white">
              Peyi <span className="text-red-400">*</span>
            </Label>
            <Select
              value={selectedCountry}
              onValueChange={(value) => setValue('country', value)}
              disabled={loading}
            >
              <SelectTrigger id="country" className="h-12 bg-slate-800/50 border-white/20 text-white">
                <SelectValue placeholder="Chwazi peyi ou" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/20">
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.name} className="text-white hover:bg-slate-800">
                    <span className="mr-2">{country.flag}</span>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="text-xs text-red-400">{errors.country.message}</p>
            )}
          </div>

          {/* Region/City (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="region" className="text-base font-semibold text-white">Rejyon/Vil (Opsyonèl)</Label>
            <Input
              id="region"
              {...register('region')}
              placeholder="Port-au-Prince, Miami, Montréal, etc."
              disabled={loading}
              className="h-12 text-base bg-slate-800/50 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
            />
          </div>

          {/* Privacy Notice */}
          <Alert className="border-2 border-blue-400/50 bg-blue-500/10 backdrop-blur-xl">
            <Lock className="h-5 w-5 text-blue-400" />
            <AlertDescription className="text-sm font-medium text-blue-100">
              <strong className="text-white">Enfòmasyon prive:</strong> Nou kolekte non ak dat nesans ou sèlman pou evite vòt doub. 
              Enfòmasyon sa yo pa pral pibliye.
            </AlertDescription>
          </Alert>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full h-14 text-lg font-bold shadow-lg bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 hover:from-blue-600 hover:via-purple-700 hover:to-pink-700 text-white border-0"
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Ap soumèt vòt ou...' : 'Soumèt Vòt Mwen'}
          </Button>

          {/* Info */}
          <Alert className="border-2 border-purple-400/50 bg-purple-500/10 backdrop-blur-xl">
            <Info className="h-5 w-5 text-purple-400" />
            <AlertDescription className="text-sm font-medium text-purple-100">
              Lè w klike sou bouton an, vòt ou pral konte imedyatman.
            </AlertDescription>
          </Alert>
        </form>
      </CardContent>
    </Card>
  );
}
