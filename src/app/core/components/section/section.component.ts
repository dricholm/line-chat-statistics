import { Component, Input } from '@angular/core';

import { fade } from '@app/shared/animations/fade.animation';

@Component({
  animations: [fade('400ms ease-out')],
  selector: 'lcs-section',
  styleUrls: ['./section.component.scss'],
  templateUrl: './section.component.html',
})
export class SectionComponent {
  @Input() header: string;
}
