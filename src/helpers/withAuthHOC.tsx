import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuth } from '@/helpers/useAuth';

const withAuth = (Component: () => JSX.Element) => {
  const ComponentWithAuth = () => {
    const router = useRouter();
    const { isAuth } = useAuth();

    useEffect(() => {
      if (!isAuth) {
        router.push('/login');
      }
    }, []);

    return isAuth && <Component />;
  };

  return ComponentWithAuth;
};

export default withAuth;
