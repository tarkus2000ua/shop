import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  private color: string;
  highlightColor = 'yellow';

  @HostListener('mouseenter') onMouseEnter(): void {
    this.color = this.highlightColor;
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.color = 'transparent';
  }

  @HostBinding('style.backgroundColor') get backgroundColor(): string {
    return this.color;
  }

  constructor() { }

}
