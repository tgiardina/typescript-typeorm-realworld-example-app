import { assert } from 'chai';

import { createUser }     from './create-user';
import initLoaders        from '../tests/loaders';
import { initConnection } from '../tests/utils';

initLoaders();

describe('services.createUser', () => {
  let connection;
  before(async () => { connection = await initConnection() });
  after(async () => { await connection.close() });
  describe('is passed an undefined username', () => {
    it('should return a failing "NO_DEFAULT" Result', async () => {
      const result = await createUser(undefined);
      assert(!result.isOk);
      assert.equal(result.error, "ER_NO_DEFAULT_FOR_FIELD");
    })
  });
})  
