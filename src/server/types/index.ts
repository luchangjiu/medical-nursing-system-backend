export enum HttpMethod {
  GET = "get",
  POST = "post",
  DELETE = "delete",
  PUT = "put",
}

export type ControllerOption = {
  name: string;
  target?: any;
  path?: string;
};

export type ActionOption = {
  name: string | symbol;
  path: string;
  action: any;
  routerOption: RouterOption;
};

export type RouterOption = {
  router?: string;
  method?: HttpMethod;
  headers?: boolean;
  auth?: boolean;
};
