import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { SnackBarService } from '@core/services/snack-bar.service';
import { ERROREMESSAGE, SERVER_ERROR } from '@shared/constants/error-messages';
import { Observable, catchError, throwError } from 'rxjs';

export const ErrorHandlerInterceptor = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const snackBarService = inject(SnackBarService);
  return next(req).pipe(
    catchError((httpErrorResponse: HttpErrorResponse) => {
      const { error } = httpErrorResponse;
      const errorMessage = getErrorMenssage(error.error);
      snackBarService.openSnackBar(errorMessage);
      return throwError(() => error);
    })
  );
};

const getErrorMenssage = (error: string) => {
  return ERROREMESSAGE[error] ?? SERVER_ERROR;
};
