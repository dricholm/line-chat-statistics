import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MessageService } from '@app/core/services/message.service';

const monthName = new Intl.DateTimeFormat(navigator.language, {
  month: 'short',
});
const weekdayName = new Intl.DateTimeFormat(navigator.language, {
  weekday: 'short',
});

@Component({
  selector: 'lcs-stats',
  templateUrl: './stats.component.html',
})
export class StatsComponent implements OnInit {
  monoColor: { domain: Array<string> } = { domain: ['#464e66'] };
  colors: { domain: Array<string> } = {
    domain: ['#00b84f', '#464e66', '#2d3649', '#697794'],
  };

  chatStartDate: number;
  chatLatestDate: number;
  startDate: number;
  latestDate: number;
  daySpan: number;
  intervalActivity: number;
  activeDays: number;
  inactiveDays: number;
  longestStreak: {
    begin: number;
    daySpan: number;
    end: number;
  };
  mostActive: {
    count: number;
    day: number;
  };
  calls: {
    duration: number;
    longest: number;
    longestDay: number;
    numberOfCalls: number;
  };

  authors: {
    [author: string]: {
      messages: number;
      pictures: number;
      stickers: number;
      videos: number;
    };
  };
  authorNames: Array<string>;
  authorMessages: Array<{ name: string; value: number }>;
  authorPictures: Array<{ name: string; value: number }>;
  authorStickers: Array<{ name: string; value: number }>;
  authorVideos: Array<{ name: string; value: number }>;
  numberOfUrls: number;
  authorUrls: Array<{
    name: string;
    series: Array<{ name: string; value: number }>;
  }>;

  byHour: Array<{ name: string; value: number }>;
  byWeekday: Array<{ name: string; value: number }>;
  byMonth: Array<{ name: string; value: number }>;

  form: FormGroup;

  constructor(public service: MessageService) {}

  ngOnInit() {
    this.chatStartDate =
      this.service.activityLength > 0
        ? this.service.get(0).date.getTime()
        : new Date().getTime();
    this.chatLatestDate =
      this.service.activityLength > 0
        ? this.service.get(this.service.activityLength - 1).date.getTime()
        : new Date().getTime();
    this.initStats();
    this.form = new FormGroup({
      from: new FormControl(new Date(this.startDate), [Validators.required]),
      to: new FormControl(new Date(this.latestDate), [Validators.required]),
    });
  }

  onDateSubmit() {
    if (this.form.value.from > this.form.value.to) {
      const tempDate = this.form.value.to;
      this.form.controls.to.setValue(this.form.value.from);
      this.form.controls.from.setValue(tempDate);
    }
    if (this.form.value.from < new Date(this.chatStartDate)) {
      this.form.controls.from.setValue(new Date(this.chatStartDate));
    }
    if (this.form.value.to > new Date(this.chatLatestDate)) {
      this.form.controls.to.setValue(new Date(this.chatLatestDate));
    }

    this.service.parseMessages(this.form.value.from, this.form.value.to);
    this.initStats();
  }

  private initStats(): void {
    this.startDate = this.service.startDate;
    this.latestDate = this.service.latestDate;
    this.daySpan = this.service.daySpan;
    this.intervalActivity = this.service.intervalActivity;
    this.activeDays = this.service.numberOfActiveDays;
    this.inactiveDays = this.service.numberOfInactiveDays;
    this.longestStreak = this.service.longestStreak;
    this.mostActive = this.service.mostActive;
    this.calls = this.service.calls;

    this.authors = this.service.authors;
    this.authorNames = Object.keys(this.authors);
    this.authorMessages = this.authorNames.map((author: string) => ({
      name: author,
      value: this.authors[author].messages,
    }));
    this.authorPictures = this.authorNames.map((author: string) => ({
      name: author,
      value: this.authors[author].pictures,
    }));
    this.authorStickers = this.authorNames.map((author: string) => ({
      name: author,
      value: this.authors[author].stickers,
    }));
    this.authorVideos = this.authorNames.map((author: string) => ({
      name: author,
      value: this.authors[author].videos,
    }));
    this.numberOfUrls = this.service.numberOfUrls;
    this.authorUrls = this.service.topDomains.map((domain: string) => ({
      name: domain,
      series: this.authorNames.map((name: string) => ({
        name,
        value: this.service.getDomain(domain)[name] || 0,
      })),
    }));

    this.byHour = Object.entries(this.service.hours).map(
      ([hour, value]: [string, number]) => ({
        name: hour,
        value,
      })
    );
    const weekdays = this.service.weekdays;
    this.byWeekday = [1, 2, 3, 4, 5, 6, 0].map((weekday: number) => ({
      name: weekdayName.format(new Date(2018, 0, weekday)),
      value: weekdays[weekday],
    }));
    this.byMonth = Object.entries(this.service.months).map(
      ([month, value]: [string, number]) => ({
        name: monthName.format(new Date(2018, +month, 1)),
        value,
      })
    );
  }
}
