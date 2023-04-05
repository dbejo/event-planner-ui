import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { EventComponent } from './event/component/event.component';
import { PersonComponent } from './person/component/person.component';
import { OrganizationComponent } from './organization/component/organization.component';
import { PersonModalComponent } from './person/modal/component/person-modal/person-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, NavbarComponent, EventComponent, PersonComponent, OrganizationComponent, PersonModalComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule,  AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
