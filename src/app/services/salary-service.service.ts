import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.staging';

@Injectable({
  providedIn: 'root'
})
export class SalaryServiceService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getSalaryOfEmployee(monthRange?:any)
  {
      if(monthRange){
    return this.http.get<any>(this.apiUrl + `salary?monthYear=${monthRange}`);
      }else{
        return this.http.get<any>(this.apiUrl + `salary`);

      }
  }

  getPartyBills(monthRange?:any)
  {
    if(monthRange)
      {
        return this.http.get<any>(this.apiUrl+`paltybill?monthYear=${monthRange}`)
      }else
      {
        return this.http.get<any>(this.apiUrl +'paltybill')
      }
  }
}
