import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  exports: [RouterModule, NgxPageScrollModule, NgxChartsModule],
  imports: [CommonModule, NgxPageScrollModule, NgxChartsModule],
})
export class SharedModule {}
