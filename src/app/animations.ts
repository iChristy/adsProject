import {animate, state, style, transition, trigger} from '@angular/animations';

export const elementShow = trigger('triggerElementShow', [
  transition(':enter', [style({
    opacity: 0
  }), animate(300)]),
  transition(':leave', [style({opacity: 0}), animate(300)]),
]);
