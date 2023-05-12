import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGetSchemaQuery } from '@/rtk/apiSlice';
import {
  selectEditorData,
  setEditorText,
  setHeaders,
  setVariables,
} from '@/rtk/dataSlice';

import { GQLTextarea } from '../GQLTextarea';

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const Request = () => {
  const dispatch = useDispatch();
  const { editorText, variables, headers } = useSelector(selectEditorData);
  const { data } = useGetSchemaQuery('');
  const [mode, setMode] = useState<string>('variables');

  const handleChange = (value: string) => {
    dispatch(setEditorText(value));
  };

  const handleHeaders = useCallback(
    (value: string) => {
      console.log(isJson(value));
      dispatch(setHeaders(value));
    },
    [mode]
  );

  const handleVariables = useCallback(
    (value: string) => {
      console.log(value);
      // dispatch(setVariables(editValue));
      dispatch(setVariables(value));
    },
    [mode]
  );

  console.log('data', data, editorText, variables, headers);

  // const query = fetch('https://rickandmortyapi.graphcdn.app/', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     query: dataText,
  //   }),
  // })
  //   .then((res) => res.json())
  //   .then((result) => console.log('result', result));

  const handleSend = useCallback(() => {
    // query();
    console.log(editorText);
    console.log(headers);
    console.log(variables);
  }, [headers, variables, editorText]);

  console.log('5151515151', mode, mode === 'headers' ? headers : variables);

  let textareaProps = {};
  if (mode === 'headers') {
    textareaProps = {
      onInput: handleHeaders,
      placeholder: 'Set JSON headers',
      value: headers,
    };
  } else {
    textareaProps = {
      onInput: handleVariables,
      placeholder: 'Set JSON variables',
      value: variables,
    };
  }

  return (
    <div>
      <GQLTextarea
        onInput={handleChange}
        placeholder="Set username"
        value={editorText}
      />
      <button onClick={handleSend} type="button">
        Send
      </button>

      <div>
        <button
          onClick={() => setMode('variables')}
          type="button"
          className={mode === 'variables' ? 'active' : ''}
        >
          Variables
        </button>
        <button
          onClick={() => setMode('headers')}
          type="button"
          className={mode === 'headers' ? 'active' : ''}
        >
          Headers
        </button>
      </div>

      <GQLTextarea {...textareaProps} />
    </div>
  );
};
export default Request;
