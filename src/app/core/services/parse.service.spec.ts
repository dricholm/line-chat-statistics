import { TestBed, inject, async } from '@angular/core/testing';

import { ParseService } from './parse.service';
import { DatabaseService } from '@app/core/services/database.service';

describe('ParseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParseService, DatabaseService],
    });
  });

  it(
    'should be created',
    inject([ParseService], (service: ParseService) => {
      expect(service).toBeTruthy();
    })
  );

  it('should parse messages', async(
    inject(
      [ParseService, DatabaseService],
      (service: ParseService, db: DatabaseService) => {
        spyOn(db, 'addMessages').and.callFake(() => {});

        service
          .parseFile(
            new File(['2018.04.24(Mon)\n16:32\tAuthor\tMessage'], 'test.txt')
          )
          .subscribe(
            () => {
              expect(db.addMessages).toHaveBeenCalledWith([
                {
                  author: 'Author',
                  date: new Date('2018.04.24 16:32:00'),
                  text: 'Message',
                },
              ]);
            },
            error => {
              fail('Error was thrown');
            }
          );
      }
    )
  ));

  it('should return error', async(
    inject(
      [ParseService, DatabaseService],
      (service: ParseService, db: DatabaseService) => {
        spyOn(db, 'addMessages').and.callFake(() => {});

        service.parseFile(new File(['test'], 'test.txt')).subscribe(
          () => {
            fail('No error was thrown');
          },
          error => {
            expect(db.addMessages).toHaveBeenCalledTimes(0);
          }
        );
      }
    )
  ));
});
