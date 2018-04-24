import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as LineChatParser from 'line-chat-parser';

import { DatabaseService } from '@app/core/services/database.service';

@Injectable()
export class ParseService {
  constructor(private db: DatabaseService) {}

  parseFile(file: File): Observable<void> {
    return new Observable<void>(observer => {
      const reader = new FileReader();

      reader.onload = (progress: ProgressEvent) => {
        const messages = LineChatParser.parse(reader.result);
        if (messages.length === 0) {
          return observer.error(new Error('No messages found'));
        }
        this.db.addMessages(messages);
        observer.next();
        observer.complete();
      };

      reader.onerror = error => {
        console.log('FileReader error', error);
        return observer.error(error);
      };

      reader.readAsText(file);
    });
  }
}
