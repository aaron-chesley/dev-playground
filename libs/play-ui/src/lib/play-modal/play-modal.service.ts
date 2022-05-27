import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PlayModalLoaderService } from './play-modal-loader.service';
import { PlayModalAlertData } from './play-modal-alert/play-modal-alert-data.interface';
import { PlayModalAlertComponent } from './play-modal-alert/play-modal-alert.component';
import { PlayModalConfirmData } from './play-modal-confirm/play-modal-confirm-data.interface';
import { PlayModalConfirmComponent } from './play-modal-confirm/play-modal-confirm.component';
import { PlayModalCustomComponent } from './play-modal-custom/play-modal-custom.component';

@Injectable({ providedIn: 'root' })
export class PlayModalService {
  alert(data: PlayModalAlertData): void {
    this.dialog.open(PlayModalAlertComponent, {
      disableClose: true,
      hasBackdrop: true,
      height: '200px',
      width: '400px',
      data: data,
    });
  }

  confirm(data: PlayModalConfirmData): Observable<boolean> {
    const ref = this.dialog.open(PlayModalConfirmComponent, {
      disableClose: true,
      hasBackdrop: true,
      height: '200px',
      width: '400px',
      data: data,
    });

    return ref.afterClosed();
  }

  custom<T>(component: ComponentType<T>): MatDialogRef<T> {
    return this.dialog.open(component);
  }

  constructor(
    private dialog: MatDialog,
    private playModalLoaderService: PlayModalLoaderService
  ) {
    this.playModalLoaderService.loadStyles(PlayModalCustomComponent);
  }
}
