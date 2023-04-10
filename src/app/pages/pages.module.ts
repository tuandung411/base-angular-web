import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';

import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SpinnerModule } from '../components/spinner/spinner.module';
import { IconsProviderModule } from '../icons-provider.module';

import { PagesComponent } from './pages.component'; // <---
import { PageRoutingModule } from './pagesRouting.module';
// import { SendSafesBoardComponent } from './send-safes/send-safes-board/send-safes-board.component';

import { CavetBoardComponent } from './cavet/cavet-board/cavet-board.component';
import { StatusTagModule } from '../components/status-tag/status-tag.module';
import { CavetUpdateComponent } from './cavet/cavet-update/cavet-update.component';
import { LoadingModule } from '../components/loading/loading.module';
import { InfoItemModule } from '../components/info-item/info-item.module';
import { CavetViewComponent } from './cavet/cavet-view/cavet-view.component';

import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NoteModule } from '../components/note/note.module';

import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';

import { ModalModule } from '../components/modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NzLayoutModule,
    NzStepsModule,
    NoteModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    LoadingModule,
    NzFormModule,
    NzResultModule,
    NzIconModule,
    NzSelectModule,
    NzButtonModule,
    NzModalModule,
    NzGridModule,
    NzPaginationModule,
    NzDatePickerModule,
    IconsProviderModule,
    NzMenuModule,
    SpinnerModule,
    NzInputModule,
    NzTableModule,
    PageRoutingModule,
    NzAvatarModule,
    NzDropDownModule,
    NzTabsModule,
    Ng2SearchPipeModule,
    NzMessageModule,
    NzPopconfirmModule,
    NzSwitchModule,
    StatusTagModule,
    InfoItemModule,
    ModalModule,
  ],
  declarations: [
    PagesComponent,
    NotAuthorizedComponent,
    CavetBoardComponent,
    CavetUpdateComponent,
    CavetViewComponent,
  ],
})
export class PagesModule {}
