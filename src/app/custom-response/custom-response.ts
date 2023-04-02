import { Event } from 'src/app/event/event'
import { Organization } from '../organization/organization';
import { Person } from '../person/person';

export interface CustomResponse {
    timeStamp: Date;
    message: string;
    data?: { events?: Event[], event?: Event[], organizations?: Organization[], organization?: Organization, people?: Person[], person?: Person }
}