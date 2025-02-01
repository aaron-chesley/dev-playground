import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
    selector: 'lms-ui-sidebar-item',
    templateUrl: './lms-ui-sidebar-item.component.html',
    styleUrls: ['./lms-ui-sidebar-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule]
})
export class LmsUiSidebarItemComponent {
  @HostBinding('class') className = 'lms-ui-sidebar-item';
}
