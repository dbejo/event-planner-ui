import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { EventComponent } from './event/component/event.component';
import { PersonComponent } from './person/component/person.component';
import { OrganizationComponent } from './organization/component/organization.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { PersonModalComponent } from './person/modal/component/person-modal/person-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventModalComponent } from './event/modal/component/event-modal/event-modal.component';
import { OrganizationModalComponent } from './organization/modal/component/organization-modal/organization-modal.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, EventComponent, PersonComponent, OrganizationComponent, PersonModalComponent, EventModalComponent, OrganizationModalComponent, HomeComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule,  AppRoutingModule, HttpClientModule, OAuthModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
