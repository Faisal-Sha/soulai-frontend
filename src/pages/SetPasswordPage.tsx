// Set Password Page — /set-password (quiz) and /reset-password (forgot password)
// User lands here after clicking the email link
// Supabase automatically creates an authenticated session from the link
// User sets their password → redirected appropriately

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, KeyRound, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { trackCreateAccountViewed, trackCreateAccountPassed } from '@/features/quiz/lib/funnelAnalytics';

export default function SetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isReset = location.pathname.includes('reset-password');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [checking, setChecking] = useState(true);

  // Supabase puts the recovery token in the URL hash when user clicks the email link
  // It automatically exchanges it for a session — we just need to wait for it
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
          if (session) {
            setSessionReady(true);
            setChecking(false);
          }
        }
      }
    );

    // Also check if session already exists (page refresh case)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSessionReady(true);
      }
      setChecking(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!isReset) {
      trackCreateAccountViewed();
    }
  }, [isReset]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      setSaving(true);

      const { error } = await supabase.auth.updateUser({
        password,
        data: { password_set: true },
      });

      if (error) throw error;

      if (isReset) {
        await supabase.auth.signOut();
        toast.success('Password updated! Please log in with your new password.');
        navigate('/auth?mode=login', { replace: true });
      } else {
        trackCreateAccountPassed();
        toast.success('Password set! Taking you to your reading…');
        navigate('/reading', { replace: true });
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to set password. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm">Verifying your link…</p>
        </div>
      </div>
    );
  }

  if (!sessionReady) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <h2 className="text-xl font-semibold text-foreground mb-2">Link expired or invalid</h2>
          <p className="text-muted-foreground text-sm mb-6">
            This link has expired or already been used. Request a new one below.
          </p>
          <Button
            onClick={() =>
              navigate(isReset ? '/auth?mode=forgot' : '/auth?mode=login')
            }
          >
            {isReset ? 'Request a new reset link' : 'Go to login'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-2">
            {isReset ? 'Reset your password' : 'Set your password'}
          </h1>
          <p className="text-muted-foreground text-sm">
            {isReset
              ? 'Choose a new password for your account.'
              : 'Create a password so you can log back in from any device.'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="password">New password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                autoFocus
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirm">Confirm password</Label>
            <div className="relative">
              <Input
                id="confirm"
                type={showConfirm ? 'text' : 'password'}
                placeholder="Repeat password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="new-password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11"
            disabled={saving || !password || !confirm}
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                {isReset ? 'Updating password…' : 'Setting password…'}
              </>
            ) : isReset ? (
              'Update password'
            ) : (
              'Set password & go to my reading'
            )}
          </Button>
        </form>

        {/* Skip — quiz set-password only */}
        {!isReset && (
          <button
            onClick={() => navigate('/reading')}
            className="w-full text-sm text-muted-foreground underline underline-offset-2 py-3 mt-2 hover:text-foreground transition-colors"
          >
            Skip for now — take me to my reading
          </button>
        )}

      </div>
    </div>
  );
}
