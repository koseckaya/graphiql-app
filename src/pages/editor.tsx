import type { GetStaticProps } from 'next';
import type { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Docs } from '@/components/Docs';
import { Request } from '@/components/Request';
import withAuth from '@/helpers/withAuthHOC';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Blog = () => (
  <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
    <div className="container grid grid-cols-3 justify-center gap-x-2.5">
      <div className="h-screen max-w-screen-sm rounded-lg border-2 border-solid border-sky-500 bg-slate-800">
        <Docs />
      </div>
      <div className="h-screen max-w-screen-sm rounded-lg border-2 border-solid border-sky-500 bg-slate-800">
        <Request />
      </div>
      <div className="h-screen max-w-screen-sm rounded-lg border-2 border-solid border-sky-500 bg-slate-800">
        Response
      </div>
    </div>
  </Main>
);

export default withAuth(Blog);

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
