import { Observable } from 'rxjs';

export interface AppGroup {
  id: BigInt;
  appGroupDescription: string;
  appGroupName: string;
  serviceAddress: string;
  appGroupBranchCode: string;
}

export interface AppGroup {
  id: BigInt;
  appGroupDescription: string;
  appGroupName: string;
  serviceAddress: string;
  appGroupBranchCode: string;
}

export abstract class GroupData {
  abstract fetchGroups(): Observable<any>;
  abstract fetchGroup(id: string): Observable<any>;
  abstract createGroup(group: object): Observable<any>;
  abstract editGroup(group: object): Observable<any>;
}
