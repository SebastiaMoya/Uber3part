import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class LocalStorageService {
  private storageEvent$: Subject<string> = new Subject<string>();

  constructor() {
    window.addEventListener('storage', (event) => {
      this.storageEvent$.next(event.key as string);
    });
  }

  get(key: string): any {
    return localStorage.getItem(key);
  }

  set(key: string, value: any): void {
    localStorage.setItem(key, value);
    this.storageEvent$.next(key);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
    this.storageEvent$.next(key);
  }

  watchStorage(): Observable<string> {
    return this.storageEvent$.asObservable();
  }
}