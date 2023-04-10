export interface AssignRm {
  id: BigInt;
  url: string;
  assetIds: string;
  onNotarization: boolean;
  onSecureTransaction: boolean;
  onGetResult: boolean;
  targetId: number;
  type: string;
}
