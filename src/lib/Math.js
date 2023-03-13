import crypto from "crypto";
import { promisify } from "es6-promisify";

export const generateRandVals = async (size) => {
  const randomBytes = promisify(crypto.randomBytes);
  const rawBytes = await randomBytes(size);
  const randVal = rawBytes.toString("hex");

  return randVal;
};
