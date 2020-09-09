import chaiHttp = require('chai-http');
import { use } from 'chai';

export default function init(): void {
  use(chaiHttp);
}

