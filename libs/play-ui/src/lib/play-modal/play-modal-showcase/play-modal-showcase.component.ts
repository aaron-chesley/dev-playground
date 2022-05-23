import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { PlayModalService } from '../play-modal.service';

@Component({
  selector: 'play-modal-showcase',
  templateUrl: './play-modal-showcase.component.html',
  styleUrls: ['./play-modal-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayModalShowcaseComponent implements OnInit {
  @Input() disableBackdropClose = false;

  showAlert() {
    this.playModalService.alert({
      alertBody: 'That operation is not allowed.',
    });
  }

  showConfirm() {
    const x = this.playModalService.confirm({
      confirmBody: 'Are you sure you want to do that?',
    });

    x.subscribe((res) => console.log('res: ', res));
  }

  ngOnInit(): void {
    this.showConfirm();
  }
  constructor(private playModalService: PlayModalService) {}
}
