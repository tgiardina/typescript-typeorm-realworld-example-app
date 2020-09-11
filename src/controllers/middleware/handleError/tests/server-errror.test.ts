import { assert } from 'chai';
import { stub } from 'sinon';
import { handleError } from '../';

describe('handleError Middleware - malformed string', () => {
  const sendStub = stub();
  const statusStub = stub();
  const res = {
    send: sendStub,
    status: statusStub,
  };
  sendStub.returns(res);
  statusStub.returns(res);

  it('should run.', () => {
    // eslint-disable-next-line    
    handleError(new Error("Test"), <any>null, <any>res, <any>null);
  });

  it('should have called status with 500', async () => {
    assert.equal(statusStub.getCall(0).args[0], 500);
  });

  it('should have called status with 500', async () => {
    assert(sendStub.called);
  });
});
