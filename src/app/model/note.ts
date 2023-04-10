import { DeclarationListEmitMode } from '@angular/compiler';

export class Note {
  id!: string;
  targetId!: string;
  description!: string;
  createdDate!: Date;
  ownerUserId!: string;
  type!: string;
}
