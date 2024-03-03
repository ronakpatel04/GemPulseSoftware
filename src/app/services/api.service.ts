import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://example.com/api'; 

  constructor(private http: HttpClient) { }

  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${endpoint}`, data);
  }}
