import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

import { ParseService } from '@app/core/services/parse.service';

@Component({
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-1rem)' }),
        animate(
          '200ms 100ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0)' }),
        animate(
          '200ms ease-in',
          style({ opacity: 0, transform: 'translateX(4rem)' })
        ),
      ]),
    ]),
  ],
  selector: 'lcs-upload',
  styleUrls: ['./upload.component.scss'],
  templateUrl: './upload.component.html',
})
export class UploadComponent {
  file: File;
  text = 'Select a chat log file';
  error: boolean;

  constructor(private parseService: ParseService, private router: Router) {}

  onChange($event): void {
    this.error = false;
    this.file = $event.target.files[0];
    this.text = this.file
      ? `Selected: ${this.file.name}`
      : 'Select a chat log file';
  }

  onParse(): void {
    this.parseService.parseFile(this.file).subscribe(
      () => {
        this.router.navigateByUrl('stats');
      },
      error => {
        this.text = 'Error during parsing';
        this.file = null;
        this.error = true;
      }
    );
  }
}
