import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NoteComponent } from './note.component';
@NgModule({
  imports: [
    NzTimePickerModule,
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzFormModule,
    NzGridModule,
  ],
  declarations: [NoteComponent],
  exports: [NoteComponent],
})
export class NoteModule {}
