import { useState } from 'react';

import { useGetDocumentationSchemaQuery } from '@/rtk/apiSlice';

const Docs = () => {
  const [queries, setQueries] = useState<string[]>([]);

  const { data } = useGetDocumentationSchemaQuery({
    queryString:
      'query getFieldInfo {\n' +
      `__type(name: "${queries[queries.length - 1]}") {\n` +
      'name\n' +
      'fields {\n' +
      'name\n' +
      'args {\n' +
      'name\n' +
      'type {\n' +
      'name\n' +
      '}\n' +
      '}\n' +
      'description\n' +
      'type {\n' +
      'name\n' +
      '}\n' +
      '}\n' +
      '}\n' +
      '}',
  });

  return (
    <>
      <button
        onClick={() => setQueries([...queries.slice(0, queries.length - 1)])}
        type="button"
        className="m-2 border-2 border-b-blue-200 p-3"
      >
        BACK
      </button>
      {queries.length ? (
        <div className="overflow-auto break-words p-2">
          {JSON.stringify(data)}
        </div>
      ) : (
        <p>
          <span>query</span> :{' '}
          <button type="button" onClick={() => setQueries(['Query'])}>
            Query
          </button>
        </p>
      )}
    </>
  );
};
export default Docs;
