import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoItemComponent } from './info-item.component';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  imports: [CommonModule, NzGridModule],
  declarations: [InfoItemComponent],
  exports: [InfoItemComponent],
})
export class InfoItemModule {}
