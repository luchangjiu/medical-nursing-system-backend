import { IReulst } from "../server/types";

export default class R {
  // succ: boolean;
  // msg: string;
  // type: 'success' | 'error' | 'warning'
  // code: number;
  // data: any | any[];
  code: number;
  type: "success" | "error" | "warning";
  message: string;
  result: any | any[];

  private static succMsg: string = "操作成功！";
  private static failMsg: string = "操作失败！";
  private static errorMsg: string = "出现错误！";

  private static result(code?: number, msg?: string, data?: any | any[]) {
    const result = new R();
    if (code) {
      if ((code as unknown as Error).message) {
        result.code = undefined;
        result.message = (code as unknown as Error).message;
        return result;
      }
      if (typeof code == "number") {
        result.code = code;
        result.message = undefined;
      } else if (typeof code == "string") {
        result.code = undefined;
        result.message = code;
      } else if (typeof code == "object" || Array.isArray(code)) {
        result.code = undefined;
        result.message = undefined;
        result.result = code;
      }
    } else {
      result.code = undefined;
      result.message = undefined;
      return result;
    }
    if (msg && typeof msg == "string") {
      result.message = msg;
    } else if (typeof msg == "object" || Array.isArray(msg)) {
      result.result = msg;
    }
    if (data) {
      result.result = data;
    }
    return result;
  }

  static ok();
  static ok(p?: number | string | any | any[] | Error);
  static ok(p?: number | string | any | any[], p2?: string | any | any[]);
  static ok(p?: number, p2?: string, p3?: any | any[]);
  static ok(code?: number, msg?: string, data?: any | any[]) {
    const res = this.result(code, msg, data);
    res.type = "success";
    res.code ??= 0;
    res.message ??= R.succMsg;
    return res;
  }

  static fail();
  static fail(p?: number | string | any | any[] | Error);
  static fail(p?: number | string | any | any[], p2?: string | any | any[]);
  static fail(p?: number, p2?: string, p3?: any | any[]);
  static fail(code?: number, msg?: string, data?: any | any[]) {
    const res = this.result(code, msg, data);
    res.type = "warning";
    res.code ??= 500;
    res.message ??= R.failMsg;
    return res;
  }

  static error();
  static error(p?: number | string | any | any[] | Error);
  static error(p?: number | string | any | any[], p2?: string | any | any[]);
  static error(p?: number, p2?: string, p3?: any | any[]);
  static error(code?: number, msg?: string, data?: any | any[]) {
    const res = this.result(code, msg, data);
    res.type = "error";
    res.code ??= 500;
    res.message ??= R.errorMsg;
    return res;
  }
}
