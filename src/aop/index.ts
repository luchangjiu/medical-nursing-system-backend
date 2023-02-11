import { Connection, OpenConnection } from "../store/sqlite";

export const log = () => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const oldFn = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log("在函数执行前");
      const res = oldFn.apply(this, args);
      console.log("在函数执行后", res);
      return res;
    };
  };
};

export const sqliteConnect = (entities: any | any[]) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const oldFn = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      Connection.setOptions({
        entities,
      });
      await OpenConnection();
      return await oldFn.apply(this, args);
    };
  };
};
