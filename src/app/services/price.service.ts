import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.staging';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addPrices(prices: any) {
    const url = this.apiUrl + 'prices'
    return this.http.post<any>(url, prices);
  }

  getPrices() {
    const url = this.apiUrl + 'prices'
    return this.http.get(url)
  }

  editPrices(id: any, prices: any) {
    const url = `${this.apiUrl}prices/${id}`
    return this.http.put(url, prices)
  }

}
