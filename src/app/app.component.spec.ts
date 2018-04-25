import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { HeaderComponent } from '@app/core/components/header/header.component';
import { FooterComponent } from '@app/core/components/footer/footer.component';
import { PageScrollConfig } from 'ngx-page-scroll';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, HeaderComponent, FooterComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should set PageScrollConfig', async(() => {
    const defaultEasingLogic = PageScrollConfig.defaultEasingLogic;
    const defaultDuration = PageScrollConfig.defaultDuration;
    fixture.detectChanges();
    expect(PageScrollConfig.defaultDuration).not.toEqual(defaultDuration);
    expect(PageScrollConfig.defaultEasingLogic).not.toEqual(defaultEasingLogic);
  }));
});
