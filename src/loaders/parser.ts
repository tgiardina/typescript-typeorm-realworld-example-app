import { json } from 'body-parser';
import { Application } from 'express';

export function loadParser(app: Application): void {
  app.use(json());
}
