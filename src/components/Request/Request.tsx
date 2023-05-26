import * as Accordion from '@radix-ui/react-accordion';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGraphqlRequestMutation } from '@/rtk/apiSlice';
import {
  selectEditorData,
  setEditorText,
  setHeaders,
  setVariables,
} from '@/rtk/dataSlice';
import { setResponse } from '@/rtk/responseSlice';
import type { ApiRequestResponse } from '@/types/apiTypes';

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
  const [graphqlRequest] = useGraphqlRequestMutation();
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
      graphqlRequest({
        headers: headersList,
        query: editorText,
        variables: variablesList,
      }).then((response) => {
        const { data = null, error = null } = response as ApiRequestResponse;

        if (data) {
          dispatch(setResponse(data));
        } else if (error) {
          dispatch(setResponse(error?.data));
        }
      });
    }
  }, [headers, variables, editorText, dispatch, setResponse]);

 const handleCopy = useCallback(() => {
    if (data) navigator.clipboard.writeText(JSON.stringify(data));
  }, []);

  return (
    <div className="relative h-full">
      <GQLTextarea
        onInput={handleChange}
        placeholder="Set GQL request"
        value={editorText}
      />
      <button
        onClick={handleSend}
        type="button"
        className="absolute right-2 top-2 rounded bg-green-600 p-2 transition delay-150 ease-in-out hover:bg-green-800"
      >
        <svg
          height="1em"
          viewBox="0 0 16 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Execute query</title>
          <path
            d="M1.32226e-07 1.6609C7.22332e-08 0.907329 0.801887 0.424528 1.46789 0.777117L15.3306 8.11621C16.0401 8.49182 16.0401 9.50818 15.3306 9.88379L1.46789 17.2229C0.801886 17.5755 1.36076e-06 17.0927 1.30077e-06 16.3391L1.32226e-07 1.6609Z"
            fill="currentColor"
          />
        </svg>
      </button>
     <button
        onClick={handleCopy}
        type="button"
        className="absolute right-2 top-12 rounded bg-green-600 p-2 transition delay-150 ease-in-out hover:bg-green-800"
      >
        <svg
          fill="#fff"
          height="19px"
          width="17px"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 460 460"
          xmlSpace="preserve"
        >
          <title>Copy query</title>
          <g>
            <path
              d="M425.934,0H171.662c-18.122,0-32.864,14.743-32.864,32.864v77.134h30V32.864c0-1.579,1.285-2.864,2.864-2.864h254.272
				c1.579,0,2.864,1.285,2.864,2.864v254.272c0,1.58-1.285,2.865-2.864,2.865h-74.729v30h74.729
				c18.121,0,32.864-14.743,32.864-32.865V32.864C458.797,14.743,444.055,0,425.934,0z"
            />
            <path
              d="M288.339,139.998H34.068c-18.122,0-32.865,14.743-32.865,32.865v254.272C1.204,445.257,15.946,460,34.068,460h254.272
				c18.122,0,32.865-14.743,32.865-32.864V172.863C321.206,154.741,306.461,139.998,288.339,139.998z M288.341,430H34.068
				c-1.58,0-2.865-1.285-2.865-2.864V172.863c0-1.58,1.285-2.865,2.865-2.865h254.272c1.58,0,2.865,1.285,2.865,2.865v254.273h0.001
				C291.206,428.715,289.92,430,288.341,430z"
            />
          </g>
        </svg>
      </button>
      <Accordion.Root
        className="AccordionRoot absolute inset-x-0 bottom-2"
        type="single"
        defaultValue="item-1"
        collapsible
      >
        <Accordion.Item className="AccordionItem" value="item-1">
          <Accordion.AccordionTrigger>
            Headers & Variables ▼
          </Accordion.AccordionTrigger>
          <Accordion.AccordionContent className="AccordionContent">
            {!!errors.query.length && <div>Incorrect Query</div>}

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
