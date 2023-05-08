import * as Form from '@radix-ui/react-form';

import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import TextInput from './TextInput';

const FormEl = (props: { title: string }) => {
  return (
    <Form.Root className="flex w-full flex-col justify-center">
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
