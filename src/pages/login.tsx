import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import type { GetStaticProps } from 'next';
import type { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import FormEl from '@/components/Form/FormEl';
import { Meta } from '@/layouts/Meta';
import { setUser } from '@/rtk/userSlice';
import { Main } from '@/templates/Main';

const Login = () => {
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation('common');
  const handleLogin = (data: { [k: string]: string }) => {
    const { email, password } = data;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email as string, password as string)
      .then((userCredential) => {
        const { user } = userCredential;
        dispatch(
          setUser({
            email: user.email as string,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        router.push('/editor');
      })
      .catch(() => {
        setIsError(true);
      });
  };

  return (
    <Main meta={<Meta title="Login" description="Sign In page" />}>
      <div className="mx-auto my-28 flex max-w-md justify-center rounded-lg bg-gray-600">
        <div className="w-10/12 space-y-2 p-6 sm:p-8 ">
          <h2 className="text-center text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-3xl">
            {t('sign_in_title')}
          </h2>
          {isError && (
            <p className="bg-red-400 text-center text-lg">
              {t('login_error')}
              &darr;
            </p>
          )}
          <FormEl
            isSignUp={false}
            title={t('login')}
            handleFormSubmit={handleLogin}
          />
          <span className="mt-px">{t('don’t_have_an_account')} </span>
          <Link
            href="/signup/"
            className="mt-20 text-center font-semibold text-gray-900 duration-300 hover:text-gray-300"
          >
            {t('sign_up')}
          </Link>
        </div>
      </div>
    </Main>
  );
};

export default Login;

export const getStaticProps: GetStaticProps<
  { [key: string]: unknown },
  Params
> = async (context) => {
  const { locale = 'en' } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};
