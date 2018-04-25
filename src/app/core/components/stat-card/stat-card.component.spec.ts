import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatCardComponent } from './stat-card.component';

describe('StatCardComponent', () => {
  let component: StatCardComponent;
  let fixture: ComponentFixture<StatCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display inputs', () => {
    component.header = 'Header text';
    component.data = 'Data';
    component.subtitle = 'Subtitle';
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.card-header').textContent
    ).toContain(component.header);
    expect(
      fixture.nativeElement.querySelector('.stat-display').textContent
    ).toContain(component.data);
    expect(
      fixture.nativeElement.querySelector('.stat-unit').textContent
    ).toContain(component.subtitle);
  });
});
