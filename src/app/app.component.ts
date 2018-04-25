import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { PageScrollConfig } from 'ngx-page-scroll';

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
export class AppComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {
    this.setupPageScroll();
  }

  private setupPageScroll(): void {
    PageScrollConfig.defaultDuration = 750;
    PageScrollConfig.defaultEasingLogic = {
      ease: (t: number, b: number, c: number, d: number): number => {
        t /= d;
        return -c * t * (t - 2) + b;
      },
    };
  }
}
