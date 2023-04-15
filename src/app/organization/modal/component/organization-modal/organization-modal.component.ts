import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { CustomResponse } from 'src/app/custom-response/custom-response';
import { Organization } from 'src/app/organization/Organization';
import { OrganizationDTO } from 'src/app/organization/OrganizationDTO';
import { OrganizationService } from 'src/app/organization/service/organization.service';
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

  constructor(
    private personService: PersonService,
    private organizationService: OrganizationService,
    private fb: FormBuilder
  ) {}

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
      active: [this.organization?.active || false],
    });
  }

  public submit() {
    this.getParentOrganization(this.form.get('parent').value).subscribe({
      next: (parentOrg: Organization) => {
        const newOrganization: Organization = {
          id: this.organization?.id || null,
          name: this.form.get('name').value,
          parent: parentOrg || null,
          topLevel: parentOrg?.id == null ? true : false,
          address: this.form.get('address').value,
          people: [],
          active: this.form.get('active').value,
        };
        for (let personIndex of this.form.get('people').value) {
          for (let person of this.people) {
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
        this.submitOrganization.emit(newOrganization);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
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

  public getParentOrganization(id: number): Observable<Organization> {
    return this.organizationService.getOrganization(id).pipe(
      map((response: CustomResponse) => response.data.organization),
      map((organizationDto: OrganizationDTO) => {
        const people: Person[] = organizationDto.peopleIds.map((personId) => ({
          id: personId,
        }));
        return {
          id: organizationDto.id,
          name: organizationDto.name,
          parent: organizationDto.parentId
            ? { id: organizationDto.parentId }
            : null,
          topLevel: organizationDto.topLevel,
          address: organizationDto.address,
          people: people,
          active: organizationDto.active,
        } as Organization;
      })
    );
  }
}
