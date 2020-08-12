import { Application } from 'express';

export { loadAuthMiddleware } from './authenticator';
export { loadContainer } from './container';
import { loadParser } from './parser';
import { loadTypeorm } from './typeorm';

export function loadMiddleware(app: Application): void {
  loadParser(app);
}

export async function loadPreContainer(): Promise<void> {
  await loadTypeorm();
}
