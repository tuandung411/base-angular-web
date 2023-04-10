export class AssetCavet {
  id!: number;
  targetId!: number;
  code!: string;
  name!: string;
  assetOwner!: string;
  assetOwnerPhone!: string;
  typeId!: number;
  typeName!: string;
  value!: number;
  isSpilit!: boolean;
  type!: string;
  locationVehicleRegistration!: string;
  timeVehicleRegistration!: Date;
  currentUserId!: number;
  onSecureTransaction!: boolean;
  onSecureTransactionOnline!: boolean;
  currentGroupId!: number;
  currencyType!: string;
  legalPaperType!: string;
}
