import { Component } from '@angular/core';
import { PlayModalService } from '../play-modal.service';

@Component({
  selector: 'play-custom-showcase',
  template: `<div class="container">
    <span>Play Custom Showcase Works!</span
    ><button (click)="openModal()">Open Another Modal</button>
  </div>`,
  styles: [
    `
      .container {
        height: 400px;
        width: 200px;
      }
    `,
  ],
})
export class PlayCustomShowcaseComponent {
  openModal() {
    this.playModalService.alert({
      alertBody: 'Are you sure you want to do that?',
    });
  }
  constructor(private playModalService: PlayModalService) {}
}
