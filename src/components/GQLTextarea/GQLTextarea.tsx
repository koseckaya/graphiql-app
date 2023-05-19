// @ts-nocheck
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
}

const GQLTextarea = ({ onInput, placeholder, value }: Props) => {
  const { data } = useGetSchemaQuery('');
  const myTextarea = useRef(null);
  // const [query, setQuery] = useState(value);

  let schema: GraphQLSchema | null = null;

  if (data) {
    schema = buildClientSchema(data.data);
  }

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      if (onInput) onInput(e.target.value);
    },
    [onInput]
  );

  // useEffect(() => {
  //   setQuery(value);
  // }, [placeholder]);

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
        mode: 'graphql',
        lineNumbers: true,
        theme: 'darcula',
        gutters: ['CodeMirror-lint-markers'],
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
      cols={35}
      rows={20}
      value={value}
    />
  );
};
export default GQLTextarea;
