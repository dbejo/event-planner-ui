import { Person } from "src/app/person/person";

export interface Organization {
    id: number;
    topLevel: boolean;
    name: string;
    active: boolean
    address: string;
    people: Person[];
    parent: Organization;
}