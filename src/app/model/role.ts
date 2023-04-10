export class Role {
  id!: any;
  appRoleDescription!: string;
  appRoleDiscriminator!: string;
  appRoleName!: string;
  serviceAddresses!: object;
  constructor(
    id: string,
    appRoleDescription: string,
    appRoleDiscriminator: string,
    serviceAddresses: object,
    appRoleName: string
  ) {
    this.id = id;
    this.appRoleDescription = appRoleDescription;
    this.appRoleDiscriminator = appRoleDiscriminator;
    this.appRoleName = appRoleName;
    this.serviceAddresses = serviceAddresses;
  }
}
