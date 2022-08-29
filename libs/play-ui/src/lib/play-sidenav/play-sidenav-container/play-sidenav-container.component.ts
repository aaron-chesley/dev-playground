import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PlayDrawerMode } from '../play-drawer-mode.interface';

@Component({
  selector: 'play-sidenav-container',
  templateUrl: './play-sidenav-container.component.html',
  styleUrls: ['./play-sidenav-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, MatSidenavModule],
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
