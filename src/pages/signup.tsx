import FormEl from '@/components/Form/FormEl';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const SignUp = () => (
  <Main meta={<Meta title="Signup" description="Sign Up page" />}>
    <div className="mx-auto my-28 flex max-w-md justify-center rounded-lg bg-gray-600">
      <div className="w-10/12 space-y-4 p-6 sm:p-8 md:space-y-6">
        <h2 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-3xl">
          Create your account
        </h2>
        <FormEl title="Sign Up" />
      </div>
    </div>
  </Main>
);

export default SignUp;
