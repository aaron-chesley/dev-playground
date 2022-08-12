import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlayModalService } from '../play-modal.service';
import { PlayCustomShowcaseComponent } from './play-modal-custom-showcase.component';

@Component({
  selector: 'play-modal-showcase',
  templateUrl: './play-modal-showcase.component.html',
  styleUrls: ['./play-modal-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayModalShowcaseComponent {
  @Input() disableBackdropClose = false;

  showAlert() {
    this.playModalService.alert({
      alertBody: 'That operation is not allowed.',
    });
  }

  showConfirm() {
    this.playModalService.confirm({
      confirmBody: 'Are you sure you want to do that?',
    });
  }

  showCustom() {
    this.playModalService.custom(PlayCustomShowcaseComponent);
  }

  constructor(private playModalService: PlayModalService) {}
}
