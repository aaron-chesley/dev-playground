import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { LmsDataEmployeeService } from '@playground/lms-data';
import { LmsEmployee } from '@playground/lms/lms-util';
import { Observable, switchMap } from 'rxjs';

interface EmployeeManagementState {
  employees: LmsEmployee[];
}

const DEFAULT_STATE: EmployeeManagementState = {
  employees: [],
};

@Injectable()
export class LmsFeatureEmployeeManagementStore extends ComponentStore<EmployeeManagementState> {
  readonly employees$ = this.select((state) => state.employees);

  readonly setEmployees = this.updater((state, employees: LmsEmployee[]) => {
    return { ...state, employees: employees };
  });
  readonly fetchEmployees = this.effect((origin$: Observable<void>) => {
    return origin$.pipe(
      switchMap(() => this.employeeService.getAll()),
      tapResponse(
        (employees) => this.setEmployees(employees),
        (err) => console.log(err)
      )
    );
  });

  constructor(private employeeService: LmsDataEmployeeService) {
    super(DEFAULT_STATE);
  }
}
