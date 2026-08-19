import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import { useAdmin } from '@/hooks/useAdmin';
import { PageLoader } from '@/components/LoadingSpinner';

interface AdminRouteProps {
    children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
    const { user, loading: userLoading, sessionValidated, dataLoaded } = useUser();
    const { isAdmin, loading: adminLoading } = useAdmin();

    // Show loading while checking auth and admin status
    if (userLoading || adminLoading || !dataLoaded) {
        return <PageLoader />;
    }

    // Redirect to auth if no user or session not validated
    if (!user || !sessionValidated) {
        return <Navigate to="/auth" replace />;
    }

    // Redirect to dashboard if user is not an admin
    if (!isAdmin) {
        console.warn('Access denied to admin route: User is not an admin');
        return <Navigate to="/dashboard" replace />;
    }

    // Admin access granted
    return <>{children}</>;
}
