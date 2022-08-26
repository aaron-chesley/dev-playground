import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { BasePortalOutlet, ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayModalAlertData } from './play-modal-alert/play-modal-alert-data.interface';
import { PlayModalAlertComponent } from './play-modal-alert/play-modal-alert.component';
import { PlayModalConfirmData } from './play-modal-confirm/play-modal-confirm-data.interface';
import { PlayModalConfirmComponent } from './play-modal-confirm/play-modal-confirm.component';
import { PlayModalModule } from './play-modal.module';

@Injectable({ providedIn: PlayModalModule })
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
    const ref = this.dialog.open<
      boolean,
      PlayModalConfirmData,
      PlayModalConfirmComponent
    >(PlayModalConfirmComponent, {
      disableClose: true,
      hasBackdrop: true,
      height: '200px',
      width: '400px',
      data: data,
    });
    return ref.closed as Observable<boolean>;
  }

  custom<TComponent, TData, TResult>(
    component: ComponentType<TComponent>,
    config: DialogConfig<
      TData,
      DialogRef<TResult, TComponent>,
      BasePortalOutlet
    > = {}
  ): DialogRef<TResult, TComponent> {
    return this.dialog.open(component, config);
  }

  constructor(private dialog: Dialog) {}
}
