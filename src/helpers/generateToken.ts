import { sign } from 'jsonwebtoken';

export function generateToken(payload: object, expirationTime: number) {
  const exp = Math.floor(Date.now() / 1000) + expirationTime;
  const privateKey = process.env.PRIVATE_KEY;
  const token = sign({ ...payload, exp }, privateKey);
  return token;
}
