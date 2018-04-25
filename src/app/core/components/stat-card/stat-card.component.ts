import { Component, Input } from '@angular/core';

@Component({
  selector: 'lcs-stat-card',
  styleUrls: ['./stat-card.component.scss'],
  templateUrl: './stat-card.component.html',
})
export class StatCardComponent {
  @Input() header: string;
  @Input() data: string;
  @Input() subtitle: string;
}
