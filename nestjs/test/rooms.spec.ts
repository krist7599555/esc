import * as request from 'supertest';
import { appHttp } from '../src/main';
import 'jest-extended';

describe('Rooms (e2e)', () => {
  let app: ReturnType<typeof request.agent>

  beforeAll(async () => {
    app = request.agent(await appHttp())
  });

  it('/api/rooms (GET)', () => {
    return app
      .get('/api/rooms')
      .expect(200)
      .then(res => {
        for (const room of res.body.data) {
          expect(room.type).toEqual("rooms")
          expect(room.id).toBeString()
          expect(room.attributes.label).toBeString()
          expect(room.attributes.capacity).toBeNumber()
        }      
      })
  });
})