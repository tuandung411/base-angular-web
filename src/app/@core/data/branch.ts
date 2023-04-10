export class Branch {
  id: BigInt;
  branchCode: string;
  branchName: string;
  type: string;
  location: string;
  latitude: number;
  longitude: number;
  parentId: string;
  provinceId: BigInt;
  serviceAddress: string;

  constructor(
    id: BigInt,
    branchCode: string,
    branchName: string,
    type: string,
    location: string,
    latitude: number,
    longitude: number,
    parentId: string,
    provinceId: BigInt,
    serviceAddress: string
  ) {
    this.id = id;
    this.branchCode = branchCode;
    this.branchName = branchName;
    this.type = type;
    this.location = location;
    this.latitude = latitude;
    this.longitude = longitude;
    this.parentId = parentId;
    this.provinceId = provinceId;
    this.serviceAddress = serviceAddress;
  }
}
