import type { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectEditorText, setEditorText } from '@/rtk/dataSlice';

const Request = () => {
  const dispatch = useDispatch();
  const dataText = useSelector(selectEditorText);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    dispatch(setEditorText(e.target.value));
  };
  return (
    <div>
      <textarea
        onInput={handleChange}
        placeholder="Set username"
        value={dataText}
      />
    </div>
  );
};
export default Request;
