import { getAuth, signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
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
  const router = useRouter();
  const auth = getAuth();
  const [lang, setLang] = useState(router.locale);
  const { locales, pathname, query } = useRouter();
  const { t } = useTranslation('common');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
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
      className={`sticky top-0 flex content-center justify-between border-b border-gray-200 ${background} p-4`}
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
      <nav>
        <ul className="flex h-full flex-wrap content-center text-2xl">
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
          {user && (
            <button type="button" onClick={handleSignOut} className="mx-4 mb-1">
              {t('sign_out')}
            </button>
          )}
          <li>
            <LanguageSwitcher
              locales={locales as string[]}
              lang={lang as string}
              onSwitchLang={onSwitchLang}
            />
          </li>
        </ul>
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
