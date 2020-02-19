import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DateInputDirective } from './directives/date-input.directive';

@NgModule({
  exports: [
    RouterModule,
    ReactiveFormsModule,
    NgxChartsModule,
    DateInputDirective,
  ],
  imports: [CommonModule, ReactiveFormsModule, NgxChartsModule],
  declarations: [DateInputDirective],
})
export class SharedModule {}
