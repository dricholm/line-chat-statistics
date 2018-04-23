import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingHeaderComponent } from './landing-header.component';
import { NavComponent } from '@app/core/components/nav/nav.component';

describe('LandingHeaderComponent', () => {
  let component: LandingHeaderComponent;
  let fixture: ComponentFixture<LandingHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LandingHeaderComponent, NavComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
