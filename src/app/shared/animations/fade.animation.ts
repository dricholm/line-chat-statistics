import { trigger, style, animate, transition } from '@angular/animations';

export function fade(duration: string) {
  return trigger('fade', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(duration, style({ opacity: 1 })),
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate(duration, style({ opacity: 0 })),
    ]),
  ]);
}
