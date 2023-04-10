import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { NzTagModule } from 'ng-zorro-antd/tag';
import { StatusTagComponent } from './status-tag.component';
@NgModule({
  imports: [CommonModule, NzButtonModule, NzTagModule, NzGridModule],
  declarations: [StatusTagComponent],
  exports: [StatusTagComponent],
})
export class StatusTagModule {}
