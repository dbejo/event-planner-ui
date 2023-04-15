import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CustomResponse } from 'src/app/custom-response/custom-response';
import { Event } from 'src/app/event/Event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private API_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getEvents(): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${this.API_URL}/api/v1/event/all`);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/api/v1/event/${id}`);
  }

  addEvent(event: Event): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(
      `${this.API_URL}/api/v1/event`,
      event
    );
  }

  modifyEvent(event: Event): Observable<CustomResponse> {
    return this.http.put<CustomResponse>(`${this.API_URL}/api/v1/event`, event);
  }
}
