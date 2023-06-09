import type { IntrospectionQuery } from 'graphql';

export interface ApiResponse {
  data: Data;
}

export interface Data {
  __type: Type;
}

export interface Type {
  name: string;
  fields: Field[];
  description: string;
  inputFields: Field[];
  __typename: TypeName;
}

export interface Field {
  name: string;
  args: Arg[];
  description: string;
  type: TypeClass;
  __typename: string;
}

export interface Arg {
  name: string;
  type: TypeClass;
  __typename: TypeName;
}

export enum TypeName {
  InputValue = '__InputValue',
  Type = '__Type',
}

export interface TypeClass {
  name: null | string;
  kind: string;
  ofType: {
    name: string;
  };
  __typename: TypeName;
}

export interface MutationQuery {
  headers: string[][];
  query: string;
  variables: object;
}

export interface ApiRequestResponse {
  data?: object;
  error?: ApiErrorResponse;
}

export interface ApiErrorResponse {
  data: object;
}
export interface ApiSchemaResponse {
  data: ApiSchemaServerResponse;
}

export interface ApiSchemaServerResponse {
  data: IntrospectionQuery;
}
