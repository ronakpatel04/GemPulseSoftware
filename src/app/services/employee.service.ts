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
    return this.http.get<any>(this.apiUrl + 'users');
  }

  addEmployee(employee: any) {
    const url = this.apiUrl + 'auth/register'
    return this.http.post<any>(url, employee);
  }

  editEmployee(id: any, employee: any) {
    const url = `${this.apiUrl}users/${id}`;
    return this.http.put<any>(url, employee);
  }

  deleteEmployee(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
