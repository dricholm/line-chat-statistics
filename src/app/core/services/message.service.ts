import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as LineChatParser from 'line-chat-parser';

import { Message } from '@app/core/interfaces/message';
import { Stats, initialStats } from '@app/core/interfaces/stats';

@Injectable()
export class MessageService {
  private messages: Array<Message> = [];
  private stats: Stats = initialStats;

  parseFile(file: File): Observable<void> {
    return new Observable<void>(observer => {
      const reader = new FileReader();

      reader.onload = (progress: ProgressEvent) => {
        this.messages = LineChatParser.parse(reader.result);
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

  getMessageCount(): number {
    return this.messages.length;
  }

  get(index: number) {
    return this.messages[index];
  }

  getStartDate(): number {
    return this.stats.startDate;
  }

  getLatestDate(): number {
    return this.stats.latestDate;
  }

  getDaySpan(): number {
    return this.stats.daySpan;
  }

  private parseMessages(): void {
    this.stats.startDate = this.messages[0].date.getTime();
    this.stats.latestDate = this.messages[
      this.messages.length - 1
    ].date.getTime();
    this.stats.daySpan = Math.ceil(
      (this.stats.latestDate - this.stats.startDate) / 1000 / 60 / 60 / 24
    );

    this.messages.forEach((message: Message) => {
      // TODO: Parse messages
      // const day = new Date(message.date.getTime()).setHours(0, 0, 0, 0);
      // const month = new Date(day).setDate(1);
    });
  }
}
