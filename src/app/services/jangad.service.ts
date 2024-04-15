import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.staging';

@Injectable({
  providedIn: 'root'
})
export class JangadService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

    getJangadList(partyId?:string)
    {
      return this.http.get<any>(this.apiUrl + `diamonds?polish_status=returntomanager&&palty=${partyId}`);
    }


}
