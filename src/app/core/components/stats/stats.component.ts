import { Component, OnInit } from '@angular/core';

import { MessageService } from '@app/core/services/message.service';

@Component({
  selector: 'lcs-stats',
  templateUrl: './stats.component.html',
})
export class StatsComponent implements OnInit {
  colors: { domain: Array<string> } = {
    domain: ['#00b84f', '#464e66', '#2d3649', '#697794'],
  };
  startDate: number;
  latestDate: number;
  daySpan: number;
  activityLength: number;
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
  authorMessages: Array<{ name: string; value: number }>;
  authorPictures: Array<{ name: string; value: number }>;
  authorStickers: Array<{ name: string; value: number }>;
  authorVideos: Array<{ name: string; value: number }>;

  constructor(public service: MessageService) {}

  ngOnInit() {
    this.initStats();
  }

  private initStats(): void {
    this.startDate = this.service.startDate;
    this.latestDate = this.service.latestDate;
    this.daySpan = this.service.daySpan;
    this.activityLength = this.service.activityLength;
    this.activeDays = this.service.numberOfActiveDays;
    this.inactiveDays = this.service.numberOfInactiveDays;
    this.longestStreak = this.service.longestStreak;
    this.mostActive = this.service.mostActive;
    this.calls = this.service.calls;

    this.authors = this.service.authors;
    this.authorMessages = Object.keys(this.authors).map((author: string) => ({
      name: author,
      value: this.authors[author].messages,
    }));
    this.authorPictures = Object.keys(this.authors).map((author: string) => ({
      name: author,
      value: this.authors[author].pictures,
    }));
    this.authorStickers = Object.keys(this.authors).map((author: string) => ({
      name: author,
      value: this.authors[author].stickers,
    }));
    this.authorVideos = Object.keys(this.authors).map((author: string) => ({
      name: author,
      value: this.authors[author].videos,
    }));
  }
}
