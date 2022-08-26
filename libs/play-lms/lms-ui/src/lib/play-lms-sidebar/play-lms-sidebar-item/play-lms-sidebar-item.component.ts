import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'play-lms-ui-sidebar-item',
  templateUrl: './play-lms-sidebar-item.component.html',
  styleUrls: ['./play-lms-sidebar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class PlayLmsUiSidebarItemComponent {}
