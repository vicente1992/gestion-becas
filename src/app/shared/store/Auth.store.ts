import { Injectable, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { AuthResponse } from '@features/auth/shared/models/auth';
import { User } from '@features/auth/shared/models/user';
import { LocalRepository } from '@shared/services/local.repository';

const NULL_USER = {

  id: '',
  name: '',
  email: '',
  role: '',
  uuid: '',
  avatar: '',
}

const NULL_USER_ACCESS_TOKEN: AuthResponse = { user: NULL_USER, token: '' };

@Injectable({
  providedIn: 'root'
})
export class AuthStore {

  #localRepository: LocalRepository = inject(LocalRepository);
  #state: WritableSignal<AuthResponse> = signal<AuthResponse>(
    this.#localRepository.load('userAccessToken', NULL_USER_ACCESS_TOKEN),
  );

  isAuthenticated: Signal<boolean> = computed(() => this.#state().token !== '');

  token: Signal<string> = computed(() => this.#state().token);

  user: Signal<User> = computed(() => this.#state().user);

  setState(state: AuthResponse) {
    this.#state.set(state);
    this.#localRepository.save('userAccessToken', state);
  }

}
