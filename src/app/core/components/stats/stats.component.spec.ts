import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { StatsComponent } from './stats.component';
import { SectionComponent } from '@app/core/components/section/section.component';
import { DatabaseService } from '@app/core/services/database.service';
import { StatCardComponent } from '@app/core/components/stat-card/stat-card.component';

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatsComponent, SectionComponent, StatCardComponent],
      imports: [NoopAnimationsModule],
      providers: [DatabaseService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
