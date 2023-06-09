import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
  ApiRequestResponse,
  ApiResponse,
  ApiSchemaResponse,
  MutationQuery,
} from '@/types/apiTypes';

const apiUrl = 'https://rickandmortyapi.graphcdn.app/';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    mode: 'cors',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSchema: builder.query<ApiSchemaResponse, string>({
      query: () => ({
        body: {
          query:
            '\n    query IntrospectionQuery {\n      __schema {\n        \n        queryType { name }\n        mutationType { name }\n        subscriptionType { name }\n        types {\n          ...FullType\n        }\n        directives {\n          name\n          description\n          \n          locations\n          args {\n            ...InputValue\n          }\n        }\n      }\n    }\n\n    fragment FullType on __Type {\n      kind\n      name\n      description\n      \n      fields(includeDeprecated: true) {\n        name\n        description\n        args {\n          ...InputValue\n        }\n        type {\n          ...TypeRef\n        }\n        isDeprecated\n        deprecationReason\n      }\n      inputFields {\n        ...InputValue\n      }\n      interfaces {\n        ...TypeRef\n      }\n      enumValues(includeDeprecated: true) {\n        name\n        description\n        isDeprecated\n        deprecationReason\n      }\n      possibleTypes {\n        ...TypeRef\n      }\n    }\n\n    fragment InputValue on __InputValue {\n      name\n      description\n      type { ...TypeRef }\n      defaultValue\n      \n      \n    }\n\n    fragment TypeRef on __Type {\n      kind\n      name\n      ofType {\n        kind\n        name\n        ofType {\n          kind\n          name\n          ofType {\n            kind\n            name\n            ofType {\n              kind\n              name\n              ofType {\n                kind\n                name\n                ofType {\n                  kind\n                  name\n                  ofType {\n                    kind\n                    name\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  ',
          operationName: 'IntrospectionQuery',
        },
        url: '',
        method: 'POST',
      }),
    }),
    graphqlRequest: builder.mutation<ApiRequestResponse, MutationQuery>({
      query({ headers, query, variables }) {
        return {
          url: '/',
          method: 'POST',
          headers,
          body: { query, variables },
        };
      },
    }),
    getDocumentationSchema: builder.query<ApiResponse, { queryString: string }>(
      {
        query: ({ queryString }) => ({
          body: {
            query: queryString,
          },
          url: '',
          method: 'POST',
        }),
      }
    ),
  }),
});

export const {
  useGetSchemaQuery,
  useGetDocumentationSchemaQuery,
  useGraphqlRequestMutation,
} = api;
