import "reflect-metadata"
import {
  ActionOption,
  ControllerOption,
  HttpMethod,
  RouterOption,
} from "../types"

const actionSymbolKey = Symbol("controller:action")

export const ControllerHandles: Array<ControllerHandle> = []

export const Controller = (path?: string): ClassDecorator => {
  return (target: Function) => {
    const ctrl = Reflect.getMetadata(
      actionSymbolKey,
      target,
    ) as ControllerHandle
    ctrl.setPath(path)
    ControllerHandles.push(ctrl)
  }
}

function registerAction(
  path: string | null | undefined,
  target: Object,
  propertyKey: string | symbol,
  action?: any,
  routerOption?: RouterOption,
) {
  let ch = Reflect.getMetadata(
    actionSymbolKey,
    target.constructor,
  ) as ControllerHandle
  const ao: ActionOption = {
    name: propertyKey,
    path: path as string,
    routerOption,
    action,
  }
  if (ch) {
    ch.addActionOption(ao)
  } else {
    ch = new ControllerHandle({
      name: target.constructor.name,
      target: target.constructor,
    })
    ch.addActionOption(ao)
    Reflect.defineMetadata(actionSymbolKey, ch, target.constructor)
  }
}

export const Action = (routerOption?: RouterOption): MethodDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    routerOption.method ||= HttpMethod.GET
    registerAction(
      routerOption.router,
      target,
      propertyKey,
      descriptor.value,
      routerOption,
    )
  }
}

export const Get = (path: string): MethodDecorator => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    registerAction(path, target, propertyKey, descriptor.value, {
      router: path,
      method: HttpMethod.GET,
    })
  }
}

export const Put = (path: string): MethodDecorator => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    registerAction(path, target, propertyKey, descriptor.value, {
      router: path,
      method: HttpMethod.GET,
    })
  }
}

export const Post = (path: string): MethodDecorator => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    registerAction(path, target, propertyKey, descriptor.value, {
      router: path,
      method: HttpMethod.POST,
    })
  }
}

export const Delete = (path: string): MethodDecorator => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    registerAction(path, target, propertyKey, descriptor.value, {
      router: path,
      method: HttpMethod.DELETE,
    })
  }
}

export class ControllerHandle {
  private controllerOption: ControllerOption
  private actionOptions: ActionOption[]
  private controllerInstance: any
  constructor(controllerOption: ControllerOption) {
    this.controllerOption = controllerOption
    this.actionOptions = []
  }

  setPath(path: string) {
    this.controllerOption.path = path
  }

  addActionOption(ao: ActionOption) {
    this.actionOptions.push(ao)
  }

  getActionOptions() {
    return this.actionOptions
  }

  resolveApiPath(actionOption: ActionOption) {
    const prefix =
      this.controllerOption.path || this.toApiName(this.controllerOption.name)
    const apiName = `${prefix}/${
      actionOption.path || this.toApiName(actionOption.name as string)
    }`
    return apiName.replaceAll(/\/+/g, "/")
  }

  getControllerOption() {
    return this.controllerOption
  }

  getControllerInstance() {
    if (this.controllerInstance) return this.controllerInstance
    if (this.controllerOption.target)
      return (this.controllerInstance = new this.controllerOption.target())
    throw new Error("controller info initial error !! ")
  }

  private toApiName(controllerName) {
    let str = controllerName.replace("Controller", "")
    let apiName = "/"
    const c = str[0]
    apiName += c.toLowerCase()
    for (let i = 1; i < str.length; i++) {
      const s = str[i]
      const code = s.charCodeAt(0)
      if (code >= 65 && code <= 90) {
        // 大写处理
        apiName += "-" + s.toLocaleLowerCase()
      } else {
        //if (code >= 97 && code <= 122) {
        apiName += s
      }
    }
    return apiName
  }
}
