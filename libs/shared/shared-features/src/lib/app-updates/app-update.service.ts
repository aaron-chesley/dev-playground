import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { PlaySnackbarService } from '@playground/play-ui';

@Injectable({
  providedIn: 'root',
})
export class AppUpdateService {
  constructor(updates: SwUpdate, snackbar: PlaySnackbarService) {
    updates.versionUpdates.subscribe((evt) => {
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version: ${evt.version.hash}`);
          break;
        case 'VERSION_READY':
          console.log(`Current app version: ${evt.currentVersion.hash}`);
          console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
          snackbar.open({
            title: 'New version available',
            message: 'Refresh the page to apply new version',
            actionLabel: 'Refresh',
            dismissible: false,
            duration: 0,
            action: () => window.location.reload(),
          });
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
          snackbar.open({ title: 'New version failed to install', message: 'Please try again', duration: 5000 });
          break;
      }
    });
  }
}
