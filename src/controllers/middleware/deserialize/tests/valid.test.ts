import 'mocha';
import 'reflect-metadata';
import { assert } from 'chai';
import { stub } from 'sinon';

import { DeserializeMiddleware } from '../';
import { IVerifiedHttpReq, IUserHttpGetReq } from '../interfaces';

describe('DeserializeMiddleware.setup - valid token', () => {
  // Data
  const token = "token";
  const req = <any>{
    headers: { authorization: token },
  };
  const user = {
    id: 1,
    email: "email",
    password: "password",
  };
  let verifiedReq: IVerifiedHttpReq<IUserHttpGetReq>
  // Stubs
  const jwtParser = { deserialize: stub().returns(user) };
  const nextStub = stub();

  describe('is passed a valid token', () => {
    it('should run without error', async () => {
      const deserializer = new DeserializeMiddleware(jwtParser);
      deserializer.setup(req, null, nextStub);
      verifiedReq = req as IVerifiedHttpReq<IUserHttpGetReq>;
    })

    it('should append user to res.locals', async () => {
      assert.equal(verifiedReq.locals.user, user);
    });

    it('should have called next', async () => {
      assert(nextStub.calledOnce);
    });
  });
}) 
