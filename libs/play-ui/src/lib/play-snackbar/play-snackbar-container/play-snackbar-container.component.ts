import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlaySnackbarComponent } from '../play-snackbar/play-snackbar.component';
import { PlaySnackbarStoreService } from '../play-snackbar-store.service';
import { Observable, map, shareReplay } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { PlaySnackbarRef } from '../play-snackbar-ref.interface';
import { fadeAnimation } from '../../play-animations/fade.animation';

@Component({
  selector: 'play-snackbar-container',
  templateUrl: './play-snackbar-container.component.html',
  styleUrls: ['./play-snackbar-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe, PlaySnackbarComponent],
  animations: [fadeAnimation],
})
export class PlaySnackbarContainerComponent {
  snackbars$: Observable<{
    topLeft: PlaySnackbarRef[];
    topCenter: PlaySnackbarRef[];
    topRight: PlaySnackbarRef[];
    centerLeft: PlaySnackbarRef[];
    centerCenter: PlaySnackbarRef[];
    centerRight: PlaySnackbarRef[];
    bottomLeft: PlaySnackbarRef[];
    bottomCenter: PlaySnackbarRef[];
    bottomRight: PlaySnackbarRef[];
  }>;

  onDismiss(snackbar: PlaySnackbarRef) {
    this.snackbarStore.remove(snackbar);
  }

  constructor(private snackbarStore: PlaySnackbarStoreService) {
    this.snackbars$ = this.snackbarStore.snackbars$.pipe(
      map((snackbars) => {
        return snackbars.reduce(
          (acc, snackbar) => {
            switch (snackbar.position) {
              case 'top-left':
                acc.topLeft.push(snackbar);
                break;
              case 'top-center':
                acc.topCenter.push(snackbar);
                break;
              case 'top-right':
                acc.topRight.push(snackbar);
                break;
              case 'center-left':
                acc.centerLeft.push(snackbar);
                break;
              case 'center-center':
                acc.centerCenter.push(snackbar);
                break;
              case 'center-right':
                acc.centerRight.push(snackbar);
                break;
              case 'bottom-left':
                acc.bottomLeft.push(snackbar);
                break;
              case 'bottom-center':
                acc.bottomCenter.push(snackbar);
                break;
              case 'bottom-right':
                acc.bottomRight.push(snackbar);
                break;
            }
            return acc;
          },
          {
            topLeft: [],
            topCenter: [],
            topRight: [],
            centerLeft: [],
            centerCenter: [],
            centerRight: [],
            bottomLeft: [],
            bottomCenter: [],
            bottomRight: [],
          },
        );
      }),
      shareReplay(1),
    );
  }
}
