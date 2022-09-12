import {
  HostBinding,
  Input,
  SimpleChanges,
  ElementRef,
  Renderer2,
  OnInit,
  OnChanges,
  Directive,
} from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { PlayLoadingStylesService } from './play-loading-style.service';

@Directive({
  selector: '[playLoading]',
  standalone: true,
})
export class PlayLoadingDirective implements OnInit, OnChanges {
  @HostBinding('style.position')
  hostPosition = 'relative';

  @Input() playLoading = false;

  uid: string;

  constructor(
    private targetEl: ElementRef,
    private renderer: Renderer2,
    private playLoadingStylesService: PlayLoadingStylesService
  ) {}

  ngOnInit() {
    this.uid = 'loading-container-' + uuidv4();

    const loadingContainer = this.renderer.createElement('div');
    this.renderer.setStyle(
      loadingContainer,
      'display',
      this.playLoading ? 'flex' : 'none'
    );
    this.renderer.setStyle(loadingContainer, 'justify-content', 'center');
    this.renderer.setStyle(loadingContainer, 'align-items', 'center');
    this.renderer.addClass(loadingContainer, this.uid);
    this.renderer.setStyle(loadingContainer, 'position', 'absolute');
    this.renderer.setStyle(loadingContainer, 'top', '0');
    this.renderer.setStyle(loadingContainer, 'left', '0');
    this.renderer.setStyle(loadingContainer, 'background', 'black');
    this.renderer.setStyle(loadingContainer, 'opacity', '0.3');
    this.renderer.setStyle(loadingContainer, 'width', '100%');
    this.renderer.setStyle(loadingContainer, 'height', '100%');

    // custom spinner -- start
    const spinnerContainer = this.renderer.createElement('div');
    this.renderer.addClass(spinnerContainer, 'play-loader');
    const spinnerInnerDiv1 = this.renderer.createElement('div');
    const spinnerInnerDiv2 = this.renderer.createElement('div');
    const spinnerInnerDiv3 = this.renderer.createElement('div');

    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv1);
    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv2);
    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv3);

    this.renderer.appendChild(loadingContainer, spinnerContainer);
    // custom spinner -- end

    this.renderer.appendChild(this.targetEl.nativeElement, loadingContainer);
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.appLoading) {
      const container = this.targetEl.nativeElement;
      const div = container.querySelector('.' + this.uid);
      if (div) {
        this.renderer.setStyle(
          div,
          'display',
          this.playLoading ? 'flex' : 'none'
        );
      }
    }
  }
}
