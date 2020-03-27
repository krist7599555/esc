import { Test, TestingModule } from '@nestjs/testing';
import { RoomTable } from './room.table';
import { StoreModule } from './store/store.module';

describe('AppController', () => {
  let rooms: any;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports:   [StoreModule],
      providers: [RoomTable],
    }).compile();
    rooms = app.get<RoomTable>(RoomTable);
  });

  describe('root', () => {
    it('should define"', () => {
      console.log(rooms);
      console.log(rooms.term);
      expect(rooms).toBeDefined();
    });
    it('"connection is here"', () => {
      expect(rooms.conn).toBeDefined();
    });
    it('"get rooms"', async () => {
      const res = await rooms.run(rooms.conn);
      console.log(res);
      expect(res.length).toBeTruthy();
    });
  });
});
