import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { HomeComponent } from '@app/core/components/home/home.component';
import { NavComponent } from '@app/core/components/nav/nav.component';
import { FooterComponent } from '@app/core/components/footer/footer.component';
import { UploadComponent } from '@app/core/components/upload/upload.component';
import { LandingHeaderComponent } from '@app/core/components/landing-header/landing-header.component';
import { NotFoundComponent } from '@app/core/components/not-found/not-found.component';
import { HeaderComponent } from '@app/core/components/header/header.component';
import { SectionComponent } from '@app/core/components/section/section.component';
import { MessageService } from './services/message.service';
import { StatsComponent } from './components/stats/stats.component';
import { AboutGuideComponent } from './components/about-guide/about-guide.component';
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { CalendarComponent } from './components/calendar/calendar.component';

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
  providers: [MessageService],
})
export class CoreModule {}
