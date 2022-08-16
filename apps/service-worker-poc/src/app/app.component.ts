import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NotificationService } from '@dev-playground/notifications';

@Component({
  selector: 'dev-playground-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  sendNotification() {
    this.notificationService.sendNotification('Incoming WebRTC Call', {
      actions: [
        {
          title: 'Answer Call',
          action: 'ANSWER_CALL',
        },
        {
          title: 'Reject Call',
          action: 'REJECT_CALL',
        },
      ],
      data: {
        onActionClick: {
          ANSWER_CALL: {
            operation: 'focusLastFocusedOrOpen',
          },
        },
      },
    });
  }

  requestNotificationPermission() {
    this.notificationService.requestPermission().then((res) => {
      if (res === 'granted') {
        alert('Notifications are enabled!');
      } else if (res === 'denied') {
        alert(
          'You have denied permission to show notifications. You will need to review browser settings to change this later https://support.google.com/chrome/answer/3220216?hl=en&co=GENIE.Platform%3DDesktop'
        );
      }
    });
  }

  constructor(private notificationService: NotificationService) {}
}
