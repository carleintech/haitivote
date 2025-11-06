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
  
  type FormData = Omit<VoteSubmissionInput, 'language'> & { language?: 'ht' | 'fr' | 'en' | 'es' };
  
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
    } as VoteSubmissionInput);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ranpli Enfòmasyon Ou</CardTitle>
        <CardDescription>
          Ou ap vote pou: <span className="font-semibold text-foreground">{candidateName}</span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Non Konplè <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Antre non konplè w"
              error={!!errors.name}
              helperText={errors.name?.message}
              disabled={loading}
            />
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label htmlFor="dob">
              Dat Nesans <span className="text-destructive">*</span>
            </Label>
            <Input
              id="dob"
              type="date"
              {...register('dob')}
              error={!!errors.dob}
              helperText={errors.dob?.message}
              disabled={loading}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone">
              Nimewo Telefòn <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              {...register('phone')}
              placeholder="+509XXXXXXXX oswa lòt"
              error={!!errors.phone}
              helperText={errors.phone?.message}
              disabled={loading}
            />
            <p className="text-xs text-muted-foreground">
              Nou pral voye yon kòd verifikasyon sou telefòn sa
            </p>
          </div>

          {/* Country */}
          <div className="space-y-2">
            <Label htmlFor="country">
              Peyi <span className="text-destructive">*</span>
            </Label>
            <Select
              value={selectedCountry}
              onValueChange={(value) => setValue('country', value)}
              disabled={loading}
            >
              <SelectTrigger id="country">
                <SelectValue placeholder="Chwazi peyi ou" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.name}>
                    <span className="mr-2">{country.flag}</span>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="text-xs text-destructive">{errors.country.message}</p>
            )}
          </div>

          {/* Region/City (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="region">Rejyon/Vil (Opsyonèl)</Label>
            <Input
              id="region"
              {...register('region')}
              placeholder="Port-au-Prince, Miami, Montréal, etc."
              disabled={loading}
            />
          </div>

          {/* Privacy Notice */}
          <Alert>
            <Lock className="h-4 w-4" />
            <AlertDescription className="text-xs">
              <strong>Enfòmasyon prive:</strong> Nou kolekte non, dat nesans, ak telefòn ou sèlman pou evite vòt doub. 
              Enfòmasyon sa yo pa pral pibliye. Yon kòd verifikasyon pral voye sou telefòn ou.
            </AlertDescription>
          </Alert>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="gradient"
            size="lg"
            className="w-full"
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Ap voye kòd...' : 'Voye Kòd Verifikasyon'}
          </Button>

          {/* Info */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Apre ou ranpli fòm sa, n ap voye yon kòd 6 chif sou telefòn ou pou verifye.
            </AlertDescription>
          </Alert>
        </form>
      </CardContent>
    </Card>
  );
}
