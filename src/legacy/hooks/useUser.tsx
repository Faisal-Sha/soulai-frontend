import { useUser as useUserContext } from '@/contexts/UserContext';

export type { UserProfile, UserSubscription } from '@/contexts/UserContext';

export function useUser() {
  return useUserContext();
}

