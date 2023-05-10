import { useGetDocumentationSchemaQuery } from '@/rtk/apiSlice';

const Docs = () => {
  const { data } = useGetDocumentationSchemaQuery({
    queryString:
      'query IntrospectionQuery {\n' +
      '__schema {\n' +
      'queryType {\n' +
      'name\n' +
      'fields {\n' +
      'name\n' +
      'description\n' +
      'args {\n' +
      'name\n' +
      'type {\n' +
      'name\n' +
      'inputFields {\n' +
      'name\n' +
      '}\n' +
      '}\n' +
      '}\n' +
      '}\n' +
      '}\n' +
      '}\n' +
      '}',
  });

  return data ? (
    <div>
      {data.data.__schema.queryType.fields?.map((field) => (
        <p key={field.name}>
          {field.name}(
          {field.args.map((arg) => (
            <span key={arg.name}>{arg.name}</span>
          ))}
          )
        </p>
      ))}
    </div>
  ) : (
    <h2>An error occurs while loading api schema, please reload the page.</h2>
  );
};
export default Docs;
