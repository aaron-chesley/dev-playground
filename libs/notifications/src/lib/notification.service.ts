import { Injectable } from '@angular/core';
import { NotificationPayload } from './notification-payload.interface';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  sendNotification(payload: NotificationPayload): void {
    if (this.getPermissionLevel() === 'denied') {
      return;
    }
    if (this.getPermissionLevel() === 'default') {
      alert(
        'Permission to show notifications not granted. Please review your settings'
      );
      return;
    }
    navigator.serviceWorker.ready.then((serviceWorker) => {
      serviceWorker.showNotification(payload.title, payload.options);
    });
  }

  async requestPermission(): Promise<NotificationPermission> {
    return new Promise((resolve, reject) => {
      const permissionResult = Notification.requestPermission((result) =>
        resolve(result)
      );

      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    });
  }

  isSupported(): boolean {
    if (!('Notification' in window)) {
      return false;
    }
    return true;
  }

  getPermissionLevel(): NotificationPermission {
    return Notification.permission;
  }
}
