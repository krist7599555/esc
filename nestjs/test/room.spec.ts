// import * as ChaiSubset from'chai-subset';
import * as chaiHttp from 'chai-http';
import * as chaiSubset from 'chai-subset';
import { expect, use, request } from 'chai';
import { HttpServer } from '@nestjs/common';
import { bootstrap } from '../src/server';
import { NODE_ENV } from '../src/config';
use(chaiHttp);
use(chaiSubset);

const { TEST_USERNAME, TEST_PASSWORD, NODE_ENV } = process.env;

console.log({ NODE_ENV });

let server: HttpServer;
let agent: ChaiHttp.Agent;

suite('room suit', () => {
  suiteSetup(async () => {
    server = await bootstrap();
    agent = request.agent(server);
  });
  suiteTeardown(async () => {
    await server.close();
  });

  test('room success', async () => {
    const res = await agent.get('/api/rooms');
    expect(res.body).to.be.an('array').lengthOf(6).to.containSubset([
      { id: 'pj2',   label: 'ห้องประชุม 2',   capacity: 10 },
      { id: 'pj3',   label: 'ห้องประชุม 3',   capacity: 10 },
      { id: 'pj4',   label: 'ห้องประชุม 4',   capacity: 10 },
      { id: 'pj5',   label: 'ห้องประชุม 5',   capacity: 10 },
      { id: 'pjesc', label: 'ห้องประชุม กวศ', capacity: 15 },
      { id: 'pjbig', label: 'ห้องประชุม ใหญ่', capacity: 30 },
    ]);
    expect(res).have.status(200);
    // expect(res.body).haveOwnProperty('profile').include.keys('id', 'department', 'roles');
    // expect(res.body).haveOwnProperty('access_token');
  });

});