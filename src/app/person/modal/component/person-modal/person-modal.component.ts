import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CustomResponse } from 'src/app/custom-response/custom-response';
import { Organization } from 'src/app/organization/organization';
import { OrganizationService } from 'src/app/organization/service/organization.service';

@Component({
  selector: 'app-person-modal',
  templateUrl: './person-modal.component.html',
  styleUrls: ['./person-modal.component.css']
})
export class PersonModalComponent implements OnInit {
  @Input() title!: string;
  public organizations: Organization[];
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
}
