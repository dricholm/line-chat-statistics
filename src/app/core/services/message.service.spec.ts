import { TestBed, inject, async } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService],
    });
  });

  it(
    'should be created',
    inject([MessageService], (service: MessageService) => {
      expect(service).toBeTruthy();
    })
  );

  it('should parse messages', async(
    inject([MessageService], (service: MessageService) => {
      service
        .parseFile(
          new File(['2018.04.24(Mon)\n16:32\tAuthor\tMessage'], 'test.txt')
        )
        .subscribe(
          () => {
            expect(service.getMessageCount()).toBe(1);
            expect(service.get(0)).toEqual({
              author: 'Author',
              date: new Date('2018.04.24 16:32:00'),
              text: 'Message',
            });
          },
          error => {
            fail('Error was thrown');
          }
        );
    })
  ));

  it('should return error', async(
    inject([MessageService], (service: MessageService) => {
      service.parseFile(new File(['test'], 'test.txt')).subscribe(
        () => {
          fail('No error was thrown');
        },
        error => {
          expect(service.getMessageCount()).toBe(0);
        }
      );
    })
  ));
});
