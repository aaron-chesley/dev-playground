import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayDrawerMode } from '../play-drawer-mode.interface';
import { PlaySidenavContainerComponent } from '../play-sidenav-container/play-sidenav-container.component';
import { PlaySidenavContentComponent } from '../play-sidenav-content/play-sidenav-content.component';
import { PlaySidenavComponent } from '../play-sidenav/play-sidenav.component';

@Component({
  selector: 'play-sidenav-showcase',
  templateUrl: './play-sidenav-showcase.component.html',
  styleUrls: ['./play-sidenav-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    PlaySidenavContainerComponent,
    PlaySidenavComponent,
    PlaySidenavContentComponent,
  ],
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
