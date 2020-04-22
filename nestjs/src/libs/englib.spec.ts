
import { expect, use } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as chaiArrays from 'chai-arrays';
import { englib } from './englib';
import { NotFoundException } from '@nestjs/common';
use(chaiAsPromised);
use(chaiArrays);


describe('englib', () => {
  it('defined', () => {
    return expect(englib).to.be.ok;
  });
  it('normal', () => {
    return expect(englib('6031301721')).eventually.fulfilled
      .keys('id', 'phone', 'nameEN', 'department', 'surnameEN', 'email')
      .property('id', '6031301721');
  });
  it('bad', async () => {
    for (const id of [null, '124', '-1', -1, 9999, '**'])
      await expect(englib(id)).eventually.rejectedWith(NotFoundException, 'user not exist in cu engineer api');
  });
});