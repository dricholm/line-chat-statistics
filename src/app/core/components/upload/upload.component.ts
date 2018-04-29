import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from '@app/core/services/message.service';
import { fade } from '@app/shared/animations/fade.animation';
import { slide } from '@app/shared/animations/slide.animation';

@Component({
  animations: [slide(), fade('400ms ease-out')],
  selector: 'lcs-upload',
  styleUrls: ['./upload.component.scss'],
  templateUrl: './upload.component.html',
})
export class UploadComponent {
  file: File;
  text = 'Select a chat log file';
  error: boolean;

  constructor(private messageService: MessageService, private router: Router) {}

  onChange($event): void {
    this.error = false;
    this.file = $event.target.files[0];
    this.text = this.file
      ? `Selected: ${this.file.name}`
      : 'Select a chat log file';
  }

  onParse(): void {
    this.text = 'Checking file, please wait';
    if (this.file.type !== 'text/plain') {
      this.error = true;
      this.text = 'Please upload a text file';
      return;
    }
    this.messageService.parseFile(this.file).subscribe(
      () => {
        this.text = 'Parsing file, please wait';
      },
      error => {
        this.text = 'Error during parsing';
        this.file = null;
        this.error = true;
      },
      () => {
        this.router.navigateByUrl('stats');
        window.scrollTo(0, 0);
      }
    );
  }
}
