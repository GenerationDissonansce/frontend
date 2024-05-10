import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UpdatePageService {
  public observer = new Subject();
  public subscribers$ = this.observer.asObservable();

  public scrollbar_observer = new Subject()
  public scrollbar_subscribers$ = this.scrollbar_observer.asObservable();

  public close_pages_observer = new Subject()
  public close_pages_subscribers$ = this.close_pages_observer.asObservable();

  ResizeEmitData(page_size: number[]) {
    this.observer.next({page_size: page_size, type: 'resize'});
  }

  ScrollEmitData(percent: number) {
    this.observer.next({percent: percent, type: 'scroll'});
  }

  ScrollBarEmitData(percent: number) {
    this.scrollbar_observer.next({percent: percent});
  }

  ClosePage(id: number) {
    this.close_pages_observer.next({id: id});
  }

  constructor() { }
}
