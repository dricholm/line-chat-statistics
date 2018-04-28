import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DateValueAccessorModule } from 'angular-date-value-accessor';

@NgModule({
  exports: [
    RouterModule,
    ReactiveFormsModule,
    NgxPageScrollModule,
    NgxChartsModule,
    DateValueAccessorModule,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPageScrollModule,
    NgxChartsModule,
    DateValueAccessorModule,
  ],
})
export class SharedModule {}
