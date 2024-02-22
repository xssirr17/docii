import { verify } from 'jsonwebtoken';

export function getTokenPayload(inputToken: string) {
  const privateKey = process.env.PRIVATE_KEY;
  return new Promise((resolve, reject) => {
    verify(inputToken, privateKey, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
}
