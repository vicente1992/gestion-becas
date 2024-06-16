import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  setItem(key: string, data: string) {
    localStorage.setItem(key, data);
  }

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  clear() {
    localStorage.clear();
  }

}
