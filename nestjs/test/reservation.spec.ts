import { expect } from 'chai';
import { agent } from './_setup.spec';
import { users } from '../src/db/index';
import { r } from 'rethinkdb-ts';
import { sign } from '../src/libs/jwt';
import { ROLE_OFFICE } from '../src/users/user.entity';
import { STATUS_APPROVED, STATUS_PENDING } from '../src/rooms/reservation.entity';

suite('reservation', () => {

  suite('anonymous', () => {
    test('need auth', async () => {
      const res = await agent.post('/api/reservations');
      expect(res).status(401);
      expect(res.body).property('message');
    });
    test('organization list', async () => {
      const res = await agent.get('/api/reservations/organization');
      expect(res).status(200);
      expect(res.body).to.be.an('array');
    });
    test('cannot reserve', async () => {
      const res = await agent
        .post('/api/reservations')
        .send({
          organization: 'ok',
          room_id:      'pj3',
          time_start:   new Date().toString(),
          time_end:     new Date().toString(),
        });
      expect(res).status(401);
      expect(res.body).property('message').match(/login/);
    });
  });

  suite('auth', () => {

    let jwt: string;
    let jwt_admin: string;
    suiteSetup(async () => {
      const id1 = await r.uuid().run();
      const id2 = await r.uuid().run();
      await users.insert({ id: id1 }).run();
      await users.insert({ id: id2, roles: [ROLE_OFFICE] }).run();
      jwt = sign({ id: id1 });
      jwt_admin = sign({ id: id2 });
    });


    let reservation_id: string;
    test('create', async () => {
      const res = await agent
        .post('/api/reservations')
        .set('authorization', `Bearer ${jwt}`)
        .send({
          organization: 'ok',
          room_id:      'pj3',
          time_start:   new Date().toString(),
          time_end:     new Date().toString(),
        });
      expect(res.body).property('id');
      expect(res.body).property('status', STATUS_PENDING);
      expect(res.body).include.keys('user', 'user_id', 'id', 'room', 'room_id', 'organization', 'created_time');
      expect(res.body).not.include.keys('authorizer_id', 'authorizer_time');
      expect(res).have.status(201);
      reservation_id = res.body.id;
    });
    test('get no auth', async () => {
      const res = await agent.get(`/api/reservations/${reservation_id}`);
      expect(res).status(200);
      expect(res.body).property('id');
      expect(res.body).property('user').property('id');
      expect(res.body).property('room').property('id', 'pj3');
    });
    test('can not remove by anonymous', async () => {
      const res = await agent
        .delete(`/api/reservations/${reservation_id}`);
      expect(res).status(401);
      expect(res.body.message).match(/login/);
    });
    test('can not remove by anyone except owner', async () => {
      const res = await agent
        .delete(`/api/reservations/${reservation_id}`)
        .set('authorization', `Bearer ${jwt_admin}`);
      expect(res).status(403);
      expect(res.body.message).match(/owner/);
    });
    test('staff change status', async () => {
      const res = await agent
        .put(`/api/reservations/${reservation_id}/status/${STATUS_APPROVED}`)
        .set('authorization', `Bearer ${jwt_admin}`);
      expect(res).status(200);
      expect(res.body).property('status', STATUS_APPROVED);
    });
    test('remove by self', async () => {
      const res = await agent
        .delete(`/api/reservations/${reservation_id}`)
        .set('authorization', `Bearer ${jwt}`);
      expect(res).status(200);
      expect(res.body).property('id', reservation_id);
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
      expect(res.body).property('message').match(/validat/);
    });
  });
});