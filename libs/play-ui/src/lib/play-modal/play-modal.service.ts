import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlayModalAlertComponent } from './play-modal-alert/play-modal-alert.component';

@Injectable({ providedIn: 'root' })
export class PlayModalService {
  alert() {
    return this.dialog.open(PlayModalAlertComponent, {
      hasBackdrop: true,
      height: '400px',
      width: '600px',
    });
  }

  constructor(private dialog: MatDialog) {}
}
