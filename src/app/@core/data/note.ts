export interface Note {
  id: BigInt;
  targetId: BigInt;
  description: string;
  createdDate: string;
  ownerUserId: number;
  type: string;
}
