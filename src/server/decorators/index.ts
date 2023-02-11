import { Handler } from "../handlers";
import { HttpMethod, IActionOption, IControllerRegisterInfo } from "../types";

export function Controller(path: string) {
  return (target: Function) => {
    Handler.register({
      path,
      name: target.name,
      controller: target,
      isAction: false,
    });
  };
}

const registerAction = (
  path: string | IActionOption,
  propertyKey: string,
  actionValue: Function,
  method: HttpMethod,
  targetController: Function
) => {
  const regInfo: IControllerRegisterInfo = {
    name: propertyKey,
    action: actionValue,
    isAction: true,
    method: method,
    controller: targetController,
  };
  if (typeof path === "string") {
    regInfo.path = path;
  } else if (typeof path === "object") {
    regInfo.path = path.path;
    regInfo.actionOption = path;
  }
  Handler.register(regInfo);
};

export const Get = (path: string) => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    registerAction(
      path,
      propertyKey,
      descriptor.value,
      HttpMethod.GET,
      target.constructor
    );
  };
};

export const Put = (path: string) => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    registerAction(
      path,
      propertyKey,
      descriptor.value,
      HttpMethod.PUT,
      target.constructor
    );
  };
};

export const Post = (path: string) => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    registerAction(
      path,
      propertyKey,
      descriptor.value,
      HttpMethod.POST,
      target.constructor
    );
  };
};

export const Delete = (path: string) => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    registerAction(
      path,
      propertyKey,
      descriptor.value,
      HttpMethod.DELETE,
      target.constructor
    );
  };
};

export const NeedAuth = () => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    Handler.NeedAuthAttrs.push({
      action: descriptor.value,
      controller: target.constructor,
      actionName: propertyKey,
    });
  };
};

// export { Controller, Get, Post, Delete, Put, NeedAuth };
