import { trigger, style, animate, transition } from '@angular/animations';

export function slide() {
  return trigger('slide', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(-1rem)' }),
      animate(
        '200ms 100ms ease-out',
        style({ opacity: 1, transform: 'translateX(0)' })
      ),
    ]),
    transition(':leave', [
      style({ opacity: 1, transform: 'translateX(0)' }),
      animate(
        '200ms ease-in',
        style({ opacity: 0, transform: 'translateX(4rem)' })
      ),
    ]),
  ]);
}
