import { Component } from '@angular/core';
import { fade } from '@app/shared/animations/fade.animation';

@Component({
  animations: [fade('400ms')],
  selector: 'lcs-nav',
  styleUrls: ['./nav.component.scss'],
  templateUrl: './nav.component.html',
})
export class NavComponent {
  isShown = false;

  toggleNav(): void {
    this.isShown = !this.isShown;
  }

  menuClick(): void {
    this.isShown = false;
  }
}
