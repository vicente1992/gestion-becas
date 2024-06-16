import { Injectable, inject } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from '@environments/environment.development';
import { AuthResponse } from '../models/auth';
import { Observable, tap, } from 'rxjs';
import { LocalStorageService } from '@core/services/local-storage.service';
import { AuthStore } from '@shared/store/Auth.store';


@Injectable()
export class AuthService extends HttpService {
  #apiUrl = environment.apiUrl;
  #storageService = inject(LocalStorageService);
  #authStore = inject(AuthStore);

  login(body: any): Observable<AuthResponse> {
    return this.doPost<AuthResponse>(`${this.#apiUrl}/auth/login`, body)
      .pipe(tap((data) => this.#authStore.setState(data)));
  }

  register(body: any): Observable<AuthResponse> {
    return this.doPost<AuthResponse>(`${this.#apiUrl}/auth/register`, body)
      .pipe(tap((data) => this.#authStore.setState(data)));
  }

  refresh(): Observable<AuthResponse> {
    return this.doGet<AuthResponse>(`${this.#apiUrl}/auth/refresh`)
      .pipe(tap((data) => this.#authStore.setState(data)));
  }

  public logout() {
    return new Promise((resolve) => {
      this.#storageService.clear();
      resolve(true);
    });
  }

}
