import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { CustomResponse } from 'src/app/custom-response/custom-response';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private API_URL = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getEvents(): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${this.API_URL}/api/v1/event/all`);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/api/v1/event/${id}`);
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(`An error occured: ${error.status}`);
  }
}
