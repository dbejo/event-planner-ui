import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomResponse } from 'src/app/custom-response/custom-response';
import { Event } from 'src/app/event/Event';
import { Person } from 'src/app/person/Person';
import { PersonService } from 'src/app/person/service/person.service';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css'],
})
export class EventModalComponent implements OnInit {
  title: string;
  event?: Event;
  public people: Person[];
  @Output() submitEvent: EventEmitter<Event> = new EventEmitter<Event>();

  form: FormGroup;

  constructor(private personService: PersonService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.getPeople();
  }

  public initForm(): void {
    console.log(this.event?.people);
    this.form = this.fb.group({
      name: [this.event?.name || '', Validators.required],
      description: [this.event?.description || '', Validators.required],
      date: [this.event?.date || '', Validators.required],
      location: [this.event?.location || '', Validators.required],
      active: [this.event?.active || false],
      people: [this.event?.people?.map((person) => person.id) || []],
    });
  }

  public submit() {
    const newEvent: Event = {
      id: this.event?.id || null,
      name: this.form.get('name').value,
      description: this.form.get('description').value,
      date: this.form.get('date').value,
      location: this.form.get('location').value,
      active: this.form.get('active').value,
      people: [],
    };
    for (const personIndex of this.form.get('people').value) {
      for (const person of this.people) {
        if (person.id == personIndex) {
          const personToAdd: Person = {
            id: person.id,
            firstName: person.firstName,
            lastName: person.lastName,
          };
          newEvent.people.push(personToAdd);
        }
      }
    }
    this.submitEvent.emit(newEvent);
  }

  public getPeople(): void {
    this.personService.getPeople().subscribe({
      next: (response: CustomResponse) => {
        this.people = response.data.people;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }
}
