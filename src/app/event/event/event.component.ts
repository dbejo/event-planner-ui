import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/event/event/Event';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  private API_URL = environment.apiUrl;
  events?: Event[];
  detailsToShow: number[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    return this.http.get<Event[]>(this.API_URL + "/api/v1/event/all").subscribe((data) => this.events = data)
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
