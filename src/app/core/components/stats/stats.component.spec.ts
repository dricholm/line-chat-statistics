import {
  async,
  ComponentFixture,
  TestBed,
  inject,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { StatsComponent } from './stats.component';
import { SectionComponent } from '@app/core/components/section/section.component';
import { MessageService } from '@app/core/services/message.service';
import { StatCardComponent } from '@app/core/components/stat-card/stat-card.component';

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatsComponent, SectionComponent, StatCardComponent],
      imports: [NoopAnimationsModule, NgxChartsModule],
      providers: [MessageService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(
    'should display start date',
    inject([MessageService], (service: MessageService) => {
      const spy = spyOnProperty(service, 'startDate', 'get').and.returnValue(
        new Date('2015.03.20').getTime()
      );

      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
      expect(
        fixture.nativeElement.querySelector(
          'lcs-stat-card[header="First message"'
        ).textContent
      ).toContain('March 20, 2015');
    })
  );

  it(
    'should display latest date',
    inject([MessageService], (service: MessageService) => {
      const spy = spyOnProperty(service, 'latestDate', 'get').and.returnValue(
        new Date('2018.04.26').getTime()
      );

      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
      expect(
        fixture.nativeElement.querySelector(
          'lcs-stat-card[header="Latest message"'
        ).textContent
      ).toContain('April 26, 2018');
    })
  );

  it(
    'should display day span',
    inject([MessageService], (service: MessageService) => {
      const spy = spyOnProperty(service, 'daySpan', 'get').and.returnValue(20);

      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
      expect(
        fixture.nativeElement.querySelector('lcs-stat-card[header="Timespan"')
          .textContent
      ).toContain('20');
    })
  );
});
