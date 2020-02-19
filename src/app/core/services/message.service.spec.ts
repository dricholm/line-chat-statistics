import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should parse messages', done => {
    service
      .parseFile(
        new File(['2018.04.24(Mon)\n16:32\tAuthor\tMessage'], 'test.txt')
      )
      .subscribe(
        () => {},
        _ => {
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
          done();
        }
      );
  });

  it('should parse pictures', done => {
    service
      .parseFile(
        new File(['2018.04.24(Mon)\n16:32\tAuthor\t[写真]'], 'test.txt')
      )
      .subscribe(
        () => {},
        _ => {
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
          done();
        }
      );
  });

  it('should parse stickers', done => {
    service
      .parseFile(
        new File(['2018.04.24(Mon)\n16:32\tAuthor\t[スタンプ]'], 'test.txt')
      )
      .subscribe(
        () => {},
        _ => {
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
          done();
        }
      );
  });

  it('should parse videos', done => {
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
          done();
        }
      );
  });

  it('should return error', done => {
    service.parseFile(new File(['test'], 'test.txt')).subscribe(
      () => {
        fail('No error was thrown');
      },
      _ => {
        expect(service.activityLength).toBe(0);
        done();
      }
    );
  });
});
