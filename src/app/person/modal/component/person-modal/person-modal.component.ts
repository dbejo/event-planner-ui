import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomResponse } from 'src/app/custom-response/custom-response';
import { Organization } from 'src/app/organization/Organization';
import { OrganizationService } from 'src/app/organization/service/organization.service';
import { Person } from 'src/app/person/Person';

@Component({
  selector: 'app-person-modal',
  templateUrl: './person-modal.component.html',
  styleUrls: ['./person-modal.component.css'],
})
export class PersonModalComponent implements OnInit {
  title: string;
  person?: Person;
  public organizations: Organization[];
  @Output() submitPerson: EventEmitter<Person> = new EventEmitter<Person>();

  form: FormGroup;

  constructor(
    private organizationService: OrganizationService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.initForm();
    this.getOrganizations();
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
      events: this.person?.events || [],
    };
    for (let orgIndex of this.form.get('organizations').value) {
      for (let org of this.organizations) {
        if (org.id == orgIndex) {
          const orgToAdd: Organization = { id: org.id, name: org.name };
          newPerson.organizations.push(orgToAdd);
        }
      }
    }
    this.submitPerson.emit(newPerson);
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
