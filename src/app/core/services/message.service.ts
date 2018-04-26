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
  private _daySpan: number;

  private _numberOfMessages: number;
  private _numberOfMessageDays: number;
  private _numberOfNoMessageDays: number;

  private _longestStreak: {
    begin: number;
    daySpan: number;
    end: number;
  };

  private _mostMessages: {
    count: number;
    day: number;
  };

  private _urls: {
    [domain: string]: number;
  } = {};

  private _calls: {
    duration: number;
    longest: number;
    longestDay: number;
    numberOfCalls: number;
  };

  private _days: {
    [day: number]: {
      [author: string]: number;
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
  };

  private _weekdays: {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
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
  };

  public parseFile(file: File): Observable<void> {
    return new Observable<void>(observer => {
      const reader = new FileReader();

      reader.onload = (progress: ProgressEvent) => {
        this.messages = LineChatParser.parse(reader.result);
        this.initStats();
        if (this.messages.length === 0) {
          return observer.error(new Error('No messages found'));
        }
        observer.next();
        this.parseMessages();
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

  public get daySpan(): number {
    return this._daySpan;
  }

  public get authors(): {
    [author: string]: {
      messages: number;
      pictures: number;
      stickers: number;
      videos: number;
    };
  } {
    return this._authors;
  }

  private initStats(): void {
    this._authors = {};

    this._startDate = 0;
    this._latestDate = 0;
    this._daySpan = 0;

    this._numberOfMessages = 0;
    this._numberOfMessageDays = 0;
    this._numberOfNoMessageDays = 0;

    this._longestStreak = {
      begin: 0,
      daySpan: 0,
      end: 0,
    };

    this._mostMessages = {
      count: 0,
      day: 0,
    };

    this._urls = {};

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

  private parseMessages(): void {
    this._startDate = this.messages[0].date.getTime();
    this._latestDate = this.messages[this.messages.length - 1].date.getTime();
    this._daySpan = Math.ceil(
      (this._latestDate - this._startDate) / 1000 / 60 / 60 / 24
    );

    this.messages.forEach((message: Message) => {
      this.parseAuthorActivity(message);
      this.parseDates(message);
    });
  }

  private parseAuthorActivity(message: Message): void {
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
  }

  private parseDates(message: Message): void {
    const day = new Date(message.date.getTime()).setHours(0, 0, 0, 0);
    const month = new Date(day).setDate(1);

    if (typeof this._days[day] === 'undefined') {
      this._days[day] = {};
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

    this._days[day][message.author] += 1;
    this._yearMonths[month][message.author] += 1;

    this._months[message.date.getMonth()] += 1;
    this._weekdays[message.date.getDay()] += 1;
    this._hours[message.date.getHours()] += 1;
  }
}
