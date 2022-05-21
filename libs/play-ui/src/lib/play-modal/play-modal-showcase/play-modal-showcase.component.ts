import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayModalService } from '../play-modal.service';

@Component({
  selector: 'play-modal-showcase',
  templateUrl: './play-modal-showcase.component.html',
  styleUrls: ['./play-modal-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayModalShowcaseComponent {
  showAlert() {
    this.playModalService.alert();
  }
  constructor(private playModalService: PlayModalService) {}
}
