/**
 * OTP Input Component
 * 6-digit code input with verification
 */

'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, RefreshCw } from 'lucide-react';

interface OtpInputProps {
  phoneNumber: string;
  expiresAt: string;
  onVerify: (code: string) => Promise<void>;
  onResend: () => Promise<void>;
  loading: boolean;
}

export function OtpInput({
  phoneNumber,
  expiresAt,
  onVerify,
  onResend,
  loading,
}: OtpInputProps) {
  const [code, setCode] = React.useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = React.useState<number>(0);
  const [canResend, setCanResend] = React.useState(false);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  // Calculate time remaining
  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const expiry = new Date(expiresAt).getTime();
      const diff = Math.max(0, Math.floor((expiry - now) / 1000));
      
      setTimeLeft(diff);
      
      if (diff === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  // Allow resend after 60 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCanResend(true);
    }, 60000); // 60 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when complete
    if (newCode.every((digit) => digit !== '') && !loading) {
      handleVerify(newCode.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setCode(digits);
      inputRefs.current[5]?.focus();
      
      // Auto-submit
      if (!loading) {
        handleVerify(pastedData);
      }
    }
  };

  const handleVerify = async (fullCode: string) => {
    await onVerify(fullCode);
  };

  const handleResend = async () => {
    setCode(['', '', '', '', '', '']);
    setCanResend(false);
    inputRefs.current[0]?.focus();
    await onResend();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Antre Kòd Verifikasyon</CardTitle>
        <CardDescription>
          Nou voye yon kòd 6 chif sou {phoneNumber}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* OTP Input */}
        <div className="flex gap-2 justify-center">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              disabled={loading}
              className="w-12 h-14 text-center text-2xl font-bold border-2 border-border rounded-lg focus:border-techklein-cyan focus:ring-2 focus:ring-techklein-cyan/20 transition-all disabled:opacity-50"
              autoFocus={index === 0}
            />
          ))}
        </div>

        {/* Timer */}
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Kòd ap ekspire nan:</span>
            <span className="font-mono font-bold">
              {timeLeft > 0 ? formatTime(timeLeft) : 'Ekspire'}
            </span>
          </AlertDescription>
        </Alert>

        {/* Actions */}
        <div className="space-y-2">
          <Button
            variant="gradient"
            size="lg"
            className="w-full"
            onClick={() => handleVerify(code.join(''))}
            loading={loading}
            disabled={loading || code.some((d) => !d) || timeLeft === 0}
          >
            {loading ? 'Ap verifye...' : 'Konfime Vòt'}
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={handleResend}
            disabled={!canResend || loading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            {canResend ? 'Revoye Kòd' : 'Tann 60 segonn pou revoye'}
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Pa resevwa kòd la? Verifye nimewo w oswa eseye revoye.
        </p>
      </CardContent>
    </Card>
  );
}
