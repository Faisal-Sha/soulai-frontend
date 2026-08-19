import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/hooks/useUser';
import { PageLoader } from '@/components/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading, sessionValidated } = useUser();
  const location = useLocation();
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    // Additional validation to prevent race conditions
    const validateSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setIsValidating(false);
          return;
        }
        setIsValidating(false);
      } catch (error) {
        console.error('Session validation error:', error);
        setIsValidating(false);
      }
    };

    if (!loading) {
      validateSession();
    }
  }, [loading, user]);

  // Show loading during initial auth check and validation
  if (loading || isValidating) {
    return <PageLoader />;
  }

  // Redirect if no user or session not validated
  if (!user || !sessionValidated) {
    const redirect = `${location.pathname}${location.search}`;
    return <Navigate to={`/auth?redirect=${encodeURIComponent(redirect)}`} replace />;
  }

  return <>{children}</>;
}
