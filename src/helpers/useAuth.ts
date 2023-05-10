import { useSelector } from 'react-redux';

import type { AppState } from '@/rtk/store';

export function useAuth() {
  const { email, id, fullName, token } = useSelector(
    (state: AppState) => state.user
  );

  return {
    isAuth: !!email,
    email,
    id,
    fullName,
    token,
  };
}
