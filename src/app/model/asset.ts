export class Asset {
  id!: number;
  targetId!: number;
  name!: string;
  assetOwner!: string;
  typeId!: string;
  typeName!: string;
  value!: number;
  isSpilit!: boolean;
  type!: string;
  locationNotarization! :string;
  timeNotarization!:Date;
  currentUserId!:number;
  onSecureTransaction!:boolean;
  branchSecureTransactionId!:number;
  locationSecureTransaction!:string;
  currentGroupId!: number;
}