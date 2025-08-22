import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appSafelink]',
  standalone: true,
  host: {
    '(click)': 'onClick($event)'
  }
})
export class SafelinkDirective {
  @Input() queryParam = 'northwind'; //we set this in the template  where the directive is used

  onClick($event:MouseEvent):void {
    const isReadytoContinue= window.confirm('Are you sure you want to leave?');

    if(isReadytoContinue) {
      //typecast the event into a html anchor
      const address = ($event.target as HTMLAnchorElement).href;
      ($event.target as HTMLAnchorElement).href = address + '?from=' + this.queryParam;

    }else{
      $event.preventDefault();
    }

  }

}
