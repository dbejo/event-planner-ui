import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { EventComponent } from './event/event/event.component';
import { PersonComponent } from './person/person/person.component';
import { OrganizationComponent } from './organization/organization/organization.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, EventComponent, PersonComponent, OrganizationComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
