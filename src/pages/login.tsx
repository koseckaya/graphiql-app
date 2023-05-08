import Link from 'next/link';

import FormEl from '@/components/Form/FormEl';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Login = () => (
  <Main meta={<Meta title="Login" description="Sign In page" />}>
    <div className="mx-auto my-28 flex max-w-md justify-center rounded-lg bg-gray-600">
      <div className="w-10/12 space-y-4 p-6 sm:p-8 md:space-y-6">
        <h2 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-3xl">
          Sign in to your account
        </h2>
        <FormEl title="Log In" />
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

export default Login;
