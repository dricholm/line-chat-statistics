import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as LineChatParser from 'line-chat-parser';

import { Message } from '@app/core/interfaces/message';

@Injectable()
export class MessageService {
  private messages: Array<Message> = [];

  private _authors: {
    [author: string]: {
      messages: number;
      pictures: number;
      stickers: number;
      videos: number;
    };
  } = {};

  private _startDate: number;
  private _latestDate: number;
  private _intervalActivity: number;
  private _daySpan: number;

  private _numberOfActiveDays: number;
  private _numberOfInactiveDays: number;

  private _longestStreak: {
    begin: number;
    daySpan: number;
    end: number;
  } = { begin: 0, daySpan: 0, end: 0 };

  private _mostActive: {
    count: number;
    day: number;
  } = { count: 0, day: 0 };

  private _urls: {
    [domain: string]: { byAuthor: { [author: string]: number }; total: number };
  } = {};
  private _topDomains: Array<string> = [];
  private _numberOfUrls: number;

  private _calls: {
    duration: number;
    longest: number;
    longestDay: number;
    numberOfCalls: number;
  } = { duration: 0, longest: 0, longestDay: 0, numberOfCalls: 0 };

  private _days: {
    [day: number]: {
      activityCount: number;
      authors: {
        [author: string]: number;
      };
      callDuration: number;
    };
  } = {};

  private _yearMonths: {
    [yearMonth: number]: {
      [author: string]: number;
    };
  } = {};

