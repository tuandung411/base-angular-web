import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { AuthService } from '../@core/mock/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private route: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // var role = localStorage.getItem('roles').split(',').map(String);

    // const expectedRole = route.data['expectedRole'];
    // const hasExpectedRole = role.some((r) => r === expectedRole);
    const hasExpectedRole = this.authService.HaveRoleAccess(
      route.data['expectedRole']
    );
    if (hasExpectedRole) {
      return true;
    } else {
      this.route.navigate(['/user/not-authorized']);

      return false;
    }
  }
}
