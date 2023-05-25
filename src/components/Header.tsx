import { getAuth, signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAuthContext } from '@/context/contextAuth';
import { removeUser } from '@/rtk/userSlice';
import { AppConfig } from '@/utils/AppConfig';

import LanguageSwitcher from './LanguageSwitcher';
import ClientOnlyPortal from './Portal/ClientOnlyPortal';
import Modal from './Portal/Modal';

const Header = () => {
  const [scrollTop, setScrollTop] = useState(false);
  const { user } = useAuthContext();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();
  const auth = getAuth();
  const navRef = useRef<HTMLElement>(null);
  const [lang, setLang] = useState(router.locale);
  const { locales, pathname, query } = useRouter();
  const { t } = useTranslation('common');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY > 0);
    };

    const handleClickOuside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Element)) {
        setIsNavOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleClickOuside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClickOuside);
    };
  }, []);

  const onSwitchLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLang(e.currentTarget.value);
    router.push({ pathname, query }, router.asPath, {
      locale: e.currentTarget.value,
    });
  };

  const handleSignOut = () => {
    setIsModalOpen(true);
  };

  const handleEventModal = () => {
    dispatch(removeUser());
    router.push('/');
    signOut(auth);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const background = scrollTop
    ? 'bg-blue-900 transition-colors ease-in-out delay-250'
    : '';

  return (
    <header
      className={`sticky top-0 z-20 flex content-center justify-between border-b border-gray-200 ${background} px-2 md:p-4`}
    >
      <div className="basis-1/2">
        <h1 className="h-full text-4xl font-bold">
          <Link
            href="/"
            className="border-none text-secondary-color hover:text-blue-700"
          >
            {AppConfig.title}
          </Link>
        </h1>
      </div>
      <nav ref={navRef}>
        <ul
          className={`${
            isNavOpen && 'visible'
          } burger flex h-full flex-wrap content-center text-2xl`}
        >
          {user ? (
            <li className="mr-4">
              <Link
                href="/editor"
                className="border-none text-secondary-color hover:text-blue-700"
              >
                {t('go_to_main')}
              </Link>
            </li>
          ) : (
            <li className="mr-4">
              <Link
                href="/login"
                className="border-none text-secondary-color hover:text-blue-700"
              >
                {t('sign_in/sign_up')}
              </Link>
            </li>
          )}
          <li>
            {user && (
              <button
                type="button"
                onClick={handleSignOut}
                className="mx-4 mb-1"
              >
                {t('sign_out')}
              </button>
            )}
          </li>

          <li>
            <LanguageSwitcher
              locales={locales as string[]}
              lang={lang as string}
              onSwitchLang={onSwitchLang}
            />
          </li>
        </ul>
        <div>
          <button
            type="button"
            onClick={() => setIsNavOpen(true)}
            className="group relative mr-2 md:hidden"
          >
            <div className="relative flex h-[40px] w-[40px] items-center justify-center overflow-hidden rounded-full bg-gray-700 shadow-md ring-0 ring-gray-300 transition-all duration-200 group-focus:ring-4">
              <div className="flex h-[20px] w-[20px] origin-center flex-col justify-between overflow-hidden transition-all duration-300 group-focus:translate-x-1.5">
                <div className="h-[2px] w-7 origin-left bg-blue-100 transition-all delay-150 duration-300 group-focus:w-2/3 group-focus:rotate-[42deg]" />
                <div className="h-[2px] w-7 rounded bg-white transition-all duration-300 group-focus:translate-x-10" />
                <div className="h-[2px] w-7 origin-left bg-white transition-all delay-150 duration-300 group-focus:w-2/3 group-focus:rotate-[42deg]" />
              </div>
            </div>
          </button>
        </div>
        {isModalOpen && (
          <ClientOnlyPortal selector="#modal">
            <Modal
              message={t('confirm_signout')}
              callBack={handleEventModal}
              closeModal={closeModal}
            />
          </ClientOnlyPortal>
        )}
      </nav>
    </header>
  );
};

export default Header;
