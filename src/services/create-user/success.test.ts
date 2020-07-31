import { assert }        from 'chai';
import { createSandbox } from 'sinon';
import * as typeorm      from 'typeorm';

import { createUser } from './';

describe('services.createUser', () => {
  const username = "username";
  let sandbox;
  let stub;
  
  before(async () => {
    sandbox = createSandbox();
    stub    = sandbox.stub();
    sandbox.stub(typeorm, "getConnection").returns({ manager: { save: stub } });
  });
  
  after(async () => {
    sandbox.restore();
  });
  
  describe('is passed a valid username', () => {
    it('should return an ok Result', async () => {
      const result = await createUser(username);
      assert(result.isOk);
      assert.equal(result.value.username, username);
    })
    
    it('should have called `save` with username', async () => {
      const user = stub.args[0][0];
      assert.equal(user.username, username);
    })    
  });
})  
