export interface PlayNotificationAction {
  /** A string identifying a user action to be displayed on the notification. */
  action: string;
  /** A string containing action text to be shown to the user. */
  title: string;
  /** A string containing the URL of an icon to display with the action. */
  icon: string;
}

export interface PlayNotificationOptions extends NotificationOptions {
  actions?: PlayNotificationAction[];
}

export interface PlayNotificationPayload {
  title: string;
  options: PlayNotificationOptions;
}

export interface PlayNotificationActionClick {
  action: string;
  notification: PlayNotificationOptions & { title: string };
}
