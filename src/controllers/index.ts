import { Application } from 'express';

import initUser from './user';

export default function init(app: Application): void {
  initUser(app);
}
