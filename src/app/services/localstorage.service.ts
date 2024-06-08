import { Injectable } from '@angular/core';
import {ServiceService} from "./service.service";

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor(
  ) {
  }

  set(key: string, val: string) {
    localStorage.setItem(key, val);
  }

  get(key: string) {
    if (localStorage.getItem(key) == null)
      this.set(key, '');
    return localStorage.getItem(key);
  }
}
