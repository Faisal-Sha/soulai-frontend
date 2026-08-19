import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Separator } from '@/components/ui/separator';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import * as analytics from '@/lib/mixpanel';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { language } = useLanguage();

  // Mode + redirect from query params (nav Login/Sign up use ?mode=)
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('redirect') || '/dashboard';
  const mode = searchParams.get('mode');
  const isForgot = mode === 'forgot';
  const isLogin = !isForgot && mode !== 'signup';

  const setAuthMode = (nextMode: 'login' | 'signup' | 'forgot') => {
    const next = new URLSearchParams(location.search);
    next.set('mode', nextMode);
    navigate({ pathname: '/auth', search: next.toString() }, { replace: true });
  };

  const content = {
    en: {
      login: 'Login',
      signup: 'Sign Up',
      email: 'Email',
      password: 'Password',
      fullName: 'Full Name',
      loginButton: 'Login',
      signupButton: 'Create Account',
      switchToSignup: "Don't have an account? Sign up",
      switchToLogin: 'Already have an account? Login',
      loginTitle: 'Welcome Back',
      loginDesc: 'Login to access your SoulPlus AI',
      signupTitle: 'Create Account',
      signupDesc: 'Start your journey with SoulPlus AI',
      forgotTitle: 'Forgot Password',
      forgotDesc: 'Enter your email and we will send you a reset link',
      forgotPassword: 'Forgot password?',
      sendResetLink: 'Send Reset Link',
      resetEmailSent: 'Check your email for a password reset link.',
      backToLogin: 'Back to login',
      errorTitle: 'Error',
      successTitle: 'Success',
      loginSuccess: 'Successfully logged in!',
      signupSuccess: 'Account created successfully!',
      invalidEmail: 'Please enter a valid email',
      weakPassword: 'Password must be at least 6 characters',
      continueWith: 'Or continue with',
      googleButton: 'Continue with Google',
      appleButton: 'Continue with Apple',
      emailLogin: 'Or login with email'
    },
    ru: {
      login: 'Вход',
      signup: 'Регистрация',
      email: 'Email',
      password: 'Пароль',
      fullName: 'Полное имя',
      loginButton: 'Войти',
      signupButton: 'Создать аккаунт',
      switchToSignup: 'Нет аккаунта? Зарегистрируйтесь',
      switchToLogin: 'Уже есть аккаунт? Войдите',
      loginTitle: 'С возвращением',
      loginDesc: 'Войдите для доступа к SoulPlus AI',
      signupTitle: 'Создать аккаунт',
      signupDesc: 'Начните свой путь с SoulPlus AI',
      forgotTitle: 'Забыли пароль',
      forgotDesc: 'Введите email — мы отправим ссылку для сброса',
      forgotPassword: 'Забыли пароль?',
      sendResetLink: 'Отправить ссылку',
      resetEmailSent: 'Проверьте почту — мы отправили ссылку для сброса пароля.',
      backToLogin: 'Вернуться ко входу',
      errorTitle: 'Ошибка',
      successTitle: 'Успешно',
      loginSuccess: 'Вход выполнен успешно!',
      signupSuccess: 'Аккаунт создан успешно!',
      invalidEmail: 'Введите корректный email',
      weakPassword: 'Пароль должен содержать минимум 6 символов',
      continueWith: 'Или продолжить через',
      googleButton: 'Войти через Google',
      appleButton: 'Войти через Apple',
      emailLogin: 'Или войти через email'
    }
  };

  const t = content[language];

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate(redirectPath);
      }
    });
  }, [navigate, redirectPath]);

  const handleOAuthSignIn = async (provider: 'google' | 'apple') => {
    try {
      // Track OAuth signup attempt
      analytics.trackEvent('OAuth Signup Attempt', { provider });

      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.origin}${redirectPath}`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: t.errorTitle,
        description: error.message || 'OAuth authentication failed',
        variant: 'destructive',
      });
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email.includes('@')) {
        toast({
          title: t.errorTitle,
          description: t.invalidEmail,
          variant: 'destructive',
        });
        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast({
        title: t.successTitle,
        description: t.resetEmailSent,
      });
      setAuthMode('login');
    } catch (error: any) {
      toast({
        title: t.errorTitle,
        description: error.message || 'Failed to send reset email',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // Track login event
        if (data.user) {
          analytics.trackLogin(data.user.id, 'email', { email });
        }

        toast({
          title: t.successTitle,
          description: t.loginSuccess,
        });
        navigate(redirectPath);
      } else {
        // Validation
        if (!email.includes('@')) {
          toast({
            title: t.errorTitle,
            description: t.invalidEmail,
            variant: 'destructive',
          });
          setLoading(false);
          return;
        }

        if (password.length < 6) {
          toast({
            title: t.errorTitle,
            description: t.weakPassword,
            variant: 'destructive',
          });
          setLoading(false);
          return;
        }

        const redirectUrl = `${window.origin}${redirectPath}`;

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              full_name: fullName,
            }
          }
        });

        if (error) throw error;

        // Track signup event
        if (data.user) {
          analytics.trackSignup(data.user.id, 'email', {
            email,
            full_name: fullName,
          });
        }

        toast({
          title: t.successTitle,
          description: t.signupSuccess,
        });
        navigate(redirectPath);
      }
    } catch (error: any) {
      let errorMessage = error.message || 'An error occurred';
      if (errorMessage === 'Invalid login credentials') {
        errorMessage = 'Login failed. Please check your credentials';
      } else {
        errorMessage = errorMessage.replace(/loginfailed/gi, 'Login failed');
      }

      toast({
        title: t.errorTitle,
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-6 bg-gradient-to-br from-background via-background to-primary/5 overflow-x-hidden max-w-full pt-20">
      <Card className="w-full max-w-md border-black/10 dark:border-white/10 shadow-2xl bg-white/90 dark:bg-black/40 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
        <CardHeader className="space-y-1 pb-4 sm:pb-6">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-200 dark:via-pink-200 dark:to-blue-200 bg-clip-text text-transparent break-words">
            {isForgot ? t.forgotTitle : isLogin ? t.loginTitle : t.signupTitle}
          </CardTitle>
          <CardDescription className="text-center text-sm sm:text-base break-words text-muted-foreground/80">
            {isForgot ? t.forgotDesc : isLogin ? t.loginDesc : t.signupDesc}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          {isForgot ? (
            <>
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder={t.email}
                    autoFocus
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : t.sendResetLink}
                </Button>
              </form>
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-sm text-primary hover:underline"
                >
                  {t.backToLogin}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* OAuth Buttons */}
              <div className="space-y-3 mb-6">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => handleOAuthSignIn('google')}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {t.googleButton}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => handleOAuthSignIn('apple')}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  {t.appleButton}
                </Button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    {t.emailLogin}
                  </span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleAuth} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t.fullName}</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required={!isLogin}
                      placeholder={t.fullName}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">{t.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder={t.email}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Label htmlFor="password">{t.password}</Label>
                    {isLogin && (
                      <button
                        type="button"
                        onClick={() => setAuthMode('forgot')}
                        className="text-xs text-primary hover:underline"
                      >
                        {t.forgotPassword}
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder={t.password}
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
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isLogin ? t.loginButton : t.signupButton)}
                </Button>
              </form>
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setAuthMode(isLogin ? 'signup' : 'login')}
                  className="text-sm text-primary hover:underline"
                >
                  {isLogin ? t.switchToSignup : t.switchToLogin}
                </button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}