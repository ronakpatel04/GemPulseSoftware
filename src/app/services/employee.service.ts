import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.staging';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get<any>(this.apiUrl);
  }

  addEmployee(employee: any) {
    return this.http.post<any>(this.apiUrl, employee);
  }

  editEmployee(employee: any) {
    const url = `${this.apiUrl}/${employee.id}`;
    return this.http.put<any>(url, employee);
  }

  deleteEmployee(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
