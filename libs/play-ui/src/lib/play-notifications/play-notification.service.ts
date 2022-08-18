import { Injectable } from '@angular/core';
import { PlayNotificationPayload } from './play-notification-payload.interface';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  async sendNotification(payload: PlayNotificationPayload): Promise<void> {
    if (this.getPermissionLevel() === 'denied') {
      return;
    }
    if (this.getPermissionLevel() === 'default') {
      const showNotifications = confirm(
        'We need permission to show notifications. If this is what you want click "OK"'
      );

      if (showNotifications) {
        const permissionGranted = await this.requestPermission();

        if (permissionGranted !== 'granted') {
          return;
        }
      }
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
