import { Event } from 'src/app/event/Event';
import { Organization } from '../organization/Organization';
import { Person } from '../person/Person';

export interface CustomResponse {
  timeStamp: Date;
  message: string;
  data?: {
    events?: Event[];
    event?: Event[];
    organizations?: Organization[];
    organization?: Organization;
    people?: Person[];
    person?: Person;
  };
}
