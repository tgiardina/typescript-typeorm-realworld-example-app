import { Application } from 'express';

export { loadContainer } from './container';
import { loadDotenv } from './dotenv';
import { loadParser } from './parser';
import { loadTypeorm } from './typeorm';

export function loadMiddleware(app: Application): void {
  loadParser(app);
}

export async function loadPreContainer(): Promise<void> {
  loadDotenv();
  await loadTypeorm();
}
