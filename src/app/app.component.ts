import { Component } from '@angular/core';
import { GoogleApiService } from './google-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-oauth2-oidc';

  constructor(private readonly google: GoogleApiService) { }
}
