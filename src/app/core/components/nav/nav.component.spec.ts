import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle nav', () => {
    const button = fixture.nativeElement.querySelector('.nav-button');
    expect(component.isShown).toBe(false, 'Nav is already shown');
    button.click();
    expect(component.isShown).toBe(true, 'Nav does not appear');
    const link = fixture.nativeElement.querySelector('.nav-link');
    link.click();
    expect(component.isShown).toBe(false, 'Nav does not disappear');
  });
});
