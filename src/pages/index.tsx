import Link from 'next/link';

import Team from '@/components/Team';
import { useAuth } from '@/helpers/useAuth';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  const { isAuth } = useAuth();
  return (
    <Main meta={<Meta title="Welcome Page" description="Team description" />}>
      <section className="mx-auto my-12 flex w-4/5 flex-col justify-center gap-y-3">
        <h2 className="text-center text-5xl font-bold text-blue-700">
          GraphiQL
        </h2>
        <p className="mt-8 text-center text-2xl ">
          is an interactive in-browser GraphQL IDE. This is a fantastic
          developer tool to help you <br /> form queries and explore your
          Schema.
        </p>
        <div className="mt-4 text-center text-4xl">
          <span className="text-center">Try it now</span>
          <Link href={isAuth ? '/editor/' : '/login'}>
            <button
              type="button"
              className="ml-5 inline-flex w-14 items-center rounded-lg border border-secondary-color bg-blue-700 p-3 text-center  text-sm font-medium text-blue-700 hover:bg-blue-900 hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                fill="#fff"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </Link>
        </div>

        <Team />
      </section>
    </Main>
  );
};

export default Index;
