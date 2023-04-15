import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomResponse } from 'src/app/custom-response/custom-response';
import { EventService } from 'src/app/event/service/event.service';
import { Event } from 'src/app/event/Event';
import { HttpErrorResponse } from '@angular/common/http';
import { EventModalComponent } from '../modal/component/event-modal/event-modal.component';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  public events: Event[];
  detailsToShow: number[] = [];
  isHidden = false;
  hoveredItem: number | null = null;

  @ViewChild(EventModalComponent) eventModal: EventModalComponent;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.getEvents();
  }

  public getEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (response: CustomResponse) => {
        this.events = response.data.events;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public deleteEvent(event: Event): void {
    if (
      confirm(`You are about to delete ${event.name}. Do you wish to proceed?`)
    ) {
      this.eventService
        .deleteEvent(event.id)
        .pipe(switchMap(() => this.eventService.getEvents()))
        .subscribe({
          complete: () => {
            this.getEvents();
          },
          error: (error: HttpErrorResponse) => {
            alert(error.message);
          },
        });
    }
  }

  public addEvent(event: Event): void {
    this.eventService
      .addEvent(event)
      .pipe(switchMap(() => this.eventService.getEvents()))
      .subscribe({
        complete: () => {
          this.getEvents();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      });
  }

  public modifyEvent(event: Event): void {
    this.eventService
      .modifyEvent(event)
      .pipe(switchMap(() => this.eventService.getEvents()))
      .subscribe({
        complete: () => {
          this.getEvents();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      });
  }

  itemClickHandler(i: number) {
    if (this.detailsToShow.includes(i)) {
      const indexToSplice = this.detailsToShow.indexOf(i);
      this.detailsToShow.splice(indexToSplice, 1);
    } else {
      this.detailsToShow.push(i);
    }
  }

  openAddEventModal() {
    this.eventModal.title = 'Add Event';
    this.eventModal.event = null;
    this.eventModal.initForm();
  }

  openModifyEventModal(event: Event) {
    this.eventModal.title = 'Modify Event';
    this.eventModal.event = event;
    this.eventModal.initForm();
  }

  onEventSubmitted(event: Event) {
    if (event.id == null) {
      this.addEvent(event);
    } else {
      this.modifyEvent(event);
    }
  }
}
