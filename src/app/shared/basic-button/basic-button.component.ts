import { Component, ContentChild, ElementRef } from '@angular/core';

@Component({
  selector: '[appButton], a[appButton]', //not limited tot he tag selector. It is possible re-purpose with other tags ( button and anchor) 
  standalone: true,
  imports: [],
  templateUrl: './basic-button.component.html',
  styleUrl: './basic-button.component.scss'
})
export class BasicButtonComponent {
  //Getting access the Dom exposed by content  projection
  @ContentChild('icon') icon!: ElementRef<HTMLElement>

}
