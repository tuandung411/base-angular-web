import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthRoutingModule } from './authRouting.module';
import { LoginModule } from './login/login.module';

import { AuthComponent } from './auth.component'; // <---

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AuthRoutingModule,
    LoginModule,
  ],
  declarations: [
    AuthComponent, // <---
  ],
})
export class AuthModule {}
