import Image from 'next/image';

import logo from '../../public/assets/images/github.svg';

const Footer = () => {
  return (
    <footer className="flex justify-between border-t border-gray-300 p-2 text-center text-sm">
      <div className="flex gap-x-1">
        <a
          href="https://github.com/koseckaya"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={logo} className="h-11 w-12" alt="github logo" />
        </a>
        <a
          href="https://github.com/pnmrvvtl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={logo} className="h-11 w-12" alt="github logo" />
        </a>
        <a
          href="https://github.com/zhannach"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={logo} className="h-11 w-12" alt="github logo" />
        </a>
      </div>
      <div className="text-2xl">2023</div>
      <a
        href="https://rs.school/react/"
        title="rsschool link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://rs.school/images/rs_school_js.svg"
          className="h-10"
          alt="rs-logo"
        />
      </a>
    </footer>
  );
};

export default Footer;
