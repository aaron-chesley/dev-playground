import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  sendNotification(title: string, options: NotificationOptions): void {
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
      serviceWorker.showNotification(title, options);
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

  constructor(private swPush: SwPush) {
    this.swPush.notificationClicks.subscribe((res) => {
      console.log('Notification Clicked:', res);
    });
  }
}
