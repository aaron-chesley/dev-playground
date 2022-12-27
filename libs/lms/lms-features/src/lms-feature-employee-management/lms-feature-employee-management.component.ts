import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LmsUiEmployeeTableComponent } from '@playground/lms-ui';
import { LmsEmployee } from '@playground/lms/lms-util';
import { Observable } from 'rxjs';
import { LmsFeatureEmployeeManagementStore } from './lms-feature-employee-management.store';

@Component({
  selector: 'lms-feature-employee-management',
  template: `<lms-ui-employee-table
    [employees]="employees$ | async"
    [selectAll]="selectAll$ | async"
    (toggleSelectAll)="onToggleSelectAll()"
  ></lms-ui-employee-table>`,
  standalone: true,
  imports: [CommonModule, LmsUiEmployeeTableComponent],
})
export class LmsFeatureEmployeeManagementComponent {
  employees$: Observable<LmsEmployee[]>;
  selectAll$: Observable<boolean>;

  onToggleSelectAll() {
    this.store.toggleSelectAll();
  }
  constructor(private store: LmsFeatureEmployeeManagementStore) {
    this.employees$ = this.store.employees$;
    this.selectAll$ = this.store.selectAll$;
  }
}
