import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlayModalAlertData } from './play-modal-alert/play-modal-alert-data.interface';
import { PlayModalAlertComponent } from './play-modal-alert/play-modal-alert.component';

@Injectable({ providedIn: 'root' })
export class PlayModalService {
  alert(data: PlayModalAlertData) {
    return this.dialog.open(PlayModalAlertComponent, {
      hasBackdrop: true,
      height: '200px',
      width: '400px',
      data: data,
    });
  }

  constructor(private dialog: MatDialog) {}
}
