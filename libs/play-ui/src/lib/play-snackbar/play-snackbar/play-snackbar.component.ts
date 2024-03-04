import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PlayIconRegistryService } from '../../play-icon/play-icon-registry.service';
import { checkCircleOutline, close, errorOutline, infoOutline, warning } from '../../play-icon/play-icons';
import { PlayIconComponent } from '../../play-icon/play-icon.component';
import { PlayButtonComponent } from '../../play-button/play-button.component';
import { NgClass } from '@angular/common';
import { PlaySnackbar } from './play-snackbar.interface';

@Component({
  selector: 'play-snackbar',
  templateUrl: './play-snackbar.component.html',
  styleUrls: ['./play-snackbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass, PlayIconComponent, PlayButtonComponent],
})
export class PlaySnackbarComponent {
  @Input() data: PlaySnackbar;
  @Output() dismiss = new EventEmitter();

  get icon() {
    switch (this.data.severity) {
      case 'info':
        return 'infoOutline';
      case 'success':
        return 'checkCircleOutline';
      case 'warning':
        return 'warning';
      case 'error':
        return 'errorOutline';
      default:
        return 'infoOutline';
    }
  }

  onDoAction() {
    this.data.action();
    this.dismiss.emit();
  }

  constructor(private playIconService: PlayIconRegistryService) {
    this.playIconService.registerIcons([infoOutline, checkCircleOutline, warning, errorOutline, close]);
  }
}
