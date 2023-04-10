import { Asset } from "./asset";
import { AssignRM } from "./assign-rm";
import { Note } from "./note";
import { ServiceAddresses } from "./service-addresses";

export class NotarizeComposite {
  id!: number;
  code!: string;
  customerCode!: string;
  customerName!: string;
  customerEmail!: string;
  rmName!: string;
  rmPhone!: string;
  optionCode!: string;
  optionT24Code!: string;
  branchCode!: string;
  branchName!: string;
  currentUserId!: number;
  currentGroupId!: number;
  parentId!: number;
  finishPrintingTime!: string;
  branchNotarizationId!: number;
  locationNotarization!: string;
  timeNotarization!: string;
  status!:number;
  customerType!: string;
  assignTimes!:number;
  isAssigned!:boolean;
  latitude! : number;
  longtitude!:number;
  assignRM!: AssignRM;
  assets!: Asset[];
  note!: Note;
  serviceAddresses!: ServiceAddresses;
}