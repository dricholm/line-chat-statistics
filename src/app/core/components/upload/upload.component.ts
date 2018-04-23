import { Component } from '@angular/core';

@Component({
  selector: 'lcs-upload',
  styleUrls: ['./upload.component.scss'],
  templateUrl: './upload.component.html',
})
export class UploadComponent {
  file: File;

  onChange($event): void {
    this.file = $event.target.files[0];
  }

  onParse(): void {
    // TODO: Implement file parsing
    console.log('Submit file', this.file);
  }
}
