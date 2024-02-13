import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { PlaySnackbarContainerComponent } from './play-snackbar-container/play-snackbar-container.component';
import { PlaySnackbarStoreService } from './play-snackbar-store.service';
import { PlaySnackbarConfig } from './play-snackbar-config.interface';
import { PlaySnackbarRef } from './play-snackbar-ref.interface';

@Injectable({ providedIn: 'root' })
export class PlaySnackbarService {
  private overlayRef: OverlayRef;

  open(snackbar: PlaySnackbarConfig): PlaySnackbarRef {
    const config: PlaySnackbarConfig = {
      title: snackbar.title || '',
      message: snackbar.message || '',
      severity: snackbar.severity || 'info',
      duration: snackbar.duration ?? 3000,
      position: snackbar.position || 'bottom-center',
      dismissible: snackbar.dismissible || snackbar.duration === 0 || false,
    };

    return this.snackbarStore.add(config);
  }

  openAll(snackbars: PlaySnackbarConfig[]): PlaySnackbarRef[] {
    return snackbars.map((snackbar) => this.open(snackbar));
  }

  close(snackbar: PlaySnackbarRef): void {
    this.snackbarStore.remove(snackbar);
  }

  closeAll(): void {
    this.snackbarStore.removeAll();
  }

  constructor(
    private overlay: Overlay,
    private snackbarStore: PlaySnackbarStoreService,
  ) {
    this.overlayRef = this.overlay.create({
      hasBackdrop: false,
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
    });

    const snackBarContainerPortal = new ComponentPortal(PlaySnackbarContainerComponent);
    this.overlayRef.attach(snackBarContainerPortal);
  }
}
