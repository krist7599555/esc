import * as request from 'supertest';
import { appHttp } from '../src/main';
import 'jest-extended';
import { People } from '../src/entity/person';

describe('Auths (e2e)', () => {
  let app: ReturnType<typeof request.agent>

  beforeAll(async () => {
    app = request.agent(await appHttp())
  });

  it('/api/login (GET)', async () => {
    const cred = {
      username: '6031301721',
      password: 'krist7599555',
    }
    await People.filter({ studentId: cred.username }).delete().run()
    await app
      .post('/api/login')
      .send(cred)
      .expect(201)
      .then(({ body }) => {
        expect(body.access_token).toBeString()
      })
    await app
      .post('/api/login')
      .send(cred)
      .expect(200)
      .then(({ body }) => {
        expect(body.access_token).toBeString()
      })
  });
  it('/api/login (GET) Bad Request', async () => {
    const cred = {
      username: '6031301721',
      password: 'krist7599555',
    }
    await People.filter({ studentId: cred.username }).delete().run()
    await app
      .post('/api/login')
      .expect(400)
      .then(({ body }) => {
        for (const error of body.errors) {
          expect(error.type).toMatch("ValidationException")
          expect(["username", "password"]).toContainEqual(error.property)
        }
      })
    await app
      .post('/api/login')
      .send({ username: cred.username })
      .expect(400)
      .then(({ body }) => {
        for (const error of body.errors) {
          expect(error.type).toMatch("ValidationException")
          expect(error.property).toStrictEqual("password")
        }
      })
  });
  it('/api/login (GET) Extra Value', async () => {
    const cred = {
      id: 'usnjn-ascsc-asccs-122cd',
      username: '6031301721',
      password: 'krist7599555',
    }
    await People.filter({ studentId: cred.username }).delete().run()
    await app
      .post('/api/login')
      .send(cred)
      .expect(400)
      .then(({ body }) => {
        for (const error of body.errors) {
          expect(error.type).toMatch("ValidationException")
          expect(error.property).toEqual("id")
        }
      })
    
  });
})