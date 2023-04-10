export interface Asset {
  id: BigInt;
  targetId: BigInt;
  code: string;
  name: string;
  assetOwner: string;
  assetOwnerPhone: string;
  typeId: number;
  typeName: string;
  value: number;
  isSpilit: boolean;
  type: string;
  locationNotarization: string;
  timeNotarization: string;
  currentUserId: BigInt;
  onSecureTransaction: boolean;
  onSecureTransactionOnline: boolean;
  onDeleteMortgage: boolean;
  onUpdateInfo: boolean;
  branchSecureTransactionId: number;
  locationSecureTransaction: string;
  currentGroupId: BigInt;
  checkListFiles: any[];
  fileSendSafes: any[];
  propertyPapers: any[];
}

export interface AssetType {
  id: BigInt;
  name: string;
  parentId: BigInt;
}
