import {
  async,
  ComponentFixture,
  inject,
  TestBed,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { CalendarComponent } from '@app/core/components/calendar/calendar.component';
import { SectionComponent } from '@app/core/components/section/section.component';
import { StatCardComponent } from '@app/core/components/stat-card/stat-card.component';
import { StatsComponent } from '@app/core/components/stats/stats.component';
import { MessageService } from '@app/core/services/message.service';

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StatsComponent,
        SectionComponent,
        StatCardComponent,
        CalendarComponent,
      ],
      imports: [NoopAnimationsModule, ReactiveFormsModule, NgxChartsModule],
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

  it('should display start date', inject(
    [MessageService],
    (service: MessageService) => {
      const spy = jest
        .spyOn(service, 'activityLength', 'get')
        .mockReturnValue(1);
      spyOn(service, 'get').and.callFake(() => ({
        author: 'Author',
        date: new Date('2015.03.20'),
        text: 'Text',
      }));

      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
      expect(service.get).toHaveBeenCalledWith(0);
      expect(
        fixture.nativeElement.querySelector(
          'lcs-stat-card[header="First message"'
        ).textContent
      ).toContain('March 20, 2015');
    }
  ));

  it('should display latest date', inject(
    [MessageService],
    (service: MessageService) => {
      const spy = jest
        .spyOn(service, 'activityLength', 'get')
        .mockReturnValue(5);
      spyOn(service, 'get').and.callFake(() => ({
        author: 'Author',
        date: new Date('2018.04.26'),
        text: 'Text',
      }));

      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
      expect(service.get).toHaveBeenCalledWith(4);
      expect(
        fixture.nativeElement.querySelector(
          'lcs-stat-card[header="Latest message"'
        ).textContent
      ).toContain('April 26, 2018');
    }
  ));

  it('should display day span', inject(
    [MessageService],
    (service: MessageService) => {
      const spy = jest.spyOn(service, 'daySpan', 'get').mockReturnValue(20);

      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
      expect(
        fixture.nativeElement.querySelector('lcs-stat-card[header="Timespan"')
          .textContent
      ).toContain('20');
    }
  ));
});
