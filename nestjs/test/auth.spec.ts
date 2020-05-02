// import * as ChaiSubset from'chai-subset';
import { expect } from 'chai';
import { agent } from './_setup.spec';

const { TEST_USERNAME, TEST_PASSWORD } = process.env;

suite('auth', () => {

  test('login sso success', async () => {
    const res = await agent.post('/api/login').send({ username: TEST_USERNAME, password: TEST_PASSWORD });
    expect(res.status).oneOf([200, 201]);
    expect(res.body).haveOwnProperty('profile').include.keys('id', 'department', 'roles');
    expect(res.body).haveOwnProperty('access_token').to.be.a.jwt.claim('id');
  });

  test('login fail', async () => {
    const res = await agent.post('/api/login').send({ username: '6031111121', password: '372783' });
    expect(res).status(401);
    expect(res.body).haveOwnProperty('message').match(/is wrong/);
  });
});