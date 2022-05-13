import { DOCUMENT } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ElementRef,
  Optional,
  Inject,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { PlayIconRegistryService } from '../play-icon-registry.service';

@Component({
  selector: 'play-icon',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayIconComponent implements OnChanges {
  private svgIcon!: SVGElement;

  @Input() name = '';
  @Input() color = '';
  @Input() size: number | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.name || changes.size) {
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
