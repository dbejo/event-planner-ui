import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Person } from '../person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  private API_URL = environment.apiUrl;
  people?: Person[];
  detailsToShow: number[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getPeople();
  }

  getPeople() {
    return this.http.get<Person[]>(this.API_URL + "/api/v1/person/all").subscribe((data) => this.people = data)
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
