import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponse } from 'src/app/custom-response/custom-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private API_URL = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getOrganizations(): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${this.API_URL}/api/v1/organization/all`);
  }

  deleteOrganization(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/api/v1/organization/${id}`);
  }
}
