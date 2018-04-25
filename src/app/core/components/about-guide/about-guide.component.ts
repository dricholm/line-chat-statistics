import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  animations: [
    trigger('height', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('400ms 400ms ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate('400ms ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
  selector: 'lcs-about-guide',
  styleUrls: ['./about-guide.component.scss'],
  templateUrl: './about-guide.component.html',
})
export class AboutGuideComponent {
  sections: Array<string> = ['Android', 'iOS'];
  active = 0;
}
