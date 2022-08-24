import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { PlayNotificationService } from '@playground/play-ui';
import { AppNotificationMap } from './app-notification';

@Component({
  selector: 'playground-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  sendNotification() {
    this.notificationService.sendNotification(
      AppNotificationMap['INCOMING_CALL']
    );
  }

  requestNotificationPermission() {
    this.notificationService.requestPermission();
  }

  constructor(
    private notificationService: PlayNotificationService,
    private swPush: SwPush
  ) {
    this.swPush.notificationClicks.subscribe((res) => {
      console.log('Action Clicked:', res.action);
    });
  }
}
