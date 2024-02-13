import { Subject } from 'rxjs';
import { PlaySnackbarConfig } from './play-snackbar-config.interface';

export interface PlaySnackbarRef extends PlaySnackbarConfig {
  id: string;
  close: () => void;
  closed$: Subject<void>;
}
