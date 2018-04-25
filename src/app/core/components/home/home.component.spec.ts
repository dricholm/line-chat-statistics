import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home.component';
import { LandingHeaderComponent } from '@app/core/components/landing-header/landing-header.component';
import { NavComponent } from '@app/core/components/nav/nav.component';
import { SectionComponent } from '@app/core/components/section/section.component';
import { UploadComponent } from '@app/core/components/upload/upload.component';
import { FooterComponent } from '@app/core/components/footer/footer.component';
import { ParseService } from '@app/core/services/parse.service';
import { DatabaseService } from '@app/core/services/database.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        LandingHeaderComponent,
        NavComponent,
        SectionComponent,
        UploadComponent,
        FooterComponent,
      ],
      imports: [NoopAnimationsModule, RouterTestingModule],
      providers: [DatabaseService, ParseService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
