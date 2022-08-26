import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lms-ui-sidebar-item',
  templateUrl: './lms-ui-sidebar-item.component.html',
  styleUrls: ['./lms-ui-sidebar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class LmsUiSidebarItemComponent {}
