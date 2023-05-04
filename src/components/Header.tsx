import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import useOnScreen from '@/handlers/observer';
import { AppConfig } from '@/utils/AppConfig';

const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isScroll = useOnScreen(headerRef);
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    setStuck(isScroll);
  }, [isScroll]);
  const background = stuck ? 'bg-gray-900' : '';
  const styles = `p-4 sticky top-0 flex content-center justify-between ${background}`;

  return (
    <header ref={headerRef} className={styles}>
      <div className="basis-1/2">
        <h1 className="h-full text-4xl font-bold">{AppConfig.title}</h1>
      </div>
      <nav>
        <ul className="flex h-full flex-wrap content-center text-2xl">
          <li className="mr-6">
            <Link
              href="/"
              className="border-none text-secondary-color hover:text-blue-700"
            >
              Welcome
            </Link>
          </li>
          <li className="mr-6">
            <Link
              href="/login"
              className="border-none text-secondary-color hover:text-blue-700"
            >
              Sign In/ Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
