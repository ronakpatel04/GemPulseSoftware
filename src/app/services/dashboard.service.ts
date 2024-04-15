import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.staging';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  
  getAllDiamond(party?:string, employee?:string, status?:string)
  {
    let queryParams = '';
  if (party && employee && status) {
    queryParams = `?palty=${party}&employee=${employee}&polish_status=${status}`;
  } else if (party && employee) {
    queryParams = `?palty=${party}&employee=${employee}`;
  } else if (party && status) {
    queryParams = `?palty=${party}&polish_status=${status}`;
  } else if (employee && status) {
    queryParams = `?employee=${employee}&polish_status=${status}`;
  } else if (party) {
    queryParams = `?palty=${party}`;
  } else if (employee) {
    queryParams = `?employee=${employee}`;
  } else if (status) {
    queryParams = `?polish_status=${status}`;
  }

  return this.http.get<any>(this.apiUrl + 'diamonds' + queryParams);
  }
}
