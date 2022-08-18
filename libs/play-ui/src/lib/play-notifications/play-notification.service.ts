import { Injectable } from '@angular/core';
import { PlayNotificationPayload } from './play-notification-payload.interface';

@Injectable({ providedIn: 'root' })
export class PlayNotificationService {
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

    const useServiceWorker = await this.shouldUseServiceWorker();

    if (useServiceWorker) {
      const serviceWorker = await navigator.serviceWorker.ready;
      serviceWorker.showNotification(payload.title, payload.options);
    } else {
      // Fallback to Notifications API without actions
      const notification = new Notification(payload.title);
      notification.onclick = () => window.focus();
    }
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

  async shouldUseServiceWorker(): Promise<boolean> {
    if (!('serviceWorker' in navigator)) {
      // Browser doesn't support service workers
      return false;
    }

    // Check if there is a service worker registered and active:
    const swRegistration = await navigator.serviceWorker.getRegistration();

    return (
      !!swRegistration &&
      !!swRegistration.active &&
      swRegistration.active.state === 'activated'
    );
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
