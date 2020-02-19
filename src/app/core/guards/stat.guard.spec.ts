import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MessageService } from '@app/core/services/message.service';
import { StatGuard } from '@app/core/guards/stat.guard';

describe('StatGuard', () => {
  let guard: StatGuard;
  let router: Router;
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    guard = TestBed.inject(StatGuard);
    router = TestBed.inject(Router);
    service = TestBed.inject(MessageService);
  });

  it('should redirect to root if message count is zero', () => {
    const spy = jest.spyOn(service, 'activityLength', 'get').mockReturnValue(0);
    spyOn(router, 'navigateByUrl');

    expect(guard.canActivate()).toBe(false);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should return true if message count is greater then zero', () => {
    const spy = jest.spyOn(service, 'activityLength', 'get').mockReturnValue(1);
    spyOn(router, 'navigateByUrl');

    expect(guard.canActivate()).toBe(true);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(router.navigateByUrl).toHaveBeenCalledTimes(0);
  });
});
