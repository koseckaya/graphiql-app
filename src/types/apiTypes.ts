export interface ApiResponse {
  data: Data;
}

export interface Data {
  __type: Type;
}

export interface Type {
  name: string;
  fields: Field[];
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
  __typename: TypeName;
}
