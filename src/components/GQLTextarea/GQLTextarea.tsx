import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/darcula.css';

import type { GraphQLSchema } from 'graphql';
import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useRef } from 'react';

export interface Props {
  onInput?: (value: string) => void;
  placeholder?: string;
  value?: string;
  type?: 'graphql' | 'json';
  readOnlyParam?: boolean;
  schema?: GraphQLSchema | null;
}

const GQLTextarea = ({
  onInput,
  placeholder,
  value,
  readOnlyParam = false,
  type = 'graphql',
  schema = null,
}: Props) => {
  const myTextarea = useRef(null);
  const refEditor = useRef(null);
  let CodeMirrorModule: unknown = null;

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      if (onInput) onInput(e.target.value);
    },
    [onInput]
  );

  useEffect(() => {
    if (refEditor.current) {
      const currentValue = (refEditor.current as any).getDoc().getValue();
      if (currentValue !== value) {
        (refEditor.current as any).getDoc().setValue(value);
      }
    }
  }, [value]);

  useEffect(() => {
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
      CodeMirrorModule = require('codemirror');
      const cmConfig = {
        mode: type,
        lineNumbers: true,
        showHint: true,
        theme: 'darcula',
        gutters: ['CodeMirror-lint-markers'],
        tabSize: 2,
        lineWrapping: true,
        readOnly: readOnlyParam,
        lint: {},
        hintOptions: {},
      };

      if (schema) {
        cmConfig.lint = { schema };
        cmConfig.hintOptions = { schema };
      }

      const cm = (CodeMirrorModule as any).fromTextArea(
        myTextarea.current,
        cmConfig
      );

      cm.on('change', (instance: typeof CodeMirrorModule) => {
        if (onInput) {
          onInput((instance as any).getValue());
        }
      });

      refEditor.current = cm;
    }
  }, []);

  return (
    <textarea
      ref={myTextarea}
      onChange={handleChange}
      placeholder={placeholder}
      value={value}
    />
  );
};
export default GQLTextarea;
