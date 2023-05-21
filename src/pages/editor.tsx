import type { GetStaticProps } from 'next';
import type { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { Docs } from '@/components/Docs';
import { Request } from '@/components/Request';
import { Response } from '@/components/Response';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import { useAuthContext } from '../context/contextAuth';

const Blog = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    if (user == null) router.push('/');
  }, [user]);

  return user ? (
    <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
      <div className="container grid grid-cols-3 justify-center gap-x-2.5">
        <div className="h-screen max-w-screen-sm rounded-lg border-2 border-solid border-sky-500 bg-slate-800">
          <Docs />
        </div>
        <div className="h-screen max-w-screen-sm rounded-lg border-2 border-solid border-sky-500 bg-slate-800">
          <Request />
        </div>
        <div className="h-screen max-w-screen-sm rounded-lg border-2 border-solid border-sky-500 bg-slate-800">
          <Response />
        </div>
      </div>
    </Main>
  ) : null;
};

export default Blog;

export const getStaticProps: GetStaticProps<
  { [key: string]: unknown },
  Params
> = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale as string)),
    },
  };
};
