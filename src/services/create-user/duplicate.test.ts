import { assert }        from 'chai';
import { createSandbox } from 'sinon';
import * as typeorm      from'typeorm';

import { createUser } from './';

describe('services.createUser', () => {
  const errorCode = "ER_DUP_ENTRY";
  const username  = "duplicate";
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
  
  describe('is passed a username already in the database', () => {
    it('should return a failing "DUP_ENTRY" Result', async () => {
      const result = await createUser(username);
      assert(!result.isOk);
      assert.equal(result.error, errorCode);
    })
    
    it('should have called `save` with username', async () => {
      const user = spy.args[0][0];
      assert.equal(user.username, username);
    })    
  });
})  
