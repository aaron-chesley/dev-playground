import { PlaySnackbarPosition } from './play-snackbar-position.type';
import { PlaySnackbarSeverity } from './play-snackbar-severity.type';

export interface PlaySnackbarConfig {
  title?: string;
  message?: string;
  severity?: PlaySnackbarSeverity;
  duration?: number;
  position?: PlaySnackbarPosition;
  dismissible?: boolean;
}
