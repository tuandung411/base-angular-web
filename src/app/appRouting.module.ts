import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { CustomPreloadingStrategy } from './@core/utils/CustomPreloadingStrategy';
import { NgModule } from '@angular/core';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
    data: { preload: true },
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      preloadingStrategy: CustomPreloadingStrategy,
    }),
  ],
  exports: [RouterModule],
  providers: [CustomPreloadingStrategy],
})
export class AppRoutingModule {}
