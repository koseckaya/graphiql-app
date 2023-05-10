import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import FormEl from '@/components/Form/FormEl';
import { Meta } from '@/layouts/Meta';
import { setUser } from '@/rtk/userSlice';
import { Main } from '@/templates/Main';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
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
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <Main meta={<Meta title="Login" description="Sign In page" />}>
      <div className="mx-auto my-28 flex max-w-md justify-center rounded-lg bg-gray-600">
        <div className="w-10/12 space-y-4 p-6 sm:p-8 md:space-y-6">
          <h2 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-3xl">
            Sign in to your account
          </h2>
          <FormEl title="Log In" handleFormSubmit={handleLogin} />
          <span className="mt-px">Don’t have an account? </span>
          <Link
            href="/signup/"
            className="mt-20 text-center font-semibold text-gray-900 duration-300 hover:text-gray-300"
          >
            Sign up.
          </Link>
        </div>
      </div>
    </Main>
  );
};

export default Login;
