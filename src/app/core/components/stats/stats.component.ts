import { Component } from '@angular/core';

import { DatabaseService } from '@app/core/services/database.service';

@Component({
  selector: 'lcs-stats',
  templateUrl: './stats.component.html',
})
export class StatsComponent {
  constructor(public db: DatabaseService) {}
}
