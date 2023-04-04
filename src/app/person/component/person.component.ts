import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { PersonService } from '../service/person.service';
import { CustomResponse } from 'src/app/custom-response/custom-response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  people: Person[];
  detailsToShow: number[] = [];
  isHidden = false;
  hoveredItem: number | null = null;
  modal_title: string;

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.getPeople();
  }

  public getPeople(): void {
    this.personService.getPeople().subscribe(
      (response: CustomResponse) => {
        this.people = response.data.people;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public deletePerson(person: Person): void {
    if(confirm(`You are about to delete ${person.firstName} ${person.lastName}. Do you wish to proceed?`)) {
      this.personService.deletePerson(person.id).subscribe(
        (response: void) => {
          console.log(response);
          this.getPeople();
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

  openAddPersonModal() {
    this.modal_title = "Add person"
  }

}
