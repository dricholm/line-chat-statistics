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
          () => {},
          error => {
            fail('Error was thrown');
          },
          () => {
            expect(service.activityLength).toBe(1);
            expect(service.authors).toEqual({
              Author: {
                messages: 1,
                pictures: 0,
                stickers: 0,
                videos: 0,
              },
            });
            expect(service.get(0)).toEqual({
              author: 'Author',
              date: new Date('2018.04.24 16:32:00'),
              text: 'Message',
            });
          }
        );
    })
  ));

  it('should parse pictures', async(
    inject([MessageService], (service: MessageService) => {
      service
        .parseFile(
          new File(['2018.04.24(Mon)\n16:32\tAuthor\t[写真]'], 'test.txt')
        )
        .subscribe(
          () => {},
          error => {
            fail('Error was thrown');
          },
          () => {
            expect(service.activityLength).toBe(1);
            expect(service.authors).toEqual({
              Author: {
                messages: 0,
                pictures: 1,
                stickers: 0,
                videos: 0,
              },
            });
            expect(service.get(0)).toEqual({
              author: 'Author',
              date: new Date('2018.04.24 16:32:00'),
              text: '[写真]',
            });
          }
        );
    })
  ));

  it('should parse stickers', async(
    inject([MessageService], (service: MessageService) => {
      service
        .parseFile(
          new File(['2018.04.24(Mon)\n16:32\tAuthor\t[スタンプ]'], 'test.txt')
        )
        .subscribe(
          () => {},
          error => {
            fail('Error was thrown');
          },
          () => {
            expect(service.activityLength).toBe(1);
            expect(service.authors).toEqual({
              Author: {
                messages: 0,
                pictures: 0,
                stickers: 1,
                videos: 0,
              },
            });
            expect(service.get(0)).toEqual({
              author: 'Author',
              date: new Date('2018.04.24 16:32:00'),
              text: '[スタンプ]',
            });
          }
        );
    })
  ));

  it('should parse videos', async(
    inject([MessageService], (service: MessageService) => {
      service
        .parseFile(
          new File(['2018.04.24(Mon)\n16:32\tAuthor\t[動画]'], 'test.txt')
        )
        .subscribe(
          () => {},
          error => {
            fail('Error was thrown');
          },
          () => {
            expect(service.activityLength).toBe(1);
            expect(service.authors).toEqual({
              Author: {
                messages: 0,
                pictures: 0,
                stickers: 0,
                videos: 1,
              },
            });
            expect(service.get(0)).toEqual({
              author: 'Author',
              date: new Date('2018.04.24 16:32:00'),
              text: '[動画]',
            });
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
          expect(service.activityLength).toBe(0);
        }
      );
    })
  ));
});
