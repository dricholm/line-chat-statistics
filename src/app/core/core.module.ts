import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AboutGuideComponent } from '@app/core/components/about-guide/about-guide.component';
import { CalendarComponent } from '@app/core/components/calendar/calendar.component';
import { FooterComponent } from '@app/core/components/footer/footer.component';
import { HeaderComponent } from '@app/core/components/header/header.component';
import { HomeComponent } from '@app/core/components/home/home.component';
import { LandingHeaderComponent } from '@app/core/components/landing-header/landing-header.component';
import { NavComponent } from '@app/core/components/nav/nav.component';
import { NotFoundComponent } from '@app/core/components/not-found/not-found.component';
import { SectionComponent } from '@app/core/components/section/section.component';
import { StatCardComponent } from '@app/core/components/stat-card/stat-card.component';
import { StatsComponent } from '@app/core/components/stats/stats.component';
import { UploadComponent } from '@app/core/components/upload/upload.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    NavComponent,
    FooterComponent,
    UploadComponent,
    LandingHeaderComponent,
    NotFoundComponent,
    HeaderComponent,
    SectionComponent,
    StatsComponent,
    AboutGuideComponent,
    StatCardComponent,
    CalendarComponent,
  ],
  exports: [HeaderComponent, FooterComponent],
  imports: [CommonModule, SharedModule],
})
export class CoreModule {}
