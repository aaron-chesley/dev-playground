import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayDrawerMode } from '../play-drawer-mode.interface';

@Component({
  selector: 'play-sidenav-showcase',
  templateUrl: './play-sidenav-showcase.component.html',
  styleUrls: ['./play-sidenav-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaySidenavShowcaseComponent {
  opened = true;
  hasBackdrop = true;
  disableClose = true;
  mode: PlayDrawerMode = 'over';

  onBackdropClick() {
    this.opened = false;
  }
}
