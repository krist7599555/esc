// import * as ChaiSubset from'chai-subset';
import * as chaiHttp from 'chai-http';
import * as chaiSubset from 'chai-subset';
import * as chaiEach from 'chai-each';
import * as chaiThings from 'chai-things';
import * as chaiLike from 'chai-like';
import { expect, use, request } from 'chai';
import { HttpServer } from '@nestjs/common';
import { bootstrap } from '../src/server';
import { NODE_ENV } from '../src/config';
use(chaiHttp);
use(chaiSubset);
use(chaiEach);
use(chaiThings);
use(chaiLike);

const { TEST_USERNAME, TEST_PASSWORD, NODE_ENV } = process.env;

console.log({ NODE_ENV });

let server: HttpServer;
let agent: ChaiHttp.Agent;

suite('reservation suit', () => {
  suiteSetup(async () => {
    server = await bootstrap();
    agent = request.agent(server);
  });
  suiteTeardown(async () => {
    await server.close();
  });

  suite('anonymous', () => {
    test('need auth', async () => {
      const res = await agent.post('/api/reservations');
      expect(res).status(401);
      expect(res.body).property('message');
    });
    test('organization suggest', async () => {
      const res = await agent.get('/api/reservations/organization');
      expect(res).status(200);
      expect(res.body).to.be.an('array');
    });
  });

  suite('auth user', () => {
    let jwt = null;
    suiteSetup(async () => {
      const res = await agent.post('/api/login').send({ username: TEST_USERNAME, password: TEST_PASSWORD });
      jwt = res.body.access_token.trim();
      agent.set('authorization', `Bearer ${jwt}`);
    });
    test('reservation success', async () => {
      const res = await agent
        .post('/api/reservations')
        .set('authorization', `Bearer ${jwt}`)
        .send({
          organization: 'ok',
          room_id:      'pj3',
          time_start:   new Date().toString(),
          time_end:     new Date().toString(),
        });
      expect(res.body).include.keys('user', 'user_id', 'id', 'room', 'room_id', 'organization', 'created_time');
      expect(res.body).not.include.keys('authorizer_id', 'authorizer_time');
      expect(res).have.status(201);
    });
    test('imposible time start > end', async () => {
      const res = await agent
        .post('/api/reservations')
        .set('authorization', `Bearer ${jwt}`)
        .send({
          organization: 'ok',
          room_id:      'pj3',
          time_start:   new Date(new Date().getTime() + 60 * 1000).toString(),
          time_end:     new Date().toString(),
        });
      expect(res).have.status(400);
      expect(res.body).property('message').match(/time/);
    });
    test('invalid room', async () => {
      const res = await agent
        .post('/api/reservations')
        .set('authorization', `Bearer ${jwt}`)
        .send({
          organization: 'okm',
          room_id:      'x',
          time_start:   new Date().toString(),
          time_end:     new Date().toString(),
        });
      expect(res).have.status(400);
      expect(res.body).property('message').match(/(room|validat)/);
    });
  });


});