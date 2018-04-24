import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';

import { StatGuard } from './stat.guard';
import { DatabaseService } from '@app/core/services/database.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('StatGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [StatGuard, DatabaseService],
    });
  });

  it(
    'should redirect to root if message count is zero',
    inject(
      [StatGuard, Router, DatabaseService],
      (guard: StatGuard, router: Router, db: DatabaseService) => {
        spyOn(db, 'getMessageCount').and.returnValue(0);
        spyOn(router, 'navigateByUrl');

        expect(guard.canActivate()).toBe(false);
        expect(db.getMessageCount).toHaveBeenCalledTimes(1);
        expect(router.navigateByUrl).toHaveBeenCalledWith('/');
      }
    )
  );

  it(
    'should return true if message count is greater then zero',
    inject(
      [StatGuard, Router, DatabaseService],
      (guard: StatGuard, router: Router, db: DatabaseService) => {
        spyOn(db, 'getMessageCount').and.returnValue(1);
        spyOn(router, 'navigateByUrl');

        expect(guard.canActivate()).toBe(true);
        expect(db.getMessageCount).toHaveBeenCalledTimes(1);
        expect(router.navigateByUrl).toHaveBeenCalledTimes(0);
      }
    )
  );
});
