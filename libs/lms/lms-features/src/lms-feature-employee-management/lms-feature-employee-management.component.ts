import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { LmsUiEmployeeTableComponent } from '@playground/lms-ui';
import { LmsEmployee } from '@playground/lms-util';
import { LmsFeatureEmployeeManagementStore } from './lms-feature-employee-management.store';

@Component({
  selector: 'lms-feature-employee-management',
  template: `<lms-ui-employee-table
    [employees]="employees$ | async"
    [selectedEmployees]="selectedEmployees$ | async"
    (toggleSelectAll)="onToggleSelectAll()"
    (toggleEmployeeSelected)="onToggleEmployeeSelected($event)"
  ></lms-ui-employee-table>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [LmsFeatureEmployeeManagementStore],
  imports: [CommonModule, LmsUiEmployeeTableComponent],
})
export class LmsFeatureEmployeeManagementComponent {
  employees$: Observable<LmsEmployee[]>;
  selectedEmployees$: Observable<SelectionModel<LmsEmployee>>;

  onToggleSelectAll() {
    this.store.toggleSelectAll();
  }

  onToggleEmployeeSelected(employee: LmsEmployee) {
    this.store.toggleEmployeeSelected(employee);
  }

  constructor(private store: LmsFeatureEmployeeManagementStore) {
    this.store.fetchEmployees();
    this.employees$ = this.store.employees$;
    this.selectedEmployees$ = this.store.selectedEmployees$;
  }
}
