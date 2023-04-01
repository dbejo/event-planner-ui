import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Organization } from '../organization';
import { CustomResponse } from 'src/app/custom-response/custom-response';
import { OrganizationService } from '../service/organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent {
  public organizations: Organization[];
  detailsToShow: number[] = [];
  isHidden = false;
  hoveredItem: number | null = null;

  constructor(private organizationService: OrganizationService) {}

  ngOnInit(): void {
    this.getOrganizations();
  }

  public getOrganizations(): void {
    this.organizationService.getOrganizations().subscribe(
      (response: CustomResponse) => {
        this.organizations = response.data.organizations;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public deleteOrganization(organization: Organization): void {
    if (organization.people.length != 0) {
      alert("Can not delete an organization that has members!");
      return;
    }
    if(confirm(`You are about to delete ${organization.name}. Do you wish to proceed?`)) {
    this.organizationService.deleteOrganization(organization.id).subscribe(
      (response: void) => {
        if (response != null) {
        console.log(response);
        }
        this.getOrganizations();
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
}
