import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { EventComponent } from './event/component/event.component';
import { PersonComponent } from './person/component/person.component';
import { OrganizationComponent } from './organization/component/organization.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, EventComponent, PersonComponent, OrganizationComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
