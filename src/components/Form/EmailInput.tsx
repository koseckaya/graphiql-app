import * as Form from '@radix-ui/react-form';

const EmailInput = () => {
  return (
    <Form.Field className="mb-[10px] grid" name="email">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[24px] font-medium leading-[38px] text-white">
          Email
        </Form.Label>
        <Form.Message
          className="text-[18px] text-white opacity-[0.8]"
          match="valueMissing"
        >
          Please enter your email
        </Form.Message>
        <Form.Message
          className="text-[14px] text-white opacity-[0.8]"
          match="typeMismatch"
        >
          <p className="text-[14px] text-white opacity-[0.8]">
            Please provide a valid email
          </p>
        </Form.Message>
        <Form.Message
          className="text-[14px] text-white opacity-[0.8]"
          match={(value) => !value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)}
        >
          <p className="text-[14px] text-white opacity-[0.8]">
            Please provide a valid email
          </p>
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input
          className="box-border inline-flex h-[40px] w-full appearance-none items-center justify-center rounded-[4px] px-[10px] text-[20px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
          type="email"
          required
        />
      </Form.Control>
    </Form.Field>
  );
};

export default EmailInput;
