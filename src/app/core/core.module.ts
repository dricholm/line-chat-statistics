import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from '@app/core/components/home/home.component';
import { NavComponent } from '@app/core/components/nav/nav.component';
import { AboutComponent } from '@app/core/components/about/about.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [HomeComponent, NavComponent, AboutComponent, FooterComponent],
  exports: [FooterComponent],
  imports: [CommonModule],
})
export class CoreModule {}
