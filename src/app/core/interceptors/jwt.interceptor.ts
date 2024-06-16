import { inject } from '@angular/core';
import { HttpRequest, HttpEvent, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '@features/auth/shared/services/auth.service';
import { Router } from '@angular/router';
import { AuthStore } from '@shared/store/Auth.store';

export const JwtInterceptor = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const authStore = inject(AuthStore);
  const token = authStore.token();
  let request = req;

  if (token) {
    request = req.clone({
      setHeaders: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  return next(request).pipe(
    catchError((httpErrorResponse: HttpErrorResponse) => {
      const { status, error } = httpErrorResponse;
      if (status === 401) {
        authService
          .logout()
          .then(() => router.navigate(['/', 'auth', 'login']));
      }
      return throwError(() => error);
    })
  );
};
