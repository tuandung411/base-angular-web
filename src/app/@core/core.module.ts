import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './module-import.guard';

import { AuthData } from './data/auth';
import { UserData } from './data/user';

import { AuthService } from './mock/auth.service';

import { TokenInterceptorService } from './mock/token.service';

const DATA_SERVICES = [
  { provide: AuthData, useClass: AuthService },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
  },
];

export const CORE_PROVIDERS = [...DATA_SERVICES];

@NgModule({
  imports: [CommonModule],
  exports: [],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...CORE_PROVIDERS],
    };
  }
}
