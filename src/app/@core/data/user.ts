import { Observable } from 'rxjs';

export class User {
  id!: String;
  fullname!: String;
  address!: String;
  email!: String;
  username!: String;
  birthday!: String;
  phone_number!: String;
  createdAt!: String;
  enabled!: Boolean;
}
export class UserCreate {
  fullname!: String;
  address!: String;
  email!: String;
  username!: String;
  birthday!: String;
  phone_number!: String;
  createdAt!: String;
  enabled!: Boolean;
}

export class UserEdit {
  id!: String;
  fullname!: String;
  address!: String;
  email!: String;
  username!: String;
  birthday!: String;
  phone_number!: String;
  enabled!: Boolean;
}

export interface AppUser {
  id: BigInt;
  fullname: string;
  address: string;
  birthday: string;
  email: string;
  phoneNumber: string;
  twoFactorEnabled: boolean;
  userName: string;
  lastLoginTime: string;
  jobTitleId: number;
  jobTitle: string;
  branchCode: string;
}

export abstract class UserData {
  abstract fetchUsers(): Observable<any>;
  abstract fetchUser(id: string): Observable<any>;
  abstract fetchCustomers(): Observable<any>;
  abstract fetchCustomerByCustomerId(customerId: string): Observable<any>;
  abstract updateUserRole(userId: string, roleIds: string): Observable<any>;
  abstract updateUserGroup(userId: string, groupIds: string): Observable<any>;
  abstract updateRoleGroup(groupId: string, roleIds: string): Observable<any>;
  abstract getGroupByBranch(branchCode: string): Observable<any>;
  abstract getGroupByBranch(branchCode: string): Observable<any>;

  abstract getAllRole(): Observable<any>;
  abstract deleteUser(userId: string): Observable<any>;
  abstract getRole(roleId: string): Observable<any>;
  abstract fetchStaffByBranchCode(branchCode: string): Observable<any>;
  abstract fetchStaticUserByByBranchCode(branchCode: string): Observable<any>;
  abstract fetchUserByBranchCode(branchCode: string): Observable<any>;
  abstract createUser(data: UserCreate): Observable<any>;
  abstract editUser(data: object): Observable<any>;
}
