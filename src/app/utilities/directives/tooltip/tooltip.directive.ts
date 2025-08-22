import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText!: string;
  private tooltipElement!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.setHostPositionRelative();
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip();
  }
  private setHostPositionRelative() {
    const position = window.getComputedStyle(this.el.nativeElement).position;
    if (position === 'static' || !position) {
      this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    }
  }


  private showTooltip() {
    this.tooltipElement = this.renderer.createElement('span');
    this.renderer.appendChild(
      this.tooltipElement,
      this.renderer.createText(this.tooltipText)
    );
    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipElement, 'background', 'rgb(243 232 198)');
    this.renderer.setStyle(this.tooltipElement, 'color', '#000');
    this.renderer.setStyle(this.tooltipElement, 'fontSize', '.75rem');
    this.renderer.setStyle(this.tooltipElement, 'padding', '5px');
    this.renderer.setStyle(this.tooltipElement, 'borderRadius', '5px');
    this.renderer.setStyle(this.tooltipElement, 'top', `${this.el.nativeElement.offsetTop - 60}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${this.el.nativeElement.offsetLeft + 50}px`);
    this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);

      // Create the tooltip arrow (triangle)
    const arrow = this.renderer.createElement('span');
    this.renderer.setStyle(arrow, 'position', 'absolute');
    this.renderer.setStyle(arrow, 'bottom', '-5px'); // Adjust to place the triangle below the tooltip
    this.renderer.setStyle(arrow, 'left', '10px'); // Place it towards the lower left
    this.renderer.setStyle(arrow, 'width', '0');
    this.renderer.setStyle(arrow, 'height', '0');
    this.renderer.setStyle(arrow, 'borderLeft', '7px solid transparent');
    this.renderer.setStyle(arrow, 'borderRight', '7px solid transparent');
    this.renderer.setStyle(arrow, 'borderTop', '7px solid rgb(243 232 198)'); // Creates the triangle pointing upwards

  // Append the arrow to the tooltip
  this.renderer.appendChild(this.tooltipElement, arrow);


    // Adjust the tooltip position
    const parentRect = this.el.nativeElement.getBoundingClientRect();
    //this.renderer.setStyle(this.tooltipElement, 'top', `${parentRect.top - this.tooltipElement.offsetHeight}px`);
    //this.renderer.setStyle(this.tooltipElement, 'left', `${parentRect.left}px`);
  }
  private hideTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
    }
  }

}
