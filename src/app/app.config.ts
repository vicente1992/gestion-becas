import { ApplicationConfig, LOCALE_ID, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { IMAGE_CONFIG, registerLocaleData } from '@angular/common';
import localEs from '@angular/common/locales/es';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideCore } from '@core/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { JwtInterceptor } from '@core/interceptors/jwt.interceptor';
import { ErrorHandlerInterceptor } from '@core/interceptors/error-handle.interceptor';
import { routes } from './app.routes';

registerLocaleData(localEs, 'es');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    { provide: LOCALE_ID, useValue: 'es' },
    {
      provide: IMAGE_CONFIG, useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true
      }
    },
    provideCore(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom([BrowserModule, MatDialogModule]),
    provideHttpClient(
      withInterceptors([JwtInterceptor, ErrorHandlerInterceptor])
    ),
    provideAnimations(),
  ],
};
