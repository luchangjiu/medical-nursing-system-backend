export enum HttpMethod {
  GET = "get",
  POST = "post",
  DELETE = "delete",
  PUT = "put",
}

export interface IActionOption {
  /**
   * 设置路由地址
   */
  path: string;
  /**
   * 将它设置为true 时 可获取 jwt 授权参数 {  auth  }
   */
  needAuth?: boolean;
}

export interface IControllerRegisterInfo {
  path?: string;
  name: string;
  isAction: boolean;
  method?: HttpMethod;
  controller?: any;
  action?: Function;
  actionOption?: IActionOption;
}

export interface INeedAuth {
  controller?: any;
  action?: Function;
  actionName?: string;
}

export interface IReulst {
  succ: boolean;
  msg: string;
  code: number;
  data: any | any[];
}
