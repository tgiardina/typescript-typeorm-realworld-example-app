import { json }        from 'body-parser';
import { Application } from 'express';

export default function init(app: Application): void {
  app.use(json());
}
