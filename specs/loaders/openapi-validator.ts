import { use } from 'chai';
import openapiValidator = require('chai-openapi-response-validator');
import { resolve } from 'path';

export default function initOpenapiValidator(): void {
  use(openapiValidator(resolve('./specs/openapi.json')));
}

