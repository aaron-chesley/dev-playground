import { SelectionModel } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { LmsDataEmployeeService } from '@playground/lms-data';
import { LmsEmployee } from '@playground/lms-util';
import { Observable, switchMap } from 'rxjs';

interface EmployeeManagementState {
  employees: LmsEmployee[];
  selectedEmployees: SelectionModel<LmsEmployee>;
}

const DEFAULT_STATE: EmployeeManagementState = {
  employees: [],
  selectedEmployees: new SelectionModel(true, []),
};

@Injectable()
export class LmsFeatureEmployeeManagementStore extends ComponentStore<EmployeeManagementState> {
  readonly employees$ = this.select((state) => state.employees);
  readonly selectedEmployees$ = this.select((state) => state.selectedEmployees);

  readonly toggleSelectAll = this.updater((state) => {
    return {
      ...state,
      selectedEmployees: new SelectionModel(
        true,
        state.employees.length === state.selectedEmployees.selected.length
          ? []
          : state.employees
      ),
    };
  });

  readonly toggleEmployeeSelected = this.updater(
    (state, employee: LmsEmployee) => {
      const selectedEmployees = state.selectedEmployees;
      selectedEmployees.toggle(employee);
      return { ...state, selectedEmployees };
    }
  );

  readonly fetchEmployees = this.effect((triggerer$: Observable<void>) => {
    return triggerer$.pipe(
      switchMap(() =>
        this.employeeService.getAll().pipe(
          tapResponse(
            (employees) => this.patchState({ employees }),
            (err) => console.log(err)
          )
        )
      )
    );
  });

  constructor(private employeeService: LmsDataEmployeeService) {
    super(DEFAULT_STATE);
  }
}
