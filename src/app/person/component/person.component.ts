import { Component, OnInit, ViewChild } from '@angular/core';
import { Person } from '../Person';
import { PersonService } from '../service/person.service';
import { CustomResponse } from 'src/app/custom-response/custom-response';
import { HttpErrorResponse } from '@angular/common/http';
import { PersonModalComponent } from '../modal/component/person-modal/person-modal.component';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit {
  people: Person[];
  detailsToShow: number[] = [];
  isHidden = false;
  hoveredItem: number | null = null;
  person?: Person;

  @ViewChild(PersonModalComponent) personModal: PersonModalComponent;

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
        alert(error.message);
      }
    );
  }

  public deletePerson(person: Person): void {
    if (
      confirm(
        `You are about to delete ${person.firstName} ${person.lastName}. Do you wish to proceed?`
      )
    ) {
      this.personService.deletePerson(person.id).subscribe(
        (response: void) => {
          console.log(response);
          this.getPeople();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  public addPerson(person: Person): void {
    this.personService.addPerson(person).subscribe(
      (response: CustomResponse) => {
        console.log(response);
        this.getPeople();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public modifyPerson(person: Person): void {
    this.personService.modifyPerson(person).subscribe(
      (response: CustomResponse) => {
        console.log(response);
        this.getPeople();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  itemClickHandler(i: number) {
    if (this.detailsToShow.includes(i)) {
      const indexToSplice = this.detailsToShow.indexOf(i);
      this.detailsToShow.splice(indexToSplice, 1);
    } else {
      this.detailsToShow.push(i);
    }
  }

  openAddPersonModal() {
    this.personModal.title = 'Add person';
    this.personModal.person = null;
    this.personModal.initForm();
  }

  openModifyPersonModal(person: Person) {
    this.personModal.title = 'Modify person';
    this.personModal.person = person;
    this.personModal.initForm();
  }

  onPersonSubmitted(person: Person) {
    if (person.id == null) {
      this.addPerson(person);
    } else {
      this.modifyPerson(person);
    }
  }
}
