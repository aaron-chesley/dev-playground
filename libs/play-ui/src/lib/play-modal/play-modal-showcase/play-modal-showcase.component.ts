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
    this.playModalService.alert();
  }

  ngOnInit(): void {
    this.showAlert();
  }
  constructor(private playModalService: PlayModalService) {}
}
