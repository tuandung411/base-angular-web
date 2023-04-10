import { Observable } from 'rxjs';

export class Login {
  username!: string;
  password!: string;
  grant_type: 'password';
}
export class ForgotPass {
  email!: String;
}
export class ResetPass {
  token!: String;
  password!: String;
}

export class Register {
  name!: string;
  email!: string;
  username!: string;
  password!: string;
  roleRequest!: string;
}

export abstract class AuthData {
  abstract getToken(): String;
  abstract login(data: Login): Observable<any>;
  abstract userInfo(): Observable<any>;
  abstract changePassword(
    username: string,
    password: string,
    newPassword: string
  ): Observable<any>;

  abstract forgotPass(data: ForgotPass): Observable<any>;
  abstract resetPass(data: ResetPass): Observable<any>;
  abstract logout(): Observable<any>;
  abstract register(data: Register): Observable<any>;
}
