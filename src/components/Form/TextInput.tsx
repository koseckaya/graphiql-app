import * as Form from '@radix-ui/react-form';
import { useTranslation } from 'next-i18next';

import InputTip from './InputTip';

const TextInput = () => {
  const { t } = useTranslation('common');
  return (
    <Form.Field className="mb-[10px] grid" name="name">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[24px] font-medium leading-[38px] text-white">
          {t('full_name')}
        </Form.Label>
        <Form.Message
          className="text-[18px] text-white opacity-[0.8]"
          match="valueMissing"
        >
          {t('full_name_empty')}
        </Form.Message>
        <Form.Message
          className="text-[18px] text-white"
          match={(value) =>
            !value.match(
              /^\s*([a-zA-Za-åa-ö-w-я]{2,}([.,] |[-']| ))+[a-zA-Za-åa-ö-w-я]+\.?\s*$/
            )
          }
        >
          <p className="flex text-end text-[16px] text-white opacity-[0.8]">
            {t('full_name_error')}
            <InputTip message={t('full_name_tip')} />
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
