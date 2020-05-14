import * as request from 'supertest';
import { appHttp } from '../src/main';
import 'jest-extended';
import { People } from '../src/entity/person';
import { jwtSign } from '../src/lib/jwt';

describe('Rooms (e2e)', () => {
  const person_id = '123135132e-23r23r234'
  const person_jwt = jwtSign({ id: person_id });
  let app: ReturnType<typeof request.agent>

  beforeAll(async () => {
    app = request.agent(await appHttp());
    await People.insert({ id: person_id }).run();
  });
  afterAll(async () => {
    await People.get(person_id).delete().run();
  });

  it('/api/reservations (POST)', () => {
    return app
      .post('/api/reservations')
      .set('authorization', `Bearer ${person_jwt}`)
      .send({
        room: 'pj3',
        organization: "my organization test",
        arrival_time: new Date().toISOString(),
        departure_time: new Date().toISOString(),
      })
      // .expect(201)
      .then(res => {
        expect(res.body.data).toBeObject()
        expect(res.body.data.type).toEqual("reservations")
        expect(res.body.data.id).toBeString()
      })
  });

  
})