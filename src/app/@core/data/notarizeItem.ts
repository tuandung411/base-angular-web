import { Asset } from './asset';
import { AssignRm } from './assignRm';
import { Note } from './note';
import { ServiceAddresses } from './serviceAddresses';

export interface NotarizeItem {
  id: BigInt;
  code: string;
  customerCode: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  rmName: string;
  rmPhone: string;
  optionCode: string;
  optionT24Code: string;
  branchCode: string;
  branchName: string;
  currentUserId: BigInt;
  currentGroupId: BigInt;
  parentId: BigInt;
  finishPrintingTime: string;
  branchNotarizationId: BigInt;
  locationNotarization: string;
  timeNotarization: Date;
  status: string;
  customerType: string;
  assignTimes: string;
  isAssigned: boolean;
  latitude: number;
  longtitude: number;
  assignRM: AssignRm;
  assets: Asset[];
  notes: Note[];
  type: number;
}
