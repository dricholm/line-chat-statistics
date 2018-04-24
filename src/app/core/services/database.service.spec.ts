import { TestBed, inject } from '@angular/core/testing';

import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatabaseService],
    });
  });

  it(
    'should be created',
    inject([DatabaseService], (service: DatabaseService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'should add messages',
    inject([DatabaseService], (service: DatabaseService) => {
      expect(service.getMessageCount()).toBe(0);
      service.addMessages([
        {
          author: 'Author name',
          date: new Date('2018/04/24 16:23'),
          text: 'Message text',
        },
      ]);
      expect(service.getMessageCount()).toBe(1);
    })
  );
});
