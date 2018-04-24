import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ParseService } from '@app/core/services/parse.service';

@Component({
  selector: 'lcs-upload',
  styleUrls: ['./upload.component.scss'],
  templateUrl: './upload.component.html',
})
export class UploadComponent {
  file: File;

  constructor(private parseService: ParseService, private router: Router) {}

  onChange($event): void {
    this.file = $event.target.files[0];
  }

  onParse(): void {
    this.parseService.parseFile(this.file).subscribe(
      () => {
        this.router.navigateByUrl('stats');
      },
      error => {
        // TODO: Display error message
        console.log('Error during parsing', error);
      }
    );
  }
}