  private _months: {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
    10: number;
    11: number;
  } = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
  };

  private _weekdays: {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
  } = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };

  private _hours: {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
    10: number;
    11: number;
    12: number;
    13: number;
    14: number;
    15: number;
    16: number;
    17: number;
    18: number;
    19: number;
    20: number;
    21: number;
    22: number;
    23: number;
  } = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
    20: 0,
    21: 0,
    22: 0,
    23: 0,
  };

  public parseFile(file: File): Observable<void> {
    return new Observable<void>(observer => {
      const reader = new FileReader();

      reader.onload = (progress: ProgressEvent) => {
        this.messages = LineChatParser.parse(reader.result);
        if (this.messages.length === 0) {
          return observer.error(new Error('No messages found'));
        }
        observer.next();
        this.parseMessages(
          this.messages[0].date,
          this.messages[this.messages.length - 1].date
        );
        observer.complete();
      };

      reader.onerror = error => {
        console.log('FileReader error', error);
        return observer.error(error);
      };

      reader.readAsText(file);
    });
  }

  public get activityLength(): number {
    return this.messages.length;
  }

  public get(index: number) {
    return this.messages[index];
  }

  public get startDate(): number {
    return this._startDate;
  }

  public get latestDate(): number {
    return this._latestDate;
  }

  public get intervalActivity(): number {
    return this._intervalActivity;
  }

  public get daySpan(): number {
    return this._daySpan;
  }

  public get authors(): {
    [author: string]: {
      readonly messages: number;
      readonly pictures: number;
      readonly stickers: number;
      readonly videos: number;
    };
  } {
    return this._authors;
  }

  public get numberOfActiveDays(): number {
    return this._numberOfActiveDays;
  }

  public get numberOfInactiveDays(): number {
    return this._numberOfInactiveDays;
  }

  public get longestStreak(): {
    readonly begin: number;
    readonly daySpan: number;
    readonly end: number;
  } {
    return this._longestStreak;
  }

  public get mostActive(): {
    readonly count: number;
    readonly day: number;
  } {
    return this._mostActive;
  }

  public get urls(): {
    readonly [domain: string]: {
      readonly byAuthor: { readonly [author: string]: number };
      readonly total: number;
    };
  } {
    return this._urls;
  }

  public getDomain(
    domain: string
  ): {
    readonly byAuthor: { readonly [author: string]: number };
    readonly total: number;
  } {
    return this._urls[domain];
  }

  public get numberOfUrls(): number {
    return this._numberOfUrls;
  }

  public get topDomains(): Array<string> {
    return this._topDomains;
  }

  public get calls(): {
    readonly duration: number;
    readonly longest: number;
    readonly longestDay: number;
    readonly numberOfCalls: number;
  } {
    return this._calls;
  }

  public get days(): {
    readonly [day: number]: {
      readonly activityCount: number;
      readonly authors: {
        readonly [author: string]: number;
      };
      readonly callDuration: number;
    };
  } {
    return this._days;
  }

  public get yearMonths(): {
    readonly [yearMonth: number]: {
      readonly [author: string]: number;
    };
  } {
    return this._yearMonths;
  }

  public get months(): {
    readonly 0: number;
    readonly 1: number;
    readonly 2: number;
    readonly 3: number;
    readonly 4: number;
    readonly 5: number;
    readonly 6: number;
    readonly 7: number;
    readonly 8: number;
    readonly 9: number;
    readonly 10: number;
    readonly 11: number;
  } {
    return this._months;
  }

  public get weekdays(): {
    readonly 0: number;
    readonly 1: number;
    readonly 2: number;
    readonly 3: number;
    readonly 4: number;
    readonly 5: number;
    readonly 6: number;
  } {
    return this._weekdays;
  }

  public get hours(): {
    readonly 0: number;
    readonly 1: number;
    readonly 2: number;
    readonly 3: number;
    readonly 4: number;
    readonly 5: number;
    readonly 6: number;
    readonly 7: number;
    readonly 8: number;
    readonly 9: number;
    readonly 10: number;
    readonly 11: number;
    readonly 12: number;
    readonly 13: number;
    readonly 14: number;
    readonly 15: number;
    readonly 16: number;
    readonly 17: number;
    readonly 18: number;
    readonly 19: number;
    readonly 20: number;
    readonly 21: number;
    readonly 22: number;
    readonly 23: number;
  } {
    return this._hours;
  }

  private initStats(): void {
    this._authors = {};

    this._startDate = 0;
    this._latestDate = 0;
    this._intervalActivity = 0;
    this._daySpan = 0;

    this._numberOfActiveDays = 0;
    this._numberOfInactiveDays = 0;

    this._longestStreak = {
      begin: 0,
      daySpan: 0,
      end: 0,
    };

    this._mostActive = {
      count: 0,
      day: 0,
    };

    this._urls = {};
    this._topDomains = [];
    this._numberOfUrls = 0;

    this._calls = {
      duration: 0,
      longest: 0,
      longestDay: 0,
      numberOfCalls: 0,
    };

    this._days = {};

    this._yearMonths = {};

    this._months = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
    };

    this._weekdays = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };

    this._hours = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0,
      13: 0,
      14: 0,
      15: 0,
      16: 0,
      17: 0,
      18: 0,
      19: 0,
      20: 0,
      21: 0,
      22: 0,
      23: 0,
    };
  }

  parseMessages(from: Date, to: Date): void {
    this.initStats();
    this._startDate = from.getTime();
    this._latestDate = to.getTime();
    this._daySpan =
      Math.ceil((this._latestDate - this._startDate) / 1000 / 60 / 60 / 24) + 1;

    this.messages.forEach((message: Message) => {
      if (message.date >= from && message.date <= to) {
        this._intervalActivity += 1;
        this.parseMessageContent(message);
        this.parseDates(message);
      }
    });

    this._numberOfActiveDays = Object.keys(this._days).length;
    this._numberOfInactiveDays = this._daySpan - Object.keys(this._days).length;

    this.calculateLongestStreak();
    this.calculateTopDomains();
  }

  private parseMessageContent(message: Message): void {
    if (typeof this._authors[message.author] === 'undefined') {
      this._authors[message.author] = {
        messages: 0,
        pictures: 0,
        stickers: 0,
        videos: 0,
      };
    }

    switch (message.text) {
      case '[スタンプ]':
        this._authors[message.author].stickers += 1;
        break;

      case '[写真]':
        this._authors[message.author].pictures += 1;
        break;

      case '[動画]':
        this._authors[message.author].videos += 1;
        break;

      default:
        this._authors[message.author].messages += 1;
        break;
    }

    const urlMatch = message.text.match(
      /https?:\/\/(?:www\.)?([-0-9a-zA-Z._\+~]+)/g
    );
    if (urlMatch) {
      urlMatch.forEach(url => {
        const domain = url.match(/https?:\/\/(?:www\.)?(.*)/);
        if (typeof this._urls[domain[1]] === 'undefined') {
          this._urls[domain[1]] = { byAuthor: {}, total: 0 };
        }
        if (typeof this._urls[domain[1]][message.author] === 'undefined') {
          this._urls[domain[1]][message.author] = 0;
        }
        this._urls[domain[1]][message.author] += 1;
        this._urls[domain[1]].total += 1;
        this._numberOfUrls += 1;
      });
    }
  }

  private parseDates(message: Message): void {
    const day = new Date(message.date.getTime()).setHours(0, 0, 0, 0);
    const month = new Date(day).setDate(1);

    if (typeof this._days[day] === 'undefined') {
      this._days[day] = { authors: {}, activityCount: 0, callDuration: 0 };
    }
    if (typeof this._days[day][message.author] === 'undefined') {
      this._days[day][message.author] = 0;
    }

    if (typeof this._yearMonths[month] === 'undefined') {
      this._yearMonths[month] = {};
    }
    if (typeof this._yearMonths[month][message.author] === 'undefined') {
      this._yearMonths[month][message.author] = 0;
    }

    this._days[day].authors[message.author] += 1;
    this._days[day].activityCount += 1;
    this._yearMonths[month][message.author] += 1;

    this._months[message.date.getMonth()] += 1;
    this._weekdays[message.date.getDay()] += 1;
    this._hours[message.date.getHours()] += 1;

    if (this._days[day].activityCount > this._mostActive.count) {
      this._mostActive.count = this._days[day].activityCount;
      this._mostActive.day = day;
    }
    this._days[day][`messages_${message.author}`] += 1;

    const callMatch = message.text.match(
      /^通話時間 (?:(\d{1,2}):)?(\d{1,2}):(\d{2})$/
    );
    if (callMatch) {
      const hour = callMatch[1] ? parseInt(callMatch[1], 10) * 60 * 60 : 0;
      const min = callMatch[2] ? parseInt(callMatch[2], 10) * 60 : 0;
      const sec = parseInt(callMatch[3], 10);
      this._days[day].callDuration += hour + min + sec;
      this._calls.numberOfCalls += 1;
      this._calls.duration += hour + min + sec;
      if (hour + min + sec > this._calls.longest) {
        this._calls.longest = hour + min + sec;
        this._calls.longestDay = day;
      }
    }
  }

  private calculateLongestStreak() {
    let longest = 0;
    let longestBegin = 0;
    let longestEnd = 0;
    let streak = 0;
    let streakBegin = 0;

    Object.keys(this._days).forEach((day, index, array) => {
      if (index === 0) {
        longest = 1;
        longestBegin = +day;
        longestEnd = +day;
        streak = 1;
        streakBegin = +day;
        return;
      }

      if (+day - +array[index - 1] === 86400000) {
        streak++;
        return;
      }

      if (streak > longest) {
        longest = streak;
        longestBegin = streakBegin;
        longestEnd = +array[index - 1];
        streak = 1;
        streakBegin = +day;
        return;
      }

      streak = 1;
      streakBegin = +day;
    });

    if (streak > longest) {
      longest = streak;
      longestBegin = streakBegin;
      longestEnd = this._latestDate;
    }

    this._longestStreak.daySpan = longest;
    this._longestStreak.begin = new Date(longestBegin).getTime();
    this._longestStreak.end = new Date(longestEnd).getTime();
  }

  private calculateTopDomains(): void {
    const topTen: Array<{ domain: string; count: number }> = Object.keys(
      this._urls
    ).map((domain: string) => {
      return { domain, count: this._urls[domain].total };
    });

    topTen.sort(
      (
        a: { domain: string; count: number },
        b: { domain: string; count: number }
      ) => {
        if (a.count < b.count) {
          return 1;
        }
        if (a.count > b.count) {
          return -1;
        }
        return 0;
      }
    );

    this._topDomains = topTen
      .slice(0, 10)
      .map((element: { domain: string; count: number }) => element.domain);
  }
}
