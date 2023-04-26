import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event/component/event.component';
import { OrganizationComponent } from './organization/component/organization.component';
import { PersonComponent } from './person/component/person.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'event', component: EventComponent },
  { path: 'person', component: PersonComponent },
  { path: 'organization', component: OrganizationComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
