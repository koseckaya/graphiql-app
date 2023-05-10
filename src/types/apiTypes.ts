export interface ApiResponse {
  data: Data;
}

export interface Data {
  __schema: Schema;
}

export interface Schema {
  queryType: Type;
}

export interface TypeClass {
  name: null | string;
  ofType: Type | null;
}

export interface Arg {
  name: string;
  type: TypeClass;
}

export interface Field {
  name: string;
  description: string;
  args: Arg[];
}

export interface Type {
  name: null | string;
  fields: Field[] | null;
}
