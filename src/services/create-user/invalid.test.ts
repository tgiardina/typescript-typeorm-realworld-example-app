import { assert }        from 'chai';
import { createSandbox } from 'sinon';
import * as typeorm      from'typeorm';

import { createUser } from './';

describe('services.createUser', () => {
  const errorCode = "ER_NO_DEFAULT_FOR_FIELD";
  let sandbox;
  let spy;
  
  before(async () => {
    sandbox = createSandbox();
    spy     = sandbox.spy(() => { throw { code: errorCode } });
    sandbox.stub(typeorm, "getConnection").returns({ manager: { save: spy } });
  });
  
  after(async () => {
    sandbox.restore();
  });
  
  describe('is passed an undefined username', () => {
    it('should return a failing "NO_DEFAULT" Result', async () => {
      const result = await createUser(undefined);
      assert(!result.isOk);
      assert.equal(result.error, errorCode);
    })
    
    it('should have called `save` with `undefined`', async () => {
      const user = spy.args[0][0];
      assert.equal(user.username, undefined);
    })    
  });
})  
