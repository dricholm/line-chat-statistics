import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DateValueAccessorModule } from 'angular-date-value-accessor';

@NgModule({
  exports: [
    RouterModule,
    ReactiveFormsModule,
    NgxChartsModule,
    DateValueAccessorModule,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxChartsModule,
    DateValueAccessorModule,
  ],
})
export class SharedModule {}
