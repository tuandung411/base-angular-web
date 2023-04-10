import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  imports: [
    CommonModule,
    NzGridModule,
    NzModalModule,
    NzIconModule,
    NzButtonModule,
  ],
  declarations: [ModalComponent],
  exports: [ModalComponent],
})
export class ModalModule {}
