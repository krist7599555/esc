import { expect } from 'chai';
import { r } from 'rethinkdb-ts';
import { users } from '../src/db/index';
import { sign } from '../src/libs/jwt';
import { agent } from './_setup.spec';



suite('user', async () => {

  let id: string;
  const nameTH = 'ข้าเอง';

  suiteSetup(async () => {
    id = await r.uuid().run();
    await users.insert({ id, nameTH }).run();
  });

  test('anonymous', async () => {
    const res = await agent
      .get('/api/users/me');
    expect(res).status(401);
  });

  test('success', async () => {
    const res = await agent
      .get('/api/users/me')
      .set('authorization', `Bearer ${sign({ id })}`);
    expect(res).status(200);
    expect(res.body).property('nameTH', nameTH);
  });

  test('not exist', async () => {
    const new_id = await r.uuid().run();
    const res = await agent
      .get('/api/users/me')
      .set('authorization', `Bearer ${sign({ id: new_id })}`);
    expect(res).status(404);
  });
});