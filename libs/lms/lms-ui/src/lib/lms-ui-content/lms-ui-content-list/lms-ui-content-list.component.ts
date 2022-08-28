import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lms-ui-content-list',
  templateUrl: './lms-ui-content-list.component.html',
  styleUrls: ['./lms-ui-content-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class LmsUiContentListComponent {
  @Input() content: any[] = [];
}
