import { Application } from 'express';

import initDotenv  from './dotenv';
import initParser  from './parser';
import initTypeorm from './typeorm';

export default async function init(app: Application): Promise<void> {
  initDotenv();
  initParser(app);
  await initTypeorm();
}
