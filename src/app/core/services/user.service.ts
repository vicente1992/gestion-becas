import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { User } from '@features/auth/shared/models/user';
import { LocalStorageService } from './local-storage.service';
import { AuthStorage } from '@features/auth/shared/models/auth-storage.enum';

@Injectable()
export class UserService {
  #storageService = inject(LocalStorageService);
  #user = signal<User | null>(null);

  get userInfo(): WritableSignal<User | null> {
    return this.#user;
  }

  isLoggedIn() {
    return !!this.#storageService.getItem(AuthStorage.TOKEN);
  }

  getCurrentUser(): void {
    const user = this.#storageService.getItem(AuthStorage.USER);
    if (user) {
      this.#user.set(JSON.parse(user));
    }
  }

}
