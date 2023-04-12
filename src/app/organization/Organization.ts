import { Person } from 'src/app/person/Person';

export interface Organization {
  id: number;
  topLevel?: boolean;
  name?: string;
  active?: boolean;
  address?: string;
  people?: Person[];
  parent?: Organization;
}
