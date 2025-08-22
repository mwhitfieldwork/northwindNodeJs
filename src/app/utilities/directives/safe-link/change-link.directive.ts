import { Directive, ElementRef, inject, Input } from '@angular/core';

@Directive({
  selector: '[appChangeLink]',
  standalone: true,
  host: {
    '(click)': 'onClick($event)'
  }
})
export class ChangeLinkDirective {

  @Input() queryParam = 'northwind'; 
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef); //you can inject the element itself

  onClick($event:MouseEvent):void {
    const isReadytoContinue= window.confirm('Are you sure you want to leave?');

    if(isReadytoContinue) {
      const address = this.hostElementRef.nativeElement.href;
      this.hostElementRef.nativeElement.href = address + '?from=' + this.queryParam;

      return;
    }else{
      $event.preventDefault();
    }

  }

}
