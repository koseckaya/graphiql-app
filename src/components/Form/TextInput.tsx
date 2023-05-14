import * as Form from '@radix-ui/react-form';

import InputTip from './InputTip';

const TextInput = () => {
  return (
    <Form.Field className="mb-[10px] grid" name="name">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[24px] font-medium leading-[38px] text-white">
          Full name
        </Form.Label>
        <Form.Message
          className="text-[18px] text-white opacity-[0.8]"
          match="valueMissing"
        >
          Please enter your name
        </Form.Message>
        <Form.Message
          className="text-[18px] text-white"
          match={(value) =>
            !value.match(/^\s*([A-Za-z]{2,}([.,] |[-']| ))+[A-Za-z]+\.?\s*$/)
          }
        >
          <p className="flex text-[14px] text-white opacity-[0.8]">
            Enter correct name
            <InputTip message="Enter your first and last name with a space" />
          </p>
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input
          className="box-border inline-flex h-[40px] w-full appearance-none items-center justify-center rounded-[4px] px-[10px] text-[20px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
          type="text"
          required
        />
      </Form.Control>
    </Form.Field>
  );
};

export default TextInput;
