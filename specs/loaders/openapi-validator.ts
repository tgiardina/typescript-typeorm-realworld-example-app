import { use } from 'chai';
import openapiValidator = require('chai-openapi-response-validator');
import { resolve } from 'path';

export default function initOpenapiValidator() {
  use(openapiValidator(resolve('./specs/swagger.json')));
}

