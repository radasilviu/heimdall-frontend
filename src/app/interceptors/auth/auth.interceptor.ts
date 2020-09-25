import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminAuthService } from '../../services/admin-auth/admin-auth.service';
import { User } from '../../models/User';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AdminAuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.userSubject.getValue();

    if (token) {
      return next.handle(this.addAuthorizationHeader(request, token));
    } else {
      return next.handle(request);
    }
  }

  addAuthorizationHeader(request, user: User): any {
    return request.clone({
      headers: request.headers.set('Authorization', `Basic ${user.access_token}`)
    });
  }
}
