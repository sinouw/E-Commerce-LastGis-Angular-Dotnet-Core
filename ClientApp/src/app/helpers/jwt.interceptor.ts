import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../AdminPanel/Service/account.service';



@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AccountService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        // let currentUser = this.authenticationService.getPayload();
        let token = this.authenticationService.getToken();
        if (token) {

            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request);
    }
}