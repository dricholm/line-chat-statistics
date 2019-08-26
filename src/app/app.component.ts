import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('400ms ease-out', style({ transform: 'translateY(0%)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', height: '*', zIndex: -1 }),
        animate(
          '400ms ease-in',
          style({ transform: 'translateY(-100%)', height: 0 })
        ),
      ]),
    ]),
  ],
  selector: 'lcs-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private router: Router) {}

  get displayHeader(): boolean {
    return this.router.url !== '/' && !this.router.url.startsWith('/#');
  }
}
