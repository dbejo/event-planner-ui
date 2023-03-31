import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { AppState } from 'src/app/app-state/app-state';
import { DataState } from 'src/app/enum/data-state.enum';
import { Event } from 'src/app/event/Event';
import { EventService } from 'src/app/event/service/event.service'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  appState$: Observable<AppState<Event[]>>;
  detailsToShow: number[] = [];
  isHidden = false;
  hoveredItem: number | null = null;
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.appState$ = this.eventService.events$
      .pipe(
        map(response => {
          return { dataState: DataState.LOADED, data: response }
        }),
        startWith({ dataState: DataState.LOADING }),
        catchError( (error: string) => {
          return of({ DataState: DataState.ERROR, error})
        })
      );
  }

  deleteEvent(index: number, id: number) {
    console.log("delete " + id);
    let confirmation = confirm("You are about to delete an event! Do you wish to proceed?");
    if (confirmation) {
      this.hoveredItem = null;
      
    } else {
      this.hoveredItem = null;
      return;
    }
  }

  itemClickHandler(i: number) {
    if (this.detailsToShow.includes(i)) {
      const indexToSplice = this.detailsToShow.indexOf(i);
      this.detailsToShow.splice(indexToSplice, 1);
    } else {
      this.detailsToShow.push(i)
    }
  }

}
