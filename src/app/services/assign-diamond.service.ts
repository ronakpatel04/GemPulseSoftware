import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.staging';

@Injectable({
  providedIn: 'root'
})
export class AssignDiamondService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getDiamondsByPalty(id: any) {
    const url = `${this.apiUrl}diamonds/palty/${id}`;
    return this.http.get(url);
  }

  polishingJob(data: any) {
    const url = `${this.apiUrl}polishing-jobs/start`;
    return this.http.post(url, data);
  }

  polishingJobByEmployee(id?: string) {
    if (id) {
      const url = `${this.apiUrl}polishing-jobs/?employeeId=${id}`;
      return this.http.get(url);
    } else {
      const url = `${this.apiUrl}polishing-jobs/?status=started`;
      return this.http.get(url);
    }
  }

  polishingJobIssue(data: any, id: string) {
    const url = `${this.apiUrl}polishing-jobs/update/${id}`;
    return this.http.put(url, data);
  }


  polishingJobByissue() {
    const url = `${this.apiUrl}polishing-jobs/?status=issue`;
    return this.http.get(url);
  }

  getDiamondById(number:string)
  {
    const url = `${this.apiUrl}diamonds?kapannumber=${number}`
    return this.http.get(url);
  }

}
