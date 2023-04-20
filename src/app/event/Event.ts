import { Person } from 'src/app/person/Person';

export interface Event {
  id: number;
  name: string;
  description?: string;
  location?: string;
  startDate?: Date;
  endDate?: Date;
  active?: boolean;
  people?: Person[];
  agenda?: string;
}
