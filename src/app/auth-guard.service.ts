import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
    return this.auth.user$.pipe(
      map(user => {
        if (user) return true;

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      })

    );
  }
}
