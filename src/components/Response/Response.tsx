import { useSelector } from 'react-redux';

import { selectResponse } from '@/rtk/responseSlice';

import { GQLTextarea } from '../GQLTextarea';

const Response = () => {
  const data = useSelector(selectResponse);

  return (
    <div>
      {data && (
        <GQLTextarea type="json" value={JSON.stringify(data, null, 2)} />
      )}
    </div>
  );
};
export default Response;
