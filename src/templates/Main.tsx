import type { ReactNode } from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

const Main = (props: { meta: ReactNode; children: ReactNode }) => (
  <div className="relative flex h-full w-full flex-col justify-between text-white antialiased">
    {props.meta}

    <Header />

    <main className="flex-auto py-5 text-xl">{props.children}</main>

    <Footer />
  </div>
);

export { Main };
