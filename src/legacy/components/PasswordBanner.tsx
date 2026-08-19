// Password Banner — shown on /reading for users without a password set
// Only shown for users created via quiz checkout (no password yet)
// Dismisses for current session only — reappears next session until password is set

import { useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { X, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const SESSION_DISMISSED_KEY = 'password_banner_dismissed';

function userHasPassword(user: any): boolean {
  if (!user) return true;

  // Explicitly set by our password-set flow — most reliable signal
  if (user.user_metadata?.password_set) return true;

  // OAuth users (Google/Apple) — they have a real login method
  const identities: any[] = user.identities ?? [];
  const hasOAuth = identities.some((i: any) =>
    ['google', 'apple', 'github'].includes(i.provider)
  );
  if (hasOAuth) return true;

  // Users created via quiz checkout (admin.createUser) have source = 'quiz_checkout'
  // These users have NO password yet — show the banner
  if (user.user_metadata?.source === 'quiz_checkout') return false;

  // Regular email/password signup — they have a password
  // Supabase sets last_sign_in_at and the email identity exists with identity_data
  const emailIdentity = identities.find((i: any) => i.provider === 'email');
  if (emailIdentity?.identity_data?.email) return true;

  // Fallback — if no clear signal, don't show the banner
  return true;
}

export default function PasswordBanner() {
  const { user, profile } = useUser();
  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem(SESSION_DISMISSED_KEY) === '1'
  );
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [saving, setSaving] = useState(false);
  const [passwordSet, setPasswordSet] = useState(false);

  // Don't show if: no user, already has password, or dismissed this session
  if (!user || passwordSet || dismissed || userHasPassword(user)) return null;

  const handleDismiss = () => {
    sessionStorage.setItem(SESSION_DISMISSED_KEY, '1');
    setDismissed(true);
  };

  const handleSetPassword = async () => {
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

      setPasswordSet(true);
      setShowModal(false);
      toast.success('Password set! You can now log in from any device.');
    } catch (err: any) {
      toast.error(err.message || 'Failed to set password. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Inline notice — sits inside the reading page content, not fixed/sticky */}
      {/* Styled as a soft card so it doesn't look like a nav bar */}
      <div className="mb-6">
        <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-xl px-4 py-3">
          <KeyRound className="w-4 h-4 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground leading-snug">
              <span className="font-medium">Set a password to keep access.</span>{' '}
              <span className="text-muted-foreground hidden sm:inline">
                Your magic link works for 30 days.
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs px-3 border-primary/30 text-primary hover:bg-primary/10"
              onClick={() => setShowModal(true)}
            >
              Set password
            </Button>
            <button
              onClick={handleDismiss}
              aria-label="Maybe later"
              className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Set a password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="pb-email">Email</Label>
              <Input
                id="pb-email"
                type="email"
                value={profile?.email ?? user.email ?? ''}
                readOnly
                className="bg-muted text-muted-foreground cursor-not-allowed"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pb-password">New password</Label>
              <Input
                id="pb-password"
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pb-confirm">Confirm password</Label>
              <Input
                id="pb-confirm"
                type="password"
                placeholder="Repeat password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <Button
              className="w-full"
              onClick={handleSetPassword}
              disabled={saving || !password || !confirm}
            >
              {saving ? 'Saving…' : 'Set password'}
            </Button>
            <button
              onClick={() => setShowModal(false)}
              className="w-full text-sm text-muted-foreground underline underline-offset-2 py-1 hover:text-foreground transition-colors"
            >
              Maybe later
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
