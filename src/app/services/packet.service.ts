import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.staging';

@Injectable({
  providedIn: 'root'
})
export class PacketService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPackets() {
    return this.http.get<any>(this.apiUrl + 'diamonds');
  }

  addPacket(packet: any) {
    const url = this.apiUrl + 'diamonds'
    return this.http.post<any>(url, packet);
  }

  editPacket(id: any, packet: any) {
    const url = `${this.apiUrl}diamonds/${id}`;
    return this.http.put<any>(url, packet);
  }

  deletePacket(id:string)
  {
    const url = `${this.apiUrl}diamonds/${id}`;
    return this.http.delete<any>(url);
  }

}
