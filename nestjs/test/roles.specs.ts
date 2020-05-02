// import * as ChaiSubset from'chai-subset';
import * as chaiHttp from 'chai-http';
import * as chaiSubset from 'chai-subset';
import { expect, use, request } from 'chai';
import { HttpServer } from '@nestjs/common';
import { bootstrap } from '../src/server';
import { users } from '../src/db/index';
import { sign } from '../src/libs/jwt';
import { r } from 'rethinkdb-ts';
use(chaiHttp);
use(chaiSubset);

let server: HttpServer;
let agent: ChaiHttp.Agent;

suite('roles', () => {
  suiteSetup(async () => {
    server = await bootstrap();
    agent = request.agent(server);
  });
  suiteTeardown(async () => {
    await server.close();
  });

  test('anonymous', async () => {
    const res = await agent.get('/api/users');
    expect(res).status(401);
  });

  test('success', async () => {
    await users.delete().run();
    const id = await r.uuid().run();
    await users.insert({ id }).run();
    const token = sign({ id });
    const res = await agent
      .get('/api/users')
      .set('authorization', `Bearer ${token}`);
    expect(res).status(403);
    expect(res.body).property('message').match(/roles/);
    await users.get(id).update({ roles: ['staff'] }).run();
    const res2 = await agent
      .get('/api/users')
      .set('authorization', `Bearer ${token}`);
    expect(res2).status(200);
    expect(res2.body).is.an('array');
  });

});