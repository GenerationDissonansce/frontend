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

  public loading_screen_observer = new Subject()
  public loading_screen_subscribers$ = this.loading_screen_observer.asObservable();

  public fullscreen_observer = new Subject()
  public fullscreen_subscribers$ = this.loading_screen_observer.asObservable();

  FullscreenEmitData(page_size: number[], pageId: number) {
    this.fullscreen_observer.next({pageId: pageId});
  }

  ResizeEmitData(page_size: number[], pageId: number) {
    this.observer.next({page_size: page_size, type: 'resize', pageId: pageId});
  }

  ScrollEmitData(percent: number, pageId: number) {
    this.observer.next({percent: percent, pageId: pageId, type: 'scroll'});
  }

  ScrollBarEmitData(percent: number, pageId: number) {
    this.scrollbar_observer.next({percent: percent, pageId: pageId});
  }

  ClosePage(id: number) {
    this.close_pages_observer.next({id: id});
  }

  LoadScreen() {
    this.loading_screen_observer.next({});
  }

  constructor() { }
}
