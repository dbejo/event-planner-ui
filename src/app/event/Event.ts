import { Person } from "src/app/person/person";

export interface Event {
    "id": number;
    "name": string;
    "description": string;
    "location": string;
    "date": Date;
    "active": boolean;
    "people": Person[];
}