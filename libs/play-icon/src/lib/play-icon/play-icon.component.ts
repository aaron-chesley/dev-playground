import { DOCUMENT } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ElementRef,
  Optional,
  Inject,
} from '@angular/core';
import { PlayIconRegistryService } from '../play-icon-registry.service';

@Component({
  selector: 'play-icon',
  templateUrl: './play-icon.component.html',
  styleUrls: ['./play-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayIconComponent {
  private svgIcon!: SVGElement;

  @Input()
  set name(iconName: string) {
    if (this.svgIcon) {
      this.element.nativeElement.removeChild(this.svgIcon);
    }
    const svgData = this.playIconRegistry.getIcon(iconName);
    this.svgIcon = this.svgElementFromString(svgData);
    this.element.nativeElement.appendChild(this.svgIcon);
  }

  constructor(
    private element: ElementRef,
    private playIconRegistry: PlayIconRegistryService,
    @Optional() @Inject(DOCUMENT) private document: any
  ) {}

  private svgElementFromString(svgContent: string | undefined): SVGElement {
    const div = this.document.createElement('DIV');
    div.innerHTML = svgContent;
    return (
      div.querySelector('svg') ||
      this.document.createElementNS('http://www.w3.org/2000/svg', 'path')
    );
  }
}
