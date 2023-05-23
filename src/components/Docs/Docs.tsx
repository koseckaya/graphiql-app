// libs
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import Loader from '@/components/Loader';
// api
import { useGetDocumentationSchemaQuery } from '@/rtk/apiSlice';

const Docs = () => {
  const [queries, setQueries] = useState<string[]>([]);
  const { t } = useTranslation('common');

  const { data, error, isLoading, isFetching } = useGetDocumentationSchemaQuery(
    {
      queryString:
        'query getFieldInfo {\n' +
        `__type(name: "${queries[queries.length - 1]}") {\n` +
        'name\n' +
        'description\n' +
        'inputFields {\n' +
        'name\n' +
        'description\n' +
        'type {\n' +
        'name\n' +
        'kind\n' +
        'ofType {\n' +
        'name\n' +
        '}\n' +
        '}\n' +
        '}\n' +
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
    }
  );

  if (error)
    return <h2 className="p-2 text-2xl text-rose-400">{t('docs_error')}</h2>;

  if (isFetching || isLoading) {
    return (
      <div className="w-full">
        <Loader />
      </div>
    );
  }

  return queries.length ? (
    <section className="h-7/8 w-full overflow-auto break-words p-2">
      <button
        onClick={() => setQueries([...queries.slice(0, queries.length - 1)])}
        type="button"
        className="rounded border-2 border-blue-300 p-1 hover:text-blue-200"
      >
        {'<< '}
        {queries.at(-2) ? queries.at(-2) : 'Docs'}
      </button>
      <h2 className="text-2xl text-rose-500">{data?.data.__type?.name}</h2>
      <h3 className="text-xl">{data?.data.__type?.description}</h3>
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
                <button
                  type="button"
                  className="cursor-pointer text-amber-400 hover:text-amber-600"
                  onClick={() =>
                    arg.type.name
                      ? setQueries([...queries, arg.type.name])
                      : setQueries([...queries, 'ID'])
                  }
                >
                  {arg.name === 'id' && 'ID!'}
                  {arg.name === 'ids' && '[ID!]!'}
                  {arg.name !== 'id' && arg.name !== 'ids' && arg.type.name}
                </button>
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
              onClick={() => {
                if (field.type.name)
                  return setQueries([...queries, field.type.name]);
                if (field.type.ofType.name)
                  return setQueries([...queries, field.type.ofType.name]);
                if (field.name !== 'residents') {
                  return setQueries([
                    ...queries,
                    field.name
                      .at(0)!
                      .toUpperCase()
                      .concat(
                        field.name.slice(
                          1,
                          field.name.at(-1) !== 's'
                            ? field.name.length
                            : field.name.length - 1
                        )
                      ),
                  ]);
                }
                return setQueries([...queries, 'Character']);
              }}
            >
              {field.type.kind === 'LIST'
                ? `[${field.type.ofType.name}]`
                : field.type.name ||
                  (field.name === 'residents' && '[Character]') ||
                  `[${field.name
                    .at(0)
                    ?.toUpperCase()
                    .concat(
                      field.name.slice(
                        1,
                        field.name.at(-1) !== 's'
                          ? field.name.length
                          : field.name.length - 1
                      )
                    )}]`}
            </button>
            <p className="text-2xl">{field.description}</p>
          </p>
        )
      )}
      {data?.data.__type?.inputFields?.map((field) => (
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
      ))}
    </section>
  ) : (
    <section className="p-2">
      <div>
        <h2 className="text-3xl">{t('docs')}</h2>
        <p>{t('docs_description')}</p>
      </div>
      <span className="text-blue-200">query</span> :{' '}
      <button
        className="text-amber-400"
        type="button"
        onClick={() => setQueries(['Query'])}
      >
        Query
      </button>
    </section>
  );
};
export default Docs;
