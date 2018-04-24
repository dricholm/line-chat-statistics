import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageScrollConfig } from 'ngx-page-scroll';

@Component({
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
