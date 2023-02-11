import type { Express, Request, Response } from "express";
import R from "../../util/R";
import { HttpMethod, IControllerRegisterInfo, INeedAuth } from "../types";

class ControllerHandler {
  private controllerRegisterInfoArr: IControllerRegisterInfo[] = [];
  public Controllers: any[];
  public NeedAuthAttrs: INeedAuth[] = [];
  register(target: IControllerRegisterInfo) {
    this.controllerRegisterInfoArr.push(target);
  }

  actionToExpress(app: Express) {
    let prefix = "";
    let controller: any;
    //倒叙遍历 装饰器
    for (let i = this.controllerRegisterInfoArr.length - 1; i >= 0; i--) {
      let item = this.controllerRegisterInfoArr[i];
      if (!item.isAction) {
        prefix = item.path ?? "";
        controller = new item.controller();
      } else {
        if (this.NeedAuthAttrs.length > 0) {
          for (const na of this.NeedAuthAttrs) {
            if (
              na.action == item.action &&
              na.actionName == item.name &&
              na.controller == item.controller
            ) {
              item.actionOption = {
                path: item.path,
                needAuth: true,
              };
              break;
            }
          }
        }

        item.controller = controller;
        let fullPath = prefix + item.path;
        let method = item.method.toString();
        console.log(`api-path = [${method}] ( ${fullPath} )`);
        if (item.action.length == 0 || item.action.length == 1) {
          app[method](fullPath, async (req: Request, res: Response) => {
            try {
              let needAuth: boolean = item.actionOption?.needAuth;
              switch (item.method) {
                case HttpMethod.GET:
                case HttpMethod.DELETE:
                  if (item.action.length == 0) {
                    return res.json(await item.action.call(item.controller));
                  } else {
                    let ps = Object.assign({}, req.query, req.params);
                    if (needAuth)
                      return res.json(
                        await item.action.call(item.controller, {
                          params: ps,
                          auth: req["auth"] ?? {},
                        })
                      );
                    else
                      return res.json(
                        await item.action.call(item.controller, ps)
                      );
                  }
                case HttpMethod.POST:
                case HttpMethod.PUT:
                  if (item.action.length == 0) {
                    return res.json(await item.action.call(item.controller));
                  } else {
                    let body = req.body;
                    if (needAuth) {
                      return res.json(
                        await item.action.call(item.controller, {
                          body,
                          auth: req["auth"] ?? {},
                        })
                      );
                    } else {
                      return res.json(
                        await item.action.call(item.controller, body)
                      );
                    }
                  }
              }
            } catch (e) {
              return res.status(500).json(R.fail(e));
            }
          });
        } else if (item.action.length == 2) {
          app[method](fullPath, (req: Request, res: Response) => {
            item.action.call(item.controller, req, res);
          });
        }
      }
    }
  }
}

var Handler = new ControllerHandler();
export { Handler };
