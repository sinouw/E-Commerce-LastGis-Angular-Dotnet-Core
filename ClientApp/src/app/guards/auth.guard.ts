import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '../AdminPanel/Service/account.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AccountService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.authenticationService.getToken()) {
            const currentUserRole = this.authenticationService.getPayload().role;
            if (currentUserRole) {
                // check if route is restricted by role
                if (route.data.roles && route.data.roles.indexOf(currentUserRole) === -1) {
                    // role not authorised so redirect to home page
                    // this.router.navigate(['/']);
                    this.router.navigateByUrl('/unauthorized');
                    return false;
                }
    
                // authorised so return true
                return true;
            }
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/session/signin'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}