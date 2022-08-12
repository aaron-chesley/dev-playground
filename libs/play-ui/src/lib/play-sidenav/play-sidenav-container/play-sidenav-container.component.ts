import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { PlayDrawerMode } from '../play-drawer-mode.interface';

@Component({
  selector: 'play-sidenav-container',
  templateUrl: './play-sidenav-container.component.html',
  styleUrls: ['./play-sidenav-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PlaySidenavContainerComponent {
  @HostBinding('class.play-sidenav-container') showClass = true;

  @Input() opened = false;
  @Input() hasBackdrop = false;
  @Input() disableClose = false;
  @Input() mode: PlayDrawerMode = 'side';
  position: 'start' | 'end' = 'start';

  @Output() backdropClick = new EventEmitter<void>();
}
