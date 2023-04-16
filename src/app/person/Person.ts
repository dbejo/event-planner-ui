import { Organization } from '../organization/Organization';
import { Event } from '../event/Event';

export interface Person {
  id: number;
  firstName?: string;
  lastName?: string;
  notes?: string;
  personalEmail?: string;
  active?: boolean;
  organizations?: Organization[];
  events?: Event[];
}
