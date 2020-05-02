import { expect } from 'chai';
import { agent } from './_setup.spec';


suite('room', () => {

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
  });

});