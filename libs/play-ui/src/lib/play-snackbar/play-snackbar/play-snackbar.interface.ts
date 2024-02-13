import { PlaySnackbarSeverity } from '../play-snackbar-severity.type';

export interface PlaySnackbar {
  title?: string;
  message?: string;
  severity?: PlaySnackbarSeverity;
  dismissible?: boolean;
}
