import { useSelector } from 'react-redux';

import { selectResponse } from '@/rtk/responseSlice';

import { GQLTextarea } from '../GQLTextarea';

const Response = () => {
  const data = useSelector(selectResponse);

  return (
    <div>
      <GQLTextarea
        type="json"
        value={JSON.stringify(data, null, 2)}
        readOnlyParam
      />
    </div>
  );
};
export default Response;
