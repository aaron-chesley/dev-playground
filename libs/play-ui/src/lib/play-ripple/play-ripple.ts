import { ElementRef, HostListener, Renderer2 } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({ selector: '[playRipple]', standalone: true })
export class PlayRippleDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const ripple = this.renderer.createElement('div');
    this.renderer.addClass(ripple, 'ripple');

    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const size = Math.max(
      this.elementRef.nativeElement.clientWidth,
      this.elementRef.nativeElement.clientHeight
    );

    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    this.renderer.setStyle(ripple, 'left', `${x}px`);
    this.renderer.setStyle(ripple, 'top', `${y}px`);
    this.renderer.setStyle(ripple, 'width', `${size}px`);
    this.renderer.setStyle(ripple, 'height', `${size}px`);

    this.renderer.appendChild(this.elementRef.nativeElement, ripple);

    this.renderer.addClass(ripple, 'ripple-effect');
    setTimeout(() => {
      this.renderer.removeChild(this.elementRef.nativeElement, ripple);
    }, 1000);
  }
}
