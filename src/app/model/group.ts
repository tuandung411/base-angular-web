import { Role } from './role';

export class Group {
  id!: string;
  appGroupDescription!: string;
  appGroupBranchCode!: string;
  appGroupName!: string;
  serviceAddresses: object;
  roles: Role[];
}
