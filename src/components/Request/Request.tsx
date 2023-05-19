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

const options = {
  activeClasses: '',
  inactiveClasses:
    'border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300',
};

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
      dispatch(setHeaders(value));
    },
    [mode]
  );

  const handleVariables = useCallback(
    (value: string) => {
      dispatch(setVariables(value));
    },
    [mode]
  );

  console.log('data', data, editorText, variables, headers);

  const handleSend = useCallback(() => {
    // query();
    console.log(headers, variables, editorText);
  }, [headers, variables, editorText]);

  return (
    <div>
      <GQLTextarea
        onInput={handleChange}
        placeholder="Set GQL request"
        value={editorText}
      />
      <button onClick={handleSend} type="button">
        Send
      </button>

      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="-mb-px flex flex-wrap text-center text-sm font-medium"
          id="myTab"
          data-tabs-toggle="#myTabContent"
          role="tablist"
        >
          <li className="mr-2" role="presentation">
            <button
              className={`inline-block rounded-t-lg border-b-2 p-4 ${
                mode === 'variables'
                  ? options.activeClasses
                  : options.inactiveClasses
              }`}
              type="button"
              role="tab"
              onClick={() => setMode('variables')}
            >
              Variables
            </button>
          </li>
          <li className="mr-2" role="presentation">
            <button
              className={`inline-block rounded-t-lg border-b-2 p-4 ${
                mode === 'headers'
                  ? options.activeClasses
                  : options.inactiveClasses
              }`}
              type="button"
              role="tab"
              onClick={() => setMode('headers')}
            >
              Headers
            </button>
          </li>
        </ul>
      </div>
      <div>
        {mode === 'variables' && (
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <GQLTextarea
              onInput={handleVariables}
              placeholder="Set JSON variables"
              value={variables}
            />
          </div>
        )}
        {mode === 'headers' && (
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <GQLTextarea
              onInput={handleHeaders}
              placeholder="Set JSON headers"
              value={headers}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Request;
