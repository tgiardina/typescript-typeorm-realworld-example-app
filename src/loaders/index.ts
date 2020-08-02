import { Application } from 'express';

export { default as loadContainer } from './container';
import loadDotenv from './dotenv';
import loadParser from './parser';
import loadTypeorm from './typeorm';

export async function load(app: Application): Promise<void> {
  loadDotenv();
  loadParser(app);
  await loadTypeorm();
}
