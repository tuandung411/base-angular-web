import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { SampleBoardComponent } from './sample/sample-board/sample-board.component';
import { SampleUpdateComponent } from './sample/sample-update/sample-update.component';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'sample',
        component: SampleBoardComponent,
      },
      {
        path: 'sample/:id',
        component: SampleUpdateComponent,
      },

      {
        path: 'not-authorized',
        component: NotAuthorizedComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
