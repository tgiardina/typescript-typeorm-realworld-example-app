import { ITokenBearer } from '../';

export function getToken(req: ITokenBearer) {
  const headers = req.headers;
  const hasToken = headers.authorization
    && headers.authorization.split(' ')[0] === 'Token';
  const hasBearer = headers.authorization
    && headers.authorization.split(' ')[0] === 'Bearer';
  if (hasToken || hasBearer) {
    return req.headers.authorization.split(' ')[1];
  } else {
    return null;
  }
}
