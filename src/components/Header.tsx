import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import { AppConfig } from '@/utils/AppConfig';

const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const background = scrollTop
    ? 'bg-gray-900 transition-colors ease-in-out delay-250'
    : '';
  const styles = `p-4 border-b border-gray-300 sticky top-0 flex content-center justify-between ${background}`;

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
