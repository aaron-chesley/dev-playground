import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayModalAlertData } from './play-modal-alert/play-modal-alert-data.interface';
import { PlayModalAlertComponent } from './play-modal-alert/play-modal-alert.component';
import { PlayModalConfirmData } from './play-modal-confirm/play-modal-confirm-data.interface';
import { PlayModalConfirmComponent } from './play-modal-confirm/play-modal-confirm.component';
import { PlayModalCustomComponent } from './play-modal-custom/play-modal-custom.component';
import { PlayModalLoaderService } from './play-modal-loader.service';

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

  confirm(data: PlayModalConfirmData): Observable<unknown> {
    const ref = this.dialog.open(PlayModalConfirmComponent, {
      disableClose: true,
      hasBackdrop: true,
      height: '200px',
      width: '400px',
      data: data,
    });

    return ref.closed;
  }

  custom<T>(component: ComponentType<T>): DialogRef<unknown, T> {
    return this.dialog.open(component);
  }

  constructor(
    private dialog: Dialog,
    private playModalLoaderService: PlayModalLoaderService
  ) {
    this.playModalLoaderService.loadStyles(PlayModalCustomComponent);
  }
}
