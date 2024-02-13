import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { randomId } from '@playground/shared/util/id';
import { PlaySnackbarConfig } from './play-snackbar-config.interface';
import { PlaySnackbarRef } from './play-snackbar-ref.interface';

@Injectable({ providedIn: 'root' })
export class PlaySnackbarStoreService {
  private snackbarsSubject = new BehaviorSubject<PlaySnackbarRef[]>([]);
  snackbars$ = this.snackbarsSubject.asObservable();

  add(snackbar: PlaySnackbarConfig): PlaySnackbarRef {
    const newSnackBar: PlaySnackbarRef = {
      ...snackbar,
      id: randomId(),
      close: () => this.remove(newSnackBar),
      closed$: new Subject<void>(),
    };

    this.snackbarsSubject.next([...this.snackbarsSubject.value, newSnackBar]);

    if (snackbar.duration) {
      setTimeout(() => {
        this.remove(newSnackBar);
      }, snackbar.duration);
    }

    return newSnackBar;
  }

  remove(snackbar: PlaySnackbarRef) {
    try {
      this.snackbarsSubject.next(this.snackbarsSubject.value.filter((s) => s.id !== snackbar.id));
      snackbar.closed$.next();
      snackbar.closed$.complete();
    } catch (e) {
      console.error('Error removing snackbar', e);
    }
  }

  removeAll() {
    this.snackbarsSubject.next([]);
  }
}
