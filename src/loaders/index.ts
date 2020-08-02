import { Application } from 'express';

export { default as loadContainer } from './container';
import loadDotenv from './dotenv';
import loadParser from './parser';
import loadTypeorm from './typeorm';

export async function loadConfig(): Promise<void> {
  loadDotenv();
  await loadTypeorm();
}

export function loadMiddleware(app: Application): void {
  loadParser(app);
}
