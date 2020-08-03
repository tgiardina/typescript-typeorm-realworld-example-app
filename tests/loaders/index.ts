import initChaiHttp from './chai-http';
import initDotenv   from './dotenv';

export default function init(): void {
  initDotenv();
  initChaiHttp();
}
