import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthData } from 'src/app/@core/data/auth';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/@core/mock/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private message: NzMessageService,
    private router: Router
  ) {}
  countdown: any;
  passwordVisible = false;
  validateForm!: FormGroup;
  showLoading = false;
  isVisible = true;
  isVisibleRegister = false;
  isVisibleForgot = false;
  isVisibleChangePass = false;
  isShowFormOTP = false;
  formDataLogin!: FormGroup;
  formDataRegister!: FormGroup;
  formDataForgot!: FormGroup;
  formDataOTP!: FormGroup;
  otp: string | undefined;
  showOtpComponent = true;

  ngOnInit(): void {
    this.formDataLogin = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

    this.formDataRegister = this.fb.group({
      fullName: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      rePassword: [null, [Validators.required]],
    });

    this.formDataOTP = this.fb.group({
      isForm: [null],
      OTP: [null],
    });
    this.formDataForgot = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      rePassword: [null, [Validators.required]],
    });
    localStorage.removeItem('userToken');
  }

  onOtpChange(otp: string | undefined) {
    this.otp = otp;
    if (otp?.length == 6) {
      console.log('first OTP change:', otp);
      this.formDataOTP.patchValue({
        OTP: otp,
      });
    }
  }

  handleModalOTP(value: any) {
    this.isShowFormOTP = true;
    this.formDataOTP.patchValue({
      isForm: value,
    });
  }

  handleFillEvent(value: string): void {
    console.log(value);
  }
  submitFormRegister(): void {
    if (this.formDataRegister.valid) {
      console.log('submitFormRegister', this.formDataRegister.value);
      this.service.register(this.formDataRegister.value).subscribe(
        (res) => {
          this.message.create('success', 'Đăng ký tài khoản thành công');
          this.showLoading = false;
          this.isVisibleRegister = false;
        },
        (error) => {
          this.showLoading = false;
          this.message.create(
            'error',
            'Đã xảy ra lỗi. Vui lòng xem kiểm tra lại thông tin.'
          );
        }
      );
    }
  }

  submitFormOTP(): void {
    let _key = this.formDataOTP.value['isForm'];
    let otp_forgot = '123456';
    switch (_key) {
      case 'FORGOT':
        if (this.formDataOTP.value['OTP'] == otp_forgot) {
          console.log('first true', this.formDataOTP.value['OTP']);
          console.log('Key FORGOT.');

          let params = {
            token: this.formDataOTP.value['OTP'],
          };
        } else {
          this.message.create(
            'error',
            'OTP không chính xác vui lòng kiểm tra lại.'
          );
        }
        break;
      default:
        this.message.create(
          'error',
          'Đã xảy ra lỗi. Vui lòng xem kiểm tra lại thông tin.'
        );
        console.log(`Sorry, we are out of ${_key}.`);
    }
  }

  submitFormForgot(value: any): void {
    if (value == 'INFOR') {
      console.log(
        '%c submitFormForgot this.formDataForgot',
        'color: #007acc;',
        this.formDataForgot.value
      );
      console.log(
        '%c submitFormForgot this.formDataOTP.value',
        'color: #007acc;',
        this.formDataOTP.value.value
      );
      let params = {
        email: this.formDataForgot.value['email'],
      };
    }
    if (value == 'CHANGEPASS') {
      if (
        this.formDataForgot.value['password'] ==
        this.formDataForgot.value['rePassword']
      ) {
        let params = {
          password: this.formDataForgot.value['password'],
          token: this.formDataOTP.value['OTP'],
        };

        this.isShowFormOTP = false;
        this.isVisibleChangePass = false;
        this.isVisible = true;
        this.message.create('success', 'Thay đổi mật khẩu thành công.');
      } else {
        this.message.create('error', 'Mật khẩu không khớp.');
      }
    }
  }

  submitFormLogin(): void {
    if (this.formDataLogin.valid) {
      this.showLoading = true;
    } else {
      this.message.create('error', 'Vui lòng kiểm tra lại thông tin');
    }
  }

  showModal(): void {
    this.isVisible = true;
    this.isVisibleForgot = false;
  }

  showModalRegister(): void {
    this.isVisible = false;
    this.isVisibleRegister = true;
  }

  showModalForgot(): void {
    this.isVisible = false;
    this.isVisibleRegister = false;
    this.isVisibleForgot = true;
  }

  goBack(_key: any): void {
    switch (_key) {
      case 'REGISTER_F':
        this.isVisible = true;
        this.isVisibleRegister = false;
        console.log('Oranges are $0.59 a pound.', _key);
        break;

      case 'OTP_F':
        this.isVisibleRegister = true;
        this.isShowFormOTP = false;
        console.log('Oranges are $0.59 a pound.', _key);
        break;

      case 'FORGET_F':
        this.isVisible = true;
        this.isVisibleForgot = false;
        console.log('Oranges are $0.59 a pound.', _key);
        break;
      default:
        console.log(`Sorry, we are out of ${_key}.`);
    }
    // console.log('key goback:', _key)
    // this.isVisible = true;
    // this.isVisibleRegister = false
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
