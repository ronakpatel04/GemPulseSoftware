import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://dummyjson.com/'; 

  constructor(private http: HttpClient) { }

   headers = new HttpHeaders({
    'Content-Type': 'application/json',  });
  
  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${endpoint}`, data, { headers: this.headers });
  }}
