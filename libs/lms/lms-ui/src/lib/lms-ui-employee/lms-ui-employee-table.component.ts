import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { SelectionModel } from '@angular/cdk/collections';
import { LmsEmployee } from '@playground/lms-util';
import {
  check,
  PlayButtonComponent,
  PlayCheckboxComponent,
  PlayIconComponent,
  PlayIconRegistryService,
  PlaySelectComponent,
} from '@playground/play-ui';

@Component({
  selector: 'lms-ui-employee-table',
  templateUrl: './lms-ui-employee-table.component.html',
  styleUrls: ['./lms-ui-employee-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CdkTableModule,
    PlayCheckboxComponent,
    PlayButtonComponent,
    PlayIconComponent,
    PlaySelectComponent,
  ],
})
export class LmsUiEmployeeTableComponent {
  @Input() employees: LmsEmployee[] = [];
  @Input() selectedEmployees: SelectionModel<LmsEmployee>;
  @Output() toggleSelectAll = new EventEmitter<void>();
  @Output() toggleEmployeeSelected = new EventEmitter<LmsEmployee>();

  displayedColumns: string[] = [
    'select',
    'name',
    'email',
    'date_hired',
    'is_admin',
  ];

  trackByEmployeeFn(index: number, employee: LmsEmployee) {
    return employee.id;
  }

  constructor(private playIconService: PlayIconRegistryService) {
    this.playIconService.registerIcons([check]);
  }
}
