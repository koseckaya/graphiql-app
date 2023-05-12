import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import FormEl from '@/components/Form/FormEl';
import { Meta } from '@/layouts/Meta';
import { setUser } from '@/rtk/userSlice';
import { Main } from '@/templates/Main';

const SignUp = () => {
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSignUp = (data: { [k: string]: string }) => {
    const { email, password, fullName } = data;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email as string, password as string)
      .then((userCredential) => {
        const { user } = userCredential;
        dispatch(
          setUser({
            email: user.email as string,
            id: user.uid,
            token: user.refreshToken,
            fullName,
          })
        );
        router.push('/editor');
      })
      .catch(() => {
        setIsError(true);
      });
  };

  return (
    <Main meta={<Meta title="Signup" description="Sign Up page" />}>
      <div className="mx-auto my-28 flex max-w-md justify-center rounded-lg bg-gray-600">
        <div className="w-10/12 space-y-2 p-6 sm:p-8 ">
          <h2 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-3xl">
            Create your account
          </h2>
          {isError && (
            <p className="bg-red-400 text-center text-lg">
              This account already used
            </p>
          )}
          <FormEl title="Sign Up" handleFormSubmit={handleSignUp} />
        </div>
      </div>
    </Main>
  );
};

export default SignUp;
