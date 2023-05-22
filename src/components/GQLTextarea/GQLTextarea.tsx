import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/darcula.css';

import type CodeMirrorType from 'codemirror';
import type { GraphQLSchema } from 'graphql';
import { buildClientSchema } from 'graphql';
import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useRef } from 'react';

import { useGetSchemaQuery } from '@/rtk/apiSlice';

export interface Props {
  onInput?: (value: string) => void;
  placeholder?: string;
  value?: string;
  type?: 'graphql' | 'json';
  readOnlyParam?: boolean;
}

const GQLTextarea = ({
  onInput,
  placeholder,
  value,
  readOnlyParam = false,
  type = 'graphql',
}: Props) => {
  const { apiSchema } = useGetSchemaQuery('');
  const myTextarea = useRef(null);

  let schema: GraphQLSchema | null = null;

  if (apiSchema) {
    schema = buildClientSchema(apiSchema.data);
  }

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      if (onInput) onInput(e.target.value);
    },
    [onInput]
  );

  useEffect(() => {
    let CodeMirror: CodeMirrorType = null;
    if (
      myTextarea.current &&
      typeof window !== 'undefined' &&
      typeof window.navigator !== 'undefined'
    ) {
      require('codemirror/addon/hint/show-hint');
      require('codemirror/addon/lint/lint');
      require('codemirror-graphql/hint');
      require('codemirror-graphql/lint');
      require('codemirror-graphql/mode');
      require('codemirror-graphql/utils/info-addon');
      CodeMirror = require('codemirror');
      const cm = CodeMirror.fromTextArea(myTextarea.current, {
        mode: type,
        lineNumbers: true,
        theme: 'darcula',
        gutters: ['CodeMirror-lint-markers'],
        tabSize: 2,
        lineWrapping: true,
        readOnly: readOnlyParam,
        lint: {
          schema,
        },
        hintOptions: {
          schema,
        },
      });

      cm.on('change', (instance: typeof CodeMirror) => {
        if (onInput) {
          onInput(instance.getValue());
        }
      });
    }
  }, []);

  return (
    <textarea
      ref={myTextarea}
      onChange={handleChange}
      placeholder={placeholder}
      cols={75}
      rows={30}
      value={value}
    />
  );
};
export default GQLTextarea;
