// libs
import { useState } from 'react';

// api
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
      ' kind\n' +
      ' ofType {\n' +
      'name\n' +
      ' }\n' +
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
        <div className="h-5/6 overflow-auto break-words p-2">
          <h2 className="text-rose-500">{data?.data.__type?.name}</h2>
          {data?.data.__type?.fields?.map((field) =>
            field.args.length ? (
              <p key={field.name} className="m-2">
                <span className="text-blue-200">{field.name}</span>(
                {field.args.map((arg, idx, arr) => (
                  <>
                    <span key={arg.name} className="text-rose-500">
                      {arg.name}
                    </span>
                    :{' '}
                    <span className="text-amber-400">
                      {arg.name === 'id' && 'ID!'}
                      {arg.name === 'ids' && '[ID!]!'}
                      {arg.name !== 'id' && arg.name !== 'ids' && arg.type.name}
                    </span>
                    {arr.length > 1 && idx !== arr.length - 1 && ', '}
                  </>
                ))}
                ):{' '}
                <button
                  type="button"
                  className="cursor-pointer text-amber-400 hover:text-amber-600"
                  onClick={() =>
                    field.type.name
                      ? setQueries([...queries, field.type.name])
                      : setQueries([...queries, field.type.ofType.name])
                  }
                >
                  {field.type.kind === 'LIST'
                    ? `[${field.type.ofType.name}]`
                    : field.type.name}
                </button>
                <p className="text-2xl">{field.description}</p>
              </p>
            ) : (
              <p key={field.name} className="m-2">
                <span className="text-blue-200">{field.name}</span>:{' '}
                <button
                  type="button"
                  className="cursor-pointer text-amber-400 hover:text-amber-600"
                  onClick={() =>
                    field.type.name
                      ? setQueries([...queries, field.type.name])
                      : setQueries([...queries, field.type.ofType.name])
                  }
                >
                  {field.type.kind === 'LIST'
                    ? `[${field.type.ofType.name}]`
                    : field.type.name}
                </button>
                <p className="text-2xl">{field.description}</p>
              </p>
            )
          )}
        </div>
      ) : (
        <p className="p-2">
          <span className="text-blue-200">query</span> :{' '}
          <button
            className="text-amber-400"
            type="button"
            onClick={() => setQueries(['Query'])}
          >
            Query
          </button>
        </p>
      )}
    </>
  );
};
export default Docs;
