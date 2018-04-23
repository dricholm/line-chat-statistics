import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPageScrollModule } from 'ngx-page-scroll';

@NgModule({
  exports: [RouterModule, NgxPageScrollModule],
  imports: [CommonModule, NgxPageScrollModule],
})
export class SharedModule {}
