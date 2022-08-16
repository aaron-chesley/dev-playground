import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'dev-playground-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'service-worker-poc';

  ngOnInit() {
    this.swPush.notificationClicks.subscribe((res) =>
      console.log('click:', res)
    );
    Notification.requestPermission().then((res) => {
      navigator.serviceWorker;
      navigator.serviceWorker.ready.then((registration) => {
        navigator.serviceWorker;
        console.log('registration: ', registration);
        registration.showNotification('Notification With Service Worker', {
          actions: [
            {
              title: 'Answer Call',
              action: 'ANSWER_CALL',
            },
          ],
        });
      });
    });
  }

  constructor(private swPush: SwPush) {}
}
