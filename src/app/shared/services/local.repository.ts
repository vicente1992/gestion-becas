import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalRepository {

  save<T>(key: string, value: T): void {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  }

  load<T>(key: string, defaultValue: T): T {
    const found = localStorage.getItem(key);
    if (found) {
      return JSON.parse(found);
    }
    this.save(key, defaultValue);
    return defaultValue;
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
