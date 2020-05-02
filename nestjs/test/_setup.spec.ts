import * as chaiHttp from 'chai-http';
import * as chaiJwt from 'chai-jwt';
import * as chaiHttp from 'chai-http';
import * as chaiSubset from 'chai-subset';
import * as chaiEach from 'chai-each';
import * as chaiThings from 'chai-things';
import * as chaiLike from 'chai-like';
import { bootstrap } from '../src/server';
import { request, use } from 'chai';

use(chaiJwt);
use(chaiHttp);
use(chaiSubset);
use(chaiEach);
use(chaiThings);
use(chaiLike);

export let server: HttpServer;
export let agent: ChaiHttp.Agent;

suiteSetup(async () => {
  console.log('setup');
  server = await bootstrap();
  agent = request.agent(server);
});
suiteTeardown(async () => {
  await server.close();
});
