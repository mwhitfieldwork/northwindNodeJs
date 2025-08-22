import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true,
  host: {
    '(click)': 'onLog($event)'
  }

})
export class LogDirective {
private elementRef = inject(ElementRef);
  onLog(){
    console.log(this.elementRef.nativeElement);
  }
}
