import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Organization } from '../Organization';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent {
  private API_URL = environment.apiUrl;
  organizations?: Organization[];
  detailsToShow: number[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getOrganizations();
  }

  getOrganizations() {
    return this.http.get<Organization[]>(this.API_URL + "/api/v1/organization/all").subscribe((data) => this.organizations = data)
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
