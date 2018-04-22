import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from '@app/core/core-routing.module';
import { HomeComponent } from '@app/core/components/home/home.component';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
  declarations: [HomeComponent, NavComponent],
  imports: [CommonModule, CoreRoutingModule],
})
export class CoreModule {}
