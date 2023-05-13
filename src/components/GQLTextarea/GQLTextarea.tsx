import type { ChangeEvent } from 'react';
import { useCallback } from 'react';

export interface Props {
  onInput?: (value: string) => void;
  placeholder?: string;
  value?: string;
}

const GQLTextarea = ({ onInput, placeholder, value }: Props) => {
  // const [text, setText] = useState(value);

  // useEffect(() => {
  //   console.log('SET VALUE', value);
  //   setText(value);
  // }, [value]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      if (onInput) onInput(e.target.value);
    },
    [onInput]
  );

  return (
    <textarea
      onChange={handleChange}
      placeholder={placeholder}
      cols={35}
      rows={20}
      style={{ color: 'grey', fontFamily: 'monospace' }}
      value={value}
    />
  );
};
export default GQLTextarea;
