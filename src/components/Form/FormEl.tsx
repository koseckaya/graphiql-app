import * as Form from '@radix-ui/react-form';
import type { FormEvent } from 'react';

import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import TextInput from './TextInput';

const FormEl = (props: {
  title: string;
  handleFormSubmit(data: { [k: string]: FormDataEntryValue }): void;
}) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.handleFormSubmit(
      Object.fromEntries(new FormData(event.currentTarget))
    );
  };
  return (
    <Form.Root
      className="flex w-full flex-col justify-center"
      onSubmit={(event) => handleSubmit(event)}
    >
      {props.title === 'Sign Up' && <TextInput />}
      <EmailInput />
      <PasswordInput />
      <Form.Submit asChild>
        <button
          type="submit"
          className="mb-4 mt-5 block w-full 
          rounded-lg bg-gray-800 px-6 py-3
          text-lg font-semibold text-black shadow-xl hover:bg-black hover:text-white"
        >
          {props.title}
        </button>
      </Form.Submit>
    </Form.Root>
  );
};

export default FormEl;
