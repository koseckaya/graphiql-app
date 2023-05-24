import { useSelector } from 'react-redux';

import { selectResponse } from '@/rtk/responseSlice';

import { GQLTextarea } from '../GQLTextarea';

const Response = () => {
  let data = useSelector(selectResponse);
  if (!data) data = {};
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
