import { CommonModule, DOCUMENT } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ElementRef,
  Optional,
  Inject,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
  HostBinding,
} from '@angular/core';
import { PlayIconRegistryService } from './play-icon-registry.service';

@Component({
  selector: 'play-icon',
  template: ``,
  styles: [
    `
      .play-icon {
        display: flex;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule],
})
export class PlayIconComponent implements OnChanges {
  @HostBinding('class') className = 'play-icon';
  private svgIcon!: SVGElement;

  @Input() name = '';
  @Input() color = '';
  @Input() size: number | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.name || changes.size || changes.color) {
      if (this.svgIcon) {
        this.element.nativeElement.removeChild(this.svgIcon);
      }
      const svgData = this.playIconRegistry.getIcon(this.name);
      this.svgIcon = this.svgElementFromString(svgData);

      if (this.size) {
        const size = this.size.toString();
        this.svgIcon.setAttribute('height', size);
        this.svgIcon.setAttribute('width', size);
      }

      this.svgIcon.setAttribute('fill', 'currentColor');
      if (this.color) {
        this.svgIcon.setAttribute('color', this.color);
      }

      this.element.nativeElement.appendChild(this.svgIcon);
    }
  }

  constructor(
    private element: ElementRef,
    private playIconRegistry: PlayIconRegistryService,
    @Optional() @Inject(DOCUMENT) private document: Document
  ) {}

  private svgElementFromString(svgContent: string | undefined): SVGElement {
    const div = this.document.createElement('DIV');
    div.innerHTML = svgContent ?? '';
    return (
      div.querySelector('svg') ||
      this.document.createElementNS('http://www.w3.org/2000/svg', 'path')
    );
  }
}
