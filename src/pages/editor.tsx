import type { GetStaticProps } from 'next';
import type { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { lazy, Suspense, useCallback, useState } from 'react';

import Loader from '@/components/Loader';
import { Request } from '@/components/Request';
import { Response } from '@/components/Response';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import { useAuthContext } from '../context/contextAuth';

const DocsLazy = lazy(() => import('../components/Docs/Docs'));

const Blog = () => {
  const MAX_WIDTH = 1024;
  const { user } = useAuthContext();
  const router = useRouter();
  const { t } = useTranslation('common');
  const [width, setWidth] = useState(window.document.body.clientWidth);
  const [isTransition, setIsTransition] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(
    !(window.document.body.clientWidth > MAX_WIDTH)
  );

  window.onresize = useCallback(() => {
    if (window.document.body.clientWidth < MAX_WIDTH) {
      setIsDocsOpen(true);
    }
    setWidth(window.document.body.clientWidth);
  }, []);

  React.useEffect(() => {
    if (user == null) router.push('/');
  }, [user]);

  const toggleDocs = useCallback(() => {
    setIsDocsOpen(!isDocsOpen);
    setIsTransition(true);
  }, [isDocsOpen]);

  const docsContainerClass = isDocsOpen ? 'w-full' : 'w-[48%]'; // Updated width class

  return user ? (
    <Main
      meta={
        <Meta
          title="GraphiQL App"
          description="GraphiQl App by @koseckaya @zhannach @pnmrvvtl"
        />
      }
    >
      <div className="flex flex-col justify-between gap-2 p-2 lg:flex-row">
        <section
          className={`transition-width flex h-screen justify-center rounded-lg bg-slate-600 shadow shadow-slate-300 ${
            isDocsOpen ? 'w-full' : 'w-28'
          }`}
          onTransitionEnd={() => {
            setIsTransition(false);
          }}
        >
          {width > MAX_WIDTH && (
            <button
              type="button"
              onClick={toggleDocs}
              className="flex pt-4 text-white"
            >
              {isDocsOpen ? (
                <div className="flex w-28 flex-col items-center justify-end hover:text-blue-200">
                  <Image
                    alt="book icon"
                    src="/assets/images/close.png"
                    width={50}
                    height={50}
                  />
                  {t('close_docs')}
                </div>
              ) : (
                <div className="flex w-16 flex-col items-center justify-end hover:text-blue-200">
                  <Image
                    alt="book icon"
                    src="/assets/images/open.png"
                    width={50}
                    height={50}
                  />
                  {t('open_docs')}
                </div>
              )}
            </button>
          )}
          {isDocsOpen && !isTransition && (
            <Suspense fallback={<Loader />}>
              <DocsLazy />
            </Suspense>
          )}
          {isDocsOpen && isTransition && <div className="w-full" />}
        </section>
        <section
          className={`${docsContainerClass} transition-width h-screen overflow-auto rounded-lg bg-slate-600 shadow shadow-slate-300`}
        >
          <Request />
        </section>

        <section
          className={`${docsContainerClass} transition-width h-screen rounded-lg bg-slate-600 shadow shadow-slate-300`}
        >
          <Response />
        </section>
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
