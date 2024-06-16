import { Provider } from '@angular/core';
import { ModalService } from './services/modal.service';
import { LocalStorageService } from './services/local-storage.service';
import { HttpService } from './services/http.service';
import { UserService } from './services/user.service';
import { AuthService } from '@features/auth/shared/services/auth.service';
import { SnackBarService } from './services/snack-bar.service';

export function provideCore(): Provider[] {
  return [
    ModalService,
    LocalStorageService,
    UserService,
    AuthService,
    HttpService,
    SnackBarService,
  ];
}
