import { Message } from '@app/core/interfaces/message';

export interface Stats {
  authors: Array<string>;

  startDate: number;
  latestDate: number;
  daySpan: number;

  numberOfMessages: number;
  numberOfMessageDays: number;
  numberOfNoMessageDays: number;

  longestStreak: {
    begin: number;
    daySpan: number;
    end: number;
  };

  mostMessages: {
    count: number;
    day: number;
  };

  stickers: {
    [author: string]: number;
  };

  pictures: {
    [author: string]: number;
  };

  videos: {
    [author: string]: number;
  };

  urls: {
    [domain: string]: number;
  };

  calls: {
    duration: number;
    longest: number;
    longestDay: number;
    numberOfCalls: number;
  };

  days: {
    [day: number]: {
      authors: {
        [author: string]: {
          messages: Array<Message>;
          stickers: number;
          pictures: number;
          videos: number;
        };
      };
      calls: {
        count: number;
        number: number;
      };
    };
  };

  yearMonths: {
    [yearMonth: number]: number;
  };

  months: {
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

  weekdays: {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
  };

  hours: {
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
}

export const initialStats: Stats = {
  authors: [],
  calls: {
    duration: 0,
    longest: 0,
    longestDay: 0,
    numberOfCalls: 0,
  },
  daySpan: 0,
  days: {},
  hours: {
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
  },
  latestDate: 0,
  longestStreak: {
    begin: 0,
    daySpan: 0,
    end: 0,
  },
  months: {
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
  },
  mostMessages: {
    count: 0,
    day: 0,
  },
  numberOfMessageDays: 0,
  numberOfMessages: 0,
  numberOfNoMessageDays: 0,
  pictures: {},
  startDate: 0,
  stickers: {},
  urls: {},
  videos: {},
  weekdays: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  },
  yearMonths: {},
};
