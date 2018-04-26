import { Component, Input } from '@angular/core';

@Component({
  selector: 'lcs-stat-card',
  templateUrl: './stat-card.component.html',
})
export class StatCardComponent {
  @Input() header: string;
}
