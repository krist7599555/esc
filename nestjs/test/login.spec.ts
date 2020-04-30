// import * as ChaiSubset from'chai-subset';
import * as chaiHttp from 'chai-http';
import * as chaiJwt from 'chai-jwt';
import { expect, use, request } from 'chai';
import { HttpServer } from '@nestjs/common';
import { bootstrap } from '../src/server';
import { NODE_ENV } from '../src/config';
use(chaiHttp);
use(chaiJwt);

const { TEST_USERNAME, TEST_PASSWORD, NODE_ENV } = process.env;

console.log({ NODE_ENV });

let server: HttpServer;
let agent: ChaiHttp.Agent;

suite('auth suit', () => {
  suiteSetup(async () => {
    server = await bootstrap();
    agent = request.agent(server);
  });
  suiteTeardown(async () => {
    await server.close();
  });

  test('login success', async () => {
    const res = await agent.post('/api/login').send({ username: TEST_USERNAME, password: TEST_PASSWORD });
    expect(res.status).oneOf([200, 201]);
    expect(res.body).haveOwnProperty('profile').include.keys('id', 'department', 'roles');
    expect(res.body).haveOwnProperty('access_token').to.be.a.jwt.claim('id');
  });

  test('login fail', async () => {
    const res = await agent.post('/api/login').send({ username: '6031111121', password: '372783' });
    expect(res).status(400);
    expect(res.body).haveOwnProperty('message').match(/is wrong/);
  });
});