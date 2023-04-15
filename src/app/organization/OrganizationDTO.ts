export interface OrganizationDTO {
  id: number;
  name: string;
  parentId: number | null;
  topLevel: boolean;
  address: string;
  peopleIds: number[];
  active: boolean;
}
