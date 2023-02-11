import jwt from "jsonwebtoken";
import { isNullOrUnDef, isNumber, isString } from "./is";

export const JsTsReg = /\.[j|t]s$/;
/**
 * @desc 判断是否是 js 或 ts 文件
 */
export function isJsTsFile(filename: string) {
  return JsTsReg.test(filename);
}

const Constants = {
  SECRET_KEY: "joe-secret-key-999",
  EXPIRES_IN: "3600s",
  TOKEN_PREFIX: "Bearer ",
};

export function TokenGenerate(username, userId) {
  return (
    Constants.TOKEN_PREFIX +
    jwt.sign({ username, userId }, Constants.SECRET_KEY, {
      expiresIn: Constants.EXPIRES_IN,
    })
  );
}

/**
 * 状态 二进制运算
 * @param state 原状态数值
 * @param bitPosition  计算 位 从 1 开始
 * @param value 设置 0 或 1
 * @returns 计算后的值
 */
export function StatusBitOperation(
  state: number = 0,
  bitPosition: number,
  value: string | number | undefined | null
) {
  if (isNullOrUnDef(value)) return state;
  const v = Number.parseInt(value as string);
  if (state === 0 && v === 0) return state;
  const n = 1 << (bitPosition - 1);
  if (state === 0 && v === 1) {
    state += n;
  } else {
    if ((state & n) > 0) {
      if (v === 0) state -= n;
    } else {
      if (v === 1) state += n;
    }
  }
  return state;
}

export { Constants };
