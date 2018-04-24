import { Injectable } from '@angular/core';
import * as Loki from 'lokijs';

import { Message } from '@app/core/interfaces/message';

@Injectable()
export class DatabaseService {
  private db = new Loki('lcs');
  private messages = this.db.addCollection('messages');

  addMessages(messages: Array<Message>) {
    this.messages.insert(
      messages.map((msg: Message) => ({
        ...msg,
        date: msg.date.getTime(),
      }))
    );
  }

  getMessageCount(): number {
    return this.messages.count();
  }
}
