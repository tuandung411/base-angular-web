export class Province {
  id!: string;
  region!: string;
  name!: string;
  serviceAddress!: string;
  constructor(
    id: string,
    region: string,
    name: string,
    serviceAddress: string
  ) {
    this.id = id;
    this.region = region;
    this.name = name;
    this.serviceAddress = serviceAddress;
  }
}
