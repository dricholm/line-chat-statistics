import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { MessageService } from '@app/core/services/message.service';

@Component({
  selector: 'lcs-calendar',
  styleUrls: ['./calendar.component.scss'],
  templateUrl: './calendar.component.html',
})
export class CalendarComponent implements OnInit {
  weeks: Array<{
    week: number;
    days: Array<{ activityCount: number; color: string; date: Date }>;
  }>;
  maxActivity = 80;
  backgroundColor: Array<number> = [70, 78, 102];
  acitivtyColor: Array<number> = [0, 184, 79];

  hoverStyle: Subject<{ [property: string]: string | number }> = new Subject();
  hoverDate: Date;
  hoverCount: number;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    const serviceDays = this.messageService.days;
    const length = this.messageService.activityLength;
    if (length === 0) {
      return;
    }
    const beginDate = new Date(this.messageService.get(0).date);
    const beginDay = new Date(beginDate.getFullYear(), beginDate.getMonth(), 1);
    const endDate = new Date(this.messageService.get(length - 1).date);
    const firstMonday =
      beginDay.getDay() === 0
        ? new Date(beginDay.setDate(beginDay.getDate() - 6))
        : new Date(
            beginDay.setDate(beginDay.getDate() - beginDay.getDay() + 1)
          );

    this.weeks = [];
    for (
      let dayIter = firstMonday;
      dayIter <= endDate;
      dayIter = new Date(dayIter.setDate(dayIter.getDate() + 7))
    ) {
      const days: Array<{
        activityCount: number;
        color: string;
        date: Date;
      }> = [];

      for (let weekday = 0; weekday < 7; weekday++) {
        const week = new Date(dayIter.getTime());
        const day = serviceDays[week.setDate(week.getDate() + weekday)];

        if (typeof day === 'undefined' || day.activityCount === 0) {
          days.push({ activityCount: 0, color: '#e5e5e5', date: week });
        } else {
          const alpha = Math.min(day.activityCount / this.maxActivity, 1);
          const color: Array<number> = [
            alpha * this.acitivtyColor[0] +
              (1 - alpha) * this.backgroundColor[0],
            alpha * this.acitivtyColor[1] +
              (1 - alpha) * this.backgroundColor[1],
            alpha * this.acitivtyColor[2] +
              (1 - alpha) * this.backgroundColor[2],
          ];

          days.push({
            activityCount: day.activityCount,
            color: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
            date: week,
          });
        }
      }
      this.weeks.push({ week: dayIter.getTime(), days: days });
    }
  }

  onHover(week: number, day: number) {
    this.hoverDate = this.weeks[week].days[day].date;
    this.hoverCount = this.weeks[week].days[day].activityCount;
    this.hoverStyle.next({
      position: 'absolute',
      'top.px': (week - 1) * 21,
    });
  }
}
