import type { Express, Request, Response } from "express";
import R from "../../util/R";
import { ControllerHandle, ControllerHandles } from "../decorators";
import { ActionOption } from "../types";

class ControllerToExpressHandler {
  private controllerHandles: ControllerHandle[];
  constructor(controllerHandles: ControllerHandle[]) {
    this.controllerHandles = controllerHandles;
  }

  public actionToExpress(app: Express) {
    for (const ch of this.controllerHandles) {
      for (const actionOption of ch.getActionOptions()) {
        const apiName = ch.resolveApiPath(actionOption);
        console.log(
          `api-path = [${actionOption.routerOption.method}] ( ${apiName} )`
        );
        app[actionOption.routerOption.method.toString()](
          apiName,
          (req: Request, res: Response) =>
            this.requestHandle(req, res, ch, actionOption)
        );
      }
    }
  }

  private async requestHandle(
    req: Request,
    res: Response,
    controllerHandle: ControllerHandle,
    actionOption: ActionOption
  ) {
    try {
      const action = actionOption.action;
      const controller = controllerHandle.getControllerInstance();
      if (action.length == 0) {
        return res.json(await action.call(controller));
      } else if (action.length == 1) {
        const params = this.buildMethodArguments(req, actionOption);
        return res.json(await action.call(controller, params));
      } else if (action.length == 2) {
        return action.call(controller, req, res);
      } else if (action.length > 2) {
        const params = this.buildMethodArguments(req, actionOption);
        return action.call(controller, req, res, params);
      }
    } catch (e) {
      return res.status(500).json(R.error(e.message));
    }
  }

  private buildMethodArguments(req: Request, ao: ActionOption) {
    let params = Object.assign(
      {},
      req.query || {},
      req.params || {},
      req.body || {}
    );

    if (ao.routerOption.auth || ao.routerOption.headers) {
      const p = {};
      p["$data"] = params;

      if (ao.routerOption.auth) {
        p["$auth"] = req["auth"];
      }
      if (ao.routerOption.headers) {
        p["$headers"] = req.headers;
      }
      return p;
    }
    return params;
  }
}

export const ActionToExpress = new ControllerToExpressHandler(
  ControllerHandles
);
