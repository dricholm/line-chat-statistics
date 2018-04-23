import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { LandingHeaderComponent } from '@app/core/components/landing-header/landing-header.component';
import { NavComponent } from '@app/core/components/nav/nav.component';
import { FooterComponent } from '@app/core/components/footer/footer.component';
import { AboutComponent } from '@app/core/components/about/about.component';
import { UploadComponent } from '@app/core/components/upload/upload.component';
import { FaqsComponent } from '@app/core/components/faqs/faqs.component';
import { ContactComponent } from '@app/core/components/contact/contact.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        LandingHeaderComponent,
        NavComponent,
        AboutComponent,
        UploadComponent,
        FaqsComponent,
        ContactComponent,
        FooterComponent,
      ],
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
