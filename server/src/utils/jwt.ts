import jwt from "jsonwebtoken";

const publicKey = Buffer.from(
  process.env["PUBLIC_KEY"] as string,
  "base64"
).toString("ascii");
const privateKey = Buffer.from(
  process.env["PRIVATE_KEY"] as string,
  "base64"
).toString("ascii");

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt<T>(token: string): T | null {
  try {
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (err) {
    return null;
  }
}
