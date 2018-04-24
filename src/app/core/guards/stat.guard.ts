import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { DatabaseService } from '@app/core/services/database.service';

@Injectable()
export class StatGuard implements CanActivate {
  constructor(private db: DatabaseService, private router: Router) {}

  canActivate(): boolean {
    if (this.db.getMessageCount() === 0) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
