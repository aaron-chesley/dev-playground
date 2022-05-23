import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayModalAlertData } from './play-modal-alert/play-modal-alert-data.interface';
import { PlayModalAlertComponent } from './play-modal-alert/play-modal-alert.component';
import { PlayModalConfirmData } from './play-modal-confirm/play-modal-confirm-data.interface';
import { PlayModalConfirmComponent } from './play-modal-confirm/play-modal-confirm.component';

@Injectable({ providedIn: 'root' })
export class PlayModalService {
  alert(data: PlayModalAlertData): void {
    this.dialog.open(PlayModalAlertComponent, {
      hasBackdrop: true,
      height: '200px',
      width: '400px',
      data: data,
    });
  }

  confirm(data: PlayModalConfirmData): Observable<boolean> {
    const ref = this.dialog.open(PlayModalConfirmComponent, {
      hasBackdrop: true,
      height: '200px',
      width: '400px',
      data: data,
    });

    return ref.afterClosed();
  }

  constructor(private dialog: MatDialog) {}
}
