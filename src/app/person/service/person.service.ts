import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponse } from 'src/app/custom-response/custom-response';
import { environment } from 'src/environments/environment';
import { Person } from '../Person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private API_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getPeople(): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${this.API_URL}/api/v1/person/all`);
  }

  deletePerson(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/api/v1/person/${id}`);
  }

  addPerson(person: Person): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(
      `${this.API_URL}/api/v1/person`,
      person
    );
  }

  modifyPerson(person: Person): Observable<CustomResponse> {
    return this.http.put<CustomResponse>(
      `${this.API_URL}/api/v1/person`,
      person
    );
  }
}
