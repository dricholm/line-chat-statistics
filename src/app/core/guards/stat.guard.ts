import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { MessageService } from '@app/core/services/message.service';

@Injectable()
export class StatGuard implements CanActivate {
  constructor(private service: MessageService, private router: Router) {}

  canActivate(): boolean {
    if (this.service.activityLength === 0) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
