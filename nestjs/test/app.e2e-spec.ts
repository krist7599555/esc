import * as request from 'supertest';
import { appHttp } from '../src/main';

describe('AppController (e2e)', () => {
  let app: ReturnType<typeof request.agent>

  beforeAll(async () => {
    app = request.agent(await appHttp())
  });

  it('/ (GET)', () => {
    return app
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
