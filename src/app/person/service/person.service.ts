import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponse } from 'src/app/custom-response/custom-response';
import { environment } from 'src/environments/environment';
import { Event } from 'src/app/event/event'

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private API_URL = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getPeople(): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${this.API_URL}/api/v1/person/all`);
  }

  deletePerson(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/api/v1/person/${id}`);
  }

  getPersonEvents(id: number): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${this.API_URL}/api/v1/person/${id}/events`);
  }
}
