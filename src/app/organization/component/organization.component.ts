import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Organization } from '../Organization';
import { CustomResponse } from 'src/app/custom-response/custom-response';
import { OrganizationService } from '../service/organization.service';
import { OrganizationModalComponent } from '../modal/component/organization-modal/organization-modal.component';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],
})
export class OrganizationComponent {
  public organizations: Organization[];
  detailsToShow: number[] = [];
  isHidden = false;
  hoveredItem: number | null = null;

  @ViewChild(OrganizationModalComponent)
  organizationModal: OrganizationModalComponent;

  constructor(private organizationService: OrganizationService) {}

  ngOnInit(): void {
    this.getOrganizations();
  }

  public getOrganizations(): void {
    this.organizationService.getOrganizations().subscribe({
      next: (response: CustomResponse) => {
        this.organizations = response.data.organizations;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.error.message);
      },
    });
  }

  public deleteOrganization(organization: Organization): void {
    if (
      confirm(
        `You are about to delete ${organization.name}. Do you wish to proceed?`
      )
    ) {
      this.organizationService
        .deleteOrganization(organization.id)
        .pipe(switchMap(() => this.organizationService.getOrganizations()))
        .subscribe({
          complete: () => {
            this.getOrganizations();
          },
          error: (error: HttpErrorResponse) => {
            alert(error.error.message);
          },
        });
    }
  }

  public addOrganization(organization: Organization): void {
    this.organizationService
      .addOrganization(organization)
      .pipe(switchMap(() => this.organizationService.getOrganizations()))
      .subscribe({
        complete: () => {
          this.getOrganizations();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.error.message);
        },
      });
  }

  public modifyOrganization(organization: Organization): void {
    this.organizationService
      .modifyOrganization(organization)
      .pipe(switchMap(() => this.organizationService.getOrganizations()))
      .subscribe({
        complete: () => {
          this.getOrganizations();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.error.message);
        },
      });
  }

  itemClickHandler(i: number) {
    if (this.detailsToShow.includes(i)) {
      const indexToSplice = this.detailsToShow.indexOf(i);
      this.detailsToShow.splice(indexToSplice, 1);
    } else {
      this.detailsToShow.push(i);
    }
  }

  openAddOrganizationModal() {
    this.organizationModal.title = 'Add Organization';
    this.organizationModal.organization = null;
    this.organizationModal.initForm();
  }

  openModifyOrganizationModal(organization: Organization) {
    this.organizationModal.title = 'Modify Organization';
    this.organizationModal.organization = organization;
    this.organizationModal.initForm();
  }

  onOrganizationSubmitted(organization: Organization) {
    if (organization.id == null) {
      this.addOrganization(organization);
    } else {
      this.modifyOrganization(organization);
    }
  }
}
