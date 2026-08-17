import { useUser } from './useUser';

export function useAdmin() {
    const { isAdmin, adminRole, loading, dataLoaded } = useUser();

    return {
        isAdmin,
        adminRole,
        loading,
        dataLoaded,
        refreshAdminStatus: () => Promise.resolve(), // No-op since it's handled by context
    };
}
