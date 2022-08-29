import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayModalService } from '../play-modal.service';
import { PlayModalModule } from '../play-modal.module';

@Component({
  selector: 'play-custom-showcase',
  template: `<div class="container">
    <span>Play Custom Showcase Works!</span
    ><button (click)="openModal()">Open Another Modal</button>
  </div>`,
  styles: [
    `
      .container {
        height: 300px;
        width: 200px;
        background: white;
        padding: 20px;
        border-radius: 4px;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule, PlayModalModule],
})
export class PlayCustomShowcaseComponent {
  openModal() {
    this.playModalService.alert({
      alertBody: 'Are you sure you want to do that?',
    });
  }
  constructor(private playModalService: PlayModalService) {}
}
