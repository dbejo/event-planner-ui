import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event/event/event.component';
import { OrganizationComponent } from './organization/organization/organization.component';
import { PersonComponent } from './person/person/person.component';

const routes: Routes = [
  { path: 'event', component: EventComponent },
  { path: 'person', component: PersonComponent },
  { path: 'organization', component: OrganizationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
