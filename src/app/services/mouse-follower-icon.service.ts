import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MouseFollowerIconService {
  public observer = new Subject();
  public subscribers$ = this.observer.asObservable();
  public icon_id?: number;
  public minus_x!: number;
  public minus_y!: number;

  constructor() { }

  emitData() {
    this.observer.next({});
  }

  setIconId(id?: number, minus_x?: number, minus_y?: number) {
    this.icon_id = id;
    this.minus_x = minus_x!;
    this.minus_y = minus_y!;
    this.emitData();
  }
}
