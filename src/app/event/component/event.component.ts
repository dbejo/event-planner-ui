import { Component, OnInit } from '@angular/core';
import { CustomResponse } from 'src/app/custom-response/custom-response';
import { EventService } from 'src/app/event/service/event.service'
import { Event } from 'src/app/event/event'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  public events: Event[];

  detailsToShow: number[] = [];
  isHidden = false;
  hoveredItem: number | null = null;

  
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  public getEvents(): void {
    this.eventService.getEvents().subscribe(
      (response: CustomResponse) => {
        this.events = response.data.events;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public deleteEvent(event: Event): void {
    if(confirm(`You are about to delete ${event.name}. Do you wish to proceed?`)) {
    this.eventService.deleteEvent(event.id).subscribe(
      (response: void) => {
        console.log(response);
        this.getEvents();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
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
