import { Component, Input } from '@angular/core';

@Component({
  selector: 'lcs-section',
  styleUrls: ['./section.component.scss'],
  templateUrl: './section.component.html',
})
export class SectionComponent {
  @Input() title: string;
}
