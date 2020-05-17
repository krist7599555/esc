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

  it('/api/blogs (POST)', () => {
    return app
      .post('/api/blogs')
      .set('authorization', `Bearer ${person_jwt}`)
      .send({
        data: {
          type: "blogs",
          attributes: {
            title: "TITLE",
            markdown: "MARKDOWN"
          }
        }
      })
      .expect(201)
      .expect(res => {
        expect(res.body.data.id).toBeString();
        expect(res.body.data.type).toEqual("blogs");
      })
  });

  it('/api/blogs (POST) empty field', () => {
    return app
      .post('/api/blogs')
      .set('authorization', `Bearer ${person_jwt}`)
      .send({
        data: {
          type: "blogs",
          attributes: {
            title: "",
            markdown: "MARKDOWN"
          }
        }
      })
      .expect(400)
      .then(res => {
        for (const err of res.body.errors) {
          expect(err.source.parameter).toEqual('title');
        }
      })
  });
})