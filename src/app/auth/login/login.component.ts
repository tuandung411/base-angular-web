import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { AuthData } from 'src/app/@core/data/auth';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { hasPermission } from 'src/app/helper/common.helper';
import { PERMISSION } from 'src/app/constant/var';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: UntypedFormBuilder,
    private service: AuthData,
    private message: NzMessageService,
    private router: Router
  ) {}

  passwordVisible = false;
  validateForm!: UntypedFormGroup;
  showLoading = false;
  submitForm(): void {
    if (this.validateForm.valid) {
      this.showLoading = true;
      this.service.login(this.validateForm.value).subscribe(
        (res) => {
          res = JSON.parse(res, (key, value) => {
            if (key === 'userId') {
              return BigInt(value).toString();
            }
            return value;
          });

          this.showLoading = false;
          this.message.create('success', 'Đăng nhập thành công');
          localStorage.setItem('accessToken', res.access_token);
          localStorage.setItem('tokenType', res.token_type);
          localStorage.setItem('refreshToken', res.refresh_token);
          localStorage.setItem('expires_in', res.expires_in);

          this.service.userInfo().subscribe(
            (info) => {
              info = JSON.parse(info, (key, value) => {
                if (key === 'sub' || key === 'branch_id') {
                  return BigInt(value).toString();
                }
                return value;
              });
              localStorage.setItem('roles', info.roles);
              localStorage.setItem('userId', info.sub.toString());
              localStorage.setItem('fullname', info.family_name);
              localStorage.setItem('branchId', info.branch_id);
              localStorage.setItem('branchCode', info.branch_code);
              localStorage.setItem('proviceId', info.provice_id);
              if (hasPermission(PERMISSION.SYSTEM_TASK)) {
                this.router.navigate(['/user/cavet']);
              } else {
                this.router.navigate(['/user']);
              }
            },
            (error) => {
              this.message.create(
                'error',
                'Không thể lấy thông tin tài khoản người dùng'
              );
            }
          );
        },
        (error) => {
          this.showLoading = false;
          this.message.create('error', 'Thông tin đăng nhập không chính xác');
        }
      );
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
    localStorage.clear();
  }
}
