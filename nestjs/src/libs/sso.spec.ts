import * as sso from './sso';
import { expect, use } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as chaiArrays from 'chai-arrays';
import { ValidationException } from '../errors/validation.exception';
use(chaiAsPromised);
use(chaiArrays);

describe('lib sso', () => {
  const PASS_USERNAME = '6031301721';
  const PASS_PASSWORD = 'krist7599555';

  it('should be defined', () => expect(sso.sso).to.be.ok);

  it('normal flow', async () => {
    return expect(sso.sso(PASS_USERNAME, PASS_PASSWORD)).notify(console.log)
      .eventually.fulfilled
      .have.keys('id', 'nameTH', 'nameEN', 'surnameTH', 'surnameEN', 'faculty', 'year');
  });

  it('invalid username', async () => {
    for (const usr of [null, undefined, '', '*', '9999999', -1, NaN, '999999999999999']) {
      await expect(sso.sso(usr, PASS_PASSWORD))
        .eventually.rejectedWith(ValidationException, 'validation error')
        .have.nested.property('validate.username')
        .to.be.an('array').that.is.not.empty;
    }
  });
  it('invalid password', async () => {
    for (const pwd of [null, undefined, '', -1, NaN]) {
      await expect(sso.sso(PASS_USERNAME, pwd))
        .eventually.rejectedWith(ValidationException, 'validation error')
        .have.nested.property('validate.password')
        .to.be.an('array').that.is.not.empty;
    }
  });
  it('wrong password', async () => {
    for (const pwd of ['999', 'asdsfdtghnethb']) {
      await expect(sso.sso(PASS_USERNAME, pwd))
        .eventually
        .rejectedWith(Error, 'username or password is wrong');
    }
  });

});
