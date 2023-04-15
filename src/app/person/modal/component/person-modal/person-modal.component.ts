import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomResponse } from 'src/app/custom-response/custom-response';
import { Organization } from 'src/app/organization/Organization';
import { OrganizationService } from 'src/app/organization/service/organization.service';
import { Person } from 'src/app/person/Person';
import { Event } from 'src/app/event/Event';
import { EventService } from 'src/app/event/service/event.service';

@Component({
  selector: 'app-person-modal',
  templateUrl: './person-modal.component.html',
  styleUrls: ['./person-modal.component.css'],
})
export class PersonModalComponent implements OnInit {
  title: string;
  person?: Person;
  public organizations: Organization[];
  public events: Event[];
  @Output() submitPerson: EventEmitter<Person> = new EventEmitter<Person>();

  form: FormGroup;

  constructor(
    private organizationService: OrganizationService,
    private eventService: EventService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getOrganizations();
    this.getEvents();
  }

  public initForm(): void {
    this.form = this.fb.group({
      firstName: [this.person?.firstName || '', Validators.required],
      lastName: [this.person?.lastName || '', Validators.required],
      email: [
        this.person?.personalEmail || '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      notes: [this.person?.notes || ''],
      organizations: [this.person?.organizations?.map((org) => org.id) || []],
      events: [this.person?.events?.map((event) => event.id) || []],
      active: [this.person?.active || false],
    });
  }

  public submit() {
    const newPerson: Person = {
      id: this.person?.id || null,
      firstName: this.form.get('firstName').value,
      lastName: this.form.get('lastName').value,
      notes: this.form.get('notes').value,
      personalEmail: this.form.get('email').value,
      active: this.form.get('active').value,
      organizations: [],
      events: [],
    };
    for (let orgIndex of this.form.get('organizations').value) {
      for (let org of this.organizations) {
        if (org.id == orgIndex) {
          const orgToAdd: Organization = { id: org.id, name: org.name };
          newPerson.organizations.push(orgToAdd);
        }
      }
    }
    for (let eventIndex of this.form.get('events').value) {
      for (let event of this.events) {
        if (event.id == eventIndex) {
          const eventToAdd: Event = { id: event.id, name: event.name };
          newPerson.events.push(eventToAdd);
        }
      }
    }
    this.submitPerson.emit(newPerson);
  }

  public getOrganizations(): void {
    this.organizationService.getOrganizations().subscribe({
      next: (response: CustomResponse) => {
        this.organizations = response.data.organizations;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
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
}
