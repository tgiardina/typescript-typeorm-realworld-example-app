import { json } from 'body-parser';
import { Application } from 'express';

export default function load(app: Application): void {
  app.use(json());
}
