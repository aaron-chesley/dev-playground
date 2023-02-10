import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiService } from '@playground/shared/shared-data';
import { LmsContentItem, LmsEmployee } from '@playground/lms-util';

@Injectable({
  providedIn: 'root',
})
export class LmsDataEmployeeService {
  private readonly baseUrl = 'users';

  create(body: LmsContentItem): Observable<LmsEmployee> {
    return this.apiService.post<LmsEmployee>(`${this.baseUrl}`, body);
  }

  get(employeeId: string): Observable<LmsEmployee> {
    return this.apiService.get<LmsEmployee>(`${this.baseUrl}/${employeeId}`);
  }

  getAll(): Observable<LmsEmployee[]> {
    return this.apiService.get<LmsEmployee[]>(
      `${this.baseUrl}/`,
      new HttpParams().set('page_size', 0)
    );
  }

  update(employeeId: string, body: LmsEmployee) {
    return this.apiService.put(`${this.baseUrl}/${employeeId}`, body);
  }

  delete(employeeId: string) {
    return this.apiService.delete(`${this.baseUrl}/${employeeId}`);
  }

  constructor(private apiService: ApiService) {}
}
