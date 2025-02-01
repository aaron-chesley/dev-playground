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
  PlayCheckboxComponent,
  PlayIconComponent,
  PlayIconRegistryService,
  PlaySelectComponent,
} from '@playground/play-ui';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'lms-ui-employee-table',
    templateUrl: './lms-ui-employee-table.component.html',
    styleUrls: ['./lms-ui-employee-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DatePipe,
        CdkTableModule,
        PlayCheckboxComponent,
        PlayIconComponent,
        PlaySelectComponent,
    ]
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
