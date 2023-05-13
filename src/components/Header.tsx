import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAuth } from '@/helpers/useAuth';
import { removeUser } from '@/rtk/userSlice';
import { AppConfig } from '@/utils/AppConfig';

import ClientOnlyPortal from './Portal/ClientOnlyPortal';
import Modal from './Portal/Modal';

const Header = () => {
  const [scrollTop, setScrollTop] = useState(false);
  const { isAuth } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
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

  const handleSignOut = () => {
    setIsModalOpen(true);
  };

  const handleEventModal = () => {
    dispatch(removeUser());
    router.push('/');
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
          {isAuth && (
            <button type="button" onClick={handleSignOut} className="mx-4">
              Sign out
            </button>
          )}
          {!isAuth && (
            <li className="mr-6">
              <Link
                href="/login"
                className="border-none text-secondary-color hover:text-blue-700"
              >
                Sign In / Sign Up
              </Link>
            </li>
          )}
        </ul>
        {isModalOpen && (
          <ClientOnlyPortal selector="#modal">
            <Modal
              message="Are you sure you want to sign out?"
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
