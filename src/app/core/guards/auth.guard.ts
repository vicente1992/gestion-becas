import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '@shared/store/Auth.store';

export const AuthGuard = async () => {
  const authStore = inject(AuthStore);
  const router = inject(Router); 
  return authStore.isAuthenticated() ? true : router.navigate(['/', 'auth', 'login']);
};

