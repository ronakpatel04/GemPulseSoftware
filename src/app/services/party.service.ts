import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.staging';

@Injectable({
  providedIn: 'root'
})
export class PartyService {


  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getParty() {
    return this.http.get<any>(this.apiUrl + 'palty');
  }

  addParty(party: any) {
    const url = this.apiUrl + 'palty'
    return this.http.post<any>(url, party);
  }


  editParty(id: any, party: any) {
    const url = `${this.apiUrl}palty/${id}`;
    return this.http.put<any>(url, party);
  }

}
