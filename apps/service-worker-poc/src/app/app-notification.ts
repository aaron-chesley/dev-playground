import { NotificationPayload } from '@dev-playground/notifications';

export enum AppNotification {
  INCOMING_CALL = 'INCOMING_CALL',
}

export const AppNotificationMap: {
  [key in AppNotification]: NotificationPayload;
} = {
  INCOMING_CALL: {
    title: 'Incoming Call',
    options: {
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
    },
  },
};
