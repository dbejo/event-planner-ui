import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Event } from 'src/app/event/Event';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private API_URL = environment.apiUrl;
  constructor(private http: HttpClient) { }

  events$ = <Observable<Event[]>>this.http.get<Event[]>(`${this.API_URL}/api/v1/event/all`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  delete$ = (id: number) => this.http.delete(`${this.API_URL}/api/v1/event/${id}`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(`An error occured: ${error.status}`);
  }
}
