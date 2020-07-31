import { assert }        from 'chai';
import { createSandbox } from 'sinon';
import * as typeorm      from'typeorm';

import { createUser }     from './create-user';
import initLoaders        from '../tests/loaders';
import { initConnection } from '../tests/utils';

initLoaders();

describe('services.createUser', () => {
  let connection;
  let sandbox;
  let stub;
  
  before(async () => {
    connection = await initConnection();
    sandbox    = createSandbox();
    stub       = sandbox.stub(typeorm, "getConnection").returns({
      manager: { save: () => { throw {code: "ER_NO_DEFAULT_FOR_FIELD"} }, },
    });
  });
  
  after(async () => {
    await connection.close();
    sandbox.restore();
  });
  
  describe('is passed an undefined username', () => {
    it('should return a failing "NO_DEFAULT" Result', async () => {
      const result = await createUser(undefined);
      assert(!result.isOk);
      assert.equal(result.error, "ER_NO_DEFAULT_FOR_FIELD");
    })
    
    it('should have called `save` with `undefined`', async () => {
      const user = stub.args[0];
      assert.equal(user.username, undefined);
    })    
  });
})  
