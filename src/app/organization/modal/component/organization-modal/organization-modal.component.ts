import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomResponse } from 'src/app/custom-response/custom-response';
import { Organization } from 'src/app/organization/Organization';
import { Person } from 'src/app/person/Person';
import { PersonService } from 'src/app/person/service/person.service';

@Component({
  selector: 'app-organization-modal',
  templateUrl: './organization-modal.component.html',
  styleUrls: ['./organization-modal.component.css'],
})
export class OrganizationModalComponent {
  title: string;
  organization?: Organization;
  public people: Person[];
  @Input() organizations: Organization[];
  @Output() submitOrganization: EventEmitter<Organization> =
    new EventEmitter<Organization>();

  form: FormGroup;

  constructor(private personService: PersonService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.getPeople();
  }

  public initForm(): void {
    this.form = this.fb.group({
      name: [this.organization?.name || '', Validators.required],
      address: [this.organization?.address || '', Validators.required],
      people: [this.organization?.people?.map((person) => person.id) || []],
      parent: [this.organization?.parent?.id || null],
    });
  }

  public submit() {
    const parent: Organization = { id: this.form.get('parent').value };
    const newOrganization: Organization = {
      id: this.organization?.id || null,
      name: this.form.get('name').value,
      parentOrg: parent || null,
      topLevel: parent.id == null ? true : false,
      address: this.form.get('address').value,
      people: [],
      active: true,
    };
    for (const personIndex of this.form.get('people').value) {
      for (const person of this.people) {
        if (person.id == personIndex) {
          const personToAdd: Person = {
            id: person.id,
            firstName: person.firstName,
            lastName: person.lastName,
            personalEmail: person.personalEmail,
            active: person.active,
            organizations: null,
            events: null,
          };
          newOrganization.people.push(personToAdd);
        }
      }
    }
    console.log(newOrganization);
    this.submitOrganization.emit(newOrganization);
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
