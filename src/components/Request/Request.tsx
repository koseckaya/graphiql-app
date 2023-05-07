import type { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGetSchemaQuery } from '@/rtk/apiSlice';
import { selectEditorText, setEditorText } from '@/rtk/dataSlice';

const Request = () => {
  const dispatch = useDispatch();
  const dataText = useSelector(selectEditorText);
  const { data } = useGetSchemaQuery('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    dispatch(setEditorText(e.target.value));
  };
  console.log('data', data);

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
