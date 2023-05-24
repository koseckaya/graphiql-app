import * as Accordion from '@radix-ui/react-accordion';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useCreateRequestMutation } from '@/rtk/apiSlice';
import {
  selectEditorData,
  setEditorText,
  setHeaders,
  setVariables,
} from '@/rtk/dataSlice';
import { setResponse } from '@/rtk/responseSlice';

import { GQLTextarea } from '../GQLTextarea';

const options = {
  activeClasses: '',
  inactiveClasses:
    'border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300',
};

const DEFAULT_ERRORS = {
  headers: '',
  variables: '',
  query: '',
};

const Request = () => {
  const dispatch = useDispatch();
  const { editorText, variables, headers } = useSelector(selectEditorData);
  const [mode, setMode] = useState<string>('variables');
  const [createRequest] = useCreateRequestMutation();
  const [errors, setErrors] = useState(DEFAULT_ERRORS);

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

  const validateParams = useCallback(
    (headersList: string, variablesList: string) => {
      try {
        JSON.parse(headersList);
      } catch (e) {
        setErrors({ ...DEFAULT_ERRORS, headers: 'Not valid Headers' });
        return false;
      }
      try {
        JSON.parse(variablesList);
      } catch (e) {
        setErrors({ ...DEFAULT_ERRORS, variables: 'Not valid Variables' });
        return false;
      }
      return true;
    },
    [setErrors, errors]
  );

  const handleSend = useCallback(() => {
    if (validateParams(headers, variables)) {
      const headersList = JSON.parse(headers);
      const variablesList = JSON.parse(variables);
      createRequest({
        headers: headersList,
        query: editorText,
        variables: variablesList,
      }).then(({ data, error }) => {
        if (data) {
          dispatch(setResponse(data));
        } else {
          dispatch(setResponse(error.data));
        }
      });
    }
  }, [headers, variables, editorText, dispatch, setResponse]);

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
      <Accordion.Root
        className="AccordionRoot"
        type="single"
        defaultValue="item-1"
        collapsible
      >
        <Accordion.Item className="AccordionItem" value="item-1">
          <Accordion.AccordionTrigger>
            ▼ Headers & Variables
          </Accordion.AccordionTrigger>
          <Accordion.AccordionContent className="AccordionContent">
            {!!errors.query.length && <div>Неверный Query</div>}

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
          </Accordion.AccordionContent>
        </Accordion.Item>
      </Accordion.Root>

      {!!errors.variables.length && <div>{errors.variables}</div>}
      {!!errors.headers.length && <div>{errors.headers}</div>}
    </div>
  );
};
export default Request;
