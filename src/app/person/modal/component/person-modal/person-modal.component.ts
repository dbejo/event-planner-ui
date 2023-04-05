import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  form = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    email: new FormControl("", Validators.compose([Validators.required, Validators.email])),
    notes: new FormControl(""),
    organizations: new FormControl(""),
    valid: new FormControl("")
  });

  constructor(private organizationService: OrganizationService) {}
  ngOnInit(): void {
    this.getOrganizations();
  }

  public submit() {
    console.log("hurray")
    console.log(this.form);
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
