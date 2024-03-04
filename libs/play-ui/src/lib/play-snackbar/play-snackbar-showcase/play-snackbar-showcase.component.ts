import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlaySnackbarService } from '../play-snackbar.service';
import { PlaySnackbarSeverity } from '../play-snackbar-severity.type';
import { PlaySnackbarPosition } from '../play-snackbar-position.type';
import { PlaySnackbarComponent } from '../play-snackbar/play-snackbar.component';
import { PlaySnackbar } from '../play-snackbar/play-snackbar.interface';

@Component({
  selector: 'play-snackbar-showcase',
  template: `
    <button (click)="showSnackbar('info', 'Info')">Show Info Snackbar</button>
    <button (click)="showSnackbar('success', 'Success')">Show Success Snackbar</button>
    <button (click)="showSnackbar('warning', 'Warning')">Show Warn Snackbar</button>
    <button (click)="showSnackbar('error', 'Error')">Show Error Snackbar</button>
    <button (click)="showSnackbar('info', 'Manual Dismiss', true)">Manual Dismiss</button>
    <div class="inline-container">
      <play-snackbar [data]="infoSnackbar"></play-snackbar>
      <play-snackbar [data]="successSnackbar"></play-snackbar>
      <play-snackbar [data]="warningSnackbar"></play-snackbar>
      <play-snackbar [data]="errorSnackbar"></play-snackbar>
      <play-snackbar [data]="manualDismissSnackbar"></play-snackbar>
      <play-snackbar [data]="actionSnackbar"></play-snackbar>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 400px;
        width: 100%;
      }

      .inline-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 8px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PlaySnackbarComponent],
})
export class PlaySnackbarShowcaseComponent {
  @Input() position: PlaySnackbarPosition = 'top-right';

  infoSnackbar: PlaySnackbar = {
    title: 'Info',
    message: 'This is an info snackbar. Content shouldn’t be more than a sentence or two.',
    severity: 'info',
  };

  successSnackbar: PlaySnackbar = {
    title: 'Success',
    message: 'This is a success snackbar. Content shouldn’t be more than a sentence or two.',
    severity: 'success',
  };

  warningSnackbar: PlaySnackbar = {
    title: 'Warning',
    message: 'This is a warning snackbar. Content shouldn’t be more than a sentence or two.',
    severity: 'warning',
  };

  errorSnackbar: PlaySnackbar = {
    title: 'Error',
    message: 'This is an error snackbar. Content shouldn’t be more than a sentence or two.',
    severity: 'error',
  };

  manualDismissSnackbar: PlaySnackbar = {
    title: 'Manual Dismiss',
    message: 'This is a snackbar that can be manually dismissed.',
    severity: 'info',
    dismissible: true,
  };

  actionSnackbar: PlaySnackbar = {
    title: 'Action',
    message:
      'This is a snackbar with an action. This is a snackbar with an action. This is a snackbar with an action. This is a snackbar with an action. This is a snackbar with an action. This is a snackbar with an action. This is a snackbar with an action. This is a snackbar with an action. This is a snackbar with an action.',
    severity: 'info',
    dismissible: true,
    action: () => {
      window.alert('Action clicked');
    },
    actionLabel: 'ACTION',
  };

  showSnackbar(severity: PlaySnackbarSeverity, title: string, manualDismiss = false) {
    const ref = this.snackbarService.open({
      title: title,
      message: 'This is a snackbar. Content shouldn’t be more than a sentence or two.',
      duration: manualDismiss ? 0 : 3000,
      severity: severity,
      position: this.position,
    });
  }
  constructor(private snackbarService: PlaySnackbarService) {}
}
