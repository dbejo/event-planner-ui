import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomResponse } from 'src/app/custom-response/custom-response';
import { Organization } from 'src/app/organization/Organization';
import { OrganizationService } from 'src/app/organization/service/organization.service';
import { PersonComponent } from 'src/app/person/component/person.component';
import { Person } from 'src/app/person/Person';

@Component({
  selector: 'app-person-modal',
  templateUrl: './person-modal.component.html',
  styleUrls: ['./person-modal.component.css'],
})
export class PersonModalComponent implements OnInit {
  @Input() title!: string;
  public organizations: Organization[];

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    notes: new FormControl(''),
    organizations: new FormControl([]),
    active: new FormControl(false),
  });

  constructor(
    private organizationService: OrganizationService,
    private personComponent: PersonComponent
  ) {}
  ngOnInit(): void {
    this.getOrganizations();
  }

  public submit() {
    const newPerson: Person = {
      id: null,
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value,
      notes: this.form.controls.notes.value,
      personalEmail: this.form.controls.email.value,
      active: this.form.controls.active.value,
      organizations: [],
      events: [],
    };
    for (let orgIndex of this.form.controls.organizations.value) {
      for (let org of this.organizations) {
        if (org.id == orgIndex) {
          const orgToAdd: Organization = { id: org.id, name: org.name };
          newPerson.organizations.push(orgToAdd);
        }
      }
    }
    console.log(newPerson);
    this.personComponent.addPerson(newPerson);
  }

  public getOrganizations(): void {
    this.organizationService.getOrganizations().subscribe(
      (response: CustomResponse) => {
        this.organizations = response.data.organizations;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
