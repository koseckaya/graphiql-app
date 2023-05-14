import * as Form from '@radix-ui/react-form';
import { useState } from 'react';

import InputTip from './InputTip';

const PasswordInput = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }
  return (
    <Form.Field className="relative mb-[10px] grid" name="password">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[24px] font-medium leading-[38px] text-white">
          Password
        </Form.Label>
        <Form.Message
          className="text-[18px] text-white opacity-[0.8]"
          match="valueMissing"
        >
          Create a password
        </Form.Message>
        <Form.Message
          className="text-[18px] text-white"
          match={(value) =>
            !value.match(/^(?=.*[A-Za-z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/)
          }
        >
          <p className="flex text-[14px] text-white opacity-[0.8]">
            Create strong password
            <InputTip message="Strong password - minimum 8 symbols, at least one letter, one digit, one special character." />
          </p>
        </Form.Message>
      </div>
      <div className="relative">
        <Form.Control asChild>
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            className="box-border inline-flex w-full resize-none items-center justify-center rounded-[4px] p-[10px] text-[20px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
            required
          />
        </Form.Control>
        <button
          type="button"
          className="absolute right-1 top-1"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="gray"
              className="h-8 w-10 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="gray"
              className="h-8 w-10 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
          )}
        </button>
      </div>
    </Form.Field>
  );
};

export default PasswordInput;
