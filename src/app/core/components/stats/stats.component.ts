import { Component } from '@angular/core';
import { DatabaseService } from '@app/core/services/database.service';

@Component({
  selector: 'lcs-stats',
  styleUrls: ['./stats.component.scss'],
  templateUrl: './stats.component.html',
})
export class StatsComponent {
  constructor(public db: DatabaseService) {}
}
