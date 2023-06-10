import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PlayRippleService {
  private renderer: Renderer2;
  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    const style = this.renderer.createElement('style');
    style.innerHTML = `
      .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgb(245, 245, 245, 0.7);
        transform: scale(0);
        animation: ripple-effect 0.3s linear;
        pointer-events: none;
      }

      @keyframes ripple-effect {
        0% {
          transform: scale(0);
        }
        100% {
          transform: scale(2);
          opacity: 0;
        }
      }
    `;
    this.renderer.selectRootElement('head', true).appendChild(style);
  }
}
