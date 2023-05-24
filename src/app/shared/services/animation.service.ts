import { animate, query, stagger, state, style, transition, trigger } from "@angular/animations"


export const fade = trigger('fade', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('400ms ease-out', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    animate('400ms ease-out', style({ opacity: 0 }))
  ])
]);

export let slide = trigger('slide', [
  transition(':enter', [
      style({ transform: 'translateX(-500px' }),
      animate('300ms 200ms')
  ]),    
  transition(':leave', [
      animate(5000, style({ transform: 'translateX(-100px' }))
  ])
])

export const slideRight = trigger('slideRight', [
  transition('* <=> *', [
      query(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        stagger('100ms', animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })))
      ], { optional: true })
    ])
]);

export const slideLeft = trigger('slideLeft', [
  transition('* <=> *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateX(-100%)' }),
      stagger('200ms', animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })))
    ], { optional: true })
  ])
]);

export const lightUp = 
trigger('lightUp', [
  state('green-start', style({ backgroundColor: '#e0fedd' })),
  transition('green-start => end', animate('500ms ease-in')),    
  
  state('red-start', style({ backgroundColor: '#fedddd' })),
  transition('red-start => end', animate('500ms ease-in')),
])

export const shrinkFont = trigger('shrinkFont', [
  state('initial', style({
    fontSize: '20px'
  })),
  state('shrunken', style({
    fontSize: '15px'
  })),
  transition('initial => shrunken', [
    animate('100ms', style({ fontSize: '18px' })),
    animate('100ms', style({ fontSize: '15px' }))
  ]),
  transition('shrunken => initial', [
    animate('100ms', style({ fontSize: '18px' })),
    animate('100ms', style({ fontSize: '20px' }))
  ])
]);

export const enlargeFont = trigger('enlargeFont', [
  state('initial', style({
    fontSize: '20px'
  })),
  state('enlarged', style({
    fontSize: '25px'
  })),
  transition('initial => enlarged', [
    animate('100ms', style({ fontSize: '22px' })),
    animate('100ms', style({ fontSize: '25px' }))
  ]),
  transition('enlarged => initial', [
    animate('100ms', style({ fontSize: '22px' })),
    animate('100ms', style({ fontSize: '20px' }))
  ])
]);  


