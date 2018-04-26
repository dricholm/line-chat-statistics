import { Component, OnInit } from '@angular/core';

import { MessageService } from '@app/core/services/message.service';

@Component({
  selector: 'lcs-stats',
  templateUrl: './stats.component.html',
})
export class StatsComponent implements OnInit {
  startDate: number;
  latestDate: number;
  daySpan: number;
  messageCount: number;

  constructor(public service: MessageService) {}

  ngOnInit() {
    this.startDate = this.service.getStartDate();
    this.latestDate = this.service.getLatestDate();
    this.daySpan = this.service.getDaySpan();
    this.messageCount = this.service.getMessageCount();
  }
}
