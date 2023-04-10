export class User {
  id!: string;
  fullname!: string;
  address!: number;
  birthday!: string;
  email!: string;
  emailConfirmed!: boolean;
  securityStamp!: string;
  phoneNumber!: string;
  phoneNumberConfirmed!: boolean;
  twoFactorEnabled!: boolean;
  lockoutEndDateUtc!: string;
  lockoutEnabled!: boolean;
  accessFailedCount!: string;
  userName!: string;
  password!: string;
  lastLoginTime!: string;
  lastIP!: string;
  createdDate!: string;
  jobTitleId!: string;
  jobTitle!: string;
  branchCode!: string;
  roles!: any;
  groups!: any;
  serviceAddressed!: any;
}
